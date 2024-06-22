import ReactApexChart from 'react-apexcharts';

export const BubbleChart = () => {
  const series = [
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
      type: 'bubble',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      tickAmount: 10,
      type: 'numeric',
      title: {
        text: 'Important to us',
      },
    },
    yaxis: {
      max: 6,
      title: {
        text: 'Do-ability',
      },
    },
    title: {
      text: 'Priorities: High Importance to us, high do-ability',
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
      },
      formatter: (seriesName) =>
        `<div class="legend-item" style="display:block;text-align:center;padding:5px;">${seriesName}</div>`,
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="bubble"
        height={350}
      />
    </div>
  );
};
