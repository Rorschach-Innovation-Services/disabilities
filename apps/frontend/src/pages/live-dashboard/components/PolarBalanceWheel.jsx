// PolarBalanceWheel.jsx
import React, { useMemo } from 'react';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const SECTORS = ['Plan/Prepare', 'Integrate', 'Value-Add', 'Optimise', 'Transfer'];
const SUBS = ['Space', 'Person', 'Culture'];

// 15 canonical axis labels (stable order)
const AXES = SECTORS.flatMap(s => SUBS.map(sub => `${s} - ${sub}`));

// 5 sector color families (3 tones each so every sector’s 3 wedges look related)
const SECTOR_FILLS = [
  ['rgba(37, 99, 235, 0.85)', 'rgba(37, 99, 235, 0.55)', 'rgba(37, 99, 235, 0.35)'], // Plan/Prepare
  ['rgba(16, 185, 129, 0.85)', 'rgba(16, 185, 129, 0.55)', 'rgba(16, 185, 129, 0.35)'], // Integrate
  ['rgba(234, 179, 8, 0.85)',  'rgba(234, 179, 8, 0.55)',  'rgba(234, 179, 8, 0.35)'],  // Value-Add
  ['rgba(249, 115, 22, 0.85)', 'rgba(249, 115, 22, 0.55)', 'rgba(249, 115, 22, 0.35)'], // Optimise
  ['rgba(139, 92, 246, 0.85)', 'rgba(139, 92, 246, 0.55)', 'rgba(139, 92, 246, 0.35)'], // Transfer
];

const SECTOR_BORDERS = ['#1d4ed8', '#059669', '#b45309', '#c2410c', '#6d28d9'];

const PolarBalanceWheel = ({ spiderChart, mode = 'percent', title = 'Disability Inclusion — Balance Wheel (5×3)' }) => {
  const axes = spiderChart?.axes || [];
  const pct = spiderChart?.dataPct || [];
  const raw = spiderChart?.dataRaw || [];
  const maxScore = Number(spiderChart?.meta?.maxScore) || 5;

  // pick vector
  const values = (mode === 'percent' ? pct : raw).slice(0, axes.length);

  // Guarantee order & length; if back-end axes match AXES already, this will be identical.
  const { labels, data, fills, borders } = useMemo(() => {
    const fillColors = [];
    const borderColors = [];
    const numbers = [];

    AXES.forEach((axis, i) => {
      // map i → sector index and spoke index within sector
      const sectorIdx = Math.floor(i / 3); // 0..4
      const spokeIdx = i % 3;              // 0..2

      // look up the incoming value at this axis position
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
        label: mode === 'percent' ? 'Average (%)' : `Average (0–${maxScore})`,
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
      legend: { display: false }, // optional: build your own sector legend
      tooltip: {
        callbacks: {
          label: ctx => {
            const value = ctx.parsed;
            return mode === 'percent'
              ? `${ctx.label}: ${value.toFixed(1)}%`
              : `${ctx.label}: ${value.toFixed(2)} / ${maxScore}`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: mode === 'percent' ? 100 : maxScore,
        ticks: {
          showLabelBackdrop: false,
          stepSize: mode === 'percent' ? 20 : 1,
          color: '#475569',
        },
        grid: { color: 'rgba(148,163,184,0.25)' },
        angleLines: { color: 'rgba(148,163,184,0.35)' },
        pointLabels: {
          display: true,
          font: { size: 11 },
          // make labels two-line "Sector\nSub"
          callback: (val, i) => (labels[i] || '').replace(' - ', '\n'),
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
