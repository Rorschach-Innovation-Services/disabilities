import React, { Fragment } from 'react';
import {
  Grid,
  Box,
  Typography,
  Paper,
  FormControl,
  Avatar,
  IconButton,
  Input,
  useMediaQuery,
  InputAdornment,
  Button,
  Stack,
} from '@mui/material';
import { NotificationsOutlined, Search } from '@mui/icons-material';
import AddQuestionnaireIcon from '../../../assets/icons/add-questionnaire.svg';
import { useLocalStorage } from '../../../hooks/storage';

export const TopSection = ({
  questionnaireName,
  setQuestionnaireName,
  onButtonClick,
  buttonText,
  buttonIcon,
  showDownloadButton = true,
}) => {
  const { name } = useLocalStorage();
  const rearrange = useMediaQuery('(max-width:560px)');

  return (
    <Fragment>
      <Grid container item>
        <Grid item xs={rearrange ? 12 : 8}>
          <Box sx={{ mb: '30px', width: '100%' }}>
            <Stack direction="row" spacing={2}>
              <Typography>Questionnaire Name: </Typography>
              <Input
                disableUnderline
                value={questionnaireName}
                onChange={(event) => setQuestionnaireName(event.target.value)}
                placeholder="Questionnaire Name"
                inputProps={{ 'aria-label': 'description' }}
                sx={{
                  backgroundColor: 'white',
                  pl: '5px',
                  fontSize: '9px',
                  lineHeight: '11px',
                  height: '30px',
                  bordeRadius: '5px',
                  width: '200px',
                }}
              />
            </Stack>
          </Box>
        </Grid>
        {showDownloadButton ? (
          <Grid
            item
            xs={rearrange ? 12 : 4}
            sx={{ display: 'flex', justifyContent: 'right' }}
          >
            <Button
              variant="filled"
              onClick={onButtonClick}
              sx={{
                minHeight: 0,
                textTransform: 'None',
                backgroundColor: 'black',
                color: 'white',
                width: '200px',
                height: '30px',
                px: '10px',
                ':hover': { backgroundColor: 'black' },
              }}
            >
              {buttonIcon ? (
                <Box component="img" src={AddQuestionnaireIcon} />
              ) : null}
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  ml: '8px',
                }}
              >
                {buttonText}
              </Typography>
            </Button>
          </Grid>
        ) : null}{' '}
      </Grid>
    </Fragment>
  );
};
