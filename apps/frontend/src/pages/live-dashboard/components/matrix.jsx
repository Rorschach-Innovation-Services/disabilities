import React from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = ['#0074D9', '#2ECC40', '#B10DC9', '#FF851B', '#FFDC00'];
  // Helper function to calculate median
  const calculateMedian = (numbers) => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  };

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

  // Extract all points and calculate medians
  const allPoints = series.flatMap(entry => entry.data);
  const allX = allPoints.map(([x]) => x);
  const allY = allPoints.map(([, y]) => y);
  
  const medianX = calculateMedian(allX);
  const medianY = calculateMedian(allY);

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
          x: medianX,
          borderColor: '#000',
          strokeDashArray: 3,
          label: {
            borderColor: '#000',
            style: {
              color: '#000',
              background: '#fff',
            },
            text: `Median Important to us: ${medianX.toFixed(2)}`,
          },
        },
      ],
      yaxis: [
        {
          y: medianY,
          borderColor: '#000',
          strokeDashArray: 3,
          label: {
            borderColor: '#000',
            style: {
              color: '#000',
              background: '#fff',
            },
            text: `Median Do-ability: ${medianY.toFixed(2)}`,
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
        height={470}
      />
    </div>
  );
};
