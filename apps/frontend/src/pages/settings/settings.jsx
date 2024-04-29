import { Container } from "@mui/material";
import { useReducer } from "react";
import { useEffect } from "react";
import { Shell } from "../../components/shell";
import { useAxios } from "../../hooks/axios";
import { ProfileAvatar } from "./components/profile-avatar";
import { ProfileDetails } from "./components/profile-details";
import { initialSettingsState, SettingsReducer } from "./reducer";

export const Settings = () => {
    const [state, dispatch] = useReducer(SettingsReducer, initialSettingsState);
    const { response, error, execute } = useAxios({
        url: `/admin/${localStorage.getItem("adminID")}`,
        method: "get"
    });
    useEffect(() => {
        execute({});
    }, []);
    useEffect(() => {
        if(!response || error) return;
        console.log(response.admin)
        dispatch({
            type: "get-admin-data",
            payload: response.admin
        });
        dispatch({
            type: "set-name",
            payload: response.admin.name
        })
        dispatch({
            type: "set-email",
            payload: response.admin.email
        })
        dispatch({
            type: "set-sec-email",
            payload: response.admin.secondaryEmail
        })
        dispatch({
            type: "set-company",
            payload: response.admin.company
        })
        dispatch({
            type: "set-location",
            payload: response.admin.location
        })
        dispatch({
            type: "set-role",
            payload: response.admin.role
        })
        dispatch({
            type: "set-bio",
            payload: response.admin.bio
        })
        dispatch({
            type: "set-photo",
            payload: response.admin.photo
        })
    }, [response]);
    return (
        <Shell
            heading="Account Settings"
        >
            {
                state.admin &&
                <Container
                    sx={{
                        display: "flex",
                        padding: "0px !important",
                        gap: "20px",
                        marginTop: "50px"
                    }}
                >
                    <ProfileAvatar dispatch={dispatch} data={state}/>
                    <ProfileDetails state={state} dispatch={dispatch} />
                </Container>
            }
        </Shell>
    )
}