import { Shell } from '../../components/shell';
import { RadarChart } from './components/radar';
import { BubbleChart } from './components/matrix';
import { ScatterPlotComponent } from './components/do-ability';
import { Slideshow } from './components/slideshow'; 
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
import { LiveDashboardBanner } from './components/banner';
import { useEffect, useState } from 'react';
import { useAxios } from '../../hooks/axios';
import { Loading } from '../../components/loading';

export const LiveDashboard = () => {
  const [step, setStep] = useState(0);
  const [isSlideshowOpen, setSlideshowOpen] = useState(false); 

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [radarChartData, setRadarChartData] = useState([]);
  const [doAbilityChart, setDoAbilityChart] = useState([]);
  const [highMatrixData, setHighMatrixData] = useState([]);
  const [lowMatrixData, setLowMatrixData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); 

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
    const client = clients.find((client) => client.id === selectedClient);
    if (client) {
      setDepartments(client.departments);
      if (client.departments.length > 0) setSelectedDepartment(client.departments[0].id);
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedDepartment.length > 0)
      assessmentsRequest.executeWithParameters({
        url: `/assessments/departments/${selectedDepartment}`,
      })();
  }, [selectedDepartment]);

  useEffect(() => {
    if (clientsRequest.response && !clientsRequest.error) {
      const companies = clientsRequest.response.companies;
      if (companies) {
        setClients(companies || []);
        if (companies.length > 0) setSelectedClient(companies[0].id);
        setDepartments(companies[0].departments);
        if (companies[0].departments.length > 0) setSelectedDepartment(companies[0].departments[0].id);
      }
    }
  }, [clientsRequest.response, clientsRequest.error]);

  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      if (assessmentsRequest.response.assessments) {
        setAssessments(assessmentsRequest.response.assessments);
        setRadarChartData(assessmentsRequest.response.radarChart);
        setDoAbilityChart(assessmentsRequest.response.doAbilityMatrix);
        setLowMatrixData(assessmentsRequest.response.lowMatrix);
        setHighMatrixData(assessmentsRequest.response.highMatrix);
      }
    }
  }, [assessmentsRequest.response, assessmentsRequest.error]);

  const renderGraphs = () => {
    if (assessmentsRequest.loading || clientsRequest.loading || assessments.length === 0) return false;
    return true;
  };

   
  const handleSlideshowOpen = () => {
    setSlideshowOpen(true);
    setRefreshKey((prevKey) => prevKey + 1); 
  };

const getCompanyName = (selectedClient, clients) => {
  const client = clients.find((client) => client.id === selectedClient);
  return client ? client.name : "Unknown Company";
};

const getDepartmentName = (selectedDepartment, departments) => {
  const department = departments.find((dept) => dept.id === selectedDepartment);
  return department ? department.name : "Unknown Department";
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

      {assessmentsRequest.loading || clientsRequest.loading ? (
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{
            width: '250px !important',
            height: '250px !important',
          }}
          containerSx={{ margin: '10% 25%' }}
        />
      ) : null}

      {renderGraphs() && (
        <>
          <LiveDashboardBanner step={step} setStep={setStep} doAbilityChart={doAbilityChart} />
          {step === 0 && <RadarChart title="Current vs Important" series={radarChartData} />}
          {step === 1 && <ScatterPlotComponent series={doAbilityChart} />}
          {step === 2 && (
            <>
              <BubbleChart
                title="Priorities: High Importance to us, high do-ability"
                series={highMatrixData}
              />
              <BubbleChart
                title="Priorities: High Importance to us, low do-ability"
                styles={{ marginTop: '20px' }}
                series={lowMatrixData}
              />
            </>
          )}
          <Grid container spacing={2}></Grid>

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button variant="contained" onClick={handleSlideshowOpen}>
             Slideshow
            </Button>
          </Box>

          <Slideshow
            open={isSlideshowOpen}
            onClose={() => setSlideshowOpen(false)}
            scatterSeries={doAbilityChart}      
            highBubbleSeries={highMatrixData} 
            lowBubbleSeries={lowMatrixData}   
            radarSeries={radarChartData}  
            selectedCompany={getCompanyName(selectedClient,clients)}
            selectedDepartment={getDepartmentName(selectedDepartment, departments)}    
       
          />
        </>
      )}
    </Shell>
  );
};
