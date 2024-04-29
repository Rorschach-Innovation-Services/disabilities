import React from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { NavButton } from "./nav-button";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";

// Contains social media links to Sleep Science profile
export const SocialLinks = ({ sx }) => {
  const viewportSize = useMediaQuery("(max-width:501px)");

  return !viewportSize ? (
    <Box
      sx={{
        marginBottom: "1%",
        textAlign: "right",
        marginRight: "8%",
        ...sx,
      }}
    >
      <NavButton external={true} link="https://www.twitter.com/SleepScienceSA/">
        <Typography
          sx={{
            textDecoration: "none",
            textDecorationColor: "white",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          Twitter
        </Typography>
      </NavButton>
      <NavButton
        external={true}
        link="https://www.facebook.com/www.sleepscience.co.za/"
      >
        <Typography
          sx={{
            textDecoration: "none",
            textDecorationColor: "white",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          Facebook
        </Typography>
      </NavButton>
      <NavButton
        external={true}
        link="https://www.instagram.com/sleepscience_/"
      >
        <Typography
          sx={{
            textDecoration: "none",
            textDecorationColor: "white",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          Instagram
        </Typography>
      </NavButton>
      <NavButton
        external={true}
        link="https://www.linkedin.com/company/sleep-science-za/"
      >
        <Typography
          sx={{
            textDecoration: "none",
            textDecorationColor: "white",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          Linkedin
        </Typography>
      </NavButton>
    </Box>
  ) : (
    <Box>
      <NavButton external={true} link="https://www.twitter.com/SleepScienceSA/">
        <Twitter />
      </NavButton>
      <NavButton
        external={true}
        link="https://www.facebook.com/www.sleepscience.co.za/"
      >
        <Facebook />
      </NavButton>
      <NavButton
        external={true}
        link="https://www.instagram.com/sleepscience_/"
      >
        <Instagram />
      </NavButton>
      <NavButton
        external={true}
        link="https://www.linkedin.com/company/sleep-science-za/"
      >
        <LinkedIn />
      </NavButton>
    </Box>
  );
};
