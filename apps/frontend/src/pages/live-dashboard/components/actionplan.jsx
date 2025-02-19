import React, { useState, useEffect } from 'react';
import {
  Stack,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import { Shell } from '../../../components/shell';
import { useAxios } from '../../../hooks/axios';
import { Loading } from '../../../components/loading';
import { Add, Delete } from '@mui/icons-material';
import { useSnackbar,  } from 'notistack';

export const ActionPlan = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMatrixType, setSelectedMatrixType] = useState('');
  const [selectedDataPoint, setSelectedDataPoint] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [quarters] = useState(['Q1', 'Q2', 'Q3', 'Q4']);
  const [actionPlanName, setActionPlanName] = useState('');
  const [dataPoints, setDataPoints] = useState([]);
  const [dataPointOptions, setDataPointOptions] = useState([]);
  const [actionPlans, setActionPlans] = useState({});
  const [tableData, setTableData] = useState({
    Outcome: { Q1: '', Q2: '', Q3: '', Q4: '' },
    Role: { Q1: '', Q2: '', Q3: '', Q4: '' },
    Dependency: { Q1: '', Q2: '', Q3: '', Q4: '' },
    Funding: { Q1: '', Q2: '', Q3: '', Q4: '' },
  });

  const clientsRequest = useAxios({ url: '/companies', method: 'get' });
  const assessmentsRequest = useAxios({ url: `/assessments/departments/${selectedDepartment}`, method: 'get' });
  const savePlanRequest = useAxios({ url: '/action-plans/create', method: 'post' });
  const fetchActionPlan = useAxios({ url: '/action-plans/All', method: 'get' });

  useEffect(() => {
    if (selectedClient && selectedDepartment && selectedYear) {
        // Fetching action plans when filters change
        fetchActionPlan.execute({
            params: {
                companyId: selectedClient,
                departmentId: selectedDepartment,
                year: selectedYear,
            },
        });
    }
  }, [selectedClient, selectedDepartment, selectedYear]);

   // Handling the response when fetchActionPlan updates
   useEffect(() => {
    if (fetchActionPlan.response && !fetchActionPlan.error) {
        // When saving the action plan we do not save the company ID and Department
        const filteredPlan = fetchActionPlan.response.plans.find(plan => 
            plan.year === selectedYear && 
            plan.companyId === selectedClient &&
            plan.departmentId === selectedDepartment
        );

        if (filteredPlan) {
            enqueueSnackbar("Action Plan found!", { variant: "success" });

            setActionPlanName(filteredPlan.name || "");
            setSelectedMatrixType(filteredPlan.matrixType || "");
            setDataPoints(filteredPlan.dataPoints || []);
            setTableData(filteredPlan.tableData || {
                Outcome: { Q1: "", Q2: "", Q3: "", Q4: "" },
                Role: { Q1: "", Q2: "", Q3: "", Q4: "" },
                Dependency: { Q1: "", Q2: "", Q3: "", Q4: "" },
                Funding: { Q1: "", Q2: "", Q3: "", Q4: "" },
            });
        } else {
            enqueueSnackbar("No Action Plan Found", { variant: "warning" });
        }
    }
    }, [fetchActionPlan.response, fetchActionPlan.error]);


  useEffect(() => {
    clientsRequest.execute();
  }, []);
  
    useEffect(() => {
    if (savePlanRequest.error || !savePlanRequest.response) {
      console.log(savePlanRequest.error);
      return;
    }
    enqueueSnackbar('Success! Action Plan Created.', { variant: 'success' });
      setTableData({
    Outcome: { Q1: '', Q2: '', Q3: '', Q4: '' },
    Role: { Q1: '', Q2: '', Q3: '', Q4: '' },
    Dependency: { Q1: '', Q2: '', Q3: '', Q4: '' },
    Funding: { Q1: '', Q2: '', Q3: '', Q4: '' },
  })
    setActionPlanName("");
    setDataPointOptions([]);
    setSelectedDataPoint("");
    setSelectedMatrixType("")
  }, [savePlanRequest.response, savePlanRequest.error]);



  useEffect(() => {
    if (clientsRequest.response && !clientsRequest.error) {
      const companies = clientsRequest.response.companies || [];
      if (companies.length > 0) {
        const [firstCompany] = companies;
        setClients(companies);
        setSelectedClient(firstCompany.id);
        setDepartments(firstCompany.departments || []);
        setSelectedDepartment(firstCompany.departments?.[0]?.id || '');
      }
    }
  }, [clientsRequest.response]);

  useEffect(() => {
    if (selectedClient) {
      const client = clients.find((client) => client.id === selectedClient);
      if (client) {
        setDepartments(client.departments || []);
        setSelectedDepartment(client.departments?.[0]?.id || '');
      }
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedDepartment) {
      assessmentsRequest.execute();
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      const { highMatrix, lowMatrix } = assessmentsRequest.response;
      const matrix = selectedMatrixType === 'highMatrix' ? highMatrix : lowMatrix;
      const options = matrix?.map((entry, index) => ({
        label: entry.name || `Data Point ${index + 1}`,
        value: entry.name || `Data Point ${index + 1}`,
      })) || [];
      setDataPointOptions(options);
    }
  }, [assessmentsRequest.response, selectedMatrixType]);

  useEffect(() => {
  setSelectedDataPoint('');

  if (selectedMatrixType && assessmentsRequest.response && !assessmentsRequest.error) {
    const { highMatrix, lowMatrix } = assessmentsRequest.response;
    const matrix = selectedMatrixType === 'highMatrix' ? highMatrix : lowMatrix;

    const options = matrix?.map((entry, index) => ({
      label: entry.name || `Data Point ${index + 1}`,
      value: entry.name || `Data Point ${index + 1}`,
    })) || [];

    setDataPointOptions(options);
  } else {
    setDataPointOptions([]); 
  }
  }, [selectedMatrixType, assessmentsRequest.response]);


  useEffect(() => {
    // Load Action Plan for selected department
    if (selectedDepartment && actionPlans[selectedDepartment]) {
      const { name, matrixType, dataPoints, tableData } = actionPlans[selectedDepartment];
  
      setActionPlanName(name || '');
      setSelectedMatrixType(matrixType || '');
      setDataPoints(dataPoints || []);
      setTableData(tableData || {
        Outcome: { Q1: '', Q2: '', Q3: '', Q4: '' },
        Role: { Q1: '', Q2: '', Q3: '', Q4: '' },
        Dependency: { Q1: '', Q2: '', Q3: '', Q4: '' },
        Funding: { Q1: '', Q2: '', Q3: '', Q4: '' },
      });
    } else {
      // Reset form if no data exists for the selected department
      setActionPlanName('');
      setSelectedMatrixType('');
      setDataPoints([]);
      setTableData({
        Outcome: { Q1: '', Q2: '', Q3: '', Q4: '' },
        Role: { Q1: '', Q2: '', Q3: '', Q4: '' },
        Dependency: { Q1: '', Q2: '', Q3: '', Q4: '' },
        Funding: { Q1: '', Q2: '', Q3: '', Q4: '' },
      });
    } 
    }, [selectedDepartment, actionPlans]);
  

  
  const handleAddDataPoint = () => {
    const selectedOption = dataPointOptions.find((option) => option.value === selectedDataPoint);
    if (selectedOption && !dataPoints.includes(selectedOption.value)) {
      setDataPoints([...dataPoints, selectedOption.value]);
    }
    setSelectedDataPoint('');
  };

  const handleRemoveDataPoint = (index) => {
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  const handleCellChange = (category, quarter, value) => {
    setTableData({
      ...tableData,
      [category]: { ...tableData[category], [quarter]: value },
    });
  };

  // Save function
  const handleSave = async () => {
  try {
    if (!actionPlanName.trim() || !selectedMatrixType || dataPoints.length === 0) {
      enqueueSnackbar('Please complete all required fields.', { variant: 'warning' });
      return;
    }   
  
    const data = {
      name: actionPlanName,
      matrixType: selectedMatrixType,
      dataPoints,
      tableData,
    };

    setActionPlans((prevPlans) => ({
      ...prevPlans,
      [selectedDepartment]: data,
    }));

    await savePlanRequest.executeWithData({
      ...data,
      company: selectedClient,
      department: selectedDepartment,
      year: selectedYear,
    });

    setActionPlanName('');
    setSelectedMatrixType('');
    setDataPoints([]);
    setTableData({
      Outcome: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Role: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Dependency: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Funding: { Q1: '', Q2: '', Q3: '', Q4: '' },
    });

    enqueueSnackbar('Action Plan saved successfully.', { variant: 'success' });
  } catch (error) {
    console.error("Error saving action plan:", error);
    enqueueSnackbar('Failed to save Action Plan.', { variant: 'error' });
  }
};

// Load on department change
useEffect(() => {
  if (selectedDepartment && actionPlans[selectedDepartment]) {
    const { name, matrixType, dataPoints, tableData } = actionPlans[selectedDepartment];

    setActionPlanName(name || '');
    setSelectedMatrixType(matrixType || '');
    setDataPoints(dataPoints || []);
    setTableData(tableData || {
      Outcome: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Role: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Dependency: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Funding: { Q1: '', Q2: '', Q3: '', Q4: '' },
    });
  } else {
    setActionPlanName('');
    setSelectedMatrixType('');
    setDataPoints([]);
    setTableData({
      Outcome: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Role: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Dependency: { Q1: '', Q2: '', Q3: '', Q4: '' },
      Funding: { Q1: '', Q2: '', Q3: '', Q4: '' },
    });
  }
}, [selectedDepartment, actionPlans]);

  
  

  return (
    <Shell heading="Action Plan">
      <Stack spacing={3} sx={{ marginBottom: '50px' }}>
  
        <TextField
          fullWidth
          label="Action Plan Name"
          value={actionPlanName}
          onChange={(e) => setActionPlanName(e.target.value)}
          placeholder="Enter Action Plan Name"
        />

        {/* Selectors */}
        <Stack direction="row" spacing={3}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="company-label">Company</InputLabel>
              <Select
                labelId="company-label"
                id="company-select"
                value={selectedClient}
                label="Company"
                onChange={(e) => setSelectedClient(e.target.value)}
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
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
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                id="year-select"
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {[2023, 2024, 2025].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Stack direction="row" spacing={3}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="matrix-type-label">Matrix Type</InputLabel>
              <Select
                labelId="matrix-type-label"
                id="matrix-type-select"
                value={selectedMatrixType}
                label="Matrix Type"
                onChange={(e) => setSelectedMatrixType(e.target.value)}
              >
                <MenuItem value="highMatrix">High Matrix</MenuItem>
                <MenuItem value="lowMatrix">Low Matrix</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="data-point-label">Data Point</InputLabel>
              <Select
                labelId="data-point-label"
                id="data-point-select"
                value={selectedDataPoint}
                label="Data Point"
                onChange={(e) => setSelectedDataPoint(e.target.value)}
               >
               <MenuItem value="" disabled>Select Data Point</MenuItem>
                {dataPointOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>))}
             </Select>
             </FormControl>
             </Box>

          <Button
            variant="outlined"
            onClick={handleAddDataPoint}
            startIcon={<Add />}
            disabled={!selectedDataPoint}
          >
            Add Data Point
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" mt={2}>
          {dataPoints.map((dataPoint, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '5px 10px',
                margin: '5px',
              }}
            >
              <Typography>{dataPoint}</Typography>
              <IconButton onClick={() => handleRemoveDataPoint(index)} size="small" sx={{ ml: 1 }}>
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Stack>

     {/* Table */}
{clientsRequest.loading || assessmentsRequest.loading ? (
  <Loading />
) : (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          {quarters.map((quarter) => (
            <TableCell key={quarter} align="center">
              {quarter}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(tableData).map((category) => (
          <TableRow key={category}>
            <TableCell component="th" scope="row">
              {category}
            </TableCell>
            {quarters.map((quarter) => (
              <TableCell key={quarter} align="center">
                <TextField
                  multiline // Enables multiple lines of text
                  rows={2} // Sets the initial visible row count
                  value={tableData[category][quarter]}
                  onChange={(e) => handleCellChange(category, quarter, e.target.value)}
                  placeholder={`Enter ${category} for ${quarter}`}
                  fullWidth // Ensures the text field takes up full cell width
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)}

      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Shell>
  );
};
