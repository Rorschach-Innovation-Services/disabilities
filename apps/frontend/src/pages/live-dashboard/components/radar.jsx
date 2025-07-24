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
      categories: ['Plan/Prepare', 'Integrate', 'Value-Add', 'Opportunities', 'Transfer'],
    },
    yaxis: {
      show: true,
      tickAmount: 5,
      stepSize: 1,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radar"
      height={500}
    />
  );
};
