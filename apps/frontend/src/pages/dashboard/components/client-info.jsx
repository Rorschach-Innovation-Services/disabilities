import React, { Fragment, useState } from "react";
import {
    Typography,
    Box,
    useMediaQuery,
    Paper,
    Avatar,
    Divider,
    Grid,
    IconButton,
    Tooltip,
    Container,
} from "@mui/material";
import { Email, PhoneInTalk } from "@mui/icons-material";
import CallIcon from "../../../assets/icons/call-icon.svg";
import EmailIcon from "../../../assets/icons/email-icon.svg";
import { useHistory } from "react-router-dom";

const IconWithLabel = ({ icon, label, imgStyles }) => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
            }}
        >
            {
                !icon ?
                    <img
                        src={undefined}
                        style={{
                            border: "1px solid black",
                            borderRadius: "10px"
                        }}
                        width="30px"
                        height="30px"
                    /> :
                    <img
                        src={icon}
                        height="30px"
                        style={{
                            ...imgStyles
                        }}
                    />
            }
            <Typography
                sx={{
                    color: "black"
                }}>{label}</Typography>
        </Container>
    );
};

const InfoItem = ({ fieldName, fieldValue }) => {
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 !important"
            }}
        >
            <Typography
                sx={{
                    width: "50%",
                    fontSize: "12px",
                    fontWeight: "600"
                }}
            >
                {fieldName}
            </Typography>
            <Typography
                sx={{
                    width: "50%",
                    fontSize: "12px",
                }}
            >
                {fieldValue}
            </Typography>
        </Container>
    );
};

export const ClientInfo = ({ client }) => {
    const [showNumber, setShowNumber] = useState(false);
    const { push } = useHistory();

    const showContactNumber = () => {
        setShowNumber((prev) => !prev);
    };

    return (
        <Container
            sx={{
                boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                padding: "20px 10px !important",
                margin: "0px !important",
                borderRadius: "15px",
                backgroundColor: "white"
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    padding: "0px !important",
                    margin: "0px !important",
                }}
            >
                <Container
                    sx={{
                        padding: "0px !important",
                        margin: "0px !important",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >
                    <Container
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "0px !important"
                        }}
                    >
                        <Typography>{client ? client.name : "Company Name"}</Typography>
                        <Typography
                            sx={{
                                textDecoration: "underline",
                                fontSize: "14px",
                                cursor: "pointer",
                                width: "20%"
                            }}
                            onClick={() => {
                                localStorage.setItem("companyID", client._id);
                                push(`/clients/${client.name}/details`);
                            }}
                        >
                            See all
                        </Typography>
                    </Container>
                    <Container
                        sx={{
                            display: "flex",
                            padding: "0px !important",
                            margin: "0px !important",
                            justifyContent: "space-between"
                        }}
                    >
                        <Container
                            sx={{
                                padding: "0 !important",
                                flex: 1
                            }}
                        >
                            <IconWithLabel
                                label="Photo"
                                icon={client ? client.logo : null}
                                imgStyles={client ? { width: "30px", height: "30px", borderRadius: "7px" } : {}}
                            />
                        </Container>
                        <Container
                            sx={{
                                padding: "0 !important",
                                flex: 1
                            }}>
                            <IconButton
                                href={`mailto:${client ? client.hrConsultantEmail : ""}`}
                                target="__blank"
                                rel="noopener noreferrer"
                                sx={{
                                    padding: "0 !important  "
                                }}
                            >
                                <IconWithLabel
                                    label="Email"
                                    icon={EmailIcon}
                                />
                            </IconButton>
                        </Container>
                        <Container
                            sx={{
                                padding: "0 !important",
                                flex: 1
                            }}>
                            <Tooltip
                                title={
                                    <Typography variant="body1">{client ? client.phone : ""}</Typography>
                                }
                                open={showNumber}
                                arrow
                                placement="top"
                            >
                                <IconButton
                                    sx={{
                                        padding: "0 !important  "
                                    }}
                                    onClick={showContactNumber}
                                >
                                    <IconWithLabel
                                        label="Call"
                                        icon={CallIcon}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Container>
                    </Container>
                </Container>
            </Container>
            <Divider sx={{ margin: "10px 0", borderWidth: "1px" }} />
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >
                <InfoItem
                    fieldName="Status"
                    fieldValue={client ? client.status : ""}
                />
                <InfoItem fieldName="Designation" fieldValue="HR Management" />
                <InfoItem
                    fieldName="Company"
                    fieldValue={client ? client.name : ""}
                />
                <InfoItem
                    fieldName="Contact"
                    fieldValue={client ? client.phone : ""}
                />
            </Container>
        </Container>
    );
};
