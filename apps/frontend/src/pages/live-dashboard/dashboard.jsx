import { Shell } from '../../components/shell';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
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

import PolarBalanceWheel from './components/PolarBalanceWheel';
import PolarSectorWheel from './components/PolarSectorWheel';
import PolarSubWheel from './components/PolarSubWheel';
import { Slideshow } from './components/slideshow';
import ChartSwitcherBanner from "./components/ChartSwitcherBanner";

// 🔹 Role helpers
const normalizeRole = (role) => String(role || '').toLowerCase();
const isAdmin = (role) => ["admin", "administrator"].includes(normalizeRole(role));
const isPivot = (role) => normalizeRole(role) === "pivot";
const isSuper = (role) => normalizeRole(role) === "client_super";
const isClientUser = (role) => normalizeRole(role) === "client_user";
const isAdminOrPivot = (role) => isAdmin(role) || isPivot(role);

export const LiveDashboard = () => {
  const location = useLocation();
  const [isSlideshowOpen, setSlideshowOpen] = useState(false);

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  const { role, companyId } = useLocalStorage();
  const [employeeIdFilter, setEmployeeIdFilter] = useState('');

  const [presetCompany, setPresetCompany] = useState('');
  const [presetDepartment, setPresetDepartment] = useState('');
  const [resolvedCompanyName, setResolvedCompanyName] = useState('');
  const [resolvedDepartmentName, setResolvedDepartmentName] = useState('');

  const [spiderChart, setSpiderChart] = useState(null);
  const [chartView, setChartView] = useState("sector");

  // API hooks
  const clientsRequest = useAxios({ url: '/companies', method: 'get' });
  const assessmentsRequest = useAxios({ url: '/assessments/departments/{departmentId}', method: 'get' });

  // 🔹 Fetch companies (only admin/pivot/super)
  useEffect(() => {
    if (isAdminOrPivot(role) || isSuper(role)) {
      clientsRequest.execute();
    }
  }, [role]);

  // 🔹 Parse query/localStorage presets
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search || '');
      const eid = params.get('employeeId') || localStorage.getItem('respondentEmployeeId') || '';
      const dept = params.get('departmentId') || localStorage.getItem('respondentDepartmentId') || '';
      const comp = params.get('companyId') || localStorage.getItem('respondentCompanyId') || '';

      setEmployeeIdFilter(eid);
      setPresetDepartment(dept);
      setPresetCompany(comp);

      if (isClientUser(role) || isSuper(role)) {
        if (comp) setSelectedClient(comp);
        if (dept) setSelectedDepartment(dept);
      }
    } catch {}
  }, [location.search, role]);

  // 🔹 Build department list (admin/pivot only)
  useEffect(() => {
    if (isClientUser(role) || isSuper(role)) return;
    setSelectedDepartment('');
    setDepartments([]);

    const client = clients.find((c) => c.id === selectedClient);
    if (client) {
      setDepartments(client.departments || []);
      if ((client.departments || []).length > 0) {
        setSelectedDepartment(client.departments[0].id);
      }
    }
  }, [selectedClient, clients, role]);

  // 🔹 Fetch assessments
  useEffect(() => {
    if (!selectedDepartment) return;

    let url = `/assessments/departments/${selectedDepartment}`;
    if (isClientUser(role)) {
      if (!employeeIdFilter) return;
      url += `?employeeId=${encodeURIComponent(employeeIdFilter)}`;
    }
    assessmentsRequest.executeWithParameters({ url, method: 'get' })();
  }, [selectedDepartment, employeeIdFilter, role]);

  // 🔹 Handle company filtering
  useEffect(() => {
    if (clientsRequest.response && !clientsRequest.error) {
      const allCompanies = clientsRequest.response.companies || [];
      let companies = [];

      if (isAdminOrPivot(role)) {
        companies = allCompanies;
      } else if (isSuper(role)) {
        companies = allCompanies
          .filter((c) => c.id === companyId)
          .map((c) => ({
            ...c,
            departments: (c.departments || []).filter((d) => d.id === presetDepartment),
          }));
      }

      setClients(companies);

      if (companies.length > 0) {
        const preferredCompanyId = companies[0].id;
        setSelectedClient(preferredCompanyId);

        const deps = companies[0].departments || [];
        if (deps.length > 0) {
          setSelectedDepartment(deps[0].id);
        }
      } else {
        setSelectedClient('');
        setDepartments([]);
        setSelectedDepartment('');
      }
    }
  }, [clientsRequest.response, clientsRequest.error, presetCompany, presetDepartment, role, companyId]);

  // 🔹 Save spider chart
  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      setSpiderChart(assessmentsRequest.response.spiderChart || null);
      if (isClientUser(role)) {
        setResolvedCompanyName(assessmentsRequest.response.companyName || '');
        setResolvedDepartmentName(assessmentsRequest.response.departmentName || '');
      }
    }
  }, [assessmentsRequest.response, assessmentsRequest.error, role]);

  const loading = assessmentsRequest.loading || clientsRequest.loading;

  const getCompanyName = (id) => {
    const client = clients.find((c) => c.id === id);
    return client?.name || resolvedCompanyName || 'Unknown Company';
  };

  const getDepartmentName = (id) => {
    const dept = departments.find((d) => d.id === id);
    return dept?.name || resolvedDepartmentName || 'Unknown Department';
  };

  return (
    <Shell heading="Live Dashboard">
      {isClientUser(role) && !employeeIdFilter && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Almost there</Typography>
          <Typography sx={{ mb: 2 }}>
            Please complete the Start Assessment and questionnaire to view your dashboard.
          </Typography>
          <Button variant="contained" onClick={() => (window.location.href = '/assessment/questions')}>
            Start Assessment
          </Button>
        </Box>
      )}

      <Stack direction="row" spacing={3} sx={{ marginBottom: '50px' }}>
        {(() => {
          if (isClientUser(role) || isSuper(role)) {
            // 🔒 locked company & department
            return (
              <>
                <Box sx={{ minWidth: 260, backgroundColor: Colours.blue, borderRadius: '6px', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#fcf4ec' }}>
                    {`Company: ${getCompanyName(selectedClient)}`}
                  </Typography>
                </Box>
                <Box sx={{ minWidth: 260, backgroundColor: Colours.blue, borderRadius: '6px', padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#fcf4ec' }}>
                    {`Department: ${getDepartmentName(selectedDepartment)}`}
                  </Typography>
                </Box>
              </>
            );
          }

          if (isAdminOrPivot(role)) {
            // 🔓 admin/pivot get dropdowns
            return (
              <>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                      labelId="company-label"
                      id="company-select"
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
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
                      onChange={(e) => setSelectedDepartment(e.target.value)}
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
          }

          return null;
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
            selectedCompany={getCompanyName(selectedClient)}
            selectedDepartment={getDepartmentName(selectedDepartment)}
          />
        </>
      )}
    </Shell>
  );
};
