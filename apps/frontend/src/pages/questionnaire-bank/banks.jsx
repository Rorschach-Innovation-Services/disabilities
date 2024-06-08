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
  const [selected, setSelected] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [step, setStep] = useState(1);
  const [clients, setClients] = useState([]);
  const { push } = useHistory();
  const useIconsOnly = useMediaQuery('(max-width:800px)');
  const { execute, response, error, loading } = useAxios({
    url: '/questionnaires',
    method: 'get',
  });
  const deleteRequest = useAxios({
    url: '/questionnaires',
    method: 'delete',
  });

  useEffect(() => {
    execute();
  }, []);
  // return only 4 clients to display at a time
  useEffect(() => {
    if (!response) return;
    setClients(response.questionnaires);
  }, [response, error]);

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleForward = () => {
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (!deleteRequest.response || deleteRequest.error) return;
    if (deleteRequest) {
      window.location.reload();
    }
  }, [deleteRequest.response, deleteRequest.error]);

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
        message="You are about a delete a questionnaire. Are you sure you want to continue?"
        open={openMessage}
        buttons
        onCancelClick={() => {
          setOpenMessage(false);
        }}
        onContinueClick={() => {
          deleteRequest.executeWithParameters({
            url: '/questionnaires/deleteQuestionnaire/' + selected,
            method: 'get',
          })();
          setOpenMessage(false);
        }}
      />
      <TopSection
        buttonText="Create Questionnaire"
        buttonIcon
        onButtonClick={() => push('/questionnaire-add')}
      />
      <Grid item xs={12}>
        <ClientsTable
          clients={clients}
          setOpenMessage={(bool, id) => {
            setSelected(id);
            setOpenMessage(bool);
          }}
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
              {response ? step : ''} of{' '}
              {response && response.questionnaires.length > 0
                ? Math.ceil(response.questionnaires.length / CLIENTS_TO_DISPLAY)
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
        <Grid item xs={12}>
          <Bottom
            allClients={data}
            styles={styles}
            step={step}
            clients={clients}
          />
        </Grid>
      </Grid>
    </Shell>
  );
};
