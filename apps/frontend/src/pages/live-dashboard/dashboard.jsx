import { Shell } from '../../components/shell';
import { useEffect, useState } from 'react';
import {
  Grid,
  Stack,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Button,
} from '@mui/material';
import { useAxios } from '../../hooks/axios';
import { Loading } from '../../components/loading';

// Polar wheel component 
import PolarBalanceWheel from './components/PolarBalanceWheel';
import PolarSectorWheel from './components/PolarSectorWheel';
import PolarSubWheel from './components/PolarSubWheel';

// slideshow to show the spider
import { Slideshow } from './components/slideshow';
import ChartSwitcherBanner from "./components/ChartSwitcherBanner";

export const LiveDashboard = () => {
  const [isSlideshowOpen, setSlideshowOpen] = useState(false);

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

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

  useEffect(() => {
    clientsRequest.execute();
  }, []);

  useEffect(() => {
    setSelectedDepartment('');
    setDepartments([]);
    const client = clients.find((c) => c.id === selectedClient);
    if (client) {
      setDepartments(client.departments || []);
      if ((client.departments || []).length > 0) {
        setSelectedDepartment(client.departments[0].id);
      }
    }
  }, [selectedClient, clients]);

  useEffect(() => {
    if (selectedDepartment) {
      assessmentsRequest.executeWithParameters({
        url: `/assessments/departments/${selectedDepartment}`,
      })();
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (clientsRequest.response && !clientsRequest.error) {
      const companies = clientsRequest.response.companies || [];
      setClients(companies);
      if (companies.length > 0) {
        setSelectedClient(companies[0].id);
        setDepartments(companies[0].departments || []);
        if ((companies[0].departments || []).length > 0) {
          setSelectedDepartment(companies[0].departments[0].id);
        }
      }
    }
  }, [clientsRequest.response, clientsRequest.error]);

  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      // Fetch spider chart payload from the backend
      setSpiderChart(assessmentsRequest.response.spiderChart || null);
    }
  }, [assessmentsRequest.response, assessmentsRequest.error]);

  const loading =
    assessmentsRequest.loading || clientsRequest.loading;

  const getCompanyName = (selectedClient, clients) => {
    const client = clients.find((c) => c.id === selectedClient);
    return client ? client.name : 'Unknown Company';
  };

  const getDepartmentName = (selectedDepartment, departments) => {
    const dept = departments.find((d) => d.id === selectedDepartment);
    return dept ? dept.name : 'Unknown Department';
  };

  return (
    <Shell heading="Live Dashboard">
      <Stack direction="row" spacing={3} sx={{ marginBottom: '50px' }}>
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
