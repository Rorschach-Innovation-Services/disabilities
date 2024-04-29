import React from "react";
import {
    Typography,
    LinearProgress,
    Box,
    useMediaQuery,
    IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

/**
 * Showing the number of questions answered relative to total question count
 * @param current the step of the current question being completed
 * @param questionCount total question count
 * @param handleBack function for moving a question back
 * */
export const Progress = ({ current, questionCount, handleBack }) => {
    const changeLayout = useMediaQuery("(max-width:780px)");

    const progressValue = () => {
        return Math.round((current / questionCount) * 100);
    };

    const getCaption = () => {
        if (current >= 1 && current <= 5) return "About you";
        if (current === 6) return "Bedtime";
        if (current === 7) return "Wake-up time";
        if (current === 8) return "Sleep duration";
        if (current === 9) return "Sleep quality";
        if (current === 10) return "Daytime function";
        if (current === 11 || current === 12 || current === 13)
            return "Sleep disorders";
        if (current === 14) return "Medication";
    };

    return (
        <Box component="div" sx={{ marginTop: "5%" }}>
            <Typography
                variant="h6"
                sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
                Question
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    marginLeft: changeLayout ? "68%" : "48%",
                    marginTop: "-3%",
                    fontWeight: "bold",
                    fontSize: "16px",
                }}
            >
                {current}/{questionCount}
            </Typography>
            <LinearProgress
                variant="determinate"
                value={progressValue()}
                sx={{
                    marginTop: "1%",
                    width: changeLayout ? "76%" : "54%",
                    marginBottom: "2%",
                    backgroundColor: "#C8C8C8",
                    ".css-17h2lra-MuiLinearProgress-bar1": {
                        backgroundColor: "#8D90FF",
                    },
                }}
            />
            <Typography
                variant="caption"
                sx={{
                    fontSize: "14px",
                    marginTop: "2%",
                    color: "#6D8286",
                    fontWeight: "bold",
                }}
            >
                {getCaption()}
            </Typography>
            <Box
                component="div"
                sx={{
                    marginLeft: changeLayout ? "0%" : "85%",
                    marginTop: changeLayout ? "2%" : "-60px",
                    marginBottom: changeLayout ? "50px" : "",
                }}
            >
                <IconButton
                    onClick={handleBack}
                    sx={{ border: changeLayout ? "1px solid" : "" }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography
                    variant="subtitle2"
                    sx={{
                        marginLeft: "50px",
                        marginTop: "-30px",
                    }}
                >
                    {changeLayout ? "" : "Previous"}
                </Typography>
            </Box>
        </Box>
    );
};
