import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const NavButton = (props) => {
  const { external, ...res } = props;
  let button = (
    <Button
      {...res}
      component={Link}
      to={props.link}
      color="inherit"
      sx={{ textTransform: "none", ...props.sx }}
    >
      {props.children}
    </Button>
  );
  const externalLink = props.external ? props.external : false;

  if (externalLink === true) {
    button = (
      <a
        to={props.link}
        href={props.link}
        target="_blank"
        rel="noreferrer"
        style={{
          textTransform: "none",
          color: "white",
          textDecoration: "none",
        }}
      >
        <Button
          {...res}
          color="inherit"
          sx={{
            textTransform: "none !important",
            ...props.sx,
          }}
        >
          {props.children}
        </Button>
      </a>
    );
  }

  return button;
};
