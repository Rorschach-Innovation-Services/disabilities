import { Typography, Box, Stack } from "@mui/material";
import {
  VictoryStack,
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
} from "victory";
import React from "react";
import { Legend, CircularProgressBar, SleepHealthScoreScale } from ".";
import { PDFData } from "../../../utilities/pdf-data";

type GroupSleepHealthProps = {
  downArrowIcon: string;
  data: PDFData;
};

/**
Section for the group sleep health
@param downArrowIcon down arrow
@param data pdf data
*/
export const GroupSleepHealth = ({
  downArrowIcon,
  data,
}: GroupSleepHealthProps) => {
  return (
    <Box sx={{ marginTop: "0px" }}>
      <Typography
        sx={{
          fontSize: "20px",
          color: "rgb(147,184,228)",
          fontWeight: 800,
          marginBottom: "20px",
        }}
      >
        Group sleep health
      </Typography>
      <Stack
        direction="row"
        sx={{ marginBottom: "10px" }}
        justifyContent="space-between"
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            width: "500px",
          }}
        >
          Average sleep health score:
        </Typography>
        <CircularProgressBar
          value={Math.round(data.sleepHealthScore.score)}
          sx={{ width: "230px" }}
          percentageSx={{ marginLeft: "26px", marginTop: "-80px" }}
        />
        <SleepHealthScoreScale
          downArrowIcon={downArrowIcon}
          value={Math.round(data.sleepHealthScore.score)}
        />
      </Stack>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          marginBottom: "10px",
        }}
      >
        Proportion of employees with poor, fair and excellent sleep health:
      </Typography>
      <Legend
        data={[
          { label: "Poor", color: "#3b3838" },
          { label: "Fair", color: "#7f7f7f" },
          { label: "Excellent", color: "#93b7e4" },
        ]}
        sx={{
          marginLeft: "200px",
          marginBottom: "10px",
        }}
      />
      <VictoryChart
        domainPadding={{ x: 5 }}
        horizontal
        width={900}
        style={{
          parent: {
            height: "200px",
          },
        }}
      >
        <VictoryAxis style={{ tickLabels: { fontSize: 20 } }} />
        <VictoryStack colorScale={["#3b3838", "#7f7f7f", "#93b7e4"]}>
          <VictoryBar
            barWidth={60}
            labels={({ datum }) => datum.y}
            labelComponent={
              <VictoryLabel
                dx={-30}
                textAnchor="middle"
                verticalAnchor="middle"
                style={[
                  {
                    margin: "0 auto",
                    fill: "white",
                    fontSize: 25,
                    textAlign: "center",
                  },
                ]}
              />
            }
            data={[
              { x: "Men", y: data.sleepHealthScore.poor.men },
              { x: "Women", y: data.sleepHealthScore.poor.women },
              { x: "All", y: data.sleepHealthScore.poor.all },
            ]}
          />
          <VictoryBar
            barWidth={60}
            labels={({ datum }) => datum.y}
            labelComponent={
              <VictoryLabel
                dx={-30}
                textAnchor="middle"
                verticalAnchor="middle"
                style={[
                  {
                    margin: "0 auto",
                    fill: "white",
                    fontSize: 25,
                    textAlign: "center",
                  },
                ]}
              />
            }
            data={[
              { x: "Men", y: data.sleepHealthScore.fair.men },
              { x: "Women", y: data.sleepHealthScore.fair.women },
              { x: "All", y: data.sleepHealthScore.fair.all },
            ]}
          />
          <VictoryBar
            barWidth={60}
            labels={({ datum }) => datum.y}
            labelComponent={
              <VictoryLabel
                dx={-30}
                textAnchor="middle"
                verticalAnchor="middle"
                style={[
                  {
                    margin: "0 auto",
                    fill: "black",
                    fontSize: 25,
                    textAlign: "center",
                  },
                ]}
              />
            }
            data={[
              { x: "Men", y: data.sleepHealthScore.excellent.men },
              { x: "Women", y: data.sleepHealthScore.excellent.women },
              { x: "All", y: data.sleepHealthScore.excellent.all },
            ]}
          />
        </VictoryStack>
      </VictoryChart>
      <Typography
        sx={{ fontSize: "11px", fontWeight: 400, marginLeft: "40px" }}
      >
        Note: in the interest of confidentiality, we only present sleep data by
        gender for groups with more than five people.
      </Typography>
    </Box>
  );
};
