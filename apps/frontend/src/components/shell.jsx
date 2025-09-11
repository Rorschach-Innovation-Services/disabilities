import {
    Avatar,
    Container,
    Divider,
    Popover,
    Typography,
    Box,
} from "@mui/material";
import { Colours } from "../colours";
import { SideBar } from "./sidebar";
import NotificationIcon from "../assets/icons/notification-icon.svg";
import DropdownIcon from "../assets/icons/Dropdown.svg";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Shell = ({
    heading,
    children,
    headingStyling,
    childrenContainerStyling,
    headingComponent,
}) => {
    const [name, setName] = useState("Admin");
    const [profile, setProfile] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const { push } = useHistory();
    useEffect(() => {
        setName(localStorage.getItem("adminName"));
        setProfile(localStorage.getItem("adminPhoto"));
    }, [name, profile]);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Container
            sx={{
                display: "flex",
                margin: "0px !important",
                padding: "0px !important",
                minHeight: "100vh",
                maxWidth: "100% !important",
                maxWidth: "1350px !important",
            }}
        >
            <SideBar />
            <Container
                sx={{
                    backgroundColor: Colours.main,
                    padding: "0 !important",
                    paddingTop: "20px !important",
                    paddingRight: "20px !important",
                    ...childrenContainerStyling,
                }}
            >
                <Container
                    sx={{
                        padding: "0 10px 0 24px !important",
                        marginBottom: "20px",
                    }}
                >
                    <Container
                        sx={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center",
                            gap: "15px",
                            padding: "0 10px !important",
                        }}
                    >
                        {/* <img
                            src={NotificationIcon}
                            height="20px"
                            alt=""
                            style={{
                                cursor: "pointer",
                            }}
                        /> */}
                        <Avatar
                            alt="Admin"
                            src={profile}
                            sx={{
                                height: "50px",
                                width: "50px",
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: "600",
                            }}
                        >
                            {name}
                        </Typography>
                        <img
                            src={DropdownIcon}
                            height="10px"
                            alt=""
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={handleOpen}
                            id="simple-popover"
                        />
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <Typography
                                sx={{
                                    p: 2,
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                }}
                                onClick={() => push("/settings")}
                            >
                                My Profile
                            </Typography>
                            <Divider />
                            <Typography
                                sx={{
                                    p: 2,
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                }}
                            >
                                {"Help & Support"}
                            </Typography>

                            <Typography
                                sx={{
                                    p: 2,
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: Colours.customRed,
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    localStorage.removeItem("name");
                                    localStorage.removeItem("adminName");
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("email");
                                    push("/sign-in");
                                }}
                            >
                                Logout
                            </Typography>
                        </Popover>
                    </Container>
                    {headingComponent}
                    {typeof headingComponent === "undefined" && (
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: "28px",
                                ...headingStyling,
                            }}
                        >
                            {heading}
                        </Typography>
                    )}
                </Container>
                <Container
                    sx={{
                        padding: "0 0 20px 20px !important",
                        paddingBottom: "20px !important",
                    }}
                >
                    {children}
                </Container>
            </Container>
        </Container>
    );
};
