import React, { useState } from 'react';
import {
  Typography,
  LinearProgress,
  Box,
  useMediaQuery,
  IconButton,
  Stack,
} from '@mui/material';
import { ArrowBack, HelpOutline } from '@mui/icons-material';
import { DisplayQuestionnaireHints } from './help';

/**
 * Showing the number of questions answered relative to total question count
 * @param current the step of the current question being completed
 * @param questionCount total question count
 * @param handleBack function for moving a question back
 * */
export const Progress = ({
  current,
  questionCount,
  handleBack,
  getCaption,
  getCategory,
}) => {
  const changeLayout = useMediaQuery('(max-width:780px)');
  const [open, setOpen] = useState(false);

  const progressValue = () => {
    return Math.round((current / questionCount) * 100);
  };

  return (
    <>
      <DisplayQuestionnaireHints
        open={open}
        setOpen={setOpen}
        label={getCaption().toLowerCase()}
      />
      <Box component="div" sx={{ marginTop: '5%' }}>
        <Typography variant="h6" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
          Question - {getCaption()}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginLeft: changeLayout ? '68%' : '48%',
            marginTop: '-3%',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          {current}/{questionCount}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progressValue()}
          sx={{
            marginTop: '1%',
            width: changeLayout ? '76%' : '54%',
            marginBottom: '2%',
            backgroundColor: '#C8C8C8',
            '.css-17h2lra-MuiLinearProgress-bar1': {
              backgroundColor: '#8D90FF',
            },
          }}
        />
        <Stack direction="row" spacing={2}>
          <Typography
            variant="caption"
            sx={{
              fontSize: '14px',
              marginTop: '2%',
              color: '#6D8286',
              fontWeight: 'bold',
            }}
          >
            {getCategory()}
          </Typography>

          {getCategory().length > 0 && (
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ marginTop: '-7px !important' }}
            >
              <HelpOutline />
            </IconButton>
          )}
        </Stack>
        <Box
          component="div"
          sx={{
            marginLeft: changeLayout ? '0%' : '85%',
            marginTop: changeLayout ? '2%' : '-60px',
            marginBottom: changeLayout ? '50px' : '',
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{ border: changeLayout ? '1px solid' : '' }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="subtitle2"
            sx={{
              marginLeft: '50px',
              marginTop: '-30px',
            }}
          >
            {changeLayout ? '' : 'Previous'}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
