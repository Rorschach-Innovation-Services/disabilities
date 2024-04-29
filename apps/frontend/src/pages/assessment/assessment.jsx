import React, { useEffect, useReducer } from "react";
import {
  Typography,
} from "@mui/material";
import { assessmentInitialState, assessmentReducer } from "./reducer";
import { Shell } from "../../components/shell";
import { useAxios } from "../../hooks/axios";
import { QuestionnaireDetails } from "./components/questionnaire-details";

export const Assessment = () => {
  const [state, dispatch] = useReducer(
    assessmentReducer,
    assessmentInitialState
  );
  const { execute, response, error } = useAxios({
    url: "/questions",
    method: "get",
  });
  useEffect(() => {
      execute();
  }, []);
  useEffect(() => {
      if (error || !response) return;
      dispatch({
          type: "get-questionnaires",
          payload: response.questions
      });
  }, [response, error]);
  return (
    <Shell
      heading="Start Assessment"
    >
      {/* || state.questionnaires.length === 0 */}
      {
        error || !response  ?
        <Typography>No Questionnaires Found. Try again later!</Typography> :
        <QuestionnaireDetails
          state={state}
          dispatch={dispatch}
        />
      }
    </Shell>
  );
};
