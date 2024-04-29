import React from "react";
import { Typography, Container } from "@mui/material";

export const StatsBox = ({ Icon, name, figure, units }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "white",
        gap: "10px",
        borderRadius: "10px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
        maxWidth: "170px",
        padding: "10px !important",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "15px",
          padding: "0 !important"
        }}
      >
        <img
          src={Icon}
          width="25px"
          height="25px"
        />
        <Typography
          sx={{
            fontSize: "14px"
          }}
        >
          {name}
        </Typography>
      </Container>
      <Typography
        sx={{ 
          fontSize: "28px",
          fontWeight: "bold"
        }}
      >
        {figure}{units}
      </Typography>
    </Container>
  );
};
