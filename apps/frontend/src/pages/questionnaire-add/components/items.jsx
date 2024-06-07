import React, { Fragment } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { CustomTable } from '../../../components/table';
import { CustomTableRow } from './table-row';

export const ClientsTable = ({ clients, setOpenMessage, onSelect }) => {
  const changePadding = useMediaQuery('(max-width:560px)');

  return (
    <CustomTable
      headings={['Number', 'Question', 'Delete']}
      headCellSx={{
        fontSize: changePadding ? '9px' : '12px',
        color: 'grey !important',
        fontWeight: 'bold !important',
        padding: changePadding ? '8px' : '16px',
      }}
      tableContainerSx={{
        maxHeight: '400px',
        overflowY: 'scroll',
      }}
    >
      {clients &&
        clients.map((row, index) => (
          <CustomTableRow
            key={row.id}
            row={row}
            index={index + 1}
            onSelect={() => onSelect({ ...row })}
            setOpenMessage={setOpenMessage}
          />
        ))}
    </CustomTable>
  );
};
