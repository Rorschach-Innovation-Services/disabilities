import { Button, Checkbox, Container, Typography } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import { Colours } from '../../../colours';
import { QuestionList } from './question-list';
import { QuestionnaireList } from './questionnaire-list';
import { QuestionnaireHeading } from './questionnaire-heading';
import { QuestionnaireItem } from './questionnaire-item';

const headings = [
  'Taking notes',
  'Creator',
  'Last Modified',
  'Number of Questions',
];

export const QuestionnaireDetails = ({ state, dispatch }) => {
  const { push } = useHistory();
  const location = useLocation();
  console.log(location);
  return (
    <Container
      sx={{
        marginTop: '50px',
        padding: '0 20px 0 0 !important',
      }}
    >
      <QuestionnaireList
        questionnaires={state.questionnaires}
        state={state}
        dispatch={dispatch}
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {!state.selected && (
          <Button
            disabled={true}
            variant="outlined"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              '&.MuiButton-contained': {
                backgroundColor: '#fff',
              },
              borderRadius: '10px',
            }}
          >
            Continue
          </Button>
        )}
        {state.selected && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&.MuiButton-contained': {
                backgroundColor: '#000',
              },
              borderRadius: '10px',
            }}
            onClick={() => {
              push('/assessment/respondent', {
                companyID: location.state ? location.state.id : null,
                questionnaire: state.selected,
              });
            }}
          >
            Continue
          </Button>
        )}
      </Container>
    </Container>
  );
};
