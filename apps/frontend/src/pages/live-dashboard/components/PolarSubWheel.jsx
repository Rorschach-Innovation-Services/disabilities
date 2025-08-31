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

// 3 sub-dimension colors (consistent theme)
const SUB_COLORS = [
  'rgba(59, 130, 246, 0.75)',  // Space
  'rgba(245, 158, 11, 0.75)',  // Person
  'rgba(34, 197, 94, 0.75)',   // Culture
];

const PolarSubWheel = ({ subSummary, mode = 'raw', title = 'Sub-Dimension Averages (3 subs)' }) => {
  if (!subSummary?.length) {
    return <div style={{ textAlign: 'center', color: '#64748b' }}>No sub-dimension data available.</div>;
  }

  const { labels, values } = useMemo(() => {
    const lbls = subSummary.map(s => s.sub);
    const vals = subSummary.map(s => mode === 'raw' ? s.pct : s.raw);
    return { labels: lbls, values: vals };
  }, [subSummary, mode]);

  const chartData = {
    labels,
    datasets: [
      {
        label: mode === 'raw' ? 'Average (%)' : 'Average',
        data: values,
        backgroundColor: SUB_COLORS,
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
            return mode === 'raw'
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

export default PolarSubWheel;
