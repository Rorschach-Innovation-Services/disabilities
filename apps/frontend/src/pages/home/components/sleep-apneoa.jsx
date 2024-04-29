import { Fragment } from "react";
import { Stack, Box, Typography, Button, useMediaQuery } from "@mui/material";
import { Switch } from "./switch";
import { ToggleItem } from "./item";

/**
Sleep apneoa self assessment section
@param state of the self assessment
@param dispatch of the self assessment
@param calculateSleepApneoaRisk function to compute risk of sleep apneoa
*/
export const SleepApneoa = ({ state, dispatch, calculateSleepApneoaRisk }) => {
    const matches = useMediaQuery("(max-width:1080px)");

    return (
        <Fragment>
            <Stack
                direction={matches ? "column" : "row"}
                sx={{ justifyContent: "center" }}
            >
                <Box
                    sx={{
                        margin: matches ? "auto" : "",
                        marginLeft: matches ? "" : "20px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 600,
                            marginTop: "15px",
                            marginBottom: "30px",
                        }}
                    >
                        STOP
                    </Typography>
                    <ToggleItem
                        value={state.snore}
                        onChange={(event) =>
                            dispatch({
                                type: "change",
                                payload: {
                                    key: "snore",
                                    value: event.target.checked,
                                },
                            })
                        }
                    >
                        Do you <b>snore</b> loudly (louder than talking or loud
                        enough to be heard through closed doors)?
                    </ToggleItem>
                    <ToggleItem
                        value={state.tired}
                        onChange={(event) =>
                            dispatch({
                                type: "change",
                                payload: {
                                    key: "tired",
                                    value: event.target.checked,
                                },
                            })
                        }
                    >
                        Do you often feel <b>tired</b>, fatigued, or sleepy
                        during the daytime?
                    </ToggleItem>
                    <ToggleItem
                        value={state.observed}
                        onChange={(event) =>
                            dispatch({
                                type: "change",
                                payload: {
                                    key: "observed",
                                    value: event.target.checked,
                                },
                            })
                        }
                    >
                        Has anyone <b>observed</b> you stop breathing during
                        your sleep?
                    </ToggleItem>
                    <ToggleItem
                        value={state.pressure}
                        onChange={(event) =>
                            dispatch({
                                type: "change",
                                payload: {
                                    key: "pressure",
                                    value: event.target.checked,
                                },
                            })
                        }
                    >
                        Do you have or are you being treated for high blood{" "}
                        <b>pressure</b>?
                    </ToggleItem>
                </Box>
                <Box
                    sx={{
                        margin: matches ? "auto" : "",
                        marginLeft: matches ? "" : "70px",
                        marginTop: matches ? "30px" : "",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 600,
                            marginTop: "15px",
                            marginBottom: "30px",
                        }}
                    >
                        BANG
                    </Typography>
                    <ToggleItem
                        value={state.bmi}
                        onChange={(event) =>
                            dispatch({
                                type: "change",
                                payload: {
                                    key: "bmi",
                                    value: event.target.checked,
                                },
                            })
                        }
                    >
                        Is your Body Mass Index (BMI) greater than 35kg/m<sup>2</sup>?
                    </ToggleItem>
                    <ToggleItem
                        value={state.olderThan50}
                        onChange={(event) =>
                            dispatch({
                                type: "change",
                                payload: {
                                    key: "olderThan50",
                                    value: event.target.checked,
                                },
                            })
                        }
                    >
                        Are you older than 50 years of age?
                    </ToggleItem>
                    <ToggleItem
                        value={state.neckCircumference}
                        onChange={(event) =>
                            dispatch({
                                type: "change",
                                payload: {
                                    key: "neckCircumference",
                                    value: event.target.checked,
                                },
                            })
                        }
                    >
                        For Males: Is your neck circumference greater than 43cm?
                        <br />
                        For Females: Is your neck circumference greater than
                        41cm?
                    </ToggleItem>
                    <ToggleItem
                        value={state.male}
                        onChange={(event) =>
                            dispatch({
                                type: "male",
                                payload: {
                                    key: "male",
                                    value: event.target.checked,
                                },
                            })
                        }
                    >
                        Gender: Are you male?
                    </ToggleItem>
                </Box>
            </Stack>
            <Box sx={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                    onClick={() => {
                        calculateSleepApneoaRisk();
                        dispatch({
                            type: "change",
                            payload: { key: "disableNext", value: false },
                        });
                    }}
                    sx={{
                        textTransform: "none",
                        height: "50px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 600,
                            color: "white",
                            borderRadius: "10px",
                            padding: "5px 15px 5px 15px",
                            backgroundColor: "black",
                            ":hover": {
                                backgroundColor: "black",
                            },
                        }}
                    >
                        Calculate Result
                    </Typography>
                </Button>
            </Box>
            <Typography
                sx={{
                    fontSize: "20px",
                    fontWeight: 500,
                    marginTop: "20px",
                    marginBottom: "10px",
                    color: "#1A5186",
                    textAlign: "center",
                }}
            >
                {state.result}
            </Typography>
        </Fragment>
    );
};
