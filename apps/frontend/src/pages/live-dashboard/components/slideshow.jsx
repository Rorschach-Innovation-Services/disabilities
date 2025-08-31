import React from 'react';
import { Dialog, DialogContent, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../../assets/logos/Pivot-Logo-6.png';

// import  spider chart
import PolarBalanceWheel from './PolarBalanceWheel';

export const Slideshow = ({
  open,
  onClose,
  spiderChart,          //  backend spider payload 
  selectedCompany,
  selectedDepartment,
}) => {
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogContent
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: '#fff',
        }}
      >
        {/* Brand + context (top-left) */}
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            onClick={() => (window.location.href = '/')}
            alt="logo"
            src={Logo}
            sx={{
              width: '84px',
              height: '84px',
              cursor: 'pointer',
              borderRadius: '50%',
              marginRight: '16px',
            }}
          />
          <Box>
            {selectedCompany && (
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Company: {selectedCompany}
              </Typography>
            )}
            {selectedDepartment && (
              <Typography variant="subtitle1">Department: {selectedDepartment}</Typography>
            )}
          </Box>
        </Box>

        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: '20px', right: '20px', color: 'black' }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Disability Inclusion Wagon Wheel
          </Typography>
        </Box>

        {/* Wagon wheel */}
        <Box sx={{ width: '80%', height: '80%' }}>
          <PolarBalanceWheel spiderChart={spiderChart} mode="percent" />

        </Box>
      </DialogContent>
    </Dialog>
  );
};
