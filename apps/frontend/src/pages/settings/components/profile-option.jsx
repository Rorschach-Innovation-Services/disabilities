import { Button, Container, InputLabel, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Colours } from "../../../colours"
import { useAxios } from "../../../hooks/axios";

export const ProfileOption = ({ dispatch, state }) => {
    const [text, setText] = useState("");
    const { executeWithData, response, error } = useAxios({
        url: `/admin/update-profile/${state.admin._id}`,
        method: 'post'
    });
    useEffect(() => {
        if(!response || error) return;
        setText("Successfully updated profile!");
        setTimeout(() => {
            dispatch({
                type: "get-admin-data",
                payload: response.admin
            });
            localStorage.setItem("adminName", response.admoin.name);
            setText("");
        }, 2000);
    }, [response, error]);
    const updateProfile = () => {
        executeWithData({
            location: state.location,
            email: state.email,
            company: state.company,
            bio: state.bio,
            role: state.role,
            name: state.name
        });
    }
    return(
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                gap: "20px",
                padding: "0 !important"
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
                        display: "flex",
                        gap: "10px",
                        padding: "0 !important"
                    }}
                >
                    <Container
                        sx={{ padding: "0px !important", flex: 1}}
                    >
                        <InputLabel sx={{fontSize: "12px"}} htmlFor="name">Full Name</InputLabel>
                        <TextField
                            id="name"
                            onChange={(event) => dispatch({
                                type: "set-name",
                                payload: event.target.value
                            })}
                            value={state.name}
                            sx={{
                                ".MuiOutlinedInput-root.MuiInputBase-root": {
                                    height: "30px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                },
                            }}
                            fullWidth
                        />
                    </Container>
                </Container>
                <Container
                sx={{
                    display: "flex",
                    gap: "10px",
                    padding: "0 !important"
                }}>
                <Container
                    sx={{ padding: "0px !important", flex: 1}}
                >
                    <InputLabel sx={{fontSize: "12px"}}>Location</InputLabel>
                    <TextField
                        onChange={(event) => dispatch({
                            type: "set-location",
                            payload: event.target.value
                        })}
                        value={state.location}
                        sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-root": {
                                // width: "300px",
                                height: "30px",
                                fontSize: "12px",
                                fontWeight: "500",
                                },
                        }}
                        fullWidth
                    />
                    </Container>

                    <Container
                        sx={{ padding: "0px !important", flex: 1}}
                    >
                        <InputLabel sx={{fontSize: "12px"}}>Email</InputLabel>
                    <TextField
                        onChange={(event) => dispatch({
                            type: "set-email",
                            payload: event.target.value
                        })}
                        value={state.email}
                        sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-root": {
                                // width: "300px",
                                height: "30px",
                                fontSize: "12px",
                                fontWeight: "500",
                                },
                        }}
                        fullWidth
                    />
                    </Container>
                </Container>
                <Container
                sx={{
                    display: "flex",
                    gap: "10px",
                    padding: "0 !important"
                }}>
                    <Container
                        sx={{ padding:  "0px !important", flex: 1}}
                    >
                        <InputLabel sx={{fontSize: "12px"}}>Company</InputLabel>
                    <TextField
                        onChange={(event) => dispatch({
                            type: "set-company",
                            payload: event.target.value
                        })}
                        value={state.company}
                        sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-root": {
                                // width: "300px",
                                height: "30px",
                                fontSize: "12px",
                                fontWeight: "500",
                                },
                        }}
                        fullWidth
                    />
                    </Container>

                    <Container
                        sx={{ padding: "0px !important", flex: 1}}
                    >
                        <InputLabel sx={{fontSize: "12px"}}>Role</InputLabel>
                    <TextField
                        onChange={(event) => dispatch({
                            type: "set-role",
                            payload: event.target.value
                        })}
                        fullWidth
                        value={state.role}
                        sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-root": {
                                // width: "300px",
                                height: "30px",
                                fontSize: "12px",
                                fontWeight: "500",
                                },
                        }}
                    />
                    </Container>
                </Container>
                <Container
                sx={{
                    display: "flex",
                    gap: "10px",
                    padding: "0 !important"
                }}>
                <Container
                    sx={{ padding: "0px !important", flex: 1}}
                >
                    <InputLabel sx={{fontSize: "12px"}}>Bio</InputLabel>
                    <TextField
                        onChange={(event) => dispatch({
                            type: "set-bio",
                            payload: event.target.value
                        })}
                        multiline
                        maxRows={5}
                        sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-root": {
                                fontSize: "12px",
                                fontWeight: "500",
                            },
                        }}
                        fullWidth
                        value={state.bio}
                    />
                    </Container>
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
                        fontSize: "12px",
                        color: "green"
                    }}
                >
                    {text}
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
                        fontSize: "12px"
                    }}
                    onClick={updateProfile}
                >
                    Update profile
                </Button>
            </Container>
        </Container>
    )
}