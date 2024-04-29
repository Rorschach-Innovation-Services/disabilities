import { Box, Typography, Rating } from "@mui/material";
import React, { ReactNode } from "react";

type StarComponentProps = {
  numberOfMen: number;
  numberOfWomen: number;
};

/**
@param numberOfMen number of men rating
@param numberOfWomen number of women rating
*/
export const StarComponent = ({
  numberOfMen,
  numberOfWomen,
}: StarComponentProps) => {
  return (
    <Box
      sx={{
        marginTop: "15px",
        ".css-1c99szj-MuiRating-icon": { color: "rgb(154,184,224)" },
      }}
    >
      <Box sx={{ display: "flex", marginBottom: "15px" }}>
        <Typography
          sx={{ fontSize: "15px", fontWeight: 700, marginRight: "35px" }}
        >
          Women:
        </Typography>
        <Rating
          name=""
          readOnly
          max={10}
          value={numberOfWomen}
          sx={{ fontSize: "40px", color: "rgb(154,184,224)", mt: "-7px" }}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ fontSize: "15px", fontWeight: 700, marginRight: "57px" }}
        >
          Men:
        </Typography>
        <Rating
          name=""
          readOnly
          max={10}
          value={numberOfMen}
          sx={{ fontSize: "40px", color: "rgb(154,184,224)", mt: "-7px" }}
        />
      </Box>
    </Box>
  );
};
