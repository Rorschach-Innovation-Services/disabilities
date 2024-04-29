import React, { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Logo from "../../assets/logos/Sleep Science Logo NT RGB.png";
import { useHistory, useParams } from "react-router-dom";
import BackgroundImage from "../../assets/images/Black ripple.jpg";
import { useFormik } from "formik";
import { useAxios } from "../../hooks/axios";
import { Content } from "./components/content";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Checks if a string contains a single number
const hasNumbers = (string) => {
  for (let i = 0; i < string.length; i++) {
    if (numbers.includes(string[i])) return true;
  }
  return false;
};

const styles = {
  input: {
    // marginBottom: "10px",
    "div.MuiOutlinedInput-root": {
      height: "30px",
      // width: "200p x",
      fontSize: "12px",
      borderRadius: "5px",
    },
  },
  passwordIcon: {
    width: "11px",
  },
  errorHelpers: {
    fontSize: "9px",
    color: "red",
  },
};

export const CreatePassword = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const { response, error, executeWithData, loading } = useAxios({
    url: `/admin/${id}/reset-password`,
    method: "post",
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {};

      if (!hasNumbers(values.password))
        errors.password = "Needs to have at least 1 number";
      if (values.password.length < 8)
        errors.password = "Needs to be at least 8 characters long";
      if (values.password !== values.confirmPassword)
        errors.confirmPassword = "Passwords don't match";
      if (!values.confirmPassword) errors.confirmPassword = "Required";
      if (!values.password) errors.password = "Required";

      return errors;
    },
    onSubmit: (values) => {
      executeWithData({ password: values.password });
    },
  });

  const render = () => {
    if (error)
      return <Typography sx={{ color: "red" }}>An error occurred</Typography>;
    if (response)
      return (
        <Typography sx={{ color: "green" }}>
          Your password has been successfully set
        </Typography>
      );
    return <Content styles={styles} formik={formik} loading={loading} />;
  };

  useEffect(() => {
    if (response) {
      setTimeout(() => {
        push("/sign-in");
      }, 2000);
    }
  }, [response]);

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "transparent",
        backgroundImage: `url("${BackgroundImage}")`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <Box
        component="img"
        alt="logo"
        onClick={() => push("/")}
        src={Logo}
        sx={{ maxWidth: "60px", margin: "24px 0 0 31px", cursor: "pointer" }}
      />
      <Paper
        elevation={0}
        sx={{
          borderRadius: "15px",
          width: "290px",
          padding: "30px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "7px",
        }}
      >
        {render()}
      </Paper>
    </Box>
  );
};
