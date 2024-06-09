import { Container, Typography } from '@mui/material';
import { Colours } from '../../../colours';

export const QuestionnaireItem = ({ questionnaire, children, onClick }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: `1px solid ${Colours.blue}`,
        boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
        height: '65px',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      // onClick={onClick}
    >
      {children}
      {[
        questionnaire.name,
        questionnaire.creator.name,
        questionnaire.questions.length,
      ].map((item, index) => (
        <Typography
          sx={{
            width: '110px',
            fontSize: '14px',
            textAlign: 'center',
            // paddingRight: item === questionnaire.questions.length && '50px',
          }}
          key={index}
        >
          {item}
        </Typography>
      ))}
    </Container>
  );
};
