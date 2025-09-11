import React, { useEffect, useState, Fragment, useCallback } from 'react';
import {
  Typography,
  Grid,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Shell } from '../../components/shell';
import { useAxios } from '../../hooks/axios';
import { EmployeeTable } from './components/employee-table';
import { CustomMessage } from '../../components/message';
import { TopSection } from './components/top-section';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';

const EMPLOYEES_TO_DISPLAY = 5;

const styles = {
  actionButtons: {
    backgroundColor: 'black',
    color: 'white',
    textTransform: 'none',
    borderRadius: '10px',
    height: '30px',
    mt: '5px',
  },
  actionButtonText: {
    fontSize: '10px',
    fontWeight: '500',
    lineHeight: '11px',
  },
  text: {
    fontSize: '9px',
    fontWeight: '500',
    lineHeight: '10px',
  },
};

export const EmployeesPage = () => {
  const { departmentId } = useParams();
  const location = useLocation();
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [step, setStep] = useState(1);
  const { push } = useHistory();
  const [employees, setEmployees] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const { execute, response, error, loading } = useAxios({
    url: `/departments/${departmentId}`,
    method: 'get',
  });
  const deleteRequest = useAxios({
    url: '/employees',
    method: 'delete',
  });

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleForward = () => {
    setStep((prev) => prev + 1);
  };

  const getEmployees = () => {
    if (!response || !response.department.employees) return;

    const all = response.department.employees || [];
    const base = showOnlyCompleted
      ? all.filter((e) => e.lastAssessmentDate && e.lastAssessmentDate !== 'none')
      : all;

    const result = [];

    let i = (step - 1) * EMPLOYEES_TO_DISPLAY;
    let count = 0;

    while (count < EMPLOYEES_TO_DISPLAY && i < base.length) {
      result.push(base[i]);
      i++;
      count++;
    }

    setEmployees(result);
  };

  // Filter clients for the once searched for
  useEffect(() => {
    if (!response) return;
    if (search === '') return getEmployees();
    const all = response.department.employees || [];
    const base = showOnlyCompleted
      ? all.filter((e) => e.lastAssessmentDate && e.lastAssessmentDate !== 'none')
      : all;
    const result = base.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
    setEmployees(result);
  }, [search]);

  const setShowing = () => {
    if (search.length > 0) return employees.length;
    const all = response?.department?.employees || [];
    const base = showOnlyCompleted
      ? all.filter((e) => e.lastAssessmentDate && e.lastAssessmentDate !== 'none')
      : all;
    if (response && step * EMPLOYEES_TO_DISPLAY < base.length)
      return step * EMPLOYEES_TO_DISPLAY;
    else return base.length;
  };

  const toggleSelection = (row) => {
    if (selected.includes(row.id)) {
      const copy = selected.filter((id) => id !== row.id);
      setSelected(copy);
    } else {
      setSelected((prev) => [...prev, row.id]);
    }
  };

  useEffect(() => {
    execute();
  }, []);

  // Parse query parameter for completed filter
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search || '');
      setShowOnlyCompleted(params.get('completed') === '1');
    } catch {}
  }, [location.search]);

  useEffect(() => {
    if (deleteRequest.response && !deleteRequest.error) {
      setSelected([]);
      setOpenMessage(false);
    }
  }, [deleteRequest.response, deleteRequest.error]);

  useEffect(() => {
    if (deleteRequest.error || !deleteRequest.response) return;
    if (response) {
      window.location.reload();
    }
  }, [deleteRequest.response, deleteRequest.error]);

  // return only 4 employees to display at a time
  useEffect(() => {
    getEmployees();
  }, [step, response, error]);

  if (loading || !response)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          textAlign: 'center',
          transform: 'translateY(50%)',
        }}
      >
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{
            width: '250px !important',
            height: '250px !important',
          }}
          containerSx={{
            margin: 'auto',
            marginTop: '-100px',
            textAlign: 'center',
          }}
        />
      </Box>
    );

  return (
    <Shell
      heading={
        response
          ? `All Clients / ${response.department.company.name} / Employees`
          : ''
      }
      headingComponent={
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            marginTop: '-35px',
            marginBottom: '40px',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          <Link
            underline="hover"
            href="/clients"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'HK Grotesk',
              color: 'black',
            }}
          >
            All Clients
          </Link>
          <Link
            underline="hover"
            href={response ? `/clients/${response.department.company.id}` : ''}
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'HK Grotesk',
              color: 'black',
            }}
          >
            {response ? response.department.company.name : ''}
          </Link>
          <Typography
            underline="hover"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'HK Grotesk',
              color: 'black',
            }}
          >
            Employees
          </Typography>
        </Breadcrumbs>
      }
      headingStyling={{
        marginTop: '-35px',
        marginBottom: '40px',
        fontSize: '16px',
        fontWeight: 600,
      }}
      childrenContainerStyling={{ backgroundColor: '#F0F0F0' }}
    >
      <CustomMessage
        message="You are about a delete an employee. Are you sure you want to continue?"
        open={openMessage}
        buttons
        onCancelClick={() => {
          setOpenMessage(false);
          setSelected([]);
        }}
        onContinueClick={() => {
          deleteRequest.executeWithData({ employees });
        }}
      />
      <TopSection
        selected={selected}
        response={response}
        // disableSearch
        search={search}
        hideSelectedArea
        setSearch={setSearch}
        clientName={`${response ? response.department.company.name : ''} / ${
          response ? 'Employees' : ''
        }`}
        buttonText="Group Download"
        buttonIcon={false}
        onButtonClick={() => {}}
        showDownloadButton={false}
      />
      {showOnlyCompleted && !loading && response && (() => {
        const all = response?.department?.employees || [];
        const completed = all.filter(
          (e) => e.lastAssessmentDate && e.lastAssessmentDate !== 'none'
        );
        if (completed.length === 0) {
          return (
            <Typography
              variant="body1"
              sx={{ fontSize: '14px', fontWeight: 500, mb: '10px' }}
            >
              No employees have completed the questionnaire yet.
            </Typography>
          );
        }
        return null;
      })()}
      <Grid item xs={12}>
        <EmployeeTable
          selected={selected}
          toggleSelection={toggleSelection}
          employees={employees}
          setOpenMessage={setOpenMessage}
          setSelected={setSelected}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          backgroundColor: 'transparent',
          borderRadius: '5px',
          height: '40px',
          mt: '30px',
        }}
      >
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              float: 'left',
              width: '110px',
              display: 'flex',
            }}
          >
            <IconButton onClick={() => handleBack()} disabled={step === 1}>
              <ArrowBack
                sx={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </IconButton>
            <Typography
              variant="body1"
              sx={{
                ...styles.text,
                fontWeight: '700',
                m: 'auto',
              }}
            >
              {response ? step : 1} of{' '}
              {(() => {
                const all = response?.department?.employees || [];
                const base = showOnlyCompleted
                  ? all.filter(
                      (e) => e.lastAssessmentDate && e.lastAssessmentDate !== 'none'
                    )
                  : all;
                return base.length > 0
                  ? Math.ceil(base.length / EMPLOYEES_TO_DISPLAY)
                  : 1;
              })()}
            </Typography>
            <IconButton
              sx={{ ml: '3px' }}
              onClick={() => handleForward()}
              disabled={employees.length < EMPLOYEES_TO_DISPLAY}
            >
              <ArrowForward
                sx={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right', mb: '5px' }}>
          <Button
            variant="contained"
            // disabled={!selected.length}
            onClick={() => {
              if (selected.length > 0) setSelected([]);
              else push(`/clients/${response.department.company.id}`);
            }}
            sx={{
              ...styles.actionButtons,
              backgroundColor: 'black',
              color: 'white',
              boxShadow: 'none',
              borderColor: 'black !important',
              padding: '9px 33px 10px 35px',
              width: '100px',
              '.css-rx0huu-MuiButtonBase-root-MuiButton-root.Mui-disabled': {
                borderColor: 'grey !important',
              },
            }}
          >
            <Typography variant="body1" sx={{ ...styles.actionButtonText }}>
              {selected.length > 0 ? 'Cancel' : 'Back'}
            </Typography>
          </Button>
          {deleteRequest.loading ? (
            <LoadingButton
              loading={deleteRequest.loading}
              variant="outlined"
              loadingPosition="start"
              startIcon={<Save sx={{ color: 'transparent' }} />}
              sx={{
                textTransform: 'none',
                backgroundColor: 'black',
                color: 'white !important',
                padding: '1% 2%',
                fontSize: '10px',
                borderRadius: '10px',
                height: '30px',
                ml: '1%',
                mt: '3%',
              }}
            >
              Deleting...
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              disabled={!selected.length}
              onClick={() => {
                setOpenMessage(true);
              }}
              sx={{
                ...styles.actionButtons,
                ml: '5px',
                padding: '9px 17px 10px 19px',
                width: '107px',
              }}
            >
              <Typography variant="body1" sx={{ ...styles.actionButtonText }}>
                Delete selected
              </Typography>
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign="right">
        <Box
          sx={{
            float: 'right',
            display: 'flex',
            mt: '28px',
          }}
        >
          {response && response.department.employees ? (
            <Fragment>
              <Typography variant="body1" sx={{ ...styles.text }}>
                Now showing
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  ...styles.text,
                  fontWeight: '700',
                  ml: '9px',
                }}
              >
                {setShowing()} of{' '}
                {(() => {
                  const all = response?.department?.employees || [];
                  const base = showOnlyCompleted
                    ? all.filter(
                        (e) => e.lastAssessmentDate && e.lastAssessmentDate !== 'none'
                      )
                    : all;
                  return base.length;
                })()}
              </Typography>
              <Typography variant="body1" sx={{ ...styles.text, ml: '6px' }}>
                employees
              </Typography>
            </Fragment>
          ) : null}
        </Box>
      </Grid>
    </Shell>
  );
};
