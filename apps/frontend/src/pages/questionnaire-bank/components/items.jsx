import React, { Fragment } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { CustomTable } from '../../../components/table';
import { CustomTableRow } from './table-row';

export const ClientsTable = ({ clients, setOpenMessage }) => {
  const changePadding = useMediaQuery('(max-width:560px)');

  return (
    <Fragment>
      <CustomTable
        headings={['Name', 'Question Count', 'Delete']}
        headCellSx={{
          fontSize: changePadding ? '9px' : '12px',
          color: 'grey !important',
          fontWeight: 'bold !important',
          padding: changePadding ? '8px' : '16px',
        }}
      >
        {clients &&
          clients.map((row, index) => (
            <CustomTableRow
              key={row.id}
              row={row}
              index={index}
              setOpenMessage={setOpenMessage}
            />
          ))}
      </CustomTable>
    </Fragment>
  );
};
