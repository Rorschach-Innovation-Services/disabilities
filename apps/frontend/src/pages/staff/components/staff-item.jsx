import { Avatar, Container, IconButton, Typography } from "@mui/material"
import { Colours } from "../../../colours"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from "react";
import { useEffect } from "react";

export const StaffItem = ({ setOpen, data, state , dispatch}) => {
    const [viewed, setView] = useState(false);
    useEffect(() => {
        if(data._id === state.viewedStaffMember._id)
            setView(true);
        else
            setView(false);
    }, [state]);
    const viewStaffMember = () => {
        if(viewed === false){
            dispatch({
                type: "view-staff-member",
                payload: data
            });
            setView(prev => !prev)
            setOpen(true);
        }
        else{
            dispatch({
                type: "view-staff-member",
                payload: {}
            });
            setView(prev => !prev)
            setOpen(false);
        }
    }

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

    return (
        <Container
            sx={{
                padding: "10px !important",
                display: "flex",
                flexDirection: "column",
                backgroundColor: viewed ? Colours.blue : "#fff",
                border: viewed && "2px solid #fff",
                width: "200px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                margin: "0 !important",
                gap: "5px"
            }}
        >
            <IconButton
                sx={{
                    placeSelf: "end",
                    padding: "0px !important",
                }}
                onClick={viewStaffMember}
            >
                {
                    viewed ?
                    <CheckBoxIcon
                        sx={{
                            color: "#fff",
                            borderRadius: "10px"
                        }}
                    /> :
                    <CheckBoxOutlineBlankIcon
                        sx={{
                            color: Colours.blue,
                            borderRadius: "10px"
                        }}  
                    />
                }
            </IconButton>
            <Avatar
                src={data.photo}
                sx={{
                    border: "4px solid #fff",
                    width:"90px",
                    height: "90px",
                    padding: "0 !important"
                }}
            />
            <Typography
                sx={{
                    color: viewed ? "#fff" : "#000",
                    fontSize: "18px",
                    fontWeight: "500"
                }}
            >
                {data.name}
            </Typography>
            <Typography
                sx={{
                    color: viewed ? "#fff" : "#000",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: !viewed ? Colours.blue : Colours.yellow
                }}
            >
                {prettyRole(data.role)}
            </Typography>
        </Container>
    )
}