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
  const [dropdownOptions, setDropdownOptions] = useState([]); // Dropdown options
  const [selectedDataPoint, setSelectedDataPoint] = useState('');

  // Axios Hooks
  const clientsRequest = useAxios({ url: '/companies', method: 'get' });
  const assessmentsRequest = useAxios({ url: '/assessments/departments/{departmentId}', method: 'get' });

  // Function to transform highMatrix into dropdown options
  const transformHighMatrixForDropdown = (matrix) => {
    if (!Array.isArray(matrix)) return []; // Ensure input is an array

    return matrix.flatMap((series, seriesIndex) =>
      series.data.map((point, pointIndex) => {
        const x = point[0]?.toFixed(2) || 'N/A'; // Format x-axis value
        const y = point[1]?.toFixed(2) || 'N/A'; // Format y-axis value
        const name = series.name || `Series ${seriesIndex + 1}`; // Use series name or fallback
        return {
          label: `${name} - Point ${pointIndex + 1} (x: ${x}, y: ${y})`,
          value: `${seriesIndex}-${pointIndex}`, // Ensure unique value
        };
      })
    );
  };

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
        setSelectedDepartment(firstCompany.departments?.[0]?.id || '');
      }
    }
  }, [clientsRequest.response, clientsRequest.error]);

  // Update Departments and Default Department when Client Changes
  useEffect(() => {
    const client = clients.find((client) => client.id === selectedClient);
    if (client) {
      setDepartments(client.departments || []);
      setSelectedDepartment(client.departments?.[0]?.id || '');
    }
  }, [selectedClient, clients]);

  // Fetch Assessments for Selected Department
  useEffect(() => {
    if (selectedDepartment) {
      assessmentsRequest.executeWithParameters({
        url: `/assessments/departments/${selectedDepartment}`,
      });
    }
  }, [selectedDepartment, assessmentsRequest]);

  // Update HighMatrix Data and Populate Dropdown
  useEffect(() => {
    if (assessmentsRequest.response && !assessmentsRequest.error) {
      const { highMatrix: matrix } = assessmentsRequest.response;

      if (Array.isArray(matrix)) {
        setHighMatrix(matrix);

        // Generate dropdown options
        const options = transformHighMatrixForDropdown(matrix);
        setDropdownOptions(options);
      } else {
        setHighMatrix([]);
        setDropdownOptions([]);
      }
    }
  }, [assessmentsRequest.response, assessmentsRequest.error]);

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
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {dropdownOptions.map((option, index) => (
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
      ) : (
        <Box>No data available</Box>
      )}
    </Shell>
  );
};
