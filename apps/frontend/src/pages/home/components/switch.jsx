import { Switch as MaterialSwitch } from "@mui/material";

/**
Custom switch component with styling
@param props of the Material UI Switch
*/

export const Switch = (props) => {
    return (
        <MaterialSwitch
            {...props}
            sx={{
                ".css-jsexje-MuiSwitch-thumb": {
                    boxShadow:
                        "0px 2px 1px -1px rgb(0 0 0 / 22%), 0px 1px 1px 0px rgb(0 0 0 / 16%), 0px 1px 3px 0px rgb(0 0 0 / 35%)",
                    backgroundColor: "white !important",
                },
                ".css-ouwir5-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                    {
                        backgroundColor: "#8CB8E2 !important",
                    },
            }}
        />
    );
};
