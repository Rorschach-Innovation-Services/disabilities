import { Button, Container, InputLabel, TextField, Typography } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react"
import { Colours } from "../../../colours"
import { useAxios } from "../../../hooks/axios";

export const PasswordOption = ({ state, dispatch }) => {
    const [text, setText] = useState({});
    const { executeWithData, response, error } = useAxios({
        url: `/admin/update-password/${state.admin._id}`,
        method: "post"
    });
    useEffect(() => {
        if(!response || error) return;
        setText({
            text: "Successfully updated password!",
            color: "green"
        });
        setTimeout(() => {
            dispatch({
                type: "set-password",
                payload: ""
            });
            dispatch({
                type: "set-new-password",
                payload: ""
            });
            dispatch({
                type: "set-confirm-password",
                payload: ""
            });
            setText({});
        }, 2000);
    }, [response, error]);
    const updatePassword = () => {
        if(state.newPassword === state.confirmPassword)
            executeWithData({
                password: state.password,
                newPassword: state.newPassword
            });
        else
            setText({
                text: "Passwords do not match!",
                color: "red"
            });
    }
    return(
        <Container
            sx={{
                padding: "0px !important",
                gap: "20px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between"
            }}
        >
            <Container
                sx={{
                    padding: "0px !important",
                    gap: "20px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Container
                    sx={{ 
                        padding: "0px !important", 
                        width: "50%", 
                        margin: "0 !important"
                    }}
                >
                    <InputLabel sx={{fontSize: "12px"}} htmlFor="first-name">Current password</InputLabel>
                    <TextField
                        onChange={(event) => dispatch({
                            type: "set-password",
                            payload: event.target.value
                        })}
                        sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-root": {
                                height: "30px",
                                fontSize: "12px",
                                fontWeight: "500",
                            },
                        }}
                        value={state.password}
                        type="password"
                        fullWidth
                    />
                </Container>
                <Container
                    sx={{ 
                        padding: "0px !important", 
                        width: "50%", 
                        margin: "0 !important"
                    }}
                >
                    <InputLabel sx={{fontSize: "12px"}} htmlFor="first-name">New password</InputLabel>
                    <TextField
                        onChange={(event) => dispatch({
                            type: "set-new-password",
                            payload: event.target.value
                        })}
                        sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-root": {
                                height: "30px",
                                fontSize: "12px",
                                fontWeight: "500",
                            },
                        }}
                        value={state.newPassword}
                        fullWidth
                        type="password"
                    />
                </Container>
                <Container
                    sx={{ 
                        padding: "0px !important", 
                        width: "50%", 
                        margin: "0 !important"
                    }}
                >
                    <InputLabel sx={{fontSize: "12px"}} htmlFor="first-name">Confirm password</InputLabel>
                    <TextField
                        onChange={(event) => dispatch({
                            type: "set-confirm-password",
                            payload: event.target.value
                        })}
                        sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-root": {
                                height: "30px",
                                fontSize: "12px",
                                fontWeight: "500",
                            },
                        }}
                        value={state.confirmPassword}
                        fullWidth
                        type="password"
                    />
                    <Typography
                        sx={{
                            fontSize: "12px"
                        }}
                    >
                        Your new password may not be the same as your old password.
                    </Typography>
                </Container>
            </Container>
            <Container
                sx={{
                    padding: "0px !important",
                    gap: "20px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    sx={{
                        color: text.color,
                        fontSize: "10px",
                        fontWeight: "500"
                    }}
                >
                    { text.text }
                </Typography>
                <Button
                    sx={{
                        backgroundColor: Colours.blue,
                        ":hover": {
                            backgroundColor: Colours.blue
                        },
                        textTransform: "none",
                        color: "#fff",
                        width: "120px",
                        fontSize: "12px",
                    }}
                    onClick={updatePassword}
                >
                    Update password
                </Button>
            </Container>
        </Container>
    )
}