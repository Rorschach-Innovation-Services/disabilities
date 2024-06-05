import React, { Fragment } from 'react';
import { useMediaQuery } from '@mui/material';
import { CustomTable } from '../../../components/table';
import { CustomTableEmployeeRow } from './employee-row';

export const EmployeeTable = ({
  selected,
  toggleSelection,
  employees,
  setOpenMessage,
  setSelected,
}) => {
  const changePadding = useMediaQuery('(max-width:560px)');
  return (
    <Fragment>
      <CustomTable
        headings={[
          'Select',
          'Employee name',
          'Date of last assessment',
          'Download PDF',
          'Delete',
        ]}
        headCellSx={{
          fontSize: changePadding ? '9px' : '12px',
          color: 'grey !important',
          fontWeight: 'bold !important',
          padding: changePadding ? '8px' : '16px',
        }}
      >
        {employees &&
          employees.map((employee) => (
            <CustomTableEmployeeRow
              key={employee.id}
              employee={employee}
              toggleSelection={toggleSelection}
              selected={selected}
              setOpenMessage={setOpenMessage}
              setSelected={setSelected}
            />
          ))}
      </CustomTable>
    </Fragment>
  );
};
