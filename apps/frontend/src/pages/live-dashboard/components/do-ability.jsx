import ReactApexChart from 'react-apexcharts';

export const ScatterPlotComponent = ({ series }) => {
  // Example series data with custom names and coordinates
  // const series = [
  //   {
  //     name: 'Engage',
  //     data: [[4.3, 4.1]],
  //   },
  //   {
  //     name: 'Nest',
  //     data: [[4.4, 4.0]],
  //   },
  //   {
  //     name: 'Attract',
  //     data: [[3.7, 3.9]],
  //   },
  //   {
  //     name: 'Back',
  //     data: [[4.4, 4.1]],
  //   },
  //   {
  //     name: 'Learn',
  //     data: [[4.0, 4.0]],
  //   },
  // ];

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
    },
    yaxis: {
      tickAmount: 5,
      stepSize: 1,
      min: 0,
      max: 5,
      title: {
        text: 'Do-ability',
      },
    },
    title: {
      text: 'Aggregation Important to us/ do-ability',
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
          data[0] +
          '</span><br>' +
          '<span>Do-ability: ' +
          data[1] +
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
        series={series}
        type="scatter"
        height={350}
      />
    </div>
  );
};
