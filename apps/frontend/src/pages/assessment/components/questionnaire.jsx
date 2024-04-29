import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { QuestionnaireItem } from "./questionnaire-item";

export const Questionnaire = ({ questionnaire, dispatch }) => {
  const [checked, setChecked] = useState(false);

  return (
    <QuestionnaireItem
      questionnaire={questionnaire}
      onClick={() => {
        dispatch({
          type: "unselect-questionnaires"
        });
        dispatch({
          type: "view-questionnaire",
          payload: questionnaire
        })
      }}
    >
      <Checkbox
        checked={checked}
        onClick={(event) => {
          event.stopPropagation();
          dispatch({
            type: "select-questionnaire",
            payload: questionnaire._id
          });
          setChecked((prev) => !prev)
          }
        }
        sx={{
          "&.Mui-checked":{
            color: "black"
          }
        }}
      />
    </QuestionnaireItem>
  );
};
