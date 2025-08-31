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

// 5 sector colors (same family as BalanceWheel)
const SECTOR_COLORS = [
  'rgba(37, 99, 235, 0.75)',  // Prepare
  'rgba(16, 185, 129, 0.75)', // Integrate
  'rgba(234, 179, 8, 0.75)',  // Value-Add
  'rgba(249, 115, 22, 0.75)', // Optimise
  'rgba(139, 92, 246, 0.75)', // Transfer
];

const PolarSectorWheel = ({ sectorSummary, mode = 'raw', title = 'Category Averages (5 sectors)' }) => {
  if (!sectorSummary?.length) {
    return <div style={{ textAlign: 'center', color: '#64748b' }}>No sector data available.</div>;
  }

  const { labels, values } = useMemo(() => {
    const lbls = sectorSummary.map(s => s.sector);
    const vals = sectorSummary.map(s => mode === 'raw' ? s.pct : s.raw);
    return { labels: lbls, values: vals };
  }, [sectorSummary, mode]);

  const chartData = {
    labels,
    datasets: [
      {
        label: mode === 'raw' ? 'Average (%)' : 'Average',
        data: values,
        backgroundColor: SECTOR_COLORS,
        borderColor: '#fff',
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
      legend: { display: true, position: 'bottom' },
      tooltip: {
        callbacks: {
          label: ctx => {
            const v = ctx.parsed;
            return mode === 'percent'
              ? `${ctx.label}: ${v.toFixed(1)}%`
              : `${ctx.label}: ${v.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: mode === 'raw' ? 100 : 5,
        ticks: {
          stepSize: mode === 'raw' ? 20 : 1,
          color: '#475569',
        },
        grid: { color: 'rgba(148,163,184,0.25)' },
        angleLines: { color: 'rgba(148,163,184,0.35)' },
        pointLabels: { color: '#334155', font: { size: 12 } },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: 700, height: 480, margin: '0 auto' }}>
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PolarSectorWheel;
