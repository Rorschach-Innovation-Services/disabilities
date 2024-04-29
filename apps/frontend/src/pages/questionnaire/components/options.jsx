import React, { useEffect } from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

export const Options = ({ options, selected, changeResponse }) => {
  if (!options || options.length === 0) return "";
  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={selected}
      variant="outlined"
      exclusive
      onChange={changeResponse}
      sx={{
        marginTop: "2%",
        "button.Mui-selected ": {
          backgroundColor: "black",
          color: "white",
        },
        "button.Mui-selected:hover": {
          backgroundColor: "black",
        },
      }}
    >
      {options.map((option) => (
        <ToggleButton
          key={option}
          value={option}
          sx={{
            marginBottom: "15%",
            border: "1px solid grey",
            borderTop: "1px solid grey !important",
            borderRadius: "15px !important",
            textTransform: "none",
            width: "150%",
          }}
        >
          <Typography variant="subtitle2">{option}</Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
