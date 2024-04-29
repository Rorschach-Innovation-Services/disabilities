import { Avatar, Container, IconButton, Typography } from "@mui/material"
import { Colours } from "../../../colours"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const NewStaffMember = () => {
    const { push } = useHistory();
    return (
        <Container
            sx={{
                padding: "30px 20px !important",
                display: "flex",
                flexDirection: "column",
                backgroundColor: Colours.main,
                border: `1px solid ${Colours.blue}`,
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
                    padding: "0px !important",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    padding: "25px"
                }}
                onClick={() => push("/register-admin")}
            >
                <AddIcon fontSize="large"/>
            </IconButton>
            <Typography
                sx={{
                    color: "#000",
                    fontSize: "18px",
                    fontWeight: "500"
                }}
            >
                Add new member
            </Typography>
        </Container>
    )
}