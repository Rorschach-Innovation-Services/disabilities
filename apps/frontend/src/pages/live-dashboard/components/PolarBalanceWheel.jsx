import React, { useMemo } from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

// Backend categories 
const SECTORS = ['Prepare', 'Integrate', 'Value-Add', 'Optimise', 'Transfer'];
const SUBS = ['Space', 'Person', 'Culture'];

// 15 canonical axis labels (stable order, matches backend payload)
const AXES = SECTORS.flatMap(s => SUBS.map(sub => `${s} - ${sub}`));

// Colors for each sector (5 sectors × 3 tones for their subs)
const SECTOR_FILLS = [
  ['rgba(37, 99, 235, 0.85)', 'rgba(37, 99, 235, 0.55)', 'rgba(37, 99, 235, 0.35)'], // Prepare
  ['rgba(16, 185, 129, 0.85)', 'rgba(16, 185, 129, 0.55)', 'rgba(16, 185, 129, 0.35)'], // Integrate
  ['rgba(234, 179, 8, 0.85)',  'rgba(234, 179, 8, 0.55)',  'rgba(234, 179, 8, 0.35)'],  // Value-Add
  ['rgba(249, 115, 22, 0.85)', 'rgba(249, 115, 22, 0.55)', 'rgba(249, 115, 22, 0.35)'], // Optimise
  ['rgba(139, 92, 246, 0.85)', 'rgba(139, 92, 246, 0.55)', 'rgba(139, 92, 246, 0.35)'], // Transfer
];

const SECTOR_BORDERS = ['#1d4ed8', '#059669', '#ca8a04', '#ea580c', '#6d28d9'];

const PolarBalanceWheel = ({
  spiderChart,
  mode = 'raw',
  title = 'Disability Inclusion: Balance Wheel (15 axes)',
}) => {
  const axes = spiderChart?.axes || [];
  const pct = spiderChart?.dataPct || [];
  const raw = spiderChart?.dataRaw || [];
  const maxScore = Number(spiderChart?.meta?.maxScore) || 5;

  // pick values (percent or raw)
  const values = (mode === 'raw' ? pct : raw).slice(0, axes.length);

  // Map values to canonical AXES order
  const { labels, data, fills, borders } = useMemo(() => {
    const numbers = [];
    const fillColors = [];
    const borderColors = [];

    AXES.forEach((axis, i) => {
      const sectorIdx = Math.floor(i / 3); // which sector
      const spokeIdx = i % 3;              // which sub inside sector

      const incomingIndex = axes.indexOf(axis);
      const v = incomingIndex >= 0 ? (values[incomingIndex] ?? 0) : 0;

      numbers.push(v);
      fillColors.push(SECTOR_FILLS[sectorIdx][spokeIdx]);
      borderColors.push(SECTOR_BORDERS[sectorIdx]);
    });

    return { labels: AXES, data: numbers, fills: fillColors, borders: borderColors };
  }, [axes, values]);

  if (!labels.length || !data.length) {
    return <div style={{ textAlign: 'center', color: '#64748b' }}>No data available.</div>;
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: mode === 'raw' ? 'Average (%)' : `Average (0–${maxScore})`,
        data,
        backgroundColor: fills,
        borderColor: borders,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      title: { display: true, text: title, font: { size: 16, weight: '600' } },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => {
            const value = ctx.parsed;
            return mode === 'raw'
              ? `${ctx.label}: ${value.toFixed(1)}%`
              : `${ctx.label}: ${value.toFixed(2)} / ${maxScore}`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: mode === 'raw' ? 100 : maxScore,
        ticks: {
          stepSize: mode === 'raw' ? 20 : 1,
          color: '#475569',
        },
        grid: { color: 'rgba(148,163,184,0.25)' },
        angleLines: { color: 'rgba(148,163,184,0.35)' },
        pointLabels: {
          display: true,
          font: { size: 11 },
          callback: (val, i) => (labels[i] || '').replace(' - ', '\n'), // split sector/sub
          color: '#334155',
        },
      },
    },
    animation: {
      duration: 600,
      easing: 'easeOutCubic',
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: 1000, height: 560, margin: '0 auto' }}>
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PolarBalanceWheel;
