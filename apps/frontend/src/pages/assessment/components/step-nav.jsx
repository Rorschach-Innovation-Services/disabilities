import React, { Fragment } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const styles = {
  buttons: {
    textTransform: "none",
  },
  progressionButtons: {
    color: "white",
    backgroundColor: "rgb(149,184,223)",
  },
};
export const StepNavigation = ({
  activeStep,
  steps,
  filename,
  handleBack,
  handleNext,
  handleSubmit,
}) => {
  const changeNavigationArea = useMediaQuery("(max-width:500px)");
  const getPreviousStepLabel = () => {
    return steps[activeStep];
  };

  const submitButton = (
    <Button
      color="inherit"
      onClick={handleSubmit}
      sx={{
        ...styles.buttons,
        ...styles.progressionButtons,
      }}
    >
      Submit
    </Button>
  );

  const proceedButton = (
    <Button
      color="inherit"
      onClick={handleNext}
      sx={{
        ...styles.buttons,
        ...styles.progressionButtons,
      }}
    >
      Save and continue
    </Button>
  );

  const genLinkButton = (
    <Button
      color="inherit"
      onClick={handleSubmit}
      sx={{
        ...styles.buttons,
        ...styles.progressionButtons,
        borderRadius: 2,
        backgroundColor: "primary.main",
        ":hover": {
          backgroundColor: "primary.main",
        },
      }}
    >
      Generate Link
    </Button>
  );

  // Checks a boolean variable to determine if it renders genLinkButton or submitButton
  const buttonDecision = () => {
    return filename ? submitButton : genLinkButton;
  };

  return (
    <Container 
      sx={{ 
        display: "flex", 
        marginTop: "20px", 
        marginBottom: "30px",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "500"
        }}
      >
        {getPreviousStepLabel()}
      </Typography>
      <Divider
        sx={{
          width: "60%",
          // height: "50px",
          borderColor: "black",
          borderBottomWidth: 1,
        }}
      />
      <Button
        onClick={handleBack}
        sx={{ ...styles.buttons, color: "black" }}
      >
        Previous step
      </Button>
      {activeStep === steps.length - 1 ? buttonDecision() : proceedButton}
    </Container>
  );
};
