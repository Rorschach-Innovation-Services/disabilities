import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import React, { CSSProperties } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

type CircularProgressBarProps = {
  value: number;
  sx?: BoxProps["sx"];
  percentageSx?: TypographyProps["sx"];
  strokeWidth?: number;
  strokeColor?: string;
  rootSx?: CSSProperties;
  pathSx?: CSSProperties;
};

/**
Circular progress bar reflecting sleep health score
@param value of the progress bar
@param sx styling of top element
@param percentageSx styling of percentage text
@param strokeWidth value of cirlce stroke
@param strokeColor colour of progress bar
*/
export const CircularProgressBar = ({
  value,
  sx,
  percentageSx,
  strokeWidth,
  strokeColor,
  rootSx,
  pathSx,
}: CircularProgressBarProps) => {
  return (
    <Box
      sx={{
        width: "200px",
        height: "90px",
        marginLeft: "20px",
        marginTop: "-25px",
        ...sx,
      }}
    >
      <CircularProgressbar
        value={value}
        circleRatio={0.5}
        strokeWidth={strokeWidth || 15}
        styles={{
          root: {
            transform: "rotate(0.75turn)",
            ...rootSx,
          },
          path: {
            stroke: strokeColor || "rgb(166,198,235)",
            strokeLinecap: "round",
            ...pathSx,
          },
          trail: { stroke: "black", strokeLinecap: "round" },
        }}
      />
      <Typography
        sx={{
          marginLeft: "20px",
          marginTop: "-70px",
          fontSize: "25px",
          fontWeight: 700,
          ...percentageSx,
        }}
      >
        {value}%
      </Typography>
    </Box>
  );
};
