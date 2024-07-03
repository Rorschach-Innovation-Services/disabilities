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
  const testSeries = [
    {
      name: 'strategic integr. pols',
      data: [[4.0, 4.3, 20]],
    },
    {
      name: 'commit publically',
      data: [[4.2, 4.5, 20]],
    },
    {
      name: 'conversations abt bias',
      data: [[4.2, 4.5, 20]],
    },
    {
      name: 'learning2change culture',
      data: [[4.2, 4.6, 20]],
    },
    {
      name: 'board commits',
      data: [[3.3, 3.9, 20]],
    },
    {
      name: 'work space needs',
      data: [[3.7, 4.3, 20]],
    },
    {
      name: 'support neurodiverse',
      data: [[3.2, 4.5, 20]],
    },
    {
      name: 'uni design & access',
      data: [[3.7, 4.8, 20]],
    },
    {
      name: 'UDL',
      data: [[4.2, 4.6, 20]],
    },
    {
      name: 'inclusive platforms',
      data: [[3.6, 4.6, 20]],
    },
    {
      name: 'prior learning in recruit',
      data: [[3.8, 4.4, 20]],
    },
    {
      name: 'match assets to job',
      data: [[4.0, 4.3, 20]],
    },
    {
      name: 'integr wellness prog',
      data: [[4.0, 4.5, 20]],
    },
    {
      name: 'Career Plans',
      data: [[3.8, 4.6, 20]],
    },
    {
      name: 'transport',
      data: [[3.8, 3.1, 20]],
    },
    {
      name: 'coach & mentor',
      data: [[4.2, 4.5, 20]],
    },
    {
      name: 'flexible hours',
      data: [[4.0, 4.5, 20]],
    },
    {
      name: 'social networks',
      data: [[4.2, 4.6, 20]],
    },
    {
      name: 'Equal work/pay',
      data: [[4.2, 4.7, 20]],
    },
    {
      name: 'skills programmes',
      data: [[4.0, 4.6, 20]],
    },
    {
      name: 'Capture data',
      data: [[4.0, 4.0, 20]],
    },
    {
      name: 'Embed learning',
      data: [[4.5, 4.3, 20]],
    },
    {
      name: 'Use experiences to build',
      data: [[4.2, 4.6, 20]],
    },
    {
      name: 'Monitor progress',
      data: [[4.0, 4.6, 20]],
    },
    {
      name: 'Scale through organisation',
      data: [[4.5, 4.3, 20]],
    },
  ];

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
      enabled: false,
    },
    xaxis: {
      tickAmount: 5,
      stepSize: 1,
      min: 0,
      max: 6,
      type: 'numeric',
      title: {
        text: 'Important to us',
      },
    },
    yaxis: {
      tickAmount: 10,
      min: 0,
      max: 6,
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
