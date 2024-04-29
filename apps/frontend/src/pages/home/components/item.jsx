import { Stack, Typography, useMediaQuery } from "@mui/material";
import { Switch } from "./switch";

export const ToggleItem = ({ value, onChange, children }) => {
    const matches = useMediaQuery("(max-width:500px)");
    return (
        <Stack direction="row" sx={{ marginBottom: "30px" }}>
            <Typography
                sx={{ width: matches ? "315px" : "441px", fontSize: "14px" }}
            >
                {children}
            </Typography>
            <Switch checked={value} onChange={onChange} />
        </Stack>
    );
};
