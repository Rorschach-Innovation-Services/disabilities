import React, { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const ActionPlanTable = () => {
  const initialData = [
    {
      outcome: ['', '', '', ''],
      role: ['', '', '', ''],
      dependency: ['', '', '', ''],
      funding: ['', '', '', ''],
    },
  ];

  const [data, setData] = useState(initialData);

  const handleChange = (field, quarter, value) => {
    const newData = [...data];
    newData[0][field][quarter] = value; // Update the first row
    setData(newData);
  };

  const handleSave = () => {
    // Logic to save to database goes here
    console.log("Saving data...", data);
  };

  const handlePrint = () => {
    window.print(); // Simple print functionality
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Q1</TableCell>
              <TableCell>Q2</TableCell>
              <TableCell>Q3</TableCell>
              <TableCell>Q4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {['outcome', 'role', 'dependency', 'funding'].map((field) => (
              <TableRow key={field}>
                <TableCell>{field.charAt(0).toUpperCase() + field.slice(1)}</TableCell>
                {[0, 1, 2, 3].map((quarter) => (
                  <TableCell key={`${field}-q${quarter + 1}`}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      onChange={(e) => handleChange(field, quarter, e.target.value)}
                      InputProps={{
                        style: { fontSize: '1rem', height: '2.5rem' },
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleSave} style={{ marginTop: '20px' }}>
        Save
      </Button>
      <Button variant="contained" onClick={handlePrint} style={{ marginLeft: '10px', marginTop: '20px' }}>
        Print
      </Button>
    </div>
  );
};

export default ActionPlanTable;
