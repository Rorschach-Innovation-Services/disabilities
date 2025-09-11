import React, { useEffect, useReducer, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { assessmentInitialState, assessmentReducer } from './reducer';
import { Shell } from '../../components/shell';
import { Loading } from '../../components/loading';
import { useAxios } from '../../hooks/axios';
import { QuestionnaireDetails } from './components/questionnaire-details';
import { RespondentDetails } from './respondent';

export const Assessment = () => {
  const [state, dispatch] = useReducer(
    assessmentReducer,
    assessmentInitialState
  );
  const [embeddedFlow, setEmbeddedFlow] = useState({
    showRespondent: false,
    companyID: null,
    questionnaire: null,
    prefillRespondent: null,
  });
  const { execute, response, error, loading } = useAxios({
    url: '/questionnaires',
    method: 'get',
  });
  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (error || !response) return;
    dispatch({
      type: 'get-questionnaires',
      payload: response.questionnaires,
    });
  }, [response, error]);

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
    <Shell heading="Start Assessment">
      {embeddedFlow.showRespondent ? (
        <RespondentDetails
          companyID={embeddedFlow.companyID}
          questionnaire={embeddedFlow.questionnaire}
          prefillRespondent={embeddedFlow.prefillRespondent}
          embedded
        />
      ) : error || !response ? (
        <Typography>No Questionnaires Found. Try again later!</Typography>
      ) : (
        <QuestionnaireDetails
          state={state}
          dispatch={dispatch}
          onContinue={({ companyID, questionnaire, prefillRespondent }) =>
            setEmbeddedFlow({
              showRespondent: true,
              companyID,
              questionnaire,
              prefillRespondent,
            })
          }
        />
      )}
    </Shell>
  );
};
