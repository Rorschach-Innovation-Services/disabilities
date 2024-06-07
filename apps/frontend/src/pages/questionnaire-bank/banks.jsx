import React, { Fragment, useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  useMediaQuery,
  Box,
  IconButton,
  Breadcrumbs,
} from '@mui/material';
import { Shell } from '../../components/shell';
import { useAxios } from '../../hooks/axios';
import { ClientsTable } from './components/items';
import { Bottom } from './components/bottom';
import { TopSection } from './components/top-section';
import { getKey } from '../../utils/get-key';
import { CustomMessage } from '../../components/message';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Loading } from '../../components/loading';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';

const CLIENTS_TO_DISPLAY = 5;

const data = [
  {
    id: 'q1',
    name: 'Employee Satisfaction Survey',
    creator: 'HR Department',
    order: 1,
    date: '2024-06-01',
    questions: [
      {
        id: 'q1-1',
        question: 'How satisfied are you with your current job role?',
        helperText: 'Please rate on a scale of 1 to 10.',
      },
      {
        id: 'q1-2',
        question: 'What improvements would you suggest for the workplace?',
        helperText:
          'Describe any changes you think could enhance your work environment.',
      },
      {
        id: 'q2-1',
        question: 'How satisfied are you with our product?',
        helperText: 'Rate on a scale of 1 to 5.',
      },
      {
        id: 'q2-2',
        question: 'Would you recommend our product to others?',
        helperText: 'Answer Yes or No.',
      },
    ],
    created: 1685785600,
    modified: 1685789200,
    _en: 'questionnaire',
  },
  {
    id: 'q3',
    name: 'Project Feedback Survey',
    creator: 'Project Management Office',
    order: 3,
    date: '2024-06-10',
    questions: [
      {
        id: 'q3-1',
        question: 'How clear were the project objectives?',
        helperText: 'Rate on a scale of 1 to 10.',
      },
      {
        id: 'q3-2',
        question: 'What challenges did you face during the project?',
        helperText: 'Describe any obstacles you encountered.',
      },
      {
        id: 'q4-1',
        question: 'How effective was the training session?',
        helperText: 'Rate on a scale of 1 to 5.',
      },
      {
        id: 'q4-2',
        question: 'What did you like most about the training?',
        helperText: 'Share your favorite part of the session.',
      },
    ],
    created: 1685958400,
    modified: 1685962000,
    _en: 'questionnaire',
  },
];

const styles = {
  actionButtons: {
    backgroundColor: 'black',
    color: 'white',
    textTransform: 'none',
    borderRadius: '10px',
    height: '30px',
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

export const QuestionnaireBank = () => {
  const [selected, setSelected] = useState([]);
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [linksLoaded, setLinksLoaded] = useState(false);
  const [step, setStep] = useState(1);
  const [clients, setClients] = useState(data);
  const { push } = useHistory();
  const useIconsOnly = useMediaQuery('(max-width:800px)');
  const { execute, response, error, loading } = useAxios({
    url: '/assessments/client-files',
    method: 'get',
  });
  const deleteRequest = useAxios({
    url: '/companies',
    method: 'delete',
  });

  const getClients = () => {
    // const list = response.companies;
    const list = data;
    const result = [];

    let i = (step - 1) * CLIENTS_TO_DISPLAY;
    let count = 0;

    while (count < CLIENTS_TO_DISPLAY && i < list.length) {
      result.push(list[i]);
      i++;
      count++;
    }

    setClients(result);
  };

  // useEffect(() => {
  //   execute();
  // }, []);
  // return only 4 clients to display at a time

  useEffect(() => {
    if (!response) return;
    getClients();
  }, [step, response, error]);

  // Filter clients for the once searched for
  useEffect(() => {
    if (!response) return;
    if (search === '') return getClients();
    // const list = response.companies;
    const list = data;
    const result = list.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
    setClients(result);
  }, [search]);

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleForward = () => {
    setStep((prev) => prev + 1);
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
    if (!deleteRequest.response || deleteRequest.error) return;
    if (response) {
      window.location.reload();
    }
  }, [deleteRequest.response, deleteRequest.error]);

  // if (loading || !response)
  if (loading)
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
      heading="Questionnaire Bank"
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
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'HK Grotesk',
            }}
          >
            Questionnaire Bank
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
        message="You are about a delete a client. Are you sure you want to continue?"
        open={openMessage}
        buttons
        onCancelClick={() => {
          setOpenMessage(false);
          setSelected([]);
        }}
        onContinueClick={() => {
          deleteRequest.execute({
            companyIDs: selected,
          });
        }}
      />
      <TopSection
        selected={selected}
        response={response}
        search={search}
        setSearch={setSearch}
        buttonText="Create Questionnaire"
        buttonIcon
        onButtonClick={() => push('/questionnaire-add')}
      />
      <Grid item xs={12}>
        <ClientsTable
          selected={selected}
          toggleSelection={toggleSelection}
          clients={clients}
          setOpenMessage={setOpenMessage}
          setSelected={setSelected}
          links={links ? links : []}
        />
      </Grid>
      <Grid container item xs={12} textAlign="right">
        <Grid item xs={6} textAlign="left">
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
              {/* {response ? step : ''} of{' '} */}
              {/* {response && response.companies.length > 0 */}
              {/*   ? Math.ceil(response.companies.length / CLIENTS_TO_DISPLAY) */}
              {/*   : 0} */}
              {data ? step : ''} of{' '}
              {data && data.length > 0
                ? Math.ceil(data.length / CLIENTS_TO_DISPLAY)
                : 0}
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
        <Grid item xs={6} textAlign="right">
          <Button
            variant="contained"
            disabled={!selected.length}
            onClick={() => setSelected([])}
            sx={{
              ...styles.actionButtons,
              padding: '9px 33px 10px 35px',
              width: '100px',
            }}
          >
            <Typography variant="body1" sx={{ ...styles.actionButtonText }}>
              Cancel
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
                mt: '3%',
                ml: '1%',
              }}
            >
              Deleting...
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              onClick={() => setOpenMessage(true)}
              disabled={!selected.length}
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
      <Grid item xs={12}>
        <Bottom
          allClients={data}
          styles={styles}
          step={step}
          clients={clients}
          search={search}
        />
      </Grid>
    </Shell>
  );
};
