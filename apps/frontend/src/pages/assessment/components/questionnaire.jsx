import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import { QuestionnaireItem } from './questionnaire-item';

export const Questionnaire = ({ state, questionnaire, dispatch }) => {
  return (
    <QuestionnaireItem questionnaire={questionnaire} onClick={() => {}}>
      <Checkbox
        checked={
          state.selected !== null && state.selected.id === questionnaire.id
        }
        onClick={(event) => {
          event.stopPropagation();
          if (state.selected === null) {
            dispatch({
              type: 'selected questionnaire',
              payload: questionnaire,
            });
          } else {
            dispatch({
              type: 'selected questionnaire',
              payload: null,
            });
          }
        }}
        sx={{
          '&.Mui-checked': {
            color: 'black',
          },
        }}
      />
    </QuestionnaireItem>
  );
};
