import { Box, Typography, Grid, Button } from "@mui/material";

export const TopSection = ({ state, dispatch }) => {
    return (
        <Grid container sx={{ mt: "60px" }}>
            <Grid item xs={6} justifyContent="left">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "420px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "9px",
                                    fontWeight: 600,
                                    color: "#657173",
                                }}
                            >
                                Employee name
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: 600,
                                    color: "black",
                                }}
                            >
                                {state.staticEmployee.name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right", margin: "auto" }}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        if (state.edit)
                            dispatch({
                                type: "general",
                                payload: {
                                    key: "showCancelWarning",
                                    value: true,
                                },
                            });
                        else
                            dispatch({
                                type: "general",
                                payload: { key: "showWarning", value: true },
                            });
                    }}
                    sx={{
                        minHeight: 0,
                        height: "30px",
                        width: "113px",
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "none",
                        color: "black",
                        borderColor: "black",
                        mt: "10px",
                        ":hover": {
                            backgroundColor: "transparent",
                            borderColor: "black",
                        },
                    }}
                >
                    {state.edit ? "Cancel" : "Edit client file"}
                </Button>
            </Grid>
        </Grid>
    );
};
