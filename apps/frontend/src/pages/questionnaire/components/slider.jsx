import React from "react";
import { Slider as AppSlider } from "@mui/material";

export const Slider = ({ slider, selected, changeResponse }) => {
  if (!slider || slider.length === 0) return "";

  const marks = slider.map((values) => values);

  return (
    <AppSlider
      aria-label="rating-score"
      defaultValue={1}
      step={1}
      min={1}
      max={10}
      marks={marks}
      onChange={changeResponse}
      value={selected}
      sx={{ width: "72%", mt: "7vh" }}
    />
  );
};
