import { Box, Typography } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";

type CustomTextProps = {
  first: string | ReactNode;
  second: string | ReactNode;
  firstSx?: CSSProperties;
  secondSx?: CSSProperties;
  sx?: CSSProperties;
};

/**
For text that consists of two parts
@param first text value
@param second text value
@param firstSx styling for first text
@param secondSx styling for second text
@param sx styling for top level element
*/
export const CustomText = ({
  first,
  second,
  firstSx,
  secondSx,
  sx,
}: CustomTextProps) => {
  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 500,
          ...firstSx,
        }}
      >
        {first}
      </Typography>
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 500,
          ...secondSx,
        }}
      >
        {second}
      </Typography>
    </Box>
  );
};
