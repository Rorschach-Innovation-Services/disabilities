import { Shell } from '../../components/shell';
import { RadarChart } from './components/radar';
import { BubbleChart } from './components/matrix';
import { ScatterPlotComponent } from './components/do-ability';
import { Grid } from '@mui/material';
import { LiveDashboardBanner } from './components/banner';
import { useState } from 'react';

const series = [
  {
    name: 'Do-ability',
    data: [2.9, 3.7, 4.5, 3.2, 2.2],
    color: '#00FF00', // Green color
  },
  {
    name: 'Current',
    data: [4.4, 5, 3, 4, 1.2],
    color: '#FF0000', // Red color
  },
  {
    name: 'Important',
    data: [4.4, 4.8, 3.6, 1.3, 4.3],
    color: '#0000FF', // Blue color
  },
];

export const LiveDashboard = () => {
  const [step, setStep] = useState(0);

  return (
    <Shell heading="Live Dashboard">
      <LiveDashboardBanner step={step} setStep={setStep} />
      {step === 0 && (
        <RadarChart title="Current vs Important" series={series.slice(1, 3)} />
      )}
      {step === 1 && <ScatterPlotComponent />}
      {step === 2 && (
        <>
          <BubbleChart />
        </>
      )}
      <Grid container spacing={2}></Grid>
    </Shell>
  );
};
