import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { RadarChart } from './radar';
import { ScatterPlotComponent } from './do-ability';
import { BubbleChart } from './matrix';
import Logo from '../../../assets/logos/we DI enable Logo.png';

export const Slideshow = ({
  open,
  onClose,
  scatterSeries,
  highBubbleSeries,
  lowBubbleSeries,
  radarSeries,
  selectedCompany,
  selectedDepartment,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);
  const [filteredCharts, setFilteredCharts] = useState([]);

  useEffect(() => {
    const allYLessThanOne = scatterSeries?.every((entry) =>
      entry.data.every(([, y]) => y < 1)
    );

    const initialCharts = [
      {
        type: 'radar',
        component: <RadarChart series={radarSeries} />,
        title: "Current Status VS Important to us",
      },
      {
        type: 'scatter',
        component: <ScatterPlotComponent series={scatterSeries} />,
      },
      {
        type: 'bubble',
        component: <BubbleChart title="High Importance, high do-ability" series={highBubbleSeries} />,
      },
      {
        type: 'bubble',
        component: <BubbleChart title="Low Importance, low do-ability" series={lowBubbleSeries} />,
      },
    ];

    // If all y-values are less than 1, only display the radar chart and disable navigation buttons
    setFilteredCharts(allYLessThanOne ? initialCharts.slice(0, 1) : initialCharts);
    setDisableNext(allYLessThanOne);
    setDisablePrev(allYLessThanOne);
  }, [scatterSeries, radarSeries, highBubbleSeries, lowBubbleSeries]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % filteredCharts.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + filteredCharts.length) % filteredCharts.length);

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogContent
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
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
              width: '100px',
              height: '100px',
              cursor: 'pointer',
              borderRadius: '50%',
              marginRight: '16px', 
            }}
          />

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}> 
              Company: {selectedCompany}
            </Typography>
            <Typography variant="subtitle1">Department: {selectedDepartment}</Typography>
          </Box>
        </Box>

        <IconButton onClick={onClose} sx={{ position: 'absolute', top: '20px', right: '20px', color: 'black' }}>
          <CloseIcon />
        </IconButton>

        {filteredCharts[currentSlide]?.type === 'radar' && (
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {filteredCharts[currentSlide].title}
            </Typography>
          </Box>
        )}

        <IconButton onClick={handlePrev} disabled={disablePrev} sx={{ position: 'absolute', left: '20px', color: 'black' }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box sx={{ width: '80%', height: '80%' }}>
          {filteredCharts.length > 0 ? (
            filteredCharts[currentSlide].component
          ) : (
            <div>No charts to display</div>
          )}
        </Box>

        <IconButton
          onClick={handleNext}
          disabled={disableNext}
          sx={{ position: 'absolute', right: '20px', color: 'black' }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};
