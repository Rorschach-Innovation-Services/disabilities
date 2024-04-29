import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Assess,
  Introduction,
  Overview,
  References,
  SleepHealthRiskFactors,
  Summary,
} from "./components";
import { PDFData } from "../../utilities/pdf-data";
import { format } from "date-fns";

type MainProps = {
  participationIcon: string;
  sleepDurationIcon: string;
  percentageIcon: string;
  tripleStarIcon: string;
  filledStarIcon: string;
  outlinedStarIcon: string;
  medicalAidIcon: string;
  pillIcon: string;
  downArrowIcon: string;
  data: PDFData;
};

/** Entire pdf
 * @param participationIcon icon for the participation uptake on the overview section
@param sleepDurationIcon icon for sleep duration
@param percentageIcon icon for percentage sign
@param tripleStarIcon icon for triple star sign
@param filledStarIcon icon for filled in star
@param outlinedStarIcon icon for outlined star
@param medicalAidIcon icon for medical aid
@param pillIcon icon for pill
@param downArrowIcon arrow pointing down
@param data pdf data to be injected into file
 * */
export const Main = ({
  participationIcon,
  sleepDurationIcon,
  percentageIcon,
  tripleStarIcon,
  filledStarIcon,
  outlinedStarIcon,
  medicalAidIcon,
  pillIcon,
  downArrowIcon,
  data,
}: MainProps) => {
  return (
    <Box style={{ position: "relative", zIndex: 0 }}>
      <Typography
        sx={{
          fontSize: "60px",
          color: "rgb(147,184,228)",
          marginTop: "70px",
          textAlign: "center",
          fontWeight: 800,
        }}
      >
        Sleep Health Screen
      </Typography>
      <Typography
        sx={{
          fontSize: "60px",
          color: "rgb(147,184,228)",
          marginTop: "20px",
          textAlign: "center",
          fontWeight: 800,
        }}
      >
        Group Report
      </Typography>
      <Typography
        sx={{
          fontSize: "30px",
          color: "rgb(147,184,228)",
          marginTop: "100px",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        for
      </Typography>
      <Typography
        sx={{
          fontSize: "60px",
          color: "rgb(147,184,228)",
          marginTop: "25px",
          textAlign: "center",
          fontWeight: 800,
        }}
      >
        {data.companyName}
      </Typography>
      <Typography
        sx={{
          fontSize: "30px",
          color: "rgb(147,184,228)",
          marginTop: "80px",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        Date: {format(new Date(data.date), "dd MMMM yyyy")}
      </Typography>
      <Introduction />
      <Overview
        participationIcon={participationIcon}
        downArrowIcon={downArrowIcon}
        data={data}
      />
      <SleepHealthRiskFactors data={data} />
      <Assess
        sleepDurationIcon={sleepDurationIcon}
        percentageIcon={percentageIcon}
        tripleStarIcon={tripleStarIcon}
        filledStarIcon={filledStarIcon}
        outlinedStarIcon={outlinedStarIcon}
        medicalAidIcon={medicalAidIcon}
        pillIcon={pillIcon}
        data={data}
      />
      <Summary data={data} />
      <References />
    </Box>
  );
};
