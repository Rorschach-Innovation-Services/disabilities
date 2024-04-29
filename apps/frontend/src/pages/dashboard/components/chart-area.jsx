import React from "react";
import { Paper, Typography } from "@mui/material";
import { VictoryPie, VictoryLegend, VictoryLabel } from "victory";

const capitaliseFirstLetter = (string) => {
  const lowered = string.toLowerCase();
  return `${lowered[0].toUpperCase()}${lowered.substring(1, lowered.length)}`;
};

const colors = [
  "#1D1511",
  "#95B8DF",
  "#FFEE83",
  "#EA361D",
  "green",
  "grey",
  "brown",
  "red",
  "orange",
];

export const ChartArea = React.memo(({ clients }) => {
  // Return the client data in a format understandable by formidable victory
  const getData = () => {
    if (!clients) return [];
    const sectors = [];
    clients.forEach((client) => {
      if (!sectors.includes(capitaliseFirstLetter(client.industry))) {
        sectors.push(capitaliseFirstLetter(client.industry));
      }
    });

    return sectors.map((sector, index) => {
      return {
        x: index + 1,
        y: (index + 1) * 1000,
        label: sector,
      };
    });
  };

  return (
    <Paper sx={{ backgroundColor: "white", width: "330px" }}>
      <Typography sx={{ marginLeft: "7%", paddingTop: "3%" }}>
        Sectors
      </Typography>
      <svg width={300} height={300} style={{ margin: "-25% 0 -25% 5%" }}>
        <VictoryLabel text="Total sectors" x={113} y={150} />
        <VictoryLabel
          text={getData().length}
          x={145}
          y={170}
          style={{ fontSize: 10 }}
        />
        <VictoryPie
          width={300}
          height={300}
          standalone={false}
          radius={60}
          innerRadius={45}
          style={{
            labels: { display: "none" },
            parent: { marginTop: "-25%", marginBottom: "-30%" },
          }}
          colorScale={colors}
          data={getData()}
        />
      </svg>
      <svg
        width={400}
        height={100}
        style={{ marginBottom: "-15%", marginLeft: "-15%" }}
      >
        <VictoryLegend
          x={90}
          y={10}
          standalone={false}
          height={100}
          orientation="horizontal"
          symbolSpacer={3}
          style={{
            labels: {
              fontSize: 15,
            },
          }}
          itemsPerRow={3}
          gutter={20}
          colorScale={colors}
          data={getData().map((sector) => ({ name: sector.label }))}
        />
      </svg>
    </Paper>
  );
});
