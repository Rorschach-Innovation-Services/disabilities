import React, { Fragment } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { CLIENTS_TO_DISPLAY } from "../clients-page";

export const Bottom = ({ response, step, styles, clients, search }) => {
    const setShowing = () => {
        if (search.length > 0) return clients.length;
        if (response && step * CLIENTS_TO_DISPLAY < response.companies.length)
            return step * CLIENTS_TO_DISPLAY;
        else return response.companies.length;
    };

    return (
        <Fragment>
            <Box sx={{ float: "right", display: "flex", mt: "28px" }}>
                {response && (
                    <Fragment>
                        <Typography variant="body1" sx={{ ...styles.text }}>
                            Now showing
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                ...styles.text,
                                fontWeight: "700",
                                ml: "9px",
                            }}
                        >
                            {setShowing()} of{" "}
                            {response ? response.companies.length : 0}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ ...styles.text, ml: "6px" }}
                        >
                            clients
                        </Typography>
                    </Fragment>
                )}
            </Box>
        </Fragment>
    );
};
