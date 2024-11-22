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
  Paper,
} from '@mui/material';
import { Shell } from '../../../components/shell';
import { useAxios } from '../../../hooks/axios';
import { Loading } from '../../../components/loading';

export const ActionPlan = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [highMatrixData, setHighMatrixData] = useState([]);
  const [filteredDataPoints, setFilteredDataPoints] = useState([]);
  const [selectedDataPointName, setSelectedDataPointName] = useState('');

  // Axios Hooks
  const clientsRequest = useAxios({ url: '/companies', method: 'get' });
  const assessmentsRequest = useAxios({ url: `/assessments/departments/{departmentId}`, method: 'get' });

  // Fetch All Companies
  useEffect(() => {
    clientsRequest.execute();
  }, [clientsRequest]);

  // Set Initial Clients and Departments
  useEffect(() => {
    if (clientsRequest.response && !clientsRequest.error) {
      const companies = clientsRequest.response.companies || [];
      if (companies.length > 0) {
        const [firstCompany] = companies;
        setClients(companies);
        setSelectedClient(firstCompany.id);
        setDepartments(firstCompany.departments || []);
        if (firstCompany.departments?.length > 0) {
          setSelectedDepartment(firstCompany.departments[0].id);
        } else {
          setSelectedDepartment(''); // Reset if no departments are available
        }
      }
    }
  }, [clientsRequest.response, clientsRequest.error]);

  // Update Departments and Default Department when Client Changes
  useEffect(() => {
    const client = clients.find((client) => client.id === selectedClient);
    if (client) {
      setDepartments(client.departments || []);
      if (client.departments?.length > 0) {
        setSelectedDepartment(client.departments[0].id); // Default to the first department
      } else {
        setSelectedDepartment(''); // Reset if no departments are available
      }
    }
  }, [selectedClient]);

  // Fetch Assessments for Selected Department
  useEffect(() => {
    if (selectedDepartment) {
      assessmentsRequest.executeWithParameters({
        url: `/assessments/departments/${selectedDepartment}`,
      });
    }
  }, [selectedDepartment, assessmentsRequest]);

  // Update HighMatrix Data and Filter Points
  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      const { highMatrix } = assessmentsRequest.response;
      if (highMatrix && Array.isArray(highMatrix)) {
        setHighMatrixData(highMatrix);
        // Extract and set unique names for dropdown
        const uniqueNames = [...new Set(highMatrix.map((dp) => dp.name || `Data Point ${dp.id || 'Unknown'}`))];
        setFilteredDataPoints(uniqueNames);
      } else {
        setHighMatrixData([]);
        setFilteredDataPoints([]);
      }
    }
  }, [assessmentsRequest.response, assessmentsRequest.error]);

  // Filter Data Points for Table Display
  const filteredData = selectedDataPointName
    ? highMatrixData.filter((dp) => dp.name === selectedDataPointName)
    : highMatrixData;

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

        {/* Data Point Select */}
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="data-point-label">Data Point</InputLabel>
            <Select
              labelId="data-point-label"
              id="data-point-select"
              value={selectedDataPointName}
              label="Data Point"
              onChange={(e) => setSelectedDataPointName(e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {filteredDataPoints.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {/* Loading and Table */}
      {clientsRequest.loading || assessmentsRequest.loading ? (
        <Loading textSx={{ fontSize: '25px' }} />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="filtered data table">
            <TableHead>
              <TableRow>
                <TableCell>Outcome</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Dependency</TableCell>
                <TableCell>Funding</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((dataPoint, index) => (
                  <TableRow key={index}>
                    <TableCell>{dataPoint.outcome || 'N/A'}</TableCell>
                    <TableCell>{dataPoint.role || 'N/A'}</TableCell>
                    <TableCell>{dataPoint.dependency || 'N/A'}</TableCell>
                    <TableCell>{dataPoint.funding || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Shell>
  );
};
