import React, { useEffect, useReducer, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Box, useMediaQuery, Button } from '@mui/material';
import {
  Clients,
  getClientDepartmentsForSecondQuestionnaire,
} from './components/clients';
import { Calendar } from './components/calendar';
import { ClientInfo } from './components/client-info';
import { useLocalStorage } from '../../hooks/storage';
import { useAxios } from '../../hooks/axios';
import { ChartArea } from './components/chart-area';
import { useMediaStorage } from '../../hooks/media';
import { getKey } from '../../utils/get-key';
import { Loading } from '../../components/loading';
import { Shell } from '../../components/shell.jsx';
import { Container } from '@mui/system';
// import banner from "../../assets/images/Sleep-science-banner.png"
// import banner from "../../assets/images/Sleep-science-banner001.jpeg"
import banner from '../../assets/images/UCT_Logo.png';
import { Colours } from '../../colours.js';
import { StatsList } from './components/stats-list';
import { Tasks } from './components/Tasks';
import { dashboardInitialState, dashboardReducer } from './reducer';
import { config } from '../../config';

export const Dashboard = () => {
  const [state, dispatch] = useReducer(dashboardReducer, dashboardInitialState);
  const [links, setLinks] = useState([]);
  const { push } = useHistory();
  const [name, setName] = useState('Admin');
  const [linksLoaded, setLinksLoaded] = useState(false);
  const media = useMediaStorage();
  const averagesRequest = useAxios({
    url: '/assessments/averages',
    method: 'get',
  });
  const clientRequest = useAxios({
    url: '/companies',
    method: 'get',
  });
  const tasksRequest = useAxios({
    url: '/tasks',
    method: 'get',
  });
  console.log('Api', import.meta.env);
  const { role } = useLocalStorage();
  const r = (role || '').toLowerCase();
  const isAdmin = r === 'administrator' || r === 'admin';
  const canStartAssessmentCTA = r === 'client_super' || r === 'client_user';

  // Execute network requests to fetch data
  useEffect(() => {
    setName(localStorage.getItem('adminName'));
    // averagesRequest.execute();
    clientRequest.execute();
    tasksRequest.execute();
  }, []);

  // Set response to state
  useEffect(() => {
    if (averagesRequest.error || !averagesRequest.response) return;
    dispatch({
      type: 'averages',
      payload: {
        averageSleepRating: averagesRequest.response.data.averageRating,
        averageSleepingHours: averagesRequest.response.data.averageSleepHours,
        assessmentCount: averagesRequest.response.data.numberOfAssessments,
        completedAssessments:
          averagesRequest.response.data.completedAssessments,
      },
    });
  }, [averagesRequest.response]);

  useEffect(() => {
    if (!clientRequest.response || !media.response || linksLoaded) return;
    const getLinks = async () => {
      const list = clientRequest.response.companies;
      for (let i = 0; i < list.length; i++) {
        if (!list[i].logo) setLinks((prev) => [...prev, '']);
        else {
          const url = await media.retrieve(getKey(list[i].logo));
          setLinks((prev) => [...prev, url]);
        }
      }
    };
    getLinks();
    setLinksLoaded(true);
  }, [media.response, clientRequest.response]);

  useEffect(() => {
    if (tasksRequest.error || !tasksRequest.response) return;
    // dispatch({
    //   type: 'tasks',
    //   payload: tasksRequest.response.tasks,
    // });
  }, [tasksRequest.response, tasksRequest.error]);

  // Set response to state
  useEffect(() => {
    if (clientRequest.error || !clientRequest.response) return;
    dispatch({ type: 'clients', payload: clientRequest.response.companies });
  }, [clientRequest.response]);

  useEffect(() => {
    if (averagesRequest.response && clientRequest.response) {
    }
  }, [averagesRequest.response, clientRequest.response]);

  return (
    <Shell heading="Dashboard">
      {clientRequest.loading || averagesRequest.loading ? (
        <Loading
          textSx={{ fontSize: '25px' }}
          loadingSx={{
            width: '250px !important',
            height: '250px !important',
          }}
          containerSx={{ margin: '10% 25%' }}
        />
      ) : (
        <Container
          sx={{
            display: 'flex',
            padding: '0 !important',
            gap: '20px',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0 !important',
              width: '70%',
              gap: '20px',
            }}
          >
            <Container
              sx={{
                padding: '0 !important',
                margin: '0 !important',
                position: 'relative',
                display: 'flex',
                // width: "100%",
                backgroundColor: Colours.blue,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                borderRadius: '10px',
              }}
            >
              <Container
                sx={{
                  position: 'relative',
                  top: '25%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  width: '40%',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '22px',
                    color: 'white',
                    fontWeight: '500',
                  }}
                >
                  Welcome back, {name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: 'white',
                  }}
                >
                  Lets get our day started with some sleep assessments?
                </Typography>
                {canStartAssessmentCTA && (
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: '12px',
                      backgroundColor: `${Colours.yellow} !important`,
                    }}
                    onClick={() => push('/assessment/new-department')}
                  >
                    Let's get started
                  </Button>
                )}
              </Container>
              <img
                src={banner}
                width="60%"
                height="330px"
                style={{
                  objectFit: 'cover',
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px',
                }}
              />
            </Container>
            {/* <StatsList state={state} /> */}
            {!isAdmin &&
              getClientDepartmentsForSecondQuestionnaire(state.clients)
                .length === 0 && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      textAlign: 'center',
                      marginTop: '80px',
                    }}
                  >
                    There are no companies ready for the second questionnaire
                  </Typography>
                </Box>
              )}
            {(isAdmin ||
              getClientDepartmentsForSecondQuestionnaire(state.clients).length >
                0) && (
              <Clients state={state} dispatch={dispatch} links={links} />
            )}
          </Container>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '30%',
              padding: '0 !important',
              gap: '25px',
            }}
          >
            <Calendar />
            <ClientInfo client={state.selectedClient} />
            <Tasks tasks={state.tasks} dispatch={dispatch} />
          </Container>
        </Container>
      )}
    </Shell>
  );
};
