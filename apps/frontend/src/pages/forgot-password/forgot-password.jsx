import React, { useState } from "react";
import { Box, Paper, useMediaQuery } from "@mui/material";
import BackgroundImage from "../../assets/images/Abstract.jpg";
import Logo from "../../assets/logos/Sleep Science Logo NT RGB.png";
import { useHistory } from "react-router-dom";
import { LinkSent } from "./components/link-sent";
import { SendLink } from "./components/send-link";

export const ForgotPassword = () => {
  const { push } = useHistory();
  const changeLayout = useMediaQuery("(max-width:480px)");
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: changeLayout ? "white" : "transparent",
        backgroundImage: `url("${changeLayout ? "" : BackgroundImage}")`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Box
        component="img"
        alt="logo"
        src={Logo}
        onClick={() => push("dashboard")}
        sx={{
          maxWidth: "100px",
          marginTop: "5vh",
          marginLeft: "9vw",
          cursor: "pointer",
        }}
      />
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          width: "500px",
          height: "300px",
          margin: "auto",
          display: "flex",
        }}
      >
        {
          linkSent ?
            <LinkSent
              email={email}
            /> :
            <SendLink
              setLinkSent={setLinkSent}
              setEmail={setEmail}
              email={email}
            />
        }
      </Paper>
    </Box>
  );
};
