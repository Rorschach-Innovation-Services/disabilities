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
import { sortQuestionArray } from '../../utils/sort';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { isDate, getHours, getMinutes } from 'date-fns';
import { CustomMessage } from '../../components/message';

const removeParenthesis = (text) => {
  const index = text.indexOf('(');
  if (index !== -1) {
    return text.substring(0, index);
  }
  return text;
};

export const Questionnaire = () => {
  const { companyId, employeeId, departmentId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filled, setFilled] = useState(false); // If questions have been loaded
  const [questionViews, setQuestionViews] = useState([]); // info for each question indexed
  const [complete, setComplete] = useState(false);
  const [questionError, setQuestionError] = useState('');
  const [assessmentError, setAssessmentError] = useState('');
  const decreaseWidth = useMediaQuery('(max-width:500px)');
  const { response, error, execute } = useAxios({
    url: '/question',
    method: 'get',
  });
  const employeeRequest = useAxios({
    url: '/employees/register',
    method: 'post',
  });
  const deleteEmployeeRequest = useAxios({
    url: '/employees/delete',
    method: 'post',
  });
  const sleepQuestionRequest = useAxios({
    url: '/assessments/save',
    method: 'post',
  });

  const sendEmployeeData = () => {
    // save employee data
    employeeRequest.executeWithData({
      company: companyId,
      name: state.employee.name,
      email: state.employee.email,
      age: state.employee.age,
      gender: state.employee.gender,
      department: departmentId,
      id_number: state.employee.idNumber,
    });
  };

  useEffect(() => {
    if (employeeRequest.error || !employeeRequest.response) return;

    // Save employee questionnaire responses
    sleepQuestionRequest.executeWithData({
      company: companyId,
      employee: employeeId || employeeRequest.response.employee,
      questionnaire: state.questions,
      department: departmentId,
    });
  }, [employeeRequest.response, employeeRequest.error]);

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
    execute();
  }, []);

  useEffect(() => {
    if (error || !response || filled) return;
    if (response.questions) {
      dispatch({
        type: 'question count',
        payload: response.questions.length,
      });
      const tempQuestions = [];

      // Sort the questions in terms of the id
      sortQuestionArray(response.questions);

      // Remove parenthesis from question content
      for (let i = 0; i < response.questions.length; i++) {
        response.questions[i].content = removeParenthesis(
          response.questions[i].content
        );
      }
      // Set up sleep health screening questions
      for (const question of response.questions) {
        dispatch({
          type: 'add question',
          payload: { ...question, response: '' },
        });

        const properties = {
          id: question.id,
          helperText: '',
          title: question.content,
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
    if (sleepQuestionRequest.error) {
      setAssessmentError(
        sleepQuestionRequest.error.data.message.toLowerCase().includes('limit')
          ? 'Number of assessments that can be submitted has been exceeded.'
          : 'There has been an error trying to save assessment responses.'
      );
    }
    if (sleepQuestionRequest.error || !sleepQuestionRequest.response) return;
    setComplete(true);
  }, [sleepQuestionRequest.response, sleepQuestionRequest.error]);

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
            {employeeRequest.loading || sleepQuestionRequest.loading ? (
              <Box sx={{ textAlign: 'center' }}>
                <LoadingButton
                  loading={
                    employeeRequest.loading || sleepQuestionRequest.loading
                  }
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
                onClick={() => {
                  state.step === state.questionCount
                    ? sendEmployeeData()
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
