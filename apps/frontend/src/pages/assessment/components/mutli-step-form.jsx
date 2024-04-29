import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { UploadsStep } from "./uploads-step";
import { useAxios } from "../../../hooks/axios";
import { useMediaStorage} from "../../../hooks/media";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../components/loading";
import { QuestionnaireStep } from "./questionnaire-step";

export const MultiStepForm = ({ state, dispatch }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useHistory();

  const { executeWithData, error, resetState, response, loading } = useAxios({
    url: "/companies/register",
    method: "post",
  });

  const handleStepView = () => {
    switch (activeStep) {
      case 0:
        return <QuestionnaireStep state={state} dispatch={dispatch} questionnaires={state.questionnaires} />;
      case 1:
        return <UploadsStep state={state} dispatch={dispatch} />;
      default:
        return;
    }
  };

  useEffect(() => {
    if (error && !response) return;
    enqueueSnackbar("Success! Company added.", { variant: "success" });
    setTimeout(() => {
      if (!state.csv || !state.csv.filename) {
        push(`/generate-link`, [{ companyID: response.company, departmentID: response.department }]);
      } else {
        push("/dashboard");
      }
    }, 2000);
  }, [response]);


  const tryAgainHandler = () => {
    setActiveStep(0);
    dispatch({ type: "reset" });
    resetState();
  };

  const showContent = () => {
    if (error) {
      enqueueSnackbar("Error occurred!", {
        variant: "error",
        preventDuplicate: true,
      });
      return (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color: "red" }}>
            Error occurred! Please try again.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={tryAgainHandler}
              sx={{ textTransform: "none", marginRight: "20%" }}
            >
              Try again!
            </Button>
          </Box>
        </React.Fragment>
      );
    }

    if (loading)
      return (
        <Loading
          textSx={{ fontSize: "25px" }}
          loadingSx={{
            width: "250px !important",
            height: "250px !important",
          }}
          containerSx={{ margin: "auto", top: "30vh", left: "30vw" }}
        />
      );

    return (
      <React.Fragment>
        {handleStepView()}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ width: "100%", marginTop: "50px !important" }}>
      {showContent()}
    </Box>
  );
};
