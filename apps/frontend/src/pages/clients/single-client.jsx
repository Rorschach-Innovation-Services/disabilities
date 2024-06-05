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
import { ClientTable } from './components/client-table';
import { CustomMessage } from '../../components/message';
import { TopSection } from './components/top-section';
import { useParams } from 'react-router';
import { CLIENTS_TO_DISPLAY } from './clients-page';
import { Loading } from '../../components/loading';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';

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

export const SingleClientPage = () => {
  const { companyID } = useParams();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [step, setStep] = useState(1);
  const { push } = useHistory();
  const [clients, setClients] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});
  const { execute, response, error, loading } = useAxios({
    url: `/assessments/client-assessments/${companyID}`,
    method: 'get',
  });
  const deleteRequest = useAxios({
    url: `/assessments`,
    method: 'delete',
  });

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleForward = () => {
    setStep((prev) => prev + 1);
  };

  // Filter clients for the once searched for
  useEffect(() => {
    if (!response) return;
    if (search === '') return getClients();
    const result = response.departments.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
    setClients(result);
  }, [search]);

  const getClients = () => {
    if (!response || !response.departments) return;

    const result = [];

    let i = (step - 1) * CLIENTS_TO_DISPLAY;
    let count = 0;

    while (count < CLIENTS_TO_DISPLAY && i < response.departments.length) {
      result.push(response.departments[i]);
      i++;
      count++;
    }

    setClients(result);
  };

  const setShowing = () => {
    if (search.length > 0) return clients.length;
    if (response && step * CLIENTS_TO_DISPLAY < response.departments.length)
      return step * CLIENTS_TO_DISPLAY;
    else return response.departments.length;
  };

  const toggleSelection = (row) => {
    if (selected.includes(row._id)) {
      const copy = selected.filter((id) => id !== row.id);
      setSelected(copy);
    } else {
      setSelected((prev) => [...prev, row.id]);
    }
  };

  useEffect(() => {
    execute();
  }, []);

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

  // return only 4 clients to display at a time
  useEffect(() => {
    getClients();
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

  const showErrorMessage = () => {
    return Object.keys(errorInfo).length > 0 ? (
      <CustomMessage
        message={errorInfo.message}
        open={Boolean(errorInfo)}
        okayButton
        onOkayClick={() => {
          setErrorInfo({});
        }}
      />
    ) : null;
  };

  return (
    <Shell
      heading={response ? `All Clients / ${response.clientName}` : ''}
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
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'black',
              fontFamily: 'HK Grotesk',
            }}
          >
            {response ? response.clientName : ''}
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
      {showErrorMessage()}
      <CustomMessage
        message="You are about a delete a department. Are you sure you want to continue?"
        open={openMessage}
        buttons
        onCancelClick={() => {
          setOpenMessage(false);
          setSelected([]);
        }}
        onContinueClick={() => {
          const request = deleteRequest.createRequest({
            url: '/departments',
            data: { departments: selected },
            method: 'delete',
          });
          request();
        }}
      />
      <TopSection
        selected={selected}
        response={response}
        // disableSearch
        search={search}
        hideSelectedArea
        setSearch={setSearch}
        clientName={response && response.clientName}
        buttonText="Group Download"
        buttonIcon={false}
        onButtonClick={() => {
          if (!response || error) return;
          var hiddenElement = document.createElement('a');
          hiddenElement.href =
            'data:text/csv;charset=utf-8,' + encodeURI(response.csvFile);
          hiddenElement.setAttribute('style', 'display:none');
          hiddenElement.download = response.clientName + '.csv';
          hiddenElement.click();
        }}
      />
      <Grid item xs={12}>
        <ClientTable
          setErrorInfo={setErrorInfo}
          selected={selected}
          toggleSelection={toggleSelection}
          assessments={clients}
          clientName={response ? response.clientName : ''}
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
              {response ? step : ''} of{' '}
              {response && response.departments.length > 0
                ? Math.ceil(response.departments.length / CLIENTS_TO_DISPLAY)
                : 1}
            </Typography>
            <IconButton
              sx={{ ml: '3px' }}
              onClick={() => handleForward()}
              disabled={clients.length < CLIENTS_TO_DISPLAY}
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
            onClick={() => {
              if (selected.length > 0) setSelected([]);
              else push('/clients');
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
          {response && (
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
                {setShowing()} of {response ? response.departments.length : 0}
              </Typography>
              <Typography variant="body1" sx={{ ...styles.text, ml: '6px' }}>
                departments
              </Typography>
            </Fragment>
          )}
        </Box>
      </Grid>
    </Shell>
  );
};
