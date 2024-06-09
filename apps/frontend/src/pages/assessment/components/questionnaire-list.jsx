import { Button, Container } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { Colours } from '../../../colours';
import { Questionnaire } from './questionnaire';
import { QuestionnaireHeading } from './questionnaire-heading';
import { AddQuestionnaire } from './add-questionnaire';
import { assessmentInitialState, assessmentReducer } from '../reducer';

const headings = ['Select', 'Name', 'Creator', 'Questions'];

export const QuestionnaireList = ({ questionnaires, state, dispatch }) => {
  return (
    <Container
      sx={{
        margin: '50px 0 0 0 !important',
        padding: '0 !important',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <QuestionnaireHeading headings={headings} />
      {questionnaires.map((questionnaire, index) => (
        <Questionnaire
          key={questionnaire.id + index}
          questionnaire={questionnaire}
          state={state}
          dispatch={dispatch}
        />
      ))}
    </Container>
  );
};
