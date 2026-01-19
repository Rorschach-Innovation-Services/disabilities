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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title, ChartDataLabels);

// Backend categories 
const SECTORS = ['Prepare', 'Integrate', 'Value-Add', 'Optimise', 'Transfer'];
const SUBS = ['Space', 'Person', 'Culture'];

// Fallback axis labels (questionnaire order) — runtime will prefer spiderChart.axes when present
const AXES_FALLBACK = [
  'Prepare - Space 1',
  'Prepare - Culture 2',
  'Prepare - Person 3',

  'Integrate - Person 4',
  'Integrate - Culture 5',
  'Integrate - Space 6',

  'Value-Add - Person 7',
  'Value-Add - Culture 8',
  'Value-Add - Space 9',

  'Optimise - Space 10',
  'Optimise - Culture 11',
  'Optimise - Person 12',

  'Transfer - Person 13',
  'Transfer - Culture 14',
  'Transfer - Space 15',
];

// Use the incoming spider chart axes if available; otherwise fall back to the canonical questionnaire order
const getLabelsFromSpider = (spider) => spider?.axes || AXES_FALLBACK;

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

  // interpret mode flags
  // (kept for potential future use)

  // Map values to canonical AXES order
  const { labels, dataPct, dataRaw, fills, borders } = useMemo(() => {
    const pctNumbers = [];
    const rawNumbers = [];
    const fillColors = [];
    const borderColors = [];

    const labelsFromSpider = getLabelsFromSpider(spiderChart);
    const pctArray = spiderChart?.dataPct || spiderChart?.pct || pct || [];
    const rawArray = spiderChart?.dataRaw || spiderChart?.raw || raw || [];

    labelsFromSpider.forEach((axis, i) => {
      const sectorIdx = Math.floor(i / 3); // which sector (assumes questionnaire groups by 3)
      const spokeIdx = i % 3;              // which sub inside sector

      const pv = pctArray[i] ?? 0;
      const rv = rawArray[i] ?? 0;

      pctNumbers.push(pv);
      rawNumbers.push(rv);
      fillColors.push(SECTOR_FILLS[sectorIdx] ? SECTOR_FILLS[sectorIdx][spokeIdx] : 'rgba(200,200,200,0.4)');
      borderColors.push(SECTOR_BORDERS[sectorIdx] ?? '#ddd');
    });

    return { labels: labelsFromSpider, dataPct: pctNumbers, dataRaw: rawNumbers, fills: fillColors, borders: borderColors };
  }, [spiderChart, pct, raw]);

  if (!labels.length || (!dataPct.length && !dataRaw.length)) {
    return <div style={{ textAlign: 'center', color: '#64748b' }}>No data available.</div>;
  }

  // choose dataset values for display (preserve existing mode semantics)
  const data = mode === 'raw' ? dataPct : dataRaw;

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
            const i = ctx.dataIndex ?? 0;
            const rawVal = dataRaw[i] ?? 0;
            return `${ctx.label}: ${rawVal.toFixed(2)} / ${maxScore}`;
          },
        },
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const i = context.dataIndex ?? 0;
          const rawVal = dataRaw[i] ?? 0;
          return rawVal.toFixed(2);
        },
        color: '#111827',
        backgroundColor: 'rgba(255,255,255,0.78)',
        borderRadius: 4,
        padding: 4,
        font: { weight: '600', size: 10 },
        clip: false,
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
