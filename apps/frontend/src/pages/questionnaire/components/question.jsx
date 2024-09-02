import React, { Fragment } from 'react';
import { Typography, Box, useMediaQuery, TextField } from '@mui/material';
import {
  TextBoxInput,
  SelectableOptions,
  TimeSelector,
  SliderOption,
} from '../components/answer-section';

/**
 * Layout for a single question
 * @param id of the question if it is a sleep health question
 * @param name of question if it is a personal question
 * @param title i.e. the actual question text
 * @param state of questionnaire
 * @param dispatch for questionnaire
 * @param children additional components
 * @param helperText text below question title
 * @param error being id or name for question with erroneous input
 * @param setError resetting the question error
 * @param customGetQuestion custom get question function
 * */
export const Question = ({
  id,
  title,
  name,
  children,
  state,
  dispatch,
  helperText,
  error,
  setError,
  customGetQuestion,
  category,
  label,
}) => {
  const changeLayout = useMediaQuery('(max-width:780px)');

  // Get a question corresponding to question with given id as props
  const getQuestion = () => {
    if (typeof customGetQuestion !== 'undefined') return customGetQuestion();

    for (let i = 0; i < state.questions.length; i++) {
      const question = state.questions[i];
      if (question.id === id) return question;
    }
  };

  // Determine the appropriate input user can use to answer question
  const renderAnswerSection = () => {
    const question = getQuestion();
    if (question.question.toLowerCase().includes('email'))
      return (
        <TextBoxInput
          placeholder="Email"
          value={state.employee.email}
          updateState={(value) => {
            dispatch({
              type: 'employee',
              payload: { key: 'email', value },
            });
            dispatch({
              type: 'add response',
              payload: { id, response: value },
            });
          }}
          errorMessage="Please ensure that the email you have entered is correct."
          displayErrorMessage={error === 'email'}
          setError={setError}
          sx={{ marginTop: '160px' }}
        />
      );
      
      // Function to get slider style based on question category
      const getSliderStyle = (question) => {
        switch (question.category) {
          case 'Engage':
            return { color: '#0074D9' };  
          case 'Nest':
            return { color: '#2ECC40' };  
          case 'Learn':
            return { color: '#FFDC00' };  
          case 'Back':
            return { color: '#FF851B' };  
          case 'Attract':
            return { color: '#B10DC9' };  
          default:
            return { color: '#ddd' };  
        }
      };
      
    return (
      <SliderOption
        value={question.response}
        onChange={(value) =>
          dispatch({
            type: 'add response',
            payload: { id, response: value },
          })
        }
        low="Not at all"
        medium="Sometimes"
        high="Very much"
        setError={setError}
        sliderStyle={getSliderStyle(question)} // Pass the custom color style here
      />
    );
  };

  return (
    <Box component="div" sx={{ marginLeft: '0px', minHeight: '350px' }}>
      <Typography
        variant="h4"
        sx={{
          marginTop: '6%',
          paddingRight: changeLayout ? '19%' : '32%',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
        component="pre"
        sx={{
          marginTop: '1%',
          color: 'darkslategrey',
          fontSize: '12px',
          width: '72%',
          marginBottom: '40px',
          whitespace: 'pre',
        }}
      >
        {helperText}
      </Typography>
      <Box sx={{ margin: '0 auto', textAlign: 'center' }}>
        {renderAnswerSection()}
      </Box>
      {children}
    </Box>
  );
};
