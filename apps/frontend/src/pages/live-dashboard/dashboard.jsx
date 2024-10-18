import { Shell } from '../../components/shell';
import { RadarChart } from './components/radar';
import { BubbleChart } from './components/matrix';
import { ScatterPlotComponent } from './components/do-ability';
import {
  Grid,
  Stack,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
import { LiveDashboardBanner } from './components/banner';
import { useEffect, useState } from 'react';
import { useAxios } from '../../hooks/axios';
import { Loading } from '../../components/loading';
import TableComponent from './components/tablecomponent';


const series = [
  {
    name: 'Do-ability',
    data: [2.9, 3.7, 4.5, 3.2, 2.2],
    color: '#00FF00', // Green color
  },
  {
    name: 'Current',
    data: [4.4, 5, 3, 4, 1.2],
    color: '#FF0000', // Red color
  },
  {
    name: 'Important',
    data: [4.4, 4.8, 3.6, 1.3, 4.3],
    color: '#0000FF', // Blue color
  },
];

export const LiveDashboard = () => {
  const [step, setStep] = useState(0);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [radarChartData, setRadarChartData] = useState([]);
  const [doAbilityChart, setDoAbilityChart] = useState([]);
  const [highMatrixData, setHighMatrixData] = useState([]);
  const [lowMatrixData, setLowMatrixData] = useState([]);
  //Fetch All companies
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
    if (typeof client !== 'undefined') {
      setDepartments(client.departments);
      if (client.departments.length > 0)
        setSelectedDepartment(client.departments[0].id);
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
        if (companies[0].departments.length > 0)
          setSelectedDepartment(companies[0].departments[0].id);
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
    if (
      assessmentsRequest.loading ||
      clientsRequest.loading ||
      assessments.length === 0
    )
      return false;
    return true;
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
          <LiveDashboardBanner step={step} setStep={setStep} />
          {step === 0 && (
            <RadarChart title="Current vs Important" series={radarChartData} />
          )}
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
          {step === 3 && (
    
          <Grid item xs={12}>
            <TableComponent /> {/* Render the CustomTable here */}
          </Grid>
      
      )}
          <Grid container spacing={2}></Grid>
        </>
      )}
    </Shell>
  );
};
