import { useState, Fragment, useReducer } from "react";
import {
    Box,
    Typography,
    Button,
    Stepper,
    Step,
    StepButton,
    StepConnector,
    Paper,
    useMediaQuery,
    Stack,
} from "@mui/material";
import { SleepApneoa } from "./sleep-apneoa";
import { SleepSweetSpot } from "./sweet-spot";

const steps = [
    "Are you at risk for Sleep Apnoea?",
    "Are you at your sleep sweet spot?",
];

const initialState = {
    snore: false,
    tired: false,
    observed: false,
    pressure: false,
    bmi: false,
    olderThan50: false,
    neckCircumference: false,
    male: false,
    fallAsleepIn5: false,
    fallAsleepIn30: false,
    extendSleepDuration: false,
    regularlyNap: false,
    feelingUnrefreshed: false,
    excessivelyTired: false,
    regularlyUseMedication: false,
    feelingMoody: false,
    changeInMemory: false,
    result: "",
};

/**
Function to modify state
@param state current state
@param action type of modification & data
@returns new state
*/
const reducer = (state, action) => {
    switch (action.type) {
        case "change":
            const { key, value } = action.payload;
            return { ...state, [key]: value };
        case "reset":
            return initialState;
        default:
            return state;
    }
};

export const SelfAssessment = () => {
    const [activeStep, setActiveStep] = useState(0);
    const matches = useMediaQuery("(max-width:1080px)");
    const buttonChange = useMediaQuery("(max-width:500px)");
    const [completed, setCompleted] = useState({
        0: false,
        1: false,
    });
    const [state, dispatch] = useReducer(reducer, initialState);

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.values(completed).filter((value) => !value).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((_, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        dispatch({ type: "reset" });
    };
    const setPadding = () => {
        if (buttonChange) return "300px";
        else if (matches) return "412px";
        return "";
    };

    const calculateSleepApneoaRisk = () => {
        let count = 0;
        const keyCounting = [
            "snore",
            "tired",
            "observed",
            "pressure",
            "bmi",
            "olderThan50",
            "neckCircumference",
            "male",
        ];

        for (const [key, value] of Object.entries(state)) {
            if (keyCounting.includes(key) && value) count++;
        }

        if (count >= 0 && count <= 2)
            dispatch({
                type: "change",
                payload: { key: "result", value: "Low risk of sleep apnoea" },
            });
        else if (count >= 3 && count <= 4)
            dispatch({
                type: "change",
                payload: {
                    key: "result",
                    value: "Intermediate risk of sleep apnoea",
                },
            });
        else if (count >= 5 && count <= 8)
            dispatch({
                type: "change",
                payload: { key: "result", value: "High risk of sleep apnoea" },
            });
    };

    const renderStep = () => {
        if (activeStep === 0) {
            return (
                <Fragment>
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 600,
                            color: "#8CB8E2",
                            textAlign: "center",
                            marginTop: "30px",
                        }}
                    >
                        Are you at risk for sleep apnoea?
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: 600,
                            textAlign: "center",
                            color: "#657173",
                        }}
                    >
                        Please toggle right if the answer is yes.
                    </Typography>
                    <SleepApneoa
                        state={state}
                        dispatch={dispatch}
                        calculateSleepApneoaRisk={calculateSleepApneoaRisk}
                    />
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Typography
                    sx={{
                        fontSize: "24px",
                        fontWeight: 600,
                        color: "black",
                        textAlign: "center",
                        marginTop: "30px",
                    }}
                >
                    Are you at your sleep sweet spot?
                </Typography>
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#657173",
                        maxWidth: "919px",
                        margin: "0 auto",
                        marginBottom: "30px",
                    }}
                >
                    Sometimes, it is obvious when you are not sleeping well. In other cases, poor sleep and its adverse effects accumulate gradually, so it’s possible to become accustomed to them without recognising the impact they are having on your health and life. Ask yourself these questions:…
                </Typography>
                <SleepSweetSpot state={state} dispatch={dispatch} />
                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#657173",
                        maxWidth: "919px",
                        margin: "0 auto",
                        marginTop: "30px",
                    }}
                >
                    If you answered yes to any of these questions you may not be at your sleep sweet spot.
                </Typography>
            </Fragment>
        );
    };

    return (
        <Paper
            sx={{ maxWidth: "1173px", margin: "auto", paddingBottom: "40px" }}
            elevation={8}
        >
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                nonLinear
                connector={<StepConnector sx={{ borderColor: "white" }} />}
                sx={{
                    backgroundColor: "#8CB8E2",
                    height: "98px",
                    color: "white",
                    paddingTop: "15px",
                    ".css-z7uhs0-MuiStepConnector-line": {
                        borderColor: "white !important",
                        width: "105%",
                        marginLeft: "-10px",
                    },
                }}
            >
                {steps.map((label, index) => (
                    <Step
                        key={label}
                        completed={completed[index]}
                        sx={{
                            color: "white",
                            marginLeft:
                                index === 0 && !buttonChange ? "100px" : "0",
                            marginRight:
                                index === 1 && !buttonChange ? "100px" : "0",
                        }}
                    >
                        <StepButton
                            color="inherit"
                            onClick={handleStep(index)}
                            icon={
                                <Box
                                    sx={{
                                        width: "25px",
                                        height: "25px",
                                        borderRadius: "50%",
                                        backgroundColor: "white",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "15px",
                                            height: "15px",
                                            borderRadius: "50%",
                                            backgroundColor:
                                                activeStep === index
                                                    ? "black"
                                                    : "white",
                                            margin: "auto",
                                            marginTop: "5px",
                                        }}
                                    />
                                </Box>
                            }
                            sx={{
                                ".css-16ubnlw-MuiStepLabel-labelContainer": {
                                    color: "white",
                                    fontSize: "14px",
                                },
                                ".css-qwhh6h-MuiStepLabel-label": {
                                    color: "white",
                                    fontSize: "14px",
                                },
                                ".css-16ubnlw-MuiStepLabel-labelContainer.Mui-active":
                                    {
                                        color: "white",
                                        fontSize: "14px",
                                    },
                                ".css-qwhh6h-MuiStepLabel-label.Mui-active": {
                                    color: "white",
                                    fontSize: "14px",
                                },
                                ".css-qwhh6h-MuiStepLabel-label.Mui-completed":
                                    {
                                        color: "white",
                                        fontSize: "14px",
                                    },
                            }}
                        >
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div style={{ margin: "0 auto" }}>
                <Box
                    sx={{
                        ".css-yvjka-MuiTypography-root": { fontWeight: 500 },
                    }}
                >
                    {renderStep()}
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        textAlign: matches ? "center" : "right",
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: matches ? "499px" : "1082px",
                            paddingLeft: setPadding(),
                            margin: "auto",
                        }}
                    ></Box>
                </Box>
            </div>
        </Paper>
    );
};
