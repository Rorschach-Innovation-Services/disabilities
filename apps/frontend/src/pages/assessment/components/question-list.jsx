import { Button, Checkbox, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Colours } from "../../../colours";

const QuestionItem = ({ question, dispatch, state }) => {
    // const [checked, setChecked] = useState(false);
    // useEffect(() => {
    //     if(checked && state.selectedQuestions.length === 0 && !state.viewedQuestionnaire)
    //         setChecked(false)
    // }, [state]);
    const getQuestion = () => {
        const index = question.content.indexOf("(");
        return index === -1 ? question.content : question.content.substring(0, index);
    }
    return (
        <Container
            key={question.id || question.content}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px"
            }}
        >
            {/* <Checkbox
                sx={{
                    "&.Mui-checked":{
                    color: "black"
                    }
                }}
                checked={false}
                
            /> */}
            <Typography
                sx={{
                    fontSize: "14px",
                    fontWeight: "500"
                }}
            >
                {question.id}. {getQuestion()}
            </Typography>
        </Container>
    )
}

export const QuestionList = ({ questions, id, state, dispatch }) => {
    return(
        <Container
            sx={{
                margin: "20px 0 0 0 !important",
                padding: "30px !important",
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                gap: "15px",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "25px"
                }}
            >
                {/* <Typography
                    sx={{
                        fontSize: "12px",
                        color: Colours.darkGrey,
                        fontWeight: "500"
                    }}
                >
                    Select
                </Typography> */}
                <Typography
                    sx={{
                        fontSize: "12px",
                        color: Colours.darkGrey,
                        fontWeight: "500"
                    }}
                >
                    Question list
                </Typography>
            </Container>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    padding: "0 !important"
                }}
            >
            {
                state.questionnaires.map((question, index) => (
                    <QuestionItem
                        key={index}
                        question={question}
                        dispatch={dispatch}
                        state={state}
                    />
                ))
            }
            </Container>
            {/* {
                state.selectedQuestions.length !== 0 &&
                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        gap: "15px"
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
                        onClick={() => dispatch({ type: "unselect-questions" })}
                    >
                        Cancel
                    </Button>
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
                        onClick={() => {
                            dispatch({
                                type: "delete-questions",
                                payload: id
                            });
                            console.log(state)
                        }}
                    >
                        Delete
                    </Button>
                </Container>
            } */}
        </Container>
    )
}