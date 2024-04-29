import { Grid } from "@mui/material";

export const FullWidth = ({ children }) => {
    return (
        <Grid item xs={12}>
            {children}
        </Grid>
    );
};
