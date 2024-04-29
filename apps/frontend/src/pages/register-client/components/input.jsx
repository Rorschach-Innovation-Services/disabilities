import React from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";

export const InputItem = ({
  label,
  children,
  textFieldProps,
  executeDispatch,
  value,
  marginLeftProp,
  textStyles
}) => {
  const handleChange = (event) => {
    executeDispatch(event.target.value);
  };
  return (
    <Box component="div" sx={{ display: "flex", marginTop: "2%" }}>
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: "1%" }}
            fontSize={14}
          >
            {label}
          </Typography>
          {children}
        </Grid>
        <Grid item xs={5} marginLeft={marginLeftProp}>
          <TextField
            {...textFieldProps}
            value={value}
            onChange={handleChange}
            sx={{
              ".MuiOutlinedInput-root.MuiInputBase-root": { maxHeight: "35px",
              borderRadius: "15px" },
              marginBottom: "6%",
              ...textStyles,
            }}
          ></TextField>
        </Grid>
      </Grid>
    </Box>
  );
};
