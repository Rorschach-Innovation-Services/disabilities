import React, { useEffect, Fragment, useState, useRef } from "react";
import { Typography, Box, Paper, Button, Container } from "@mui/material";
import BackgroundImage from "../../assets/images/Abstract.jpg";
import Logo from "../../assets/logos/Sleep Science Logo NT RGB.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAxios } from "../../hooks/axios";
import { useHistory } from "react-router";
import { RegisterContent } from "./components/content";

export const RegisterAdmin = () => {
  const { push } = useHistory();
  const { executeWithData, response, error, loading } = useAxios({
    url: "/admin/register",
    method: "post",
  });
  const companiesReq = useAxios({ url: "/companies", method: "get" });
  const [companies, setCompanies] = useState([]);
  const withPassword = useRef(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "administrator",
      company: "",
      department: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .required("Required")
        .email("Enter a valid email address"),
      password: Yup.string().min(8, 'At least 8 characters').required('Required'),
      // Require company selection for client roles
      company: Yup.string().when("role", (role, schema) => {
        const r = (role || "").toString().toLowerCase();
        return ["client_super", "client_user"].includes(r)
          ? schema.required("Company is required for client users")
          : schema;
      }),
      // Require department selection for client roles
      department: Yup.string().when("role", (role, schema) => {
        const r = (role || "").toString().toLowerCase();
        return ["client_super", "client_user"].includes(r)
          ? schema.required("Department is required for client users")
          : schema;
      }),
    }),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        role: values.role,
        password: values.password,
        company: ["client_super", "client_user"].includes(
          (values.role || "").toLowerCase()
        )
          ? values.company
          : undefined,
        // Department is optional on backend for now; include when client role
        department: ["client_super", "client_user"].includes(
          (values.role || "").toLowerCase()
        )
          ? values.department
          : undefined,
      };
      withPassword.current = !!values.password;
      executeWithData(payload);
    },
  });

  useEffect(() => {
    companiesReq.execute({});
  }, []);

  useEffect(() => {
    if (companiesReq.response && !companiesReq.error) {
      setCompanies(companiesReq.response.companies || []);
    }
  }, [companiesReq.response, companiesReq.error]);

  const render = () => {
    if (error) {
      if (error.message.includes("409")) {
        return (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "space-around"
            }}
          >
            <Typography sx={{ color: "red" }}>
              There already exists an admin with that email. Please choose a
              different one
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                width: "120px",
                height: "30px",
                borderRadius: "7px",
                placeSelf: "end"
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "12px",
                  fontWeight: "500",
                  lineHeight: "12px",
                }}
              >
                Retry
              </Typography>
            </Button>
          </Container>
        );
      }
      return (
        <Typography sx={{ color: "red", mt: "94px", mr: "92px" }}>
          An error occurred
        </Typography>
      );
    }
    if (response)
      return (
        <Typography sx={{ color: "green" }}>
          {withPassword.current
            ? 'Success! User created.'
            : 'Success! An email will be sent shortly to create a password.'}
        </Typography>
      );
    return (
      <RegisterContent
        formik={formik}
        loading={loading}
        companies={companies}
      />
    );
  };

  useEffect(() => {
    if (response && !error) {
      setTimeout(() => {
        push("/dashboard");
      }, 3000);
    }
  }, [response, error]);

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "transparent",
        backgroundImage: `url("${BackgroundImage}")`,
        backgroundSize: "cover",
        height: "100vh",
        paddingBottom: "80px",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        padding: "30px"
      }}
    >
      <Box
        component="img"
        alt="logo"
        onClick={() => push("/dashboard")}
        src={Logo}
        sx={{ maxWidth: "60px", placeSelf: "start", cursor: "pointer" }}
      />
      <Paper
        elevation={0}
        sx={{
          borderRadius: "31px",
          width: "400px",
          height: "auto",
          marginTop: "15vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}
      >
        {render()}
      </Paper>
    </Box>
  );
};
