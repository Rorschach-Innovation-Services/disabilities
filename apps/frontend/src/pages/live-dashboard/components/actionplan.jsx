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
  TextField,
  Button,
} from '@mui/material';
import { Shell } from '../../../components/shell';
import { useAxios } from '../../../hooks/axios';

export const ActionPlan = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [matrixType, setMatrixType] = useState('highMatrix'); // Default matrix type
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedDataPoint, setSelectedDataPoint] = useState('');

  const clientsRequest = useAxios({ url: '/companies', method: 'get' });
  const assessmentsRequest = useAxios({ url: `/assessments/departments/{departmentId}`, method: 'get' });

  useEffect(() => {
    clientsRequest.execute();
  }, [clientsRequest]);

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
  }, [clientsRequest.response, clientsRequest.error]);

  useEffect(() => {
    const client = clients.find((client) => client.id === selectedClient);
    if (client) {
      setDepartments(client.departments || []);
      setSelectedDepartment(client.departments?.[0]?.id || '');
    }
  }, [selectedClient, clients]);

  useEffect(() => {
    if (selectedDepartment) {
      assessmentsRequest.executeWithParameters({
        url: `/assessments/departments/${selectedDepartment}`,
      });
    }
  }, [selectedDepartment, assessmentsRequest]);

  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      const { highMatrix = [], lowMatrix = [] } = assessmentsRequest.response;

      const matrix = matrixType === 'highMatrix' ? highMatrix : lowMatrix;

      const options = matrix.map((dataPoint, index) => ({
        label: dataPoint.name || `Point ${index + 1}`,
        value: index,
      }));

      setDropdownOptions(options);
      setSelectedDataPoint('');
    }
  }, [assessmentsRequest.response, assessmentsRequest.error, matrixType]);

  const handleSave = () => {
    // Add your save logic here
    console.log('Save button clicked');
  };

  return (
    <Shell heading="Action Plan">
      <Stack direction="row" spacing={3} sx={{ marginBottom: '50px' }}>
        {/* Client Select */}
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="company-label">Company</InputLabel>
            <Select
              labelId="company-label"
              value={selectedClient}
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
              value={selectedDepartment}
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
              value={matrixType}
              onChange={(e) => setMatrixType(e.target.value)}
            >
              <MenuItem value="highMatrix">High Matrix</MenuItem>
              <MenuItem value="lowMatrix">Low Matrix</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Data Point Select */}
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="data-point-label">Data Point</InputLabel>
            <Select
              labelId="data-point-label"
              value={selectedDataPoint}
              onChange={(e) => setSelectedDataPoint(e.target.value)}
            >
              <MenuItem value="">
                <em>Choose Point</em>
              </MenuItem>
              {dropdownOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {/* Empty Table with 4 Rows */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Outcome</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Dependency</TableCell>
              <TableCell>Funding</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 1 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2} // Initial rows
                    placeholder="Enter outcome"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Enter role"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Enter dependency"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Enter funding"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Save Button */}
      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Shell>
  );
};
