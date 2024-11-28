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
  const [selectedMatrixType, setSelectedMatrixType] = useState('highMatrix');
  const [dataPointOptions, setDataPointOptions] = useState([]);
  const [selectedDataPoint, setSelectedDataPoint] = useState('');
  const [tableData, setTableData] = useState([
    { outcome: '', role: '', dependency: '', funding: '' },
  ]);

  const clientsRequest = useAxios({ url: '/companies', method: 'get' });
  const assessmentsRequest = useAxios({ url: `/assessments/departments/${selectedDepartment}`, method: 'get' });

  const transformMatrixForDropdown = (matrix) => {
    if (!Array.isArray(matrix)) return [];
    return matrix.map((entry, index) => ({
      label: entry.name || `Data Point ${index + 1}`,
      value: entry.name || `Data Point ${index + 1}`,
    }));
  };

  useEffect(() => {
    clientsRequest.execute();
  }, []);

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
      setHighMatrix(Array.isArray(highMatrix) ? highMatrix : []);
      setLowMatrix(Array.isArray(lowMatrix) ? lowMatrix : []);
    }
  }, [assessmentsRequest.response]);

  useEffect(() => {
    const matrix = selectedMatrixType === 'highMatrix' ? highMatrix : lowMatrix;
    const options = transformMatrixForDropdown(matrix);
    setDataPointOptions(options);
    setSelectedDataPoint('');
  }, [selectedMatrixType, highMatrix, lowMatrix]);

  const handleCellChange = (index, field, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };

  const handleSave = () => {
    console.log('Saved Data:', tableData);
    // save logic will be here
  };

  return (
    <Shell heading="Action Plan">
      <Stack direction="row" spacing={3} sx={{ marginBottom: '50px' }}>
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

      {clientsRequest.loading || assessmentsRequest.loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
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
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={row.outcome}
                      onChange={(e) => handleCellChange(index, 'outcome', e.target.value)}
                      placeholder="Enter outcome"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={row.role}
                      onChange={(e) => handleCellChange(index, 'role', e.target.value)}
                      placeholder="Enter role"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={row.dependency}
                      onChange={(e) => handleCellChange(index, 'dependency', e.target.value)}
                      placeholder="Enter dependency"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={row.funding}
                      onChange={(e) => handleCellChange(index, 'funding', e.target.value)}
                      placeholder="Enter funding"
                    />
                  </TableCell>
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
