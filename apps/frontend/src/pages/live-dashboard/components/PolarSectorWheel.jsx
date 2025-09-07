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

// 5 sector colors (same family as BalanceWheel)
const SECTOR_COLORS = [
  'rgba(37, 99, 235, 0.75)',  // Prepare
  'rgba(16, 185, 129, 0.75)', // Integrate
  'rgba(234, 179, 8, 0.75)',  // Value-Add
  'rgba(249, 115, 22, 0.75)', // Optimise
  'rgba(139, 92, 246, 0.75)', // Transfer
];

const PolarSectorWheel = ({
  sectorSummary,
  mode = 'raw', // default to raw
  title = 'Category Averages (5 sectors)',
}) => {
  if (!sectorSummary?.length) {
    return (
      <div style={{ textAlign: 'center', color: '#64748b' }}>
        No sector data available.
      </div>
    );
  }

  // interpret mode flags (not used; preserving existing semantics)

  const { labels, pctValues, rawValues } = useMemo(() => {
    const lbls = sectorSummary.map((s) => s.sector);
    const p = sectorSummary.map((s) => s.pct ?? 0);
    const r = sectorSummary.map((s) => s.raw ?? 0);
    return { labels: lbls, pctValues: p, rawValues: r };
  }, [sectorSummary]);

  // preserve existing mode semantics
  const values = mode === 'raw' ? pctValues : rawValues;

  const chartData = {
    labels,
    datasets: [
      {
        label: mode === 'raw' ? 'Average (%)' : 'Average (0–5)',
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
      title: {
        display: true,
        text: title,
        font: { size: 16, weight: '600' },
      },
      legend: { display: true, position: 'bottom' },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (ctx) => {
            const i = ctx.dataIndex ?? 0;
            const sector = ctx.label || '';
            const rawVal = rawValues[i] ?? 0;
            return `${sector}: ${rawVal.toFixed(2)} / 5`;
          },
        },
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          const i = context.dataIndex ?? 0;
          const rawVal = rawValues[i] ?? 0;
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
    <div
      style={{ width: '100%', maxWidth: 700, height: 480, margin: '0 auto' }}
    >
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PolarSectorWheel;
