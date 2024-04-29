import { Stack, Box, Typography } from "@mui/material";
import React, { CSSProperties } from "react";

type LegendProps = {
  data: { label: string; color: string }[];
  labelSx?: CSSProperties;
  iconSx?: CSSProperties;
  direction?: "row" | "column";
  sx?: CSSProperties;
};

/**
 * Legend for charts
 * @param data to be displayed in legend
 * @param labelSx styling for the labels
 * @param iconSx styling for color icon associated to label
 * @param direction if legend is vertical or horizontal
 * @param sx styling for parent element
 * */
export const Legend = ({
  data,
  labelSx,
  iconSx,
  direction,
  sx,
}: LegendProps) => {
  return (
    <Box sx={sx}>
      <Stack direction={direction || "row"}>
        {data.map((item, index) => (
          <Stack
            direction="row"
            key={item.color + index}
            sx={{
              marginRight: "20px",
              marginBottom: direction === "column" ? "10px" : "0",
            }}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                backgroundColor: item.color,
                marginRight: "5px",
                ...iconSx,
              }}
            />
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                marginTop: "-5px",
                ...labelSx,
              }}
            >
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
