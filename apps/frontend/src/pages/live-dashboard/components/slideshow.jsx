import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../../assets/logos/Pivot-Logo-6.png';

// Chart components
import PolarBalanceWheel from './PolarBalanceWheel';
import PolarSectorWheel from './PolarSectorWheel';
import PolarSubWheel from './PolarSubWheel';

export const Slideshow = ({
  open,
  onClose,
  spiderChart, // backend spider payload
  selectedCompany,
  selectedDepartment,
}) => {
  const [chartStep, setChartStep] = useState('sector'); // "sector" | "sub" | "full"

  const handleNext = () => {
    setChartStep((prev) =>
      prev === 'sector' ? 'sub' : prev === 'sub' ? 'full' : 'sector'
    );
  };

  const handlePrev = () => {
    setChartStep((prev) =>
      prev === 'sector' ? 'full' : prev === 'sub' ? 'sector' : 'sub'
    );
  };

  const getChartTitle = () => {
    switch (chartStep) {
      case 'sector':
        return 'Disability Inclusion: Category Averages (5 sectors)';
      case 'sub':
        return 'Disability Inclusion: Sub-Dimension Averages (3 subs)';
      case 'full':
        return 'Disability Inclusion: Balance Wheel (15 axes)';
      default:
        return '';
    }
  };

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
              <Typography variant="subtitle1">
                Department: {selectedDepartment}
              </Typography>
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
            {getChartTitle()}
          </Typography>
        </Box>

        {/* Chart area */}
        <Box sx={{ width: '80%', height: '80%' }}>
          {chartStep === 'sector' && (
            <PolarSectorWheel sectorSummary={spiderChart?.sectorSummary} mode="percent" />
          )}
          {chartStep === 'sub' && (
            <PolarSubWheel subSummary={spiderChart?.subSummary} mode="percent" />
          )}
          {chartStep === 'full' && (
            <PolarBalanceWheel spiderChart={spiderChart} mode="percent" />
          )}
        </Box>

        {/* Navigation buttons */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '40px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <Button
            onClick={handlePrev}
            sx={{
              background: '#95B8DF',
              color: 'white',
              fontWeight: 'bold',
              px: 3,
              '&:hover': { background: '#6a9cc7' },
            }}
          >
            ‹ Prev
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              background: '#95B8DF',
              color: 'white',
              fontWeight: 'bold',
              px: 3,
              '&:hover': { background: '#6a9cc7' },
            }}
          >
            Next ›
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
