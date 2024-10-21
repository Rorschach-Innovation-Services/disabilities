import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const ScatterPlotComponent = ({ series }) => {
 
  const jitterAmount = 0.025; 

  const jitter = (value) => {
    return value + (Math.random() * 2 - 1) * jitterAmount;
  };

  const jitteredSeries = series.map((entry) => ({
    ...entry,
    data: entry.data.map(([x, y]) => [jitter(x), jitter(y)]),
  }));

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
      stepSize: 1,
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
      stepSize: 1,
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
    title: {
      text: 'Aggregation Important to us / Do-ability',
      align: 'center',
    },
    markers: {
      size: 12,
    },
    fill: {
      type: 'solid',
      opacity: 0.8,
    },
    colors: ['#0074D9', '#2ECC40', '#B10DC9', '#FF851B', '#FFDC00'],
    tooltip: {
      show: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return (
          '<div class="p-2" style="padding:5px;">' +
          '<h4>' +
          w.globals.seriesNames[seriesIndex] +
          '</h4><br>' +
          '<span>Important to us: ' +
          data[0].toFixed(2) +  
          '</span><br>' +
          '<span>Do-ability: ' +
          data[1].toFixed(2) + 
          '</span>' +
          '</div>'
        );
      },
    },
  };

  return (
    <div className="scatter-chart">
      <ReactApexChart
        options={options}
        series={jitteredSeries} 
        type="scatter"
        height={350}
      />
    </div>
  );
};
