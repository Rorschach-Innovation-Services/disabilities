import { Box, Stack, Typography } from "@mui/material";
import React, { CSSProperties } from "react";

type LinePercentageProps = {
    sx?: CSSProperties;
    percentageSx?: CSSProperties;
    textContainterSx?: CSSProperties;
    percentage: number;
    textLeft?: string;
    textRight?: string;
};

/**
Shows a linear percentage component
@param sx styling for top level element
@param textRight text diplayed on right side below percentage component
@param textLeft text diplayed on left side below percentage component
@param percentage value of the component
@param textContainterSx styling for component encompassing textLeft & textRight
@param percentageSx styling for percentage region
*/
export const LinePercentage = ({
    sx,
    percentageSx,
    textLeft = "",
    textRight = "",
    textContainterSx,
    percentage,
}: LinePercentageProps) => {
    return (
        <Box sx={sx}>
            <Box
                sx={{
                    border: "1px solid #93b7e4",
                    width: "380px",
                    height: "31px",
                    marginLeft: "15px",
                    ...percentageSx,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#93b7e4",
                        width: `${percentage}%`,
                        height: "100%",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: percentage < 20 ? "black" : "white",
                            marginLeft: "50px",
                        }}
                    >
                        {percentage}%
                    </Typography>
                </Box>
            </Box>
            <Stack
                direction="row"
                sx={{ width: "380px", marginLeft: "15px", ...textContainterSx }}
                justifyContent="space-between"
            >
                <Typography
                    sx={{
                        fontSize: "14px",
                    }}
                >
                    {textLeft}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "14px",
                    }}
                >
                    {textRight}
                </Typography>
            </Stack>
        </Box>
    );
};
