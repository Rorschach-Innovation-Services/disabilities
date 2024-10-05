import React from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = [
  '#0070C0',
  '#00E396',
  '#FEB019',
  '#FF4560',
  '#775DD0',
  '#00D9E0',
  '#008FFB',
  '#D7263D',
  '#F9C80E',
  '#9F86FF',
  '#662E9B',
  '#2A2B2A',
  '#85FFC7',
  '#FF6F91',
  '#FF9671',
  '#FFC75F',
  '#F9F871',
  '#EA7317',
  '#3BB273',
  '#A62349',
  '#5C3C92',
  '#0F4C5C',
];

export const BubbleChart = ({ styles, title, series }) => {
  // averages for x and y axes
  const allDataPoints = series.flatMap(entry => entry.data);
  const xValues = allDataPoints.map(point => point[0]);
  const yValues = allDataPoints.map(point => point[1]);
  
  const xAverage = xValues.reduce((sum, val) => sum + val, 0) / xValues.length;
  const yAverage = yValues.reduce((sum, val) => sum + val, 0) / yValues.length;

  const options = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy',
      },
    },
    dataLabels: {
      enabled: true, // Enable data labels
      formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        return w.globals.initialSeries[seriesIndex].name; // Show series name as label
      },
      style: {
        fontSize: '14px', // Increased font size for better visibility
        fontWeight: '600', // Semi-bold for a softer look
        color: '#fff', // White text for contrast
        cssClass: 'apexcharts-data-label', // Custom CSS class for more styling options
      },
      background: {
        enabled: true,
        padding: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0070C0', // Change border color for a softer appearance
        opacity: 0.85, // Slightly more transparent for a modern look
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        opacity: 0.2, // Soft shadow for a lifted effect
      },
      offsetY: -30, 
      offsetX: -0,
    },
    xaxis: {
      tickAmount: 5,
      stepSize: 1,
      min: 0,
      max: 5,
      type: 'numeric',
      title: {
        text: 'Important to us',
      },
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: 5,
      title: {
        text: 'Do-ability',
      },
    },
    markers: {
      size: 20,
      colors,
    },
    fill: {
      type: 'solid',
    },
    colors,
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
        return (
          '<div class="p-2" style="padding:5px;">' +
          '<h4>' +
          w.globals.seriesNames[seriesIndex] +
          '</h4><br>' +
          '<span>Important to us: ' +
          data[0] +
          '</span><br>' +
          '<span>Do-ability: ' +
          data[1] +
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
          x: xAverage,
          borderColor: '#000',
          label: {
            text: `Avg x: ${xAverage.toFixed(2)}`,
            style: {
              color: '#000',
              background: '#fff',
            },
          },
        },
      ],
      yaxis: [
        {
          y: yAverage,
          borderColor: '#000',
          label: {
            text: `Avg y: ${yAverage.toFixed(2)}`,
            style: {
              color: '#000',
              background: '#fff',
            },
          },
        },
      ],
    },
  };

  return (
    <div className="chart-container" style={styles}>
      <ReactApexChart
        options={options}
        series={series}
        type="scatter"
        height={350}
      />
    </div>
  );
};
