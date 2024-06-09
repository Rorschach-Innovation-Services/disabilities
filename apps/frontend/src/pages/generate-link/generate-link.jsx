import React, { useState } from 'react';
import { Box, Paper, useMediaQuery } from '@mui/material';
import BackgroundImage from '../../assets/images/Abstract.jpg';
import Logo from '../../assets/logos/Sleep Science Logo NT RGB.png';
import { useLocation, useHistory } from 'react-router-dom';
import { GenerateLinkContent } from './components/content';

export const GenerateLink = () => {
  const { state } = useLocation();
  const { push } = useHistory();
  const changeLayout = useMediaQuery('(max-width:480px)');
  console.log('state', state);

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: changeLayout ? 'white' : 'transparent',
        backgroundImage: `url("${changeLayout ? '' : BackgroundImage}")`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <Box
        component="img"
        alt="logo"
        src={Logo}
        onClick={() => push('dashboard')}
        sx={{
          maxWidth: '100px',
          marginTop: '5vh',
          marginLeft: '9vw',
          cursor: 'pointer',
        }}
      />
      <Paper
        elevation={0}
        sx={{
          borderRadius: '20px',
          width: '500px',
          margin: 'auto',
          display: 'flex',
          position: 'relative',
          bottom: '30px',
        }}
      >
        <GenerateLinkContent
          companyID={state ? state[0].companyID : ''}
          departmentID={state ? state[0].departmentID : ''}
          questionnaireID={state ? state[0].questionnaireId : ''}
        />
      </Paper>
    </Box>
  );
};
