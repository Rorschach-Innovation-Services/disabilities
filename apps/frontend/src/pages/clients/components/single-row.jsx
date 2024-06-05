import React, { useEffect, useState } from 'react';
import {
  Stack,
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
import { CSVLink } from 'react-csv';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import DeleteIcon from '../../../assets/icons/delete-icon.svg';
import SpreadsheetIcon from '../../../assets/icons/download_xlsx.svg';
import PDFIcon from '../../../assets/icons/download_pdf.svg';
import { useAxios } from '../../../hooks/axios.js';

const styles = {
  tableRowText: {
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '10px',
  },
  tableHeader: {
    fontWeight: '500',
    fontSize: '12px',
    color: 'rgba(137, 137, 137, 1)',
    lineHeight: '10px',
  },
};

export const CustomTableSingleRow = ({
  assessment,
  toggleSelection,
  setErrorInfo,
  selected,
  setOpenMessage,
  setSelected,
}) => {
  const { push } = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const changePadding = useMediaQuery('(max-width:560px)');
  const { response, createRequest, error, loading } = useAxios({
    url: '/departments/group-report',
    method: 'get',
  });

  useEffect(() => {
    if (response && !error) {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.setAttribute('style', 'display:none');
      link.href = url;
      link.setAttribute('download', `${assessment.name}.pdf`); //or any other extension
      document.body.appendChild(link);
      link.click();
    }
    if (error) {
      const count = setPeopleCount();
      const message =
        count === 0
          ? 'There are no assessments completed by employees within this department.'
          : 'There has been an error trying to download the PDF.';
      setErrorInfo({ message, count });
    }
  }, [response, error]);

  const setPeopleCount = () => {
    const seen = [];
    const result = [];
    for (const a of assessment.assessments) {
      if (seen.includes(a.employee)) continue;
      if (assessment.employees.includes(a.employee)) {
        result.push(a);
        seen.push(a.employee);
      }
    }
    return result.length;
  };

  return (
    <TableRow
      key={assessment.id}
      onClick={() => push(`/departments/${assessment.id}`)}
      sx={{
        backgroundColor: `${
          selected.includes(assessment.id) ? 'primary.main' : 'white'
        }`,
        color: `${selected.includes(assessment.id) ? 'white' : 'black'}`,
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
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            toggleSelection(assessment);
          }}
        >
          {selected.includes(assessment.id) ? (
            <SelectedBlackIcon />
          ) : (
            <UnselectedIcon />
          )}
        </IconButton>
      </TableCell>
      <TableCell
        sx={{
          padding: changePadding ? '8px' : '16px',
        }}
      >
        <Typography
          sx={{
            ...styles.tableRowText,
          }}
        >
          {assessment.name}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          padding: changePadding ? '8px' : '16px',
        }}
      >
        <Typography sx={{ ...styles.tableRowText }}>
          {assessment.lastAssessmentDate !== 'none'
            ? format(new Date(assessment.lastAssessmentDate), 'dd/MM/yyyy')
            : assessment.lastAssessmentDate}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          padding: changePadding ? '8px' : '16px',
        }}
      >
        <Typography sx={{ ...styles.tableRowText }}>
          {setPeopleCount()}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          padding: changePadding ? '8px' : '16px',
        }}
      >
        {loading ? (
          <Typography sx={{ ...styles.tableRowText }}>
            Downloading...
          </Typography>
        ) : (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              setAnchorEl(event.currentTarget);
            }}
          >
            <Box
              sx={{
                width: '54px',
                height: '38px',
                backgroundColor: '#F7F7F7',
                borderRadius: '10px',
              }}
            >
              <Box component="img" src={PDFIcon} sx={{ mt: '6px' }} />
            </Box>
          </IconButton>
        )}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={(event) => {
            event.stopPropagation();
            setAnchorEl(null);
          }}
          elevation={2}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '.MuiPaper-root': {
              width: '190px',
              height: '86px',
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '15px',
              textAlign: 'center',
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ px: '20px' }}
          >
            <Box>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  setAnchorEl(null);
                }}
                sx={{
                  marginBottom: '-6px',
                  marginTop: '7px',
                }}
              >
                <CSVLink
                  data={assessment.departmentFile}
                  filename={`${assessment.name}.csv`}
                >
                  <Box
                    sx={{
                      width: '54px',
                      height: '38px',
                      backgroundColor: '#F0F3FF',
                      borderRadius: '10px',
                    }}
                  >
                    <Box component="img" src={SpreadsheetIcon} />
                  </Box>
                </CSVLink>
              </IconButton>
              <Typography
                sx={{
                  fontSize: '9px',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Group Download
              </Typography>
            </Box>
            <Box sx={{ pt: '5px' }}>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  setAnchorEl(null);
                  const request = createRequest({
                    url: `/departments/group-report/${assessment.id}`,
                    method: 'get',
                    options: { responseType: 'blob' },
                  });
                  request();
                }}
                sx={{
                  marginBottom: '-6px',
                }}
              >
                <Box
                  sx={{
                    width: '54px',
                    height: '38px',
                    backgroundColor: '#F7F7F7',
                    borderRadius: '10px',
                  }}
                >
                  <Box component="img" src={PDFIcon} sx={{ mt: '6px' }} />
                </Box>
              </IconButton>
              <Typography
                sx={{
                  fontSize: '9px',
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Download
              </Typography>
            </Box>
          </Stack>
        </Popover>
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
            setOpenMessage(true);
            setSelected((prev) => [...prev, assessment.id]);
          }}
        >
          <Box component="img" src={DeleteIcon} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
