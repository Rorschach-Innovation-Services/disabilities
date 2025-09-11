import {
    Avatar,
    Button,
    Container,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colours } from "../../../colours";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxios } from "../../../hooks/axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const ViewStaffMembers = ({ open, setOpen, dispatch, state }) => {
    const clientsReq = useAxios({
        url: state.viewedStaffMember
            ? `/admin/${state.viewedStaffMember.id}/clients`
            : "",
        method: "get",
    });
    const { push } = useHistory();
    const deleteReq = useAxios({ url: "", method: "delete" });
    useEffect(() => {
        console.log(state, "state");
        clientsReq.execute({
            url: state.viewedStaffMember
                ? `/admin/${state.viewedStaffMember.id}/clients`
                : "",
        });
    }, [state.viewedStaffMember]);

    useEffect(() => {
        if (!clientsReq.response || clientsReq.error) return;
        dispatch({
            type: "get-staff-clients",
            payload: clientsReq.response.clients,
        });
        console.log(state);
    }, [clientsReq.response, clientsReq.error]);

    const prettyRole = (role) => {
        const r = (role || '').toLowerCase();
        switch (r) {
            case 'administrator':
                return 'Administrator';
            case 'admin':
                return 'Admin';
            case 'pivot':
                return 'Pivot';
            case 'client_super':
                return 'Client Super';
            case 'client_user':
            case 'client':
                return 'Client Normal';
            default:
                return 'User';
        }
    }

    const onDelete = async () => {
        if (!state.viewedStaffMember || !state.viewedStaffMember.id) return;
        const confirmDelete = window.confirm(`Delete ${state.viewedStaffMember.name || 'this user'}? This action cannot be undone.`);
        if (!confirmDelete) return;
        await deleteReq.createRequest({
            url: `/admin/delete-account/${state.viewedStaffMember.id}`,
            method: 'delete'
        })();
        if (!deleteReq.error) {
            dispatch({ type: 'remove-staff-member', payload: state.viewedStaffMember.id });
            setOpen(false);
        }
    };
    return (
        <>
            {!open ? (
                <></>
            ) : (
                <Container
                    sx={{
                        flex: 1,
                        padding: "10px !important",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "15px",
                        backgroundColor: "#fff",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        width: "350px",
                        height: "100vh",
                        transition: "width 2s",
                    }}
                >
                    <Container
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            padding: "0 !important",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "14px",
                            }}
                        >
                            close
                        </Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon
                                sx={{
                                    color: Colours.lightGrey,
                                }}
                            />
                        </IconButton>
                    </Container>
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <Avatar
                            src={state.viewedStaffMember.photo}
                            sx={{
                                height: "80px",
                                width: "80px",
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: Colours.blue,
                            }}
                        >
                            {state.viewedStaffMember.name}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: "500",
                            }}
                        >
                            Profile
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '12px',
                                color: Colours.darkGrey
                            }}
                        >
                            Role: {prettyRole(state.viewedStaffMember.role)}
                        </Typography>
                    </Container>
                    <Button
                        startIcon={<DeleteIcon />}
                        color="error"
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            width: '140px',
                            fontSize: '12px'
                        }}
                        onClick={onDelete}
                    >
                        Delete User
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: Colours.blue,
                            ":hover": {
                                backgroundColor: Colours.blue,
                            },
                            placeSelf: "end",
                            textTransform: "none",
                            color: "#fff",
                            width: "120px",
                            fontSize: "12px",
                        }}
                        onClick={() => {
                            const uid = state.viewedStaffMember?.id || state.viewedStaffMember?._id;
                            if (uid) push(`/staff/${uid}/edit`);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: Colours.yellow,
                            ":hover": {
                                backgroundColor: Colours.yellow,
                            },
                            placeSelf: "end",
                            textTransform: "none",
                            color: "#000",
                            width: "120px",
                            fontSize: "12px",
                        }}
                        onClick={() => push("/assessment/questions")}
                    >
                        Add new client
                    </Button>
                    <Container
                        sx={{
                            padding: "0 !important",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                        }}
                    >
                        <Container
                            sx={{
                                display: "flex",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: Colours.darkGrey,
                                }}
                            >
                                Clients
                            </Typography>
                        </Container>
                        <Container
                            sx={{
                                padding: "0 !important",
                                display: "flex",
                                flexDirection: "column",
                                gap: "7px",
                            }}
                        >
                            {state.adminClients.map((client, index) => (
                                <Container
                                    key={index + client.name}
                                    sx={{
                                        backgroundColor: Colours.main,
                                        borderRadius: "10px",
                                        height: "55px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                        }}
                                    >
                                        {client.name}
                                    </Typography>
                                </Container>
                            ))}
                        </Container>
                    </Container>
                </Container>
            )}
        </>
    );
};
