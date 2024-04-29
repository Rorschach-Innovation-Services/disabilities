import React, { useEffect, useState } from "react";
import {
  Input,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

export const OtherInput = ({
  otherField,
  error,
  value,
  type,
  handleOtherResponse,
  other,
  inputType,
  validInput,
}) => {
  const letters = /^[A-Za-z]+$/;

  if (!otherField) return "";
  return (
    <FormControl
      variant="standard"
      sx={{ width: "50%", margin: "12% 0 0 14%" }}
      error={error !== ""}
    >
      <Input
        onChange={handleOtherResponse}
        value={value}
        type={type}
        endAdornment={
          <InputAdornment position="end" sx={{ color: "black" }}>
            {other ? other : ""}
          </InputAdornment>
        }
      />
      <FormHelperText id="standard-weight-helper-text">{error}</FormHelperText>
    </FormControl>
  );
};
