import { Shell } from '../../components/shell';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Stack,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useAxios } from '../../hooks/axios';
import { useLocalStorage } from '../../hooks/storage';
import { Loading } from '../../components/loading';
import { Colours } from '../../colours';

// Polar wheel component 
import PolarBalanceWheel from './components/PolarBalanceWheel';
import PolarSectorWheel from './components/PolarSectorWheel';
import PolarSubWheel from './components/PolarSubWheel';

// slideshow to show the spider
import { Slideshow } from './components/slideshow';
import ChartSwitcherBanner from "./components/ChartSwitcherBanner";

export const LiveDashboard = () => {
  const location = useLocation();
  const [isSlideshowOpen, setSlideshowOpen] = useState(false);

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const { role, companyId } = useLocalStorage();
  const [employeeIdFilter, setEmployeeIdFilter] = useState('');
  // Note: Prefer employeeId for scoping; backend expects employeeId
  const [presetCompany, setPresetCompany] = useState('');
  const [presetDepartment, setPresetDepartment] = useState('');
  // Names resolved for client_user when companies/departments lists are unavailable
  const [resolvedCompanyName, setResolvedCompanyName] = useState('');
  const [resolvedDepartmentName, setResolvedDepartmentName] = useState('');

  // chart payload
  const [spiderChart, setSpiderChart] = useState(null);
  const [chartView, setChartView] = useState("sector"); 
// "sector" | "sub" | "full"


  // Fetch All companies
  const clientsRequest = useAxios({
    url: '/companies',
    method: 'get',
  });

 // Fetch assessments for selected department
  const assessmentsRequest = useAxios({
    url: '/assessments/departments/{departmentId}',
    method: 'get',
  });

  // Fetch department (and company) details by id for client_user
  const departmentInfoRequest = useAxios({
    url: '/departments/{departmentId}',
    method: 'get',
  });

  useEffect(() => {
    const r = String(role || '').toLowerCase();
    // client_user and client are not allowed to call /companies (403). Skip fetching.
    if (r !== 'client_user' && r !== 'client') {
      clientsRequest.execute();
    }
  }, [role]);

  // Parse query/localStorage presets for employee/company/department
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search || '');
      const eid = params.get('employeeId') || localStorage.getItem('respondentEmployeeId') || '';
      const dept = params.get('departmentId') || localStorage.getItem('respondentDepartmentId') || '';
      const comp = params.get('companyId') || localStorage.getItem('respondentCompanyId') || '';
      const email = params.get('email') || localStorage.getItem('respondentEmail') || '';
      setEmployeeIdFilter(eid);
      // Keep reading email for potential future use, but URL will use employeeId
      setPresetDepartment(dept);
      setPresetCompany(comp);
      // For client_user, we cannot load companies; set selection directly from presets
      const r = String(role || '').toLowerCase();
      if (r === 'client_user') {
        if (comp) setSelectedClient(comp);
        if (dept) setSelectedDepartment(dept);
      }
    } catch {}
  }, [location.search, role]);

  useEffect(() => {
    const r = String(role || '').toLowerCase();
    if (r === 'client_user') return; // skip rebuilding departments from companies
    setSelectedDepartment('');
    setDepartments([]);
    const client = clients.find((c) => c.id === selectedClient);
    if (client) {
      setDepartments(client.departments || []);
      if ((client.departments || []).length > 0) {
        // Prefer preset department if available
        const deps = client.departments || [];
        const preset = presetDepartment;
        const found = preset ? deps.find((d) => d.id === preset) : null;
        setSelectedDepartment((found && found.id) || deps[0].id);
      }
    }
  }, [selectedClient, clients, presetDepartment, role]);

  useEffect(() => {
    if (!selectedDepartment) return;
    const r = String(role || '').toLowerCase();
    const isClientUser = r === 'client_user';
    let url = `/assessments/departments/${selectedDepartment}`;
    if (isClientUser) {
      if (!employeeIdFilter) return; // require employeeId for client_user
      url += `?employeeId=${encodeURIComponent(employeeIdFilter)}`;
    } else if (employeeIdFilter) {
      url += `?employeeId=${encodeURIComponent(employeeIdFilter)}`;
    }
    assessmentsRequest.executeWithParameters({ url, method: 'get' })();
  }, [selectedDepartment, employeeIdFilter, role]);

  useEffect(() => {
    if (clientsRequest.response && !clientsRequest.error) {
      const allCompanies = clientsRequest.response.companies || [];
      const r = String(role || '').toLowerCase();
      const isClient = r === 'client_super' || r === 'client_user' || r === 'client';
      const companies = isClient
        ? allCompanies.filter((c) => c.id === companyId)
        : allCompanies;
      setClients(companies);
      if (companies.length > 0) {
        // Prefer preset company if available
        const preferredCompanyId = (presetCompany && companies.find((c) => c.id === presetCompany)?.id) || companies[0].id;
        setSelectedClient(preferredCompanyId);
        const deps = (companies.find((c) => c.id === preferredCompanyId)?.departments) || [];
        setDepartments(deps);
        if (deps.length > 0) {
          // Prefer preset department if available
          const preferredDeptId = (presetDepartment && deps.find((d) => d.id === presetDepartment)?.id) || deps[0].id;
          setSelectedDepartment(preferredDeptId);
        }
      } else {
        setSelectedClient('');
        setDepartments([]);
        setSelectedDepartment('');
      }
    }
  }, [clientsRequest.response, clientsRequest.error, presetCompany, presetDepartment]);

  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      // Fetch spider chart payload from the backend
      setSpiderChart(assessmentsRequest.response.spiderChart || null);
    }
  }, [assessmentsRequest.response, assessmentsRequest.error]);

  // Capture resolved names from department info for client_user
  useEffect(() => {
    const r = String(role || '').toLowerCase();
    if (r !== 'client_user') return;
    // Prefer names returned by assessments endpoint when available
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      const depName = assessmentsRequest.response.departmentName || '';
      const compName = assessmentsRequest.response.companyName || '';
      if (depName) setResolvedDepartmentName(depName);
      if (compName) setResolvedCompanyName(compName);
    }
  }, [assessmentsRequest.response, assessmentsRequest.error, role]);

  const loading =
    assessmentsRequest.loading || clientsRequest.loading;

  const getCompanyName = (selectedClient, clients) => {
    const client = clients.find((c) => c.id === selectedClient);
    if (client) return client.name;
    // Prefer resolved name for client_user
    if (resolvedCompanyName) return resolvedCompanyName;
    // Avoid old placeholder; show temporary loading text instead
    if (presetCompany && selectedClient === presetCompany) return 'Loading...';
    return 'Unknown Company';
  };

  const getDepartmentName = (selectedDepartment, departments) => {
    const dept = departments.find((d) => d.id === selectedDepartment);
    if (dept) return dept.name;
    // Prefer resolved name for client_user
    if (resolvedDepartmentName) return resolvedDepartmentName;
    // Avoid old placeholder; show temporary loading text instead
    if (presetDepartment && selectedDepartment === presetDepartment) return 'Loading...';
    return 'Unknown Department';
  };

  return (
    <Shell heading="Live Dashboard">
      {(() => {
        const r = String(role || '').toLowerCase();
        if (r === 'client_user' && !employeeIdFilter) {
          return (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                Almost there
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Please complete the Start Assessment and questionnaire to view your dashboard.
              </Typography>
              <Button variant="contained" onClick={() => (window.location.href = '/assessment/questions')}>Start Assessment</Button>
            </Box>
          );
        }
        return null;
      })()}
      <Stack direction="row" spacing={3} sx={{ marginBottom: '50px' }}>
        {(() => {
          const r = String(role || '').toLowerCase();
          const isClientRole = r === 'client_super' || r === 'client_user' || r === 'client';

          if (isClientRole) {
            const companyName = getCompanyName(selectedClient, clients);
            const departmentName = getDepartmentName(selectedDepartment, departments);
            const commonBoxSx = {
              minWidth: 260,
              backgroundColor: Colours.blue,
              borderRadius: '6px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
            };
            const commonTextSx = {
              fontWeight: 700,
              fontSize: '18px',
              color: '#fcf4ec',
            };

            return (
              <>
                <Box sx={commonBoxSx}>
                  <Typography sx={commonTextSx}>
                    {`Company: ${companyName}`}
                  </Typography>
                </Box>
                <Box sx={commonBoxSx}>
                  <Typography sx={commonTextSx}>
                    {`Department: ${departmentName}`}
                  </Typography>
                </Box>
              </>
            );
          }

          // Default: show dropdowns for non-client roles
          return (
            <>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="company-label">Company</InputLabel>
                  <Select
                    labelId="company-label"
                    id="company-select"
                    value={selectedClient}
                    label="Company"
                    onChange={(event) => setSelectedClient(event.target.value)}
                  >
                    {clients.map((client) => (
                      <MenuItem value={client.id} key={client.id}>
                        {client.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    labelId="department-label"
                    id="department-select"
                    value={selectedDepartment}
                    label="Department"
                    onChange={(event) => setSelectedDepartment(event.target.value)}
                  >
                    {departments.map((department) => (
                      <MenuItem value={department.id} key={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </>
          );
        })()}
      </Stack>

      {loading && (
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{ width: '250px !important', height: '250px !important' }}
          containerSx={{ margin: '10% 25%' }}
        />
      )}

     {!loading && spiderChart && (
        <>
          <ChartSwitcherBanner chartView={chartView} setChartView={setChartView} />

          {chartView === "sector" && (
          <PolarSectorWheel sectorSummary={spiderChart?.sectorSummary} mode="percent" />
          )}

          {chartView === "sub" && (
          <PolarSubWheel subSummary={spiderChart?.subSummary} mode="percent" />
          )}

          {chartView === "full" && (
           <PolarBalanceWheel spiderChart={spiderChart} mode="percent" />
          )}

          <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Button variant="contained" onClick={() => setSlideshowOpen(true)}>
              Slideshow
          </Button>
          </Box>

         <Slideshow
           open={isSlideshowOpen}
           onClose={() => setSlideshowOpen(false)}
           spiderChart={spiderChart}
           selectedCompany={getCompanyName(selectedClient, clients)}
           selectedDepartment={getDepartmentName(selectedDepartment, departments)}
         />
     </>
)}
    </Shell>
  );
};
