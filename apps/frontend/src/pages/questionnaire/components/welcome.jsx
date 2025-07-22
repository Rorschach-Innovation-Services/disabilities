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
                Pivot
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
                        This questionnaire is divided into three parts, 
                        aimed at supporting your efforts toward disability
                        inclusion and ensuring that your organization or 
                        department has effective policies and practices in 
                        place to create productive, inclusive environments 
                        for all. The goal is to foster systems that result 
                        in mutual benefits, ensuring everyone can contribute 
                        and thrive.
                        <br />
                        <br />
                        All responses are anonymous, and the results will be 
                        aggregated to provide group feedback. Please be assured 
                        that individual responses will not be identifiable. If 
                        personalized reports or consultations are needed, feel 
                        free to reach out to us.

                        
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ marginTop: "4%", marginBottom: "10px" }}
                    >
                        By reading the above information, I acknowledge 
                        and agree to proceed.
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
