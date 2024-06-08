import React, { Fragment } from 'react';
import { Box, Typography } from '@mui/material';

const CLIENTS_TO_DISPLAY = 5;

export const Bottom = ({ allClients, step, styles, clients }) => {
  const setShowing = () => {
    if (allClients && step * CLIENTS_TO_DISPLAY < allClients.length)
      return step * CLIENTS_TO_DISPLAY;
    else return allClients.length;
  };

  return (
    <Fragment>
      <Box sx={{ float: 'right', display: 'flex', mt: '28px' }}>
        {allClients && (
          <Fragment>
            <Typography variant="body1" sx={{ ...styles.text }}>
              Now showing
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...styles.text,
                fontWeight: '700',
                ml: '9px',
              }}
            >
              {setShowing()} of {allClients ? allClients.length : 0}
            </Typography>
            <Typography variant="body1" sx={{ ...styles.text, ml: '6px' }}>
              questionnaires
            </Typography>
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
};
