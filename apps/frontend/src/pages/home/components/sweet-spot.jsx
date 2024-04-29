import { Fragment, useState } from "react";
import { Stack, Box, Typography, useMediaQuery, Button } from "@mui/material";
import { Switch } from "./switch";

/**
Sleep sweet spot section of self assessment
@param state of self assessment
@param dispatch of self assessment
*/
export const SleepSweetSpot = ({ state, dispatch }) => {
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
                    <Stack direction="row" sx={{ marginBottom: "30px" }}>
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            1. Do you fall asleep in less than 5min?
                        </Typography>
                        {/* <Switch
                            checked={state.fallAsleepIn5}
                            onChange={(event) =>
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "fallAsleepIn5",
                                        value: event.target.checked,
                                    },
                                })
                            }
                        /> */}
                    </Stack>
                    <Stack direction="row" sx={{ marginBottom: "30px" }}>
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            2. Do you take more than 30min to fall asleep on at
                            least 3 nights of the week?
                        </Typography>
                        {/* <Switch
                            checked={state.fallAsleepIn30}
                            onChange={(event) => {
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "fallAsleepIn30",
                                        value: event.target.checked,
                                    },
                                });
                            }}
                        /> */}
                    </Stack>
                    <Stack direction="row" sx={{ marginBottom: "30px" }}>
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            3. Do you extend your sleep duration on the weekend
                            by more than 1.5h?
                        </Typography>
                        {/* <Switch
                            checked={state.extendSleepDuration}
                            onChange={(event) =>
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "extendSleepDuration",
                                        value: event.target.checked,
                                    },
                                })
                            }
                        /> */}
                    </Stack>
                    <Stack direction="row" sx={{ marginBottom: "30px" }}>
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            4. Do you need to nap regularly?
                        </Typography>
                        {/* <Switch
                            checked={state.regularlyNap}
                            onChange={(event) =>
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "regularlyNap",
                                        value: event.target.checked,
                                    },
                                })
                            }
                        /> */}
                    </Stack>
                    <Stack direction="row">
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            5. Do you wake-up feeling unrefreshed?
                        </Typography>
                        {/* <Switch
                            checked={state.feelingUnrefreshed}
                            onChange={(event) =>
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "feelingUnrefreshed",
                                        value: event.target.checked,
                                    },
                                })
                            }
                        /> */}
                    </Stack>
                </Box>
                <Box
                    sx={{
                        margin: matches ? "auto" : "",
                        marginLeft: matches ? "" : "70px",
                        marginTop: matches ? "30px" : "",
                    }}
                >
                    <Stack direction="row" sx={{ marginBottom: "30px" }}>
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            6. Do you feel excessively tired or sleepy during
                            the day?
                        </Typography>
                        {/* <Switch
                            checked={state.excessivelyTired}
                            onChange={(event) =>
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "excessivelyTired",
                                        value: event.target.checked,
                                    },
                                })
                            }
                        /> */}
                    </Stack>
                    <Stack direction="row" sx={{ marginBottom: "30px" }}>
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            7. Do you regularly use medication or sleep aids to
                            help you sleep?
                        </Typography>
                        {/* <Switch
                            checked={state.regularlyUseMedication}
                            onChange={(event) =>
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "regularlyUseMedication",
                                        value: event.target.checked,
                                    },
                                })
                            }
                        /> */}
                    </Stack>
                    <Stack direction="row" sx={{ marginBottom: "30px" }}>
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            8. Do you feel moody or struggle to control your
                            emotions?
                        </Typography>
                        {/* <Switch
                            checked={state.feelingMoody}
                            onChange={(event) =>
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "feelingMoody",
                                        value: event.target.checked,
                                    },
                                })
                            }
                        /> */}
                    </Stack>
                    <Stack direction="row">
                        <Typography sx={{ width: "441px", fontSize: "14px" }}>
                            9. Have you noticed a recent change in your memory,
                            productivity, ability to multi-task or be creative?
                        </Typography>
                        {/* <Switch
                            checked={state.changeInMemory}
                            onChange={(event) =>
                                dispatch({
                                    type: "change",
                                    payload: {
                                        key: "changeInMemory",
                                        value: event.target.checked,
                                    },
                                })
                            }
                        /> */}
                    </Stack>
                </Box>
            </Stack>
        </Fragment>
    );
};
