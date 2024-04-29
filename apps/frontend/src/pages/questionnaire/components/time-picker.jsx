import React, { useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, TimePicker as AppTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export const TimePicker = ({ picker, selected, onChange }) => {
  if (!picker) return "";
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      sx={{
        margin: "50px 0px 0px 50px",
      }}
    >
      <AppTimePicker
        label={"Please select a time:"}
        value={selected || new Date()}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        sx={{ width: "37%" }}
      />
    </LocalizationProvider>
  );
};
