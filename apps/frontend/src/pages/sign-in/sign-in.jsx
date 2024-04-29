import React from "react";
import { Container, Typography, useMediaQuery } from "@mui/material";
import { Input } from "./components/input";
import backgroundImg from "../../assets/images/Sign-in.jpg";
import logoImg from "../../assets/logos/Sleep Science Logo NT RGB.png";

export const SignInPage = () => {
  const mobileView = useMediaQuery("(max-width:950px)");
  return (
    <Container
      sx={{
        display: "flex",
        maxWidth: "1200px",
        placeSelf: "center",
        padding: "0px !important",
      }}
    >
      <Container
        sx={{
          width: mobileView ? "100%" : "50%",
          alignItems: mobileView ? "center" : undefined,
          padding: "0px !important",
          paddingTop: "10px !important",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container>
          <img src={logoImg} alt="Sleep Science Logo" height={"100px"} />
        </Container>
        <Input />
      </Container>
      <Container
        sx={{
          width: "50%",
          padding: "0px !important",
          display: mobileView ? "none" : undefined
        }}
      >
        <img
          src={backgroundImg}
          height="100%"
          width="100%"
        />
      </Container>
    </Container>
  );
};
