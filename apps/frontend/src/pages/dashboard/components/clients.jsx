import React, { Fragment, useEffect, useState } from 'react';
import {
  Avatar,
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  IconButton,
  Container,
  Modal,
  Button,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Colours } from '../../../colours';
import { useAxios } from '../../../hooks/axios';
import { Loading } from '../../../components/loading';
import { useHistory } from 'react-router-dom';

const CLIENTS_TO_DISPLAY = 4;

const styles = {
  tableRowText: {
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  tableCell: {
    borderBottom: 'none',
  },
  tableHeader: {
    fontSize: '12px',
    color: Colours.darkGrey,
    padding: '0 15px',
    width: '120px',
    textAlign: 'center',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
};

export const Clients = ({ state, dispatch, links }) => {
  const [step, setStep] = useState(1);
  const { push } = useHistory();
  const [open, setOpen] = React.useState(false);
  const headings = ['', 'Company Name', 'Date Added', 'Status', 'Email'];
  const departmentHeadings = [
    '',
    'Department Name',
    'Date Added',
    'Employees',
    'Completed',
  ];
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const { executeWithParameters, response, error, loading } = useAxios({
    url: '/questionnaires/send/',
    method: 'get',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch({ type: 'client', payload: state.clients[0] });
  }, []);

  useEffect(() => {
    if (response && !error) {
      handleClose();
      push(`/generate-link`, [
        {
          companyID: response.companyId,
          departmentID: response.departmentId,
          questionnaireId: response.questionnaireId,
        },
      ]);
    }
  }, [response, error]);

  const getBackgroundColor = (row) => {
    if (state.selectedClient && state.selectedClient.id === row.id)
      return Colours.blue;
    return 'white';
  };

  const getDepartmentBackgroundColor = (row) => {
    if (selectedDepartment && selectedDepartment.id === row.id)
      return Colours.blue;
    return 'white';
  };

  // return only 4 clients to display at a time
  const getClients = () => {
    if (!state.clients) return;

    const tempClients = state.clients
      .map((item) => {
        const eligibleDepartments = getDepartmentsForSecondQuestionnaire(
          item.departments
        );
        if (eligibleDepartments.length > 0) return item;
      })
      .filter((item) => typeof item !== 'undefined');

    const result = [];

    let i = (step - 1) * CLIENTS_TO_DISPLAY;
    let count = 0;

    while (count < CLIENTS_TO_DISPLAY && i < tempClients.length) {
      result.push(tempClients[i]);
      i++;
      count++;
    }

    return result;
  };

  const getDepartmentsForSecondQuestionnaire = (departments) => {
    return departments
      .map((item) => {
        if ('completedQuestionnaires' in item) {
          if (
            1 in item.completedQuestionnaires &&
            2 in item.completedQuestionnaires
          ) {
            const firstCount = item.completedQuestionnaires[1];
            const secondCount = item.completedQuestionnaires[2];
            if (firstCount > secondCount) return item;
          } else if (1 in item.completedQuestionnaires) return item;
        }
      })
      .filter((item) => typeof item !== 'undefined');
  };

  const renderDepartmentsClients = () => {
    if (
      typeof state.selectedClient === 'undefined' ||
      Object.keys(state.selectedClient || {}).length === 0
    )
      return <TableBody></TableBody>;
    return (
      <TableBody>
        {getDepartmentsForSecondQuestionnaire(
          state.selectedClient.departments
        ).map((row, index) => (
          <TableRow
            key={row.name + index}
            component={Container}
            sx={{
              backgroundColor: getDepartmentBackgroundColor(row),
              cursor: 'pointer',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              margin: '0 !important',
              padding: '0 !important',
              borderRadius: '15px !important',
            }}
            onClick={() => {
              setSelectedDepartment(row);
            }}
          >
            <TableCell
              sx={{
                ...styles.tableCell,
                width: '70px',
                borderBottomLeftRadius: '15px',
                borderTopLeftRadius: '15px',
              }}
            >
              <Avatar alt="Company image">{row.name[0]}</Avatar>
            </TableCell>
            <TableCell
              sx={{
                ...styles.tableCell,
              }}
            >
              <Typography
                sx={{
                  ...styles.tableRowText,
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                {row.name}
              </Typography>
            </TableCell>
            <TableCell sx={{ ...styles.tableCell }}>
              <Typography sx={{ ...styles.tableRowText }}>
                {new Date(row.created).toLocaleDateString()}
              </Typography>
            </TableCell>
            <TableCell sx={{ ...styles.tableCell }}>
              <Typography sx={{ ...styles.tableRowText }}>
                {row.employeeSize}
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                ...styles.tableCell,
                borderBottomRightRadius: '15px',
                borderTopRightRadius: '15px',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ ...styles.tableRowText }}>
                {Object.keys(row.completedQuestionnaires || {}).length}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const renderClients = () => {
    if (!state.clients) return <TableBody></TableBody>;
    return (
      <TableBody>
        {getClients().map((row, index) => (
          <TableRow
            key={row.name + index}
            component={Container}
            sx={{
              backgroundColor: getBackgroundColor(row),
              cursor: 'pointer',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
              margin: '0 !important',
              padding: '0 !important',
              borderRadius: '15px !important',
            }}
            onClick={() => {
              dispatch({ type: 'client', payload: row });
              handleOpen();
            }}
          >
            <TableCell
              sx={{
                ...styles.tableCell,
                width: '70px',
                borderBottomLeftRadius: '15px',
                borderTopLeftRadius: '15px',
              }}
            >
              <Avatar alt="Company image" src={row.logo} />
            </TableCell>
            <TableCell
              sx={{
                ...styles.tableCell,
              }}
            >
              <Typography
                sx={{
                  ...styles.tableRowText,
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                {row.name}
              </Typography>
            </TableCell>
            <TableCell sx={{ ...styles.tableCell }}>
              <Typography sx={{ ...styles.tableRowText }}>
                {new Date(row.created).toLocaleDateString()}
              </Typography>
            </TableCell>
            <TableCell sx={{ ...styles.tableCell }}>
              <Typography sx={{ ...styles.tableRowText }}>
                {row.status}
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                ...styles.tableCell,
                borderBottomRightRadius: '15px',
                borderTopRightRadius: '15px',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ ...styles.tableRowText }}>
                {row.hrConsultantEmail}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TableContainer
          component={Container}
          sx={{
            margin: '0 !important',
            padding: '0 !important',
            overflowX: 'unset',
            minHeight: '350px',
            ...styles.modal,
            width: 'auto',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            Send Second Questionnaire
          </Typography>
          {loading && (
            <Loading
              textSx={{ fontSize: '14px' }}
              loadingSx={{
                width: '100px !important',
                height: '100px !important',
              }}
              containerSx={{ marginLeft: '22%', marginTop: '10%' }}
            />
          )}
          {!loading && (
            <Box
              sx={{
                maxHeight: '300px',
                minHeight: '200px',
                overflowY: 'scroll',
              }}
            >
              <Table
                sx={{
                  minWidth: 500,
                  borderCollapse: 'separate',
                  borderSpacing: '0px 10px',
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {departmentHeadings.map((heading, index) => (
                      <TableCell
                        key={heading + index}
                        sx={{
                          ...styles.tableCell,
                          ...styles.tableHeader,
                          textDecoration:
                            heading === 'See all' ? 'underline' : undefined,
                          width: heading === 'See all' ? '70px' : undefined,
                        }}
                      >
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {renderDepartmentsClients()}
              </Table>
            </Box>
          )}
          <Stack direction="row" justifyContent="right" spacing={3}>
            <Button
              variant="outlined"
              sx={{ marginTop: '20px', width: '100px' }}
              onClick={() => {
                setSelectedDepartment(null);
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={selectedDepartment === null || loading}
              sx={{ marginTop: '20px', width: '100px' }}
              onClick={() => {
                executeWithParameters({
                  url: `/questionnaires/send/${selectedDepartment.id}`,
                  method: 'get',
                })();
              }}
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </Stack>
        </TableContainer>
      </Modal>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 !important',
          padding: '0 !important',
        }}
      >
        <TableContainer
          component={Container}
          sx={{
            margin: '0 !important',
            padding: '0 !important',
            overflowX: 'unset',
            minHeight: '350px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '600',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            Send Second Questionnaire
          </Typography>
          <Table
            sx={{
              minWidth: 500,
              borderCollapse: 'separate',
              borderSpacing: '0px 10px',
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {headings.map((heading, index) => (
                  <TableCell
                    key={heading + index}
                    sx={{
                      ...styles.tableCell,
                      ...styles.tableHeader,
                      textDecoration:
                        heading === 'See all' ? 'underline' : undefined,
                      width: heading === 'See all' ? '70px' : undefined,
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {renderClients()}
          </Table>
        </TableContainer>
        <Container>
          <IconButton
            onClick={() => setStep((prev) => prev - 1)}
            disabled={step === 1}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={() => setStep((prev) => prev + 1)}
            disabled={getClients().length < CLIENTS_TO_DISPLAY}
          >
            <ArrowForward />
          </IconButton>
        </Container>
      </Container>
    </>
  );
};
