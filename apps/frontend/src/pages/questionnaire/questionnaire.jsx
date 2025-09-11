import React, { useEffect, useReducer, useState } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Welcome } from './components/welcome';
import Logo from '../../assets/logos/Pivot-Logo-6.png';
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

export const Questionnaire = ({ companyId: propCompanyId, departmentId: propDepartmentId, questionnaireId: propQuestionnaireId, initialEmployee }) => {
  const routeParams = useParams();
  const companyId = propCompanyId || routeParams.companyId;
  const departmentId = propDepartmentId || routeParams.departmentId;
  const questionnaireId = propQuestionnaireId || routeParams.questionnaireId;
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
  useEffect(() => console.log('state', state), [state]);

  // Prefill employee details if provided (embedded usage)
  useEffect(() => {
    if (!initialEmployee) return;
    if (initialEmployee.email) {
      dispatch({ type: 'employee', payload: { key: 'email', value: initialEmployee.email } });
    }
    if (initialEmployee.name) {
      dispatch({ type: 'employee', payload: { key: 'name', value: initialEmployee.name } });
    }
  }, [initialEmployee]);

  const sendData = () => {
    saveAssessmentRequest.executeWithData({
      company: companyId,
      department: departmentId,
      questionnaireId,
      questionnaire: state.questions,
      employeeEmail: state.employee.email || initialEmployee?.email,
      employeeId: (() => { try { return localStorage.getItem('respondentEmployeeId') || undefined; } catch { return undefined; } })(),
      employeeName: initialEmployee?.name,
      workTitle: initialEmployee?.workTitle,
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
        getCategory={() => {
          const questionProps = questionViews[state.step - 1];
          return questionProps.category;
        }}
        getCaption={() => {
          const questionProps = questionViews[state.step - 1];
          return questionProps.label;
        }}
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
  if (response && !filled) {
    const questions = response.questionnaire.questions;

    if (questions && questions.length > 0) {
      // Use questions directly without reordering
      questions.forEach((question) => {
        dispatch({
          type: 'add question',
          payload: { ...question, response: '' },
        });
      });

      // Save question properties for later rendering
      setQuestionViews(questions.map(question => ({
        id: question.id,
        helperText: question.helperText,
        title: question.question,
        label: question.label,
        category: question.category,
      })));

      // Set question count in state
      dispatch({
        type: 'question count',
        payload: questions.length,
      });
    }

    setFilled(true);
  }
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
        label={props.label}
        category={props.category}
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
    try {
      const eid = saveAssessmentRequest.response.employeeId;
      if (eid) localStorage.setItem('respondentEmployeeId', String(eid));
    } catch {}
    // Persist respondent identity and completion flag for Live Dashboard scoping
    try {
      const emailVal = (state?.employee?.email || initialEmployee?.email || '').trim();
      if (emailVal) localStorage.setItem('respondentEmail', emailVal);
    } catch {}
    try { if (companyId) localStorage.setItem('respondentCompanyId', String(companyId)); } catch {}
    try { if (departmentId) localStorage.setItem('respondentDepartmentId', String(departmentId)); } catch {}
    try { localStorage.setItem('respondentCompleted', '1'); } catch {}
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
            width: '130px',
            height: '130px', // Ensure height is the same as width for a perfect circle
            marginLeft: '65px',
            cursor: 'pointer',
            borderRadius: '50%', // This makes the image round
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
