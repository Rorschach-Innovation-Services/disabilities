import React, { useState } from "react";
import {
  Typography,
  Button,
  Container,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ContentCopy } from "@mui/icons-material";
import { config } from "../../../config";

const clientDomain = config.clientUrl || "https://www.sleepscience.co.za";

export const GenerateLinkContent = ({ companyID,departmentID }) => {
  const { push } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(`${clientDomain}/questionnaire/${companyID}/${departmentID}`)
        .then(() => {
          setCopied(true);
        })
        .catch((error) => {
          enqueueSnackbar("Failed to copy to clipboard", { variant: "error" });
        });
    }
  };

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
          fontSize: "32px",
          fontWeight: "600",
          whiteSpace: "nowrap",
        }}
      >
        Copy Questionnaire Link
      </Typography>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          value={
            companyID && departmentID
              ? `${clientDomain}/questionnaire/${companyID}/${departmentID}`
              : ""
          }
          disabled
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title={copied ? "Copied" : "Copy"}>
                <IconButton onClick={() => copyToClipboard()} edge="end">
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        onClick={() => push("/dashboard")}
        sx={{
          padding: "0px 0px 0px 0px",
          color: "white",
          width: "100%",
          height: "40px",
          textTransform: "none",
          backgroundColor: "black",
          borderRadius: "10px",
          fontWeight: "bold",
          ":hover": {
            backgroundColor: "primary.main",
          },
        }}
      >
        Go to dashboard
      </Button>
    </Container>
  );
};
