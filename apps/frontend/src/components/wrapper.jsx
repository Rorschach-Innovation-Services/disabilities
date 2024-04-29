import React, { Fragment } from "react";
import { Box } from "@mui/material";
import { NavBar } from "./nav-bar";
import { Footer } from "./footer";

// General container
export const Wrapper = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <Box component="div" sx={{ backgroundColor: "rgba(255, 255, 255, 1)" }}>
        {children}
      </Box>
      <Footer />
    </Fragment>
  );
};
