import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Importing custom components
import { RadarChart } from './radar';
import { ScatterPlotComponent } from './do-ability';
import { BubbleChart } from './matrix';
import Logo from '../../../assets/logos/we DI enable Logo.png'

export const Slideshow = ({ open, onClose, scatterSeries, highBubbleSeries, lowBubbleSeries, radarSeries }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [jitteredScatterSeries, setJitteredScatterSeries] = useState([]);
  const [disableNext, setDisableNext] = useState(false);

  const jitterAmount = 0.075;
  const jitter = (value) => value + (Math.random() * 2 - 1) * jitterAmount;

  useEffect(() => {
    if (scatterSeries) {
      const jitteredData = scatterSeries.map((entry) => ({
        ...entry,
        data: entry.data.map(([x, y]) => [jitter(x), jitter(y)]),
      }));
      setJitteredScatterSeries(jitteredData);
    }
  }, [scatterSeries]);

  useEffect(() => {
    const allYLessThanOne = scatterSeries?.every((entry) =>
      entry.data.every(([, y]) => y < 1)
    );
    setDisableNext(allYLessThanOne);
  }, [scatterSeries]);

  const charts = [
    {
      type: 'radar',
      component: <RadarChart title="Radar Chart" series={radarSeries} />,
    },
    {
      type: 'scatter',
      component: <ScatterPlotComponent series={jitteredScatterSeries} />,
    },
    {
      type: 'bubble',
      component: <BubbleChart title="High Importance, high do-ability" series={highBubbleSeries} />,
    },
    {
      type: 'bubble',
      component: <BubbleChart title="Low Importance, low do-ability" series={lowBubbleSeries} />,
    },
  ].filter(chart => chart.component); 

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % charts.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + charts.length) % charts.length);

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
          component="img"
          onClick={() => (window.location.href = '/')}
          alt="logo"
          src={Logo}
          sx={{
            width: '130px',
            height: '130px',
            position: 'absolute',
            top: '20px',
            left: '20px',
            cursor: 'pointer',
            borderRadius: '50%',
          }}
        />

        <IconButton onClick={onClose} sx={{ position: 'absolute', top: '20px', right: '20px', color: 'black' }}>
          <CloseIcon />
        </IconButton>

        <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: '20px', color: 'black' }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box sx={{ width: '80%', height: '80%' }}>
          {charts.length > 0 ? (
            charts[currentSlide].component
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
