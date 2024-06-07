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
import { useMediaStorage } from '../../hooks/media';
import { getKey } from '../../utils/get-key';
import { CustomMessage } from '../../components/message';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Loading } from '../../components/loading';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';
import { EditQuestion } from './components/edit';
import { v4 } from 'uuid';

const CLIENTS_TO_DISPLAY = 5;
const data = {
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
};

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

export const QuestionnaireAdd = () => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [questionnaireName, setQuestionnaireName] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [clients, setClients] = useState(data.questions);
  const media = useMediaStorage();
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

  // useEffect(() => {
  //   execute();
  // }, []);

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
    <>
      <EditQuestion
        open={open}
        clientCount={clients.length}
        selected={selected}
        setOpen={() => {
          setOpen(false);
          setSelected(null);
        }}
        onChange={(row) => {
          if ('id' in row) {
            const index = clients.findIndex((client) => client.id === row.id);
            if (index !== -1) {
              setClients((prev) => {
                const newClients = [...prev];
                newClients[index] = {
                  ...newClients[index],
                  question: row.question,
                  helperText: row.helperText,
                };
                return newClients;
              });
            }
          } else {
            const { question, helperText } = row;
            setClients((prev) => [...prev, { question, id: v4(), helperText }]);
          }
        }}
      />
      <Shell
        heading="Create Questionnaire"
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
              Create Questionnaire
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
          message="You are about a delete a question. Are you sure you want to continue?"
          open={openMessage}
          buttons
          onCancelClick={() => {
            setOpenMessage(false);
          }}
          onContinueClick={() => {
            setClients((prev) =>
              prev.filter((client) => client.id !== selected.id)
            );
            setSelected(null);
            setOpenMessage(false);
          }}
        />
        <TopSection
          questionnaireName={questionnaireName}
          setQuestionnaireName={setQuestionnaireName}
          buttonText="Add Question"
          buttonIcon
          onButtonClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        />
        <Grid item xs={12}>
          <ClientsTable
            clients={clients}
            setOpenMessage={(val, row) => {
              setSelected(row);
              setOpenMessage(val);
            }}
            onSelect={(row) => {
              setSelected(row);
              setOpen(true);
            }}
          />
        </Grid>
        <Grid item xs={12} align="right" sx={{ marginTop: '50px' }}>
          <Button
            disabled={questionnaireName.length === 0 || clients.length === 0}
            variant="contained"
          >
            Create Questionnaire
          </Button>
        </Grid>
      </Shell>
    </>
  );
};
