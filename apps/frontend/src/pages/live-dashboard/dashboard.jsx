import { Shell } from '../../components/shell';
import { RadarChart } from './components/chart';
import { Grid } from '@mui/material';

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
  return (
    <Shell heading="Live Dashboard">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <RadarChart
            title="Current vs Do-ability"
            series={series.slice(0, 2)}
          />
        </Grid>
        <Grid item xs={6}>
          <RadarChart
            title="Current vs Important"
            series={series.slice(1, 3)}
          />
        </Grid>
        <Grid item xs={6}>
          <RadarChart
            title="Current vs Important vs Do-ability"
            series={series}
          />
        </Grid>
      </Grid>
    </Shell>
  );
};
