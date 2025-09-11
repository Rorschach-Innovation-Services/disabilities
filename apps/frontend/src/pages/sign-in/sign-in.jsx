import React from "react";
import { Container, useMediaQuery } from "@mui/material";
import { Input } from "./components/input";
import logoImg from "../../assets/logos/Pivot-Logo-6.png";

export const SignInPage = () => {
  const mobileView = useMediaQuery("(max-width:950px)");

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", 
        maxWidth: "1200px",
        placeSelf: "center",
        padding: "0px !important",
      }}
    >
      <img
        src={logoImg}
        alt="Pivot Logo"
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          objectFit: "cover",
          marginTop: "40px", 
        }}
      />
      <Input />
    </Container>
  );
};
