import React from "react";
import { Box } from "@mui/material";
import logoImg from "../../../assets/logos/Sleep Science Logo NT RGB.png";
import { useHistory } from "react-router-dom";

export const Logo = () => {
  const { push } = useHistory();
  return (
    <Box
      onClick={() => {
        push("/");
      }}
      sx={{
        backgroundColor: "transparent",
        backgroundImage: `url("${logoImg}")`,
        backgroundSize: "cover",
        height: "100px",
        maxHeight: "100px",
        cursor: "pointer",
        borderRadius: 10,
      }}
    />
  );
};
