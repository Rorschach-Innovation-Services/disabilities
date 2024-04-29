import React from "react";
import {
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    Typography,
    Button,
    Paper,
    Box,
} from "@mui/material";

export const Welcome = ({ state, dispatch, handleBegin }) => {
    const { agreement } = state;

    const handleInputChange = (event) => {
        dispatch({ type: "agreement", payload: event.target.value });
    };

    return (
        <React.Fragment>
            <Typography
                variant="h3"
                sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: 36,
                    marginTop: "-3%",
                }}
            >
                Sleep Health Screen
            </Typography>
            <Paper
                elevation={5}
                sx={{
                    height: "auto",
                    pb: "10px",
                    marginLeft: "10px",
                    marginBottom: "10px",
                    borderRadius: 5,
                }}
            >
                <Box
                    sx={{
                        marginLeft: "50px",
                        marginRight: "50px",
                        marginTop: "100px",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            marginTop: "5%",
                            fontSize: 24,
                        }}
                    >
                        <br />
                        Welcome,
                    </Typography>
                    <Typography>
                        <br />
                        <br />
                        This is a brief questionnaire to check your sleep
                        health, which will take less than 5 minutes. The
                        questionnaire is specifically for people who usually
                        work during the day (i.e. do not work night- or
                        rotating-shifts).
                        <br />
                        <br />
                        Only you will be privy to your personal results, which
                        you will receive via email. We will collate and
                        aggregate all sleep health information for your company
                        to provide them with group feedback. Please be assured
                        that there will be no way for your employer to
                        personally identify you or view your personal results.
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ marginTop: "4%", marginBottom: "10px" }}
                    >
                        I have read and understood the information above and
                        agree to complete this Sleep Health Screen as accurately
                        as possible.
                    </Typography>
                </Box>
            </Paper>
            <FormControl required component="fieldset">
                <RadioGroup
                    aria-label="gender"
                    row
                    name="controlled-radio-buttons-group"
                    value={agreement}
                    onChange={handleInputChange}
                    sx={{
                        marginLeft: "60px",
                        marginTop: "26px",
                    }}
                >
                    <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                    />
                </RadioGroup>
            </FormControl>
            <Button
                variant="contained"
                onClick={handleBegin}
                disabled={agreement !== "yes"}
                sx={{
                    backgroundColor: "black",
                    color: "white",
                    float: "right",
                    marginTop: "30px",
                    marginRight: "40px",
                    borderRadius: 2,
                }}
            >
                Begin
            </Button>
        </React.Fragment>
    );
};
