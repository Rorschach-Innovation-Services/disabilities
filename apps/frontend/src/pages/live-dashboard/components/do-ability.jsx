import ReactApexChart from 'react-apexcharts';

export const ScatterPlotComponent = ({ series }) => {
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
      size: 20,
    },
    fill: {
      type: 'solid',
      opacity: 0.8,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        return w.globals.initialSeries[seriesIndex].name;
      },
      style: {
        fontSize: '14px', 
        fontWeight: '600', 
        color: '#fff', 
        cssClass: 'apexcharts-data-label', 
      },
      background: {
        enabled: true,
        padding: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0070C0', 
        opacity: 0.85, 
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 2,
        blur: 4,
        opacity: 0.2, 
      },
      offsetY: -20, 
      offsetX: 0, 
    },
    
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
