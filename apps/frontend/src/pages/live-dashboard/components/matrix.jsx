import React from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = ['#0074D9', '#2ECC40', '#B10DC9', '#FF851B', '#FFDC00'];

export const BubbleChart = ({ styles, title, series }) => {
  // Matching jitterAmount to ScatterPlotComponent
  const jitterAmount = 0.075; 

  const jitter = (value) => {
    return value + (Math.random() * 2 - 1) * jitterAmount;
  };

  // Apply jitter to close points
  const jitteredSeries = series.map((entry) => ({
    ...entry,
    data: entry.data.map(([x, y]) => [jitter(x), jitter(y)]),
  }));

  // Calculate averages for both x (Important to us) and y (Do-ability)
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
      opacity: 0.8,
      strokeColors: '#fff', 
      strokeWidth: 2,
      shape: 'circle',
    },
    fill: {
      type: 'solid',
      opacity: 0.8, 
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
        const roundedX = data[0].toFixed(2); 
        const roundedY = data[1].toFixed(2); 
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
          x: avgX, 
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
          y: avgY, 
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
        height={500}
      />
    </div>
  );
};
