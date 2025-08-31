import React from "react";
import { Typography, Box, Button, useMediaQuery, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import CongrulationsIcon from "../../../assets/icons/congratulations-icon.svg";

const styles = {
    button: {
        textTransform: "none !important",
        backgroundColor: "black",
        color: "white",
        marginLeft: "10px",
        marginTop: "80px",
        width: "250px",
    },
};

export const Complete = () => {
    const { push } = useHistory();
    const stackButtons = useMediaQuery("(max-width:500px)");

    return (
        <Box>
            <Stack
                direction="column"
                spacing={2}
                justifyContent="center"
                height="100vh"
            >
                <Box sx={{ textAlign: "center", mb: "20px" }}>
                    <Box component="img" src={CongrulationsIcon} />
                </Box>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "28px",
                        }}
                    >
                        Thank you for completing the questionnaire.
                    </Typography>
                </Box>
                <Box
                    component="div"
                    sx={{
                        display: stackButtons ? "inline-block" : "flex",
                        marginTop: "5%",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => push("/dashboard")}
                        sx={{
                            ...styles.button,
                            mb: stackButtons ? "10px" : "",
                        }}
                    >
                        Done
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};
