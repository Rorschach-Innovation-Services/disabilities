import React, { useEffect, useReducer, useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Welcome } from './components/welcome';
import Logo from '../../assets/logos/Sleep Science Logo NT RGB.png';
import { initialState, reducer, options } from './reducer';
import { Question } from './components/question';
import { useAxios } from '../../hooks/axios';
import { Progress } from './components/progress';
import { Complete } from './components/complete';
import { Loading } from '../../components/loading';
import { sortQuestionArray } from '../../utils/sort';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { isDate, getHours, getMinutes } from 'date-fns';
import { CustomMessage } from '../../components/message';

export const Questionnaire = () => {
  const { companyId, departmentId, questionnaireId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filled, setFilled] = useState(false); // If questions have been loaded
  const [questionViews, setQuestionViews] = useState([]); // info for each question indexed
  const [complete, setComplete] = useState(false);
  const [questionError, setQuestionError] = useState('');
  const [assessmentError, setAssessmentError] = useState('');
  const decreaseWidth = useMediaQuery('(max-width:500px)');
  const { response, error, executeWithParameters, loading } = useAxios({
    url: '/question',
    method: 'get',
  });
  const saveAssessmentRequest = useAxios({
    url: '/assessments/save',
    method: 'post',
  });

  const sendData = () => {
    saveAssessmentRequest.executeWithData({
      company: companyId,
      employeeEmail: state.employee.email,
      questionnaire: state.questions,
      department: departmentId,
      questionnaireId,
    });
  };

  const showErrorMessage = () => {
    return assessmentError !== null && assessmentError.length > 0 ? (
      <CustomMessage
        message={assessmentError}
        open={Boolean(assessmentError)}
        okayButton
        onOkayClick={() => {
          setAssessmentError('');
        }}
      />
    ) : null;
  };

  // Displaying the progress element
  const showProgress = () => {
    if (state.step === 0 || state.step === state.questionCount + 1) return '';
    return (
      <Progress
        current={state.step}
        questionCount={state.questionCount}
        handleBack={handleBack}
      />
    );
  };

  useEffect(() => {
    executeWithParameters({
      url: `/questionnaires/${questionnaireId}`,
      method: 'get',
    })();
  }, []);

  useEffect(() => {
    if (error || !response || filled) return;
    const questions = response.questionnaire.questions;
    if (questions) {
      dispatch({
        type: 'question count',
        payload: questions.length,
      });
      const tempQuestions = [];

      // Set up sleep health screening questions
      for (const question of questions) {
        dispatch({
          type: 'add question',
          payload: { ...question, response: '' },
        });

        const properties = {
          id: question.id,
          helperText: question.helperText,
          title: question.question,
        };

        // Store properties for question
        tempQuestions.push({
          ...properties,
        });
      }
      // Save question properties
      setQuestionViews(tempQuestions);
    }
    setFilled(true);
  }, [response, error, state]);

  const handleNext = () => {
    dispatch({ type: 'increment step' });
  };

  const renderQuestion = () => {
    if (state.step < 0 || state.step > state.questionCount) return null;

    const props = questionViews[state.step - 1];
    return (
      <Question
        key={props.id}
        id={props.id}
        state={state}
        error={questionError}
        helperText={props.helperText}
        dispatch={dispatch}
        title={props.title}
        setError={setQuestionError}
      />
    );
  };

  useEffect(() => {
    if (saveAssessmentRequest.error) {
      setAssessmentError(
        saveAssessmentRequest.error.data.message.toLowerCase().includes('limit')
          ? 'Number of assessments that can be submitted has been exceeded.'
          : 'There has been an error trying to save assessment responses.'
      );
    }
    if (saveAssessmentRequest.error || !saveAssessmentRequest.response) return;
    setComplete(true);
  }, [saveAssessmentRequest.response, saveAssessmentRequest.error]);

  const renderStep = () => {
    if (state.step === 0) {
      return (
        <Welcome state={state} dispatch={dispatch} handleBegin={handleNext} />
      );
    }
    return renderQuestion();
  };

  const handleBack = () => {
    dispatch({ type: 'decrement step' });
  };

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
    <React.Fragment>
      {showErrorMessage()}
      {complete && <Complete />}
      {!complete && (
        <Box sx={{ marginTop: '3%', marginLeft: '0px' }}>
          <Box
            component="img"
            onClick={() => (window.location.href = '/')}
            alt="logo"
            src={Logo}
            sx={{
              width: '60px',
              marginLeft: '65px',
              cursor: 'pointer',
            }}
          />
          <Box
            sx={{
              margin: '0 auto',
              maxWidth: '900px',
              width: '70%',
            }}
          >
            {showProgress()}
            {renderStep()}
            {saveAssessmentRequest.loading ? (
              <Box sx={{ textAlign: 'center' }}>
                <LoadingButton
                  loading={saveAssessmentRequest.loading}
                  variant="outlined"
                  loadingPosition="start"
                  startIcon={<Save sx={{ color: 'transparent' }} />}
                  sx={{
                    textTransform: 'none',
                    backgroundColor: 'black',
                    color: 'white !important',
                    padding: '1% 2%',
                    borderRadius: '10px',
                    mt: '100px',
                    width: decreaseWidth ? '300px' : '390px',
                    margin: '0 auto',
                  }}
                >
                  Saving questionnaire...
                </LoadingButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                disabled={
                  state.questions.length >= state.step &&
                  state.questions[state.step - 1] &&
                  state.questions[state.step - 1].response === ''
                }
                onClick={() => {
                  state.step === state.questionCount
                    ? sendData()
                    : handleNext();
                }}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  width: decreaseWidth ? '300px' : '390px',
                  display: state.step === 0 || complete ? 'none' : 'flex',
                  marginBottom: '3%',
                  textTransform: 'none',
                  ':hover': {
                    backgroundColor: 'primary.main',
                  },
                  margin: '0 auto',
                  marginTop: error === '3' ? '-20px' : '',
                }}
              >
                {state.step === state.questionCount ? 'Submit' : 'Next'}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};
