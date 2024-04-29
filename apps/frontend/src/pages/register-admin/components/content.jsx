import React, { Fragment } from "react";
import { Typography, TextField, Button, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory } from "react-router-dom";

const styles = {
  inputs: {
    ".MuiOutlinedInput-root.MuiInputBase-root": {
      width: "300px",
      height: "30px",
      fontSize: "12px",
      fontWeight: "500",
    },
  },
};

export const RegisterContent = ({ formik, loading }) => {
  const { push } = useHistory();
  const setDisabled = () => {
    if (
      formik.errors.name ||
      formik.errors.email ||
      formik.values.name === "" ||
      formik.values.email === ""
    )
      return true;
    return false;
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}
    >
      <AccountCircleIcon 
        sx={{
          fontSize: "60px",
          marginBottom: "10px"
        }} 
        fontSize="large"/>
      <Typography
        variant="body1"
        sx={{
          fontSize: "18px",
          fontWeight: "600",
          lineHeight: "20px",
          width: "129px",
          height: "20px",
          whiteSpace: "nowrap",
        }}
      >
        Register Admin
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Name"
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        {...formik.getFieldProps("name")}
        sx={{ ...styles.inputs, mt: "20px", mb: "10px" }}
      />
      <TextField
        variant="outlined"
        placeholder="Email"
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        {...formik.getFieldProps("email")}
        sx={{ ...styles.inputs }}
      />
      {loading ? (
        <LoadingButton
          loading={loading}
          variant="outlined"
          loadingPosition="start"
          startIcon={<Save sx={{ color: "transparent" }} />}
          sx={{
            textTransform: "none",
            backgroundColor: "black",
            color: "white !important",
            padding: "1% 2%",
            width: "140px",
            borderRadius: "40px",
            mt: "33px",
          }}
        >
          Registering...
        </LoadingButton>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "0 !important",
            alignItems: "center"
          }}
        >
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={setDisabled()}
            sx={{
              mt: "33px",
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              width: "300px",
              height: "35px",
              borderRadius: "7px",
              ":hover": {
                background: "#000",
              }
            }}
          >
              Register
          </Button>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              width: "300px",
              height: "35px",
              borderRadius: "7px",
              ":hover": {
                background: "#000",
              }
            }}
            onClick={() => push("/staff")}
          >
            Cancel
          </Button>
        </Container>
      )}
    </Container>
  );
};
