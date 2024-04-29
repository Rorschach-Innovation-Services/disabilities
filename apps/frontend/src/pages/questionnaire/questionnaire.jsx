import React, { useEffect, useReducer, useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { Welcome } from "./components/welcome";
import Logo from "../../assets/logos/Sleep Science Logo NT RGB.png";
import { initialState, reducer, options } from "./reducer";
import { Question } from "./components/question";
import { useAxios } from "../../hooks/axios";
import { Progress } from "./components/progress";
import { Complete } from "./components/complete";
import { sortQuestionArray } from "../../utils/sort";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { isDate, getHours, getMinutes } from "date-fns";
import { CustomMessage } from "../../components/message";

const employeePersonalQuestions = {
    name: "What is your name?",
    email: "What is your email address?",
    idNumber: "What is your ID number?",
    age: "What is your age?",
    gender: "What is your gender?",
};

const removeParenthesis = (text) => {
    const index = text.indexOf("(");
    if (index !== -1) {
        return text.substring(0, index);
    }
    return text;
};

export const Questionnaire = () => {
    const { companyId, employeeId, departmentId } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [filled, setFilled] = useState(false); // If questions have been loaded
    const [questionViews, setQuestionViews] = useState([]); // info for each question indexed
    const [complete, setComplete] = useState(false);
    const [questionError, setQuestionError] = useState("");
    const [assessmentError, setAssessmentError] = useState("");
    const decreaseWidth = useMediaQuery("(max-width:500px)");
    const { response, error, execute } = useAxios({
        url: "/questions",
        method: "get",
    });
    const employeeRequest = useAxios({
        url: "/employees/register",
        method: "post",
    });
    const deleteEmployeeRequest = useAxios({
        url: "/employees/delete",
        method: "post",
    });
    const sleepQuestionRequest = useAxios({
        url: "/assessments/save",
        method: "post",
    });

    const sendEmployeeData = () => {
        // Update response value for question 6b if other disorder is selected
        for (const question of state.questions) {
            if (question.id === "6b" && question.response === "Other")
                dispatch({
                    type: "add response",
                    payload: { id: "6b", response: state.otherDisorder },
                });
        }

        // save employee data
        employeeRequest.executeWithData({
            company: companyId,
            name: state.employee.name,
            email: state.employee.email,
            age: state.employee.age,
            gender: state.employee.gender,
            department: departmentId,
            id_number: state.employee.idNumber,
        });
    };

    useEffect(() => {
        if (employeeRequest.error || !employeeRequest.response) return;

        // Save employee questionnaire responses
        sleepQuestionRequest.executeWithData({
            company: companyId,
            employee: employeeId || employeeRequest.response.employee,
            questionnaire: state.questions,
            department: departmentId,
        });
    }, [employeeRequest.response, employeeRequest.error]);

    const showErrorMessage = () => {
        return assessmentError !== null && assessmentError.length > 0 ? (
            <CustomMessage
                message={assessmentError}
                open={Boolean(assessmentError)}
                okayButton
                onOkayClick={() => {
                    setAssessmentError("");
                }}
            />
        ) : null;
    };

    // Displaying the progress element
    const showProgress = () => {
        if (state.step === 0 || state.step === state.questionCount + 1)
            return "";
        return (
            <Progress
                current={state.step}
                questionCount={state.questionCount}
                handleBack={handleBack}
            />
        );
    };

    // Validate the questionnaire input after each question before proceeding
    const validFields = () => {
        const email =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const bedtimes = [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];
        const wakeUpTimes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        // Personal questions
        if (state.step === 1 && state.employee.name.length === 0) {
            setQuestionError("name");
            return false;
        }
        if (state.step === 2 && !email.test(state.employee.email)) {
            setQuestionError("email");
            return false;
        }
        if (state.step === 3 && state.employee.idNumber.length !== 13) {
            setQuestionError("idNumber");
            return false;
        }
        if (
            state.step === 4 &&
            (state.employee.age < 15 || state.employee.age > 100)
        ) {
            setQuestionError("age");
            return false;
        }
        if (state.step === 5 && state.employee.gender.length === 0) {
            setQuestionError("gender");
            return false;
        }

        // Sleep health questions
        if (
            state.step === 6 &&
            ((getSleepValue("1") !== null && getSleepValue("1").length === 0) ||
                !isDate(getSleepValue("1")))
        ) {
            setQuestionError("1");
            return false;
        }
        if (
            state.step === 6 &&
            getSleepValue("1") !== null &&
            isDate(getSleepValue("1"))
        ) {
            const hours = getHours(getSleepValue("1"));
            const minutes = getMinutes(getSleepValue("1"));
            if (bedtimes.includes(hours)) return true;
            if (hours === 7 && minutes === 0) return true;
            setQuestionError("1");
            return false;
        }
        if (
            state.step === 7 &&
            ((getSleepValue("2") !== null && getSleepValue("2").length === 0) ||
                !isDate(getSleepValue("2")))
        ) {
            setQuestionError("2");
            return false;
        }
        if (
            state.step === 7 &&
            getSleepValue("2") !== null &&
            isDate(getSleepValue("2"))
        ) {
            const hours = getHours(getSleepValue("2"));
            const minutes = getMinutes(getSleepValue("2"));
            if (wakeUpTimes.includes(hours)) return true;
            if (hours === 15 && minutes === 0) return true;
            setQuestionError("2");
            return false;
        }
        if (
            state.step === 8 &&
            (getSleepValue("3").length === 0 ||
                parseFloat(getSleepValue("3")) < 0 ||
                parseFloat(getSleepValue("3")) > 20)
        ) {
            setQuestionError("3");
            return false;
        }
        if (state.step === 11 && getSleepValue("6a").length === 0) {
            setQuestionError("6a");
            return false;
        }
        if (
            state.step === 12 &&
            (getSleepValue("6b").length === 0 ||
                (getSleepValue("6b") === "Other" &&
                    state.otherDisorder.length === 0))
        ) {
            setQuestionError("6b");
            return false;
        }
        if (state.step === 13 && getSleepValue("6c").length === 0) {
            setQuestionError("6c");
            return false;
        }
        if (state.step === 14 && getSleepValue("7").length === 0) {
            setQuestionError("7");
            return false;
        }
        return true;
    };

    useEffect(() => {
        execute();
    }, []);

    useEffect(() => {
        if (error || !response || filled) return;
        if (response.questions) {
            dispatch({
                type: "question count",
                payload:
                    Object.keys(employeePersonalQuestions).length +
                    response.questions.length,
            });
            const tempQuestions = [];
            // Set up personal info questions
            for (const [key, value] of Object.entries(
                employeePersonalQuestions
            )) {
                if (key === "name") {
                    tempQuestions.push({
                        key,
                        title: "What is your name?",
                    });
                    continue;
                }

                // Store properties for question
                tempQuestions.push({
                    key,
                    title: value,
                });
            }

            // Sort the questions in terms of the id
            sortQuestionArray(response.questions);

            // Remove parenthesis from question content
            for (let i = 0; i < response.questions.length; i++) {
                response.questions[i].content = removeParenthesis(
                    response.questions[i].content
                );
            }
            // Set up sleep health screening questions
            for (const question of response.questions) {
                if (question.id === "4" || question.id === "5")
                    dispatch({
                        type: "add question",
                        payload: { ...question, response: 1 },
                    });
                else
                    dispatch({
                        type: "add question",
                        payload: { ...question, response: "" },
                    });

                const properties = {
                    id: question.id,
                    helperText: options.hasOwnProperty(question.id)
                        ? options[question.id].text
                        : "",
                    title: question.content,
                };

                // Store properties for question
                tempQuestions.push({
                    ...properties,
                });
            }
            // Save question properties
            setQuestionViews(tempQuestions);
        }
        setFilled(true);
    }, [response, error, state]);

    const handleNext = () => {
        if (state.step === 11 && getSleepValue("6a").toLowerCase() === "no") {
            dispatch({ type: "step", payload: 14 });
            return;
        }

        dispatch({ type: "increment step" });
    };

    const getSleepValue = (id) => {
        for (const question of state.questions) {
            if (question.id === id) return question.response;
        }
    };

    const renderQuestion = () => {
        if (state.step < 0 || state.step > state.questionCount) return null;

        const props = questionViews[state.step - 1];
        // Personal questions
        if (state.step >= 1 && state.step <= 5)
            return (
                <Question
                    key={props.key}
                    name={props.key}
                    state={state}
                    error={questionError}
                    dispatch={dispatch}
                    title={props.title}
                    setError={setQuestionError}
                />
            );
        // Sleep health questions
        return (
            <Question
                key={props.id}
                id={props.id}
                state={state}
                error={questionError}
                helperText={props.helperText}
                dispatch={dispatch}
                title={props.title}
                setError={setQuestionError}
            />
        );
    };

    useEffect(() => {
        if (sleepQuestionRequest.error) {
            setAssessmentError(
                sleepQuestionRequest.error.data.message
                    .toLowerCase()
                    .includes("limit")
                    ? "Number of assessments that can be submitted has been exceeded."
                    : "There has been an error trying to save assessment responses."
            );
        }
        if (sleepQuestionRequest.error || !sleepQuestionRequest.response)
            return;
        setComplete(true);
    }, [sleepQuestionRequest.response, sleepQuestionRequest.error]);

    const renderStep = () => {
        if (state.step === 0) {
            return (
                <Welcome
                    state={state}
                    dispatch={dispatch}
                    handleBegin={handleNext}
                />
            );
        }
        return renderQuestion();
    };

    const handleBack = () => {
        if (state.step === 14 && getSleepValue("6a").toLowerCase() === "no") {
            dispatch({ type: "step", payload: 11 });
            return;
        }
        dispatch({ type: "decrement step" });
    };

    return (
        <React.Fragment>
            {showErrorMessage()}
            {complete && <Complete />}
            {!complete && (
                <Box sx={{ marginTop: "3%", marginLeft: "0px" }}>
                    <Box
                        component="img"
                        onClick={() => (window.location.href = "/")}
                        alt="logo"
                        src={Logo}
                        sx={{
                            width: "60px",
                            marginLeft: "65px",
                            cursor: "pointer",
                        }}
                    />
                    <Box
                        sx={{
                            margin: "0 auto",
                            maxWidth: "900px",
                            width: "70%",
                        }}
                    >
                        {showProgress()}
                        {renderStep()}
                        {employeeRequest.loading ||
                        sleepQuestionRequest.loading ? (
                            <Box sx={{ textAlign: "center" }}>
                                <LoadingButton
                                    loading={
                                        employeeRequest.loading ||
                                        sleepQuestionRequest.loading
                                    }
                                    variant="outlined"
                                    loadingPosition="start"
                                    startIcon={
                                        <Save sx={{ color: "transparent" }} />
                                    }
                                    sx={{
                                        textTransform: "none",
                                        backgroundColor: "black",
                                        color: "white !important",
                                        padding: "1% 2%",
                                        borderRadius: "10px",
                                        mt: "100px",
                                        width: decreaseWidth
                                            ? "300px"
                                            : "390px",
                                        margin: "0 auto",
                                    }}
                                >
                                    Saving questionnaire...
                                </LoadingButton>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (!validFields()) return;
                                    state.step === state.questionCount
                                        ? sendEmployeeData()
                                        : handleNext();
                                }}
                                sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: decreaseWidth ? "300px" : "390px",
                                    display:
                                        state.step === 0 || complete
                                            ? "none"
                                            : "flex",
                                    marginBottom: "3%",
                                    textTransform: "none",
                                    ":hover": {
                                        backgroundColor: "primary.main",
                                    },
                                    margin: "0 auto",
                                    marginTop: error === "3" ? "-20px" : "",
                                }}
                            >
                                {state.step === state.questionCount
                                    ? "Submit"
                                    : "Next"}
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
        </React.Fragment>
    );
};
