import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  TableCell,
  Typography,
  TableRow,
  IconButton,
  useMediaQuery,
  Popover,
} from '@mui/material';
import { SelectedBlackIcon } from '../../../assets/icons/selected-black';
import { UnselectedIcon } from '../../../assets/icons/unselected';
import { DownloadBlueIcon } from '../../../assets/icons/download-blue';
import DownloadSelected from '../../../assets/icons/download-selected.svg';
import { CSVLink } from 'react-csv';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import DeleteIcon from '../../../assets/icons/delete-icon.svg';
import SpreadsheetIcon from '../../../assets/icons/download_xlsx.svg';
import { useAxios } from '../../../hooks/axios.js';

const styles = {
  tableRowText: {
    fontSize: '9px',
    fontWeight: '500',
    lineHeight: '10px',
  },
  tableHeader: {
    fontWeight: '500',
    fontSize: '8px',
    color: 'rgba(137, 137, 137, 1)',
    lineHeight: '10px',
  },
};

export const CustomTableRow = ({ row, index, onSelect, setOpenMessage }) => {
  const { push } = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const changePadding = useMediaQuery('(max-width:560px)');

  return (
    <TableRow
      onClick={() => onSelect()}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        marginBottom: '7%',
        cursor: 'pointer',
      }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          'td:first-of-type,': {
            borderRadius: '15px 0 0 15px',
          },
          padding: changePadding ? '8px' : '16px',
        }}
      >
        <Typography>{index}</Typography>
      </TableCell>
      <TableCell sx={{ padding: changePadding ? '8px' : '16px' }}>
        <Typography
          sx={{
            ...styles.tableRowText,
            fontWeight: 'bold',
            fontSize: changePadding ? '9px' : '12px',
          }}
        >
          {row.question}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          'td:last-of-type,': {
            borderRadius: '0 15px 15px 0 ',
          },
          padding: changePadding ? '8px' : '16px',
        }}
      >
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            setOpenMessage(true, row);
          }}
        >
          <Box component="img" src={DeleteIcon} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
