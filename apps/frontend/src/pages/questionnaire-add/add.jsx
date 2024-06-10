import React, { Fragment, useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  useMediaQuery,
  Box,
  Breadcrumbs,
} from '@mui/material';
import { Shell } from '../../components/shell';
import { useAxios } from '../../hooks/axios';
import { ClientsTable } from './components/items';
import { TopSection } from './components/top-section';
import { useMediaStorage } from '../../hooks/media';
import { CustomMessage } from '../../components/message';
import { Loading } from '../../components/loading';
import { useLocation, useHistory } from 'react-router-dom';
import { EditQuestion } from './components/edit';
import { v4 } from 'uuid';

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

export const QuestionnaireAdd = () => {
  const { state } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [questionnaireName, setQuestionnaireName] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [clients, setClients] = useState([]);
  const { push } = useHistory();
  const { execute, executeWithParameters, response, error, loading } = useAxios(
    {
      url: '/questionnaires/createQuestionnaire',
      method: 'post',
    }
  );

  useEffect(() => {
    if (state && state.questionnaire) {
      setClients(state.questionnaire.questions);
      setQuestionnaireName(state.questionnaire.name);
    }
  }, [state]);

  useEffect(() => {
    if (response && !error) push('/questionnaire-bank');
  }, [response, error]);

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
                  label: row.label,
                  category: row.category,
                };
                return newClients;
              });
            }
          } else {
            const { question, helperText, label, category } = row;
            setClients((prev) => [
              ...prev,
              { question, id: v4(), helperText, label, category },
            ]);
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
            onClick={() => push('/questionnaire-bank')}
            variant="outlined"
            sx={{ width: '100px', marginRight: '10px' }}
          >
            Back
          </Button>
          <Button
            disabled={questionnaireName.length === 0 || clients.length === 0}
            onClick={() => {
              if (state && state.questionnaire) {
                executeWithParameters({
                  url: '/questionnaires/updateQuestionnaire',
                  method: 'POST',
                  data: {
                    name: questionnaireName,
                    id: state.questionnaire.id,
                    questions: clients.map(
                      ({ id, question, helperText, label, category }) => ({
                        id,
                        question,
                        helperText,
                        label,
                        category,
                      })
                    ),
                  },
                })();
              } else {
                execute({
                  name: questionnaireName,
                  admin: localStorage.getItem('adminID'),
                  questions: clients.map(
                    ({ id, question, helperText, label, category }) => ({
                      id,
                      question,
                      helperText,
                      label,
                      category,
                    })
                  ),
                });
              }
            }}
            variant="contained"
          >
            {state && state.questionnaire ? 'Update' : 'Create'} Questionnaire
          </Button>
        </Grid>
      </Shell>
    </>
  );
};
