import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Colours } from "../../../colours";
import { PasswordOption } from "./password-option";
import { ProfileOption } from "./profile-option";
import { SettingsOptions } from "./settings-option";

export const ProfileDetails = ({state, dispatch}) => {
    useEffect(() => {
        console.log(state)
    }, [state.option]);
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                borderRadius: "5px",
                backgroundColor: "#fff",
                padding: "20px !important",
                flex: 3,
                marginRight: "10px",
                height: "450px"
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    gap: "7px",
                    marginBottom: "20px",
                    padding: "0 !important"
                }}
            >
                <Button
                    sx={{
                        backgroundColor: "#fff",
                        ":hover": {
                            backgroundColor: "#fff"
                        },
                        textTransform: "none",
                        color: state.option === "profile" ? Colours.blue : "#000",
                        width: "120px",
                        fontSize: "14px",
                        fontWeight: "600",
                        border: `1px solid ${state.option === "profile" ? Colours.blue : "#000"}`
                    }}
                    onClick={() => {
                        dispatch({
                            type: "change-option",
                            payload: "profile"
                        });
                    }}
                >
                    Profile
                </Button>
                <Button
                    sx={{
                        backgroundColor: "#fff",
                        ":hover": {
                            backgroundColor: "#fff"
                        },
                        textTransform: "none",
                        width: "120px",
                        fontWeight: "600",
                        color: state.option === "password" ? Colours.blue : "#000",
                        fontSize: "14px",
                        border: `1px solid ${state.option === "password" ? Colours.blue : "#000"}`
                    }}
                    onClick={() => {
                        dispatch({
                            type: "change-option",
                            payload: "password"
                        });
                    }}
                >
                    Password
                </Button>
                <Button
                    sx={{
                        backgroundColor: "#fff",
                        ":hover": {
                            backgroundColor: "#fff"
                        },
                        textTransform: "none",
                        width: "120px",
                        fontWeight: "600",
                        color: state.option === "settings" ? Colours.blue : "#000",
                        fontSize: "14px",
                        border: `1px solid ${state.option === "settings" ? Colours.blue : "#000"}`
                    }}
                    onClick={() => {
                        dispatch({
                            type: "change-option",
                            payload: "settings"
                        });
                    }}
                >
                    Settings
                </Button>
            </Container>
            {
                state.option === "profile" &&
                <ProfileOption state={state} dispatch={dispatch}/>
            }
            {
                state.option === "settings" &&
                <SettingsOptions state={state} dispatch={dispatch}/>
            }
            {
                state.option === "password" &&
                <PasswordOption state={state} dispatch={dispatch}/>
            }
        </Container>
    );
}