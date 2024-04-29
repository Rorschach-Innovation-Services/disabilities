import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { Colours } from "../../../colours"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAxios } from "../../../hooks/axios";

export const SendLink = ({ setEmail, email, setLinkSent }) => {
  const { executeWithData, response, error } = useAxios({
    url: "/admin/forgot-password",
    method: "post"
  });

  useEffect(() => {
    if(error || !response) return
    setLinkSent(true);
  }, [response, error]);

  const sendEmail = () => {
    if(email !== "")
      executeWithData({ email })
  }
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "30px",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: "28px",
          fontWeight: "600",
          whiteSpace: "nowrap",
          textAlign: "center"
        }}
      >
        Forgot Password
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          color: Colours.darkGrey,
          textAlign: "center"
        }}
    >
        Please enter the registered email address to reset your password. 
    </Typography>
    <TextField
        placeholder="example@email.com"
        onChange={(event) => setEmail(event.target.value)}
        sx={{
          width: "80%",
          borderRadius: "20px",
          ".css-p2j08u-MuiInputBase-root-MuiOutlinedInput-root": {
            borderRadius: "20px",
            paddingLeft: "10px"
          }
        }}
        error={error}
        helperText={error && error.data.message}
        type="email"
        value={email}
      />
      <Button
        onClick={sendEmail}
        sx={{
          color: "white",
          width: "200px",
          textTransform: "none",
          justifyContent: "space-between",
          padding: "6px 15px",
          backgroundColor: "black",
          borderRadius: "10px",
          ":hover": {
            backgroundColor: "#000",
          },
        }}
        endIcon={<ArrowForwardIosIcon/>}
      >
        Send
      </Button>
    </Container>
  );
};
