import React, { Fragment } from "react";
import { Typography, Box, useMediaQuery, TextField } from "@mui/material";
import {
    TextBoxInput,
    SelectableOptions,
    TimeSelector,
    SliderOption,
} from "../components/answer-section";

/**
 * Layout for a single question
 * @param id of the question if it is a sleep health question
 * @param name of question if it is a personal question
 * @param title i.e. the actual question text
 * @param state of questionnaire
 * @param dispatch for questionnaire
 * @param children additional components
 * @param helperText text below question title
 * @param error being id or name for question with erroneous input
 * @param setError resetting the question error
 * @param customGetQuestion custom get question function
 * */
export const Question = ({
    id,
    title,
    name,
    children,
    state,
    dispatch,
    helperText,
    error,
    setError,
    customGetQuestion,
}) => {
    const changeLayout = useMediaQuery("(max-width:780px)");

    // Get a question corresponding to question with given id as props
    const getQuestion = () => {
        if (typeof customGetQuestion !== "undefined")
            return customGetQuestion();

        for (let i = 0; i < state.questions.length; i++) {
            const question = state.questions[i];
            if (question.id === id) return question;
        }
    };

    // Determine the appropriate input user can use to answer question
    const renderAnswerSection = () => {
        // Personal questions
        if (name === "name")
            return (
                <TextBoxInput
                    placeholder="Full name"
                    value={state.employee.name}
                    updateState={(value) =>
                        dispatch({
                            type: "employee",
                            payload: { key: name, value },
                        })
                    }
                    errorMessage="Please ensure that you enter your full name."
                    displayErrorMessage={error === "name"}
                    setError={setError}
                />
            );
        if (name === "email")
            return (
                <TextBoxInput
                    placeholder="Email"
                    value={state.employee.email}
                    updateState={(value) =>
                        dispatch({
                            type: "employee",
                            payload: { key: name, value },
                        })
                    }
                    errorMessage="Please ensure that the email you have entered is correct."
                    displayErrorMessage={error === "email"}
                    setError={setError}
                />
            );
        if (name === "idNumber")
            return (
                <TextBoxInput
                    placeholder="ID number: Not less than 13 numbers."
                    value={state.employee.idNumber}
                    type="number"
                    updateState={(value) =>
                        dispatch({
                            type: "employee",
                            payload: { key: name, value },
                        })
                    }
                    errorMessage="Please ensure you have entered all 13 digits of the ID number."
                    displayErrorMessage={error === "idNumber"}
                    setError={setError}
                />
            );
        if (name === "age")
            return (
                <TextBoxInput
                    placeholder="Please fill in an age between 15 and 100"
                    value={state.employee.age ? state.employee.age : undefined}
                    type="number"
                    updateState={(value) =>
                        dispatch({
                            type: "employee",
                            payload: { key: name, value },
                        })
                    }
                    errorMessage="Please ensure that your answer is completely correct."
                    displayErrorMessage={error === "age"}
                    setError={setError}
                />
            );
        if (name === "gender")
            return (
                <SelectableOptions
                    selected={state.employee.gender}
                    options={[
                        "Female",
                        "Male",
                        "Non-binary",
                        "Prefer not to say",
                    ]}
                    onChange={(value) =>
                        dispatch({
                            type: "employee",
                            payload: { key: name, value },
                        })
                    }
                    errorMessage="Please ensure to select an option for gender."
                    sx={{ marginLeft: "-60px" }}
                    displayErrorMessage={error === "gender"}
                    setError={setError}
                />
            );

        // Sleep health questions
        if (id === "1")
            return (
                <TimeSelector
                    value={getQuestion().response}
                    onChange={(value) => {
                        if (value === "Invalid Date") return;
                        dispatch({
                            type: "add response",
                            payload: { id, response: value },
                        });
                    }}
                    errorMessage="Please ensure that the time is in 12 hour format and between 05:00pm and 07:00am."
                    displayErrorMessage={error === "1"}
                    setError={setError}
                />
            );
        if (id === "2")
            return (
                <TimeSelector
                    value={getQuestion().response}
                    onChange={(value) =>
                        dispatch({
                            type: "add response",
                            payload: { id, response: value },
                        })
                    }
                    errorMessage="Please ensure that the time is in 12 hour format and between 03:00am and 03:00pm."
                    displayErrorMessage={error === "2"}
                    setError={setError}
                />
            );
        if (id === "3")
            return (
                <TextBoxInput
                    placeholder="Please fill in a number between 0 and 20"
                    value={getQuestion().response}
                    type="number"
                    updateState={(value) =>
                        dispatch({
                            type: "add response",
                            payload: { id, response: value },
                        })
                    }
                    errorMessage="Please ensure that the value you have entered is between 0 and 20."
                    displayErrorMessage={error === "3"}
                    setError={setError}
                    sx={{ marginTop: error === "3" ? "-55px" : "175px" }}
                />
            );
        if (id === "4")
            return (
                <SliderOption
                    value={getQuestion().response}
                    onChange={(value) =>
                        dispatch({
                            type: "add response",
                            payload: { id, response: value },
                        })
                    }
                    low="Very poor"
                    medium="Average"
                    high="Excellent"
                    setError={setError}
                />
            );
        if (id === "5")
            return (
                <SliderOption
                    value={getQuestion().response}
                    onChange={(value) =>
                        dispatch({
                            type: "add response",
                            payload: { id, response: value },
                        })
                    }
                    low="Not at all"
                    medium="Sometimes"
                    high="Very much"
                    setError={setError}
                />
            );
        if (id === "6a")
            return (
                <SelectableOptions
                    selected={getQuestion().response}
                    options={["Yes", "No"]}
                    onChange={(value) =>
                        dispatch({
                            type: "add response",
                            payload: { id, response: value },
                        })
                    }
                    errorMessage="Please ensure to select an option out of the available."
                    displayErrorMessage={error === "6a"}
                    sx={{ marginLeft: "-40px" }}
                    setError={setError}
                />
            );
        if (id === "6b")
            return (
                <Fragment>
                    <SelectableOptions
                        selected={getQuestion().response}
                        options={[
                            "Insomnia",
                            "Sleep apnoea",
                            "Restless legs syndrome",
                            "Narcolepsy",
                            "Other",
                        ]}
                        onChange={(value) =>
                            dispatch({
                                type: "add response",
                                payload: { id, response: value },
                            })
                        }
                        errorMessage="Please ensure to select an option out of the available. Also specificy disorder is 'Other' is selected."
                        displayErrorMessage={error === "6b"}
                        sx={{ marginLeft: "-80px" }}
                        setError={setError}
                        dialogueSx={{ height: "190px", marginBottom: "-240px" }}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Please specify..."
                        value={state.otherDisorder}
                        disabled={getQuestion().response !== "Other"}
                        onChange={(event) => {
                            dispatch({
                                type: "disorder",
                                payload: event.target.value,
                            });
                        }}
                        type="text"
                        sx={{
                            width: "390px",
                            marginTop: "15px",
                            marginBottom: "35px",
                            ".css-p2j08u-MuiInputBase-root-MuiOutlinedInput-root":
                                {
                                    borderRadius: "10px",
                                },
                        }}
                    />
                </Fragment>
            );
        if (id === "6c")
            return (
                <SelectableOptions
                    selected={getQuestion().response}
                    options={["Yes", "No"]}
                    onChange={(value) =>
                        dispatch({
                            type: "add response",
                            payload: { id, response: value },
                        })
                    }
                    errorMessage="Please ensure to select an option out of the available."
                    displayErrorMessage={error === "6c"}
                    setError={setError}
                    sx={{ marginLeft: "-40px" }}
                />
            );
        if (id === "7")
            return (
                <SelectableOptions
                    selected={getQuestion().response}
                    options={["0", "1 to 5", "6 or more"]}
                    onChange={(value) =>
                        dispatch({
                            type: "add response",
                            payload: { id, response: value },
                        })
                    }
                    errorMessage="Please ensure to select an option out of the available."
                    displayErrorMessage={error === "7"}
                    setError={setError}
                    sx={{ marginLeft: "-40px" }}
                />
            );
    };

    return (
        <Box component="div" sx={{ marginLeft: "0px", minHeight: "350px" }}>
            <Typography
                variant="h4"
                sx={{
                    marginTop: "6%",
                    paddingRight: changeLayout ? "19%" : "32%",
                    fontSize: "18px",
                    fontWeight: "600",
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="subtitle2"
                sx={{
                    marginTop: "1%",
                    color: "darkslategrey",
                    fontSize: "12px",
                    width: "72%",
                    marginBottom: "40px",
                }}
            >
                {helperText}
            </Typography>
            <Box sx={{ margin: "0 auto", textAlign: "center" }}>
                {renderAnswerSection()}
            </Box>
            {children}
        </Box>
    );
};
