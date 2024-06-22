import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const RadarChart = ({ title, series }) => {
  const options = {
    chart: {
      type: 'radar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: 'grey',
          strokeWidth: 1,
        },
      },
    },
    title: {
      text: title || '',
      style: {
        color: '#000',
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ['Engage', 'Nest', 'Attract', 'Back', 'Learn'],
    },
    yaxis: {
      //   show: false,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radar"
      height={350}
    />
  );
};
