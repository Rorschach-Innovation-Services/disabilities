import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type SleepHealthScoreScaleProps = {
    downArrowIcon: string;
    value: number;
};

/**
Sleep health score scake
@param downArrowIcon icon for arrow pointing down
*/
export const SleepHealthScoreScale = ({
    downArrowIcon,
    value,
}: SleepHealthScoreScaleProps) => {
    const setArrowLocation = () => {
        const margin = value * 3 - 65;
        return margin > 0 ? margin : value;
    };

    return (
        <Box
            sx={{
                marginLeft: "40px",
                marginTop: "-35px",
            }}
        >
            <Box
                component="img"
                src={`data:image/png;base64,${downArrowIcon}`}
                sx={{
                    height: "15px",
                    width: "10px",
                    marginLeft: `${setArrowLocation()}px`,
                }}
            />
            <Box sx={{ display: "flex", width: "300px", height: "30px" }}>
                <Box
                    style={{
                        width: "33%",
                        height: "100%",
                        backgroundColor: "rgb(174,202,239)",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    poor
                </Box>
                <Box
                    style={{
                        width: "33%",
                        height: "100%",
                        backgroundColor: "rgb(194,215,242)",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    fair
                </Box>
                <Box
                    style={{
                        width: "33%",
                        height: "100%",
                        backgroundColor: "rgb(211,226,246)",
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    excellent
                </Box>
            </Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ width: "310px" }}
            >
                <Typography>0%</Typography>
                <Typography>65%</Typography>
                <Typography>85%</Typography>
                <Typography>100%</Typography>
            </Stack>
        </Box>
    );
};
