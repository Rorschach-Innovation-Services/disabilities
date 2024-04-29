import { Typography, Box, Stack } from "@mui/material";
import React from "react";
import { VictoryPie, VictoryChart, VictoryBar, VictoryAxis } from "victory";
import { Legend, GroupSleepHealth } from ".";
import { PDFData } from "../../../utilities/pdf-data";
import { format, getDay, getMonth } from "date-fns";

type OverviewProps = {
  participationIcon: string;
  downArrowIcon: string;
  data: PDFData;
};

/**
 * Overview section of pdf
 * @param participationIcon
@param downArrowIcon arrow pointing down
@param data pdf data
 * */
export const Overview = ({
  participationIcon,
  downArrowIcon,
  data,
}: OverviewProps) => {
  const setSreeningPeriod = () => {
    const startDate = new Date(data.screeningPeriod.start);
    const endDate = new Date(data.screeningPeriod.start);

    if (
      getMonth(startDate) === getMonth(endDate) &&
      getDay(startDate) === getDay(endDate)
    )
      return `${format(endDate, "dd MMMM yyyy")}`;
    else if (getMonth(startDate) === getMonth(endDate))
      return `${format(startDate, "dd")} - ${format(endDate, "dd MMMM yyyy")}`;
    return `${format(startDate, "dd MMMM yyyy")} - ${format(
      endDate,
      "dd MMMM yyyy"
    )}`;
  };

  return (
    <Box sx={{ margin: "0 auto", marginTop: "70px", px: "60px" }}>
      <Typography
        sx={{
          fontSize: "25px",
          color: "rgb(147,184,228)",
          textAlign: "center",
          fontWeight: 800,
          textTransform: "uppercase",
        }}
      >
        Overview
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          color: "rgb(147,184,228)",
          fontWeight: 800,
          marginTop: "10px",
        }}
      >
        General information
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          marginTop: "10px",
        }}
      >
        <b>Screening period:</b> {setSreeningPeriod()}
      </Typography>
      <Stack direction="row" sx={{ marginTop: "20px" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            Participation uptake
          </Typography>
          <Box
            sx={{
              marginTop: "10px",
              border: "2px solid rgb(147,184,228)",
              padding: "10px",
              width: "220px",
              height: "170px",
            }}
          >
            <Stack direction="row">
              <Box
                component="img"
                src={`data:image/png;base64,${participationIcon}`}
                sx={{ height: "80px", width: "120px" }}
              />
              <Typography
                sx={{
                  fontSize: "30px",
                  fontWeight: 500,
                  marginTop: "20px",
                  marginLeft: "6px",
                }}
              >
                {Math.round(data.participationUptake)}%
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                textAlign: "center",
                width: "200px",
              }}
            >
              Number of invited employees who completed the questionnaire.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              marginLeft: "20px",
            }}
          >
            Gender distribution
          </Typography>
          <VictoryPie
            colorScale={["#d5e2f6", "#b1cbed"]}
            labels={({ datum }) => (datum.y === 0 ? "" : `${datum.y}%`)}
            labelRadius={50}
            style={{
              parent: {
                height: "185px",
                width: "175px",
                marginBottom: "20px",
                marginTop: "-15px",
              },
              labels: { fontSize: "40px", fontWeight: 600 },
            }}
            data={[
              {
                x: 1,
                y: Math.round(
                  (data.genderDistribution.men /
                    Object.values(data.genderDistribution).reduce(
                      (previousValue, currentValue) =>
                        previousValue + currentValue
                    )) *
                    100
                ),
                fill: "#b1cbed",
              },
              {
                x: 2,
                y: Math.round(
                  (data.genderDistribution.women /
                    Object.values(data.genderDistribution).reduce(
                      (previousValue, currentValue) =>
                        previousValue + currentValue
                    )) *
                    100
                ),
                fill: "#d5e2f6",
              },
            ]}
          />
          <Legend
            data={[
              { label: "Male", color: "#d5e2f6" },
              { label: "Female", color: "#b1cbed" },
            ]}
            sx={{ marginLeft: "25px", marginTop: "-30px" }}
          />
        </Box>
        <Box sx={{ marginLeft: "20px" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              marginLeft: "50px",
            }}
          >
            Age distribution
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              marginLeft: "50px",
            }}
          >
            Average age: {data.ageDistribution.average}y
          </Typography>
          <VictoryChart
            domainPadding={{ x: 20 }}
            style={{
              parent: {
                width: "280px",
                height: "240px",
                marginTop: "-45px",
                marginRight: "-65px",
              },
            }}
          >
            <VictoryAxis
              label="Age category (y)"
              style={{
                axisLabel: { fontSize: "25px", padding: 50, fontWeight: 600 },
                tickLabels: { fontSize: "22px", fontWeight: 600 },
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Number"
              offsetX={70}
              style={{
                axisLabel: {
                  fontSize: "23px",
                  padding: 35,
                },
                tickLabels: { fontSize: "20px", fontWeight: 600 },
                grid: {
                  stroke: "#d8d8d8",
                  strokeWidth: 1.5,
                },
              }}
            />
            <VictoryBar
              style={{
                data: { fill: "#b1cbed" },
              }}
              data={[
                { x: "20-29", y: data.ageDistribution["20-29"] },
                { x: "30-39", y: data.ageDistribution["30-39"] },
                { x: "40-49", y: data.ageDistribution["40-49"] },
                { x: "50-59", y: data.ageDistribution["50-59"] },
                { x: "60-69", y: data.ageDistribution["60-69"] },
              ]}
            />
          </VictoryChart>
        </Box>
      </Stack>
      <GroupSleepHealth downArrowIcon={downArrowIcon} data={data} />
    </Box>
  );
};
