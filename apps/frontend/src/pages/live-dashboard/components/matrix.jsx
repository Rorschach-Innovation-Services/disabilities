import React from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = [
  '#0070C0', '#00E396', '#FEB019', '#FF4560', '#775DD0', 
  '#00D9E0', '#008FFB', '#D7263D', '#F9C80E', '#9F86FF', 
  '#662E9B', '#2A2B2A', '#85FFC7', '#FF6F91', '#FF9671', 
  '#FFC75F', '#F9F871', '#EA7317', '#3BB273', '#A62349', 
  '#5C3C92', '#0F4C5C'
];

export const BubbleChart = ({ styles, title, series }) => {
  // Jitter function to apply slight random variation to close points
  const jitterAmount = 0.25; 

  const jitter = (value) => {
    return value + (Math.random() * 2 - 1) * jitterAmount;
  };

  // jitter to close points
  const jitteredSeries = series.map((entry) => ({
    ...entry,
    data: entry.data.map(([x, y]) => [jitter(x), jitter(y)]),
  }));

  // Calculate the average for both x (Important to us) and y (Do-ability)
  const allPoints = series.flatMap(entry => entry.data); 
  const avgX = allPoints.reduce((sum, [x]) => sum + x, 0) / allPoints.length;
  const avgY = allPoints.reduce((sum, [, y]) => sum + y, 0) / allPoints.length;

  const options = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy',
      },
    },
    xaxis: {
      tickAmount: 5, 
      type: 'numeric',
      min: 0,
      max: 5,
      title: {
        text: 'Important to us',
      },
      labels: {
        formatter: function (val) {
          return Number.isInteger(val) ? val : '';
        },
      },
    },
    yaxis: {
      tickAmount: 5, 
      min: 0,
      max: 5,
      title: {
        text: 'Do-ability',
      },
      labels: {
        formatter: function (val) {
          return Number.isInteger(val) ? val : '';
        },
      },
    },
    markers: {
      size: 12, 
      colors: colors,
      opacity: 0.6, 
      strokeColors: '#fff', 
      strokeWidth: 2,
      shape: 'circle',
    },
    fill: {
      type: 'solid',
    },
    colors: colors,
    title: {
      text: title,
      align: 'center',
    },
    tooltip: {
      shared: false,
      intersect: true,
      show: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        // Custom tooltip with data points rounded to 2 decimal places
        const roundedX = data[0].toFixed(2); // x value
        const roundedY = data[1].toFixed(2); // y value
        return (
          '<div class="p-2" style="padding:5px;">' +
          '<h4>' +
          w.globals.seriesNames[seriesIndex] +
          '</h4><br>' +
          '<span>Important to us: ' +
          roundedX +
          '</span><br>' +
          '<span>Do-ability: ' +
          roundedY +
          '</span>' +
          '</div>'
        );
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      containerMargin: {
        top: 20,
      },
      fontSize: '14px',
      itemMargin: {
        vertical: 5,
        horizontal: 5,
      },
      columns: 3,
      formatter: (seriesName) => `<div class="legend-item">${seriesName}</div>`,
    },
    annotations: {
      xaxis: [
        {
          x: avgX, // Average of "Important to us" values
          borderColor: '#000',
          strokeDashArray: 3,
          label: {
            borderColor: '#000',
            style: {
              color: '#000',
              background: '#fff',
            },
            text: `Average Important to us: ${avgX.toFixed(2)}`,
          },
        },
      ],
      yaxis: [
        {
          y: avgY, // Average of "Do-ability" values
          borderColor: '#000',
          strokeDashArray: 3,
          label: {
            borderColor: '#000',
            style: {
              color: '#000',
              background: '#fff',
            },
            text: `Average Do-ability: ${avgY.toFixed(2)}`,
          },
        },
      ],
    },
  };

  return (
    <div className="chart-container" style={styles}>
      <ReactApexChart
        options={options}
        series={jitteredSeries}
        type="scatter"
        height={350}
      />
    </div>
  );
};
