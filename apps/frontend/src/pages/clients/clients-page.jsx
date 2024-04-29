import React, { Fragment, useEffect, useState } from "react";
import {
    Typography,
    Grid,
    Button,
    useMediaQuery,
    Box,
    IconButton,
    Breadcrumbs,
} from "@mui/material";
import { Shell } from "../../components/shell";
import { useAxios } from "../../hooks/axios";
import { ClientsTable } from "./components/clients-table";
import { Bottom } from "./components/bottom";
import { TopSection } from "./components/top-section";
import { useMediaStorage } from "../../hooks/media";
import { getKey } from "../../utils/get-key";
import { CustomMessage } from "../../components/message";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Loading } from "../../components/loading";
import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useHistory } from "react-router-dom";

export const CLIENTS_TO_DISPLAY = 5;

const styles = {
    actionButtons: {
        backgroundColor: "black",
        color: "white",
        textTransform: "none",
        borderRadius: "10px",
        height: "30px",
    },
    actionButtonText: {
        fontSize: "10px",
        fontWeight: "500",
        lineHeight: "11px",
    },
    text: {
        fontSize: "9px",
        fontWeight: "500",
        lineHeight: "10px",
    },
};

export const ClientsPage = () => {
    const [selected, setSelected] = useState([]);
    const [links, setLinks] = useState([]);
    const [search, setSearch] = useState("");
    const [openMessage, setOpenMessage] = useState(false);
    const [linksLoaded, setLinksLoaded] = useState(false);
    const [step, setStep] = useState(1);
    const [clients, setClients] = useState([]);
    const media = useMediaStorage();
    const { push } = useHistory();
    const useIconsOnly = useMediaQuery("(max-width:800px)");
    const { execute, response, error, loading } = useAxios({
        url: "/assessments/client-files",
        method: "get",
    });
    const deleteRequest = useAxios({
        url: "/companies",
        method: "delete",
    });

    const getClients = () => {
        const result = [];

        let i = (step - 1) * CLIENTS_TO_DISPLAY;
        let count = 0;

        while (count < CLIENTS_TO_DISPLAY && i < response.companies.length) {
            result.push(response.companies[i]);
            i++;
            count++;
        }

        setClients(result);
    };

    useEffect(() => {
        execute();
    }, []);
    // return only 4 clients to display at a time
    useEffect(() => {
        if (!response || !media.response || linksLoaded) return;
        const getLinks = async () => {
            const list = response.companies;
            for (let i = 0; i < list.length; i++) {
                if (!list[i].logo) setLinks((prev) => [...prev, ""]);
                else {
                    const url = await media.retrieve(getKey(list[i].logo));
                    if (media.response) setLinks((prev) => [...prev, url]);
                }
            }
            getClients();
        };
        getLinks();
        setLinksLoaded(true);
    }, [media.response, response]);

    useEffect(() => {
        if (!response) return;
        getClients();
    }, [step, response, error]);

    // Filter clients for the once searched for
    useEffect(() => {
        if (!response) return;
        if (search === "") return getClients();
        const result = response.companies.filter((client) =>
            client.name.toLowerCase().includes(search.toLowerCase())
        );
        setClients(result);
    }, [search]);

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleForward = () => {
        setStep((prev) => prev + 1);
    };

    const toggleSelection = (row) => {
        if (selected.includes(row._id)) {
            const copy = selected.filter((id) => id !== row._id);
            setSelected(copy);
        } else {
            setSelected((prev) => [...prev, row._id]);
        }
    };

    useEffect(() => {
        if (!deleteRequest.response || deleteRequest.error) return;
        if (response) {
            window.location.reload();
        }
    }, [deleteRequest.response, deleteRequest.error]);

    if (loading || !response)
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    textAlign: "center",
                    transform: "translateY(50%)",
                }}
            >
                <Loading
                    textSx={{ fontSize: "25px" }}
                    loadingSx={{
                        width: "250px !important",
                        height: "250px !important",
                    }}
                    containerSx={{
                        margin: "auto",
                        marginTop: "-100px",
                        textAlign: "center",
                    }}
                />
            </Box>
        );

    return (
        <Shell
            heading="All Clients"
            headingComponent={
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                        marginTop: "-35px",
                        marginBottom: "40px",
                        fontSize: "16px",
                        fontWeight: 600,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: 600,
                            fontFamily: "HK Grotesk",
                        }}
                    >
                        All Clients
                    </Typography>
                </Breadcrumbs>
            }
            headingStyling={{
                marginTop: "-35px",
                marginBottom: "40px",
                fontSize: "16px",
                fontWeight: 600,
            }}
            childrenContainerStyling={{ backgroundColor: "#F0F0F0" }}
        >
            <CustomMessage
                message="You are about a delete a client. Are you sure you want to continue?"
                open={openMessage}
                buttons
                onCancelClick={() => {
                    setOpenMessage(false);
                    setSelected([]);
                }}
                onContinueClick={() => {
                    deleteRequest.execute({
                        companyIDs: selected,
                    });
                }}
            />
            <TopSection
                selected={selected}
                response={response}
                search={search}
                setSearch={setSearch}
                buttonText="Create New Client"
                buttonIcon
                onButtonClick={() => push("/assessment/questions")}
            />
            <Grid item xs={12}>
                <ClientsTable
                    selected={selected}
                    toggleSelection={toggleSelection}
                    clients={clients}
                    setOpenMessage={setOpenMessage}
                    setSelected={setSelected}
                    links={links ? links : []}
                />
            </Grid>
            <Grid container item xs={12} textAlign="right">
                <Grid item xs={6} textAlign="left">
                    <Box
                        sx={{
                            float: "left",
                            width: "110px",
                            display: "flex",
                        }}
                    >
                        <IconButton
                            onClick={() => handleBack()}
                            disabled={step === 1}
                        >
                            <ArrowBack
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                        </IconButton>
                        <Typography
                            variant="body1"
                            sx={{
                                ...styles.text,
                                fontWeight: "700",
                                m: "auto",
                            }}
                        >
                            {response ? step : ""} of{" "}
                            {response
                                ? Math.ceil(
                                    response.companies.length /
                                    CLIENTS_TO_DISPLAY
                                )
                                : 0}
                        </Typography>
                        <IconButton
                            sx={{ ml: "3px" }}
                            onClick={() => handleForward()}
                            disabled={clients.length < CLIENTS_TO_DISPLAY}
                        >
                            <ArrowForward
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={6} textAlign="right">
                    <Button
                        variant="contained"
                        disabled={!selected.length}
                        onClick={() => setSelected([])}
                        sx={{
                            ...styles.actionButtons,
                            padding: "9px 33px 10px 35px",
                            width: "100px",
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ ...styles.actionButtonText }}
                        >
                            Cancel
                        </Typography>
                    </Button>
                    {deleteRequest.loading ? (
                        <LoadingButton
                            loading={deleteRequest.loading}
                            variant="outlined"
                            loadingPosition="start"
                            startIcon={<Save sx={{ color: "transparent" }} />}
                            sx={{
                                textTransform: "none",
                                backgroundColor: "black",
                                color: "white !important",
                                padding: "1% 2%",
                                fontSize: "10px",
                                borderRadius: "10px",
                                height: "30px",
                                mt: "3%",
                                ml: "1%",
                            }}
                        >
                            Deleting...
                        </LoadingButton>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() =>
                                setOpenMessage(true)
                            }
                            disabled={!selected.length}
                            sx={{
                                ...styles.actionButtons,
                                ml: "5px",
                                padding: "9px 17px 10px 19px",
                                width: "107px",
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{ ...styles.actionButtonText }}
                            >
                                Delete selected
                            </Typography>
                        </Button>
                    )}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Bottom
                    response={response}
                    styles={styles}
                    step={step}
                    clients={clients}
                    search={search}
                />
            </Grid>
        </Shell>
    );
};
