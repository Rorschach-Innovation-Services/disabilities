
import { Button, Container } from "@mui/material"
import { useEffect, useReducer} from "react";
import { Colours } from "../../../colours";
import { Questionnaire } from "./questionnaire"
import { QuestionnaireHeading } from "./questionnaire-heading";
import { AddQuestionnaire } from "./add-questionnaire";
import { assessmentInitialState, assessmentReducer } from "../reducer";

const headings = ["Pool Name", "Creator", "Date of Assessment", "Questions", "Remove"];

export const QuestionnaireList = ({ questionnaires, state, dispatch }) => {
  return (
    <Container
      sx={{
        margin: "50px 0 0 0 !important",
        padding: "0 !important",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      <QuestionnaireHeading
        headings={headings}
      />
      {
        questionnaires.map(( questionnaire, index ) => (
          <Questionnaire
            key={ index }
            questionnaire={questionnaire}
            checked={questionnaire._id}
            state={state}
            dispatch={dispatch}
          />
        ))
      }
      {/* {
        state.selectedQuestionnaires.length !== 0 &&
        <Container
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "15px",
            marginTop: "20px"
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color:"#fff",
              "&.MuiButton-contained": {
                  backgroundColor: "#000"
              },
              borderRadius: "10px"
            }}
            onClick={() => dispatch({ type: "unselect-questionnaires" })}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch({
                type: "delete-questionnaires"
              });
            }}
            sx={{
              backgroundColor: "#000",
              color:"#fff",
              "&.MuiButton-contained": {
                  backgroundColor: "#000"
              },
              borderRadius: "10px"
            }}
          >
            Delete
          </Button>
        </Container>
      } */}
    </Container>
  )
}