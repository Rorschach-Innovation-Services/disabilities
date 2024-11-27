import React, { useState, useEffect } from 'react';
import {
  Stack,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
import { Shell } from '../../../components/shell';
import { useAxios } from '../../../hooks/axios';
import { Loading } from '../../../components/loading';

export const ActionPlan = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [highMatrix, setHighMatrix] = useState([]);
  const [lowMatrix, setLowMatrix] = useState([]);
  const [selectedMatrixType, setSelectedMatrixType] = useState('highMatrix'); // Default to highMatrix
  const [dataPointOptions, setDataPointOptions] = useState([]); // Dropdown options
  const [selectedDataPoint, setSelectedDataPoint] = useState('');

  // Axios Hooks
  const clientsRequest = useAxios({ url: '/companies', method: 'get' });
  const assessmentsRequest = useAxios({ url: `/assessments/departments/${selectedDepartment}`, method: 'get' });

  // Function to transform a matrix into dropdown options
  const transformMatrixForDropdown = (matrix) => {
    if (!Array.isArray(matrix)) return [];
    return matrix.map((entry, index) => ({
      label: entry.name || `Data Point ${index + 1}`,
      value: entry.name || `Data Point ${index + 1}`,
    }));
  };

  // Fetch All Companies
  useEffect(() => {
    clientsRequest.execute();
  }, []); // Run once on component mount

  // Set Initial Clients and Departments
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

  // Update Departments and Default Department when Client Changes
  useEffect(() => {
    if (selectedClient) {
      const client = clients.find((client) => client.id === selectedClient);
      if (client) {
        setDepartments(client.departments || []);
        setSelectedDepartment(client.departments?.[0]?.id || '');
      }
    }
  }, [selectedClient]);

  // Fetch Assessments for Selected Department
  useEffect(() => {
    if (selectedDepartment) {
      assessmentsRequest.execute();
    }
  }, [selectedDepartment]);

  // Update HighMatrix and LowMatrix Data
  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      const { highMatrix, lowMatrix } = assessmentsRequest.response;
      setHighMatrix(Array.isArray(highMatrix) ? highMatrix : []);
      setLowMatrix(Array.isArray(lowMatrix) ? lowMatrix : []);
    }
  }, [assessmentsRequest.response]);

  // Update Data Point Options Based on Selected Matrix Type
  useEffect(() => {
    const matrix = selectedMatrixType === 'highMatrix' ? highMatrix : lowMatrix;
    const options = transformMatrixForDropdown(matrix);
    setDataPointOptions(options);

    // Clear selected data point when matrix type changes
    setSelectedDataPoint('');
  }, [selectedMatrixType, highMatrix, lowMatrix]); // Recalculate when matrix type or matrix data changes

  return (
    <Shell heading="Action Plan">
      <Stack direction="row" spacing={3} sx={{ marginBottom: '50px' }}>
        {/* Client Select */}
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

        {/* Department Select */}
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

        {/* Matrix Type Select */}
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

        {/* Data Point Select */}
        <Box sx={{ minWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="data-point-label">Data Point</InputLabel>
            <Select
              labelId="data-point-label"
              id="data-point-select"
              value={selectedDataPoint}
              label="Data Point"
              onChange={(e) => setSelectedDataPoint(e.target.value)}
              displayEmpty
            >
              
              {dataPointOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {/* Loading Indicator */}
      {clientsRequest.loading || assessmentsRequest.loading ? (
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{
            width: '250px !important',
            height: '250px !important',
          }}
          containerSx={{
            margin: '10% auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : null}
    </Shell>
  );
};
