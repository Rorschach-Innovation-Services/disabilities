import React from "react";
import Chart from "react-apexcharts";

const SECTORS = [
  "Plan/Prepare",
  "Integrate",
  "Value Based",
  "Optimise",
  "Transfer"
];
const SPOKES = ["Space", "Person", "Culture"];

// axis labels 
const categories = SECTORS.flatMap(sector =>
  SPOKES.map(spoke => `${sector} - ${spoke}`)
);

// Example data series 
const exampleData = [
  {
    name: "Assessment 1",
    data: [8, 6, 7, 5, 7, 8, 9, 6, 5, 7, 8, 6, 7, 5, 6]
  }
];

const sectorColors = [
  "#FF6384", "#FF6384", "#FF6384", // Plan/Prepare
  "#36A2EB", "#36A2EB", "#36A2EB", // Integrate
  "#FFCE56", "#FFCE56", "#FFCE56", // Value Based
  "#4BC0C0", "#4BC0C0", "#4BC0C0", // Optimise
  "#9966FF", "#9966FF", "#9966FF"  // Transfer
];

const options = {
  chart: {
    type: "radar",
    toolbar: { show: false }
  },
  title: {
    text: "5-Quadrant Spider Web Graph with Subdivisions"
  },
  xaxis: {
    categories,
    labels: {
      show: true,
      style: { fontSize: "12px" },
      formatter: (val) => val
    }
  },
  yaxis: {
    min: 0,
    max: 10,
    tickAmount: 5,
    labels: {
      formatter: (val) => `${val}`
    }
  },
  stroke: { width: 2 },
  fill: { opacity: 0.2 },
  legend: { show: true },
  markers: { size: 5 },
  tooltip: {
    enabled: true,
    y: {
      formatter: (val) => `${val}`
    }
  },
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: "#e9e9e9",
        connectorColors: "#e9e9e9",
        fill: {
          colors: [
            "#f8f8f8", "#fff"
          ]
        }
      }
    }
  },
  colors: sectorColors // Color-code each axis (optional)
};

const SpiderRadarChart = () => (
  <Chart options={options} series={exampleData} type="radar" height={500} />
);

export default SpiderRadarChart;