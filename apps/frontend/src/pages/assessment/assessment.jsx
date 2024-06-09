import React, { useEffect, useReducer } from 'react';
import { Typography, Box } from '@mui/material';
import { assessmentInitialState, assessmentReducer } from './reducer';
import { Shell } from '../../components/shell';
import { Loading } from '../../components/loading';
import { useAxios } from '../../hooks/axios';
import { QuestionnaireDetails } from './components/questionnaire-details';

export const Assessment = () => {
  const [state, dispatch] = useReducer(
    assessmentReducer,
    assessmentInitialState
  );
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
      {/* || state.questionnaires.length === 0 */}
      {error || !response ? (
        <Typography>No Questionnaires Found. Try again later!</Typography>
      ) : (
        <QuestionnaireDetails state={state} dispatch={dispatch} />
      )}
    </Shell>
  );
};
