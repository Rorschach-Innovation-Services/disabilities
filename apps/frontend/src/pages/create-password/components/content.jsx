import React, { Fragment } from "react";
import { Typography, Button } from "@mui/material";
import { Inputs } from "./inputs";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";

export const Content = ({ formik, styles, loading }) => {
  const setDisabled = () => {
    if (
      formik.errors.password ||
      formik.errors.confirmPassword ||
      formik.values.confirmPassword === "" ||
      formik.values.password === ""
    )
      return true;
    return false;
  };

  return (
    <Fragment>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "600",                                                                                                                                                                
        }}
      >
        Please create your password
      </Typography>                                                                       
      <Typography
        sx={{
          fontSize: "10px",                         
        }}
      >
        Your password must be different from previous passwords                                               
      </Typography>
      <Inputs styles={styles} formik={formik} setDisabled={setDisabled} loading={loading} />
    </Fragment>
  );
};
