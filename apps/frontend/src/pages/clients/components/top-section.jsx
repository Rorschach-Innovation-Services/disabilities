import React, { Fragment } from "react";
import {
    Grid,
    Box,
    Typography,
    Paper,
    FormControl,
    Avatar,
    IconButton,
    Input,
    useMediaQuery,
    InputAdornment,
    Button,
} from "@mui/material";
import { NotificationsOutlined, Search } from "@mui/icons-material";
import NewClientIcon from "../../../assets/icons/new-client.svg";
import { useLocalStorage } from "../../../hooks/storage";

export const TopSection = ({
    selected,
    response,
    search,
    setSearch,
    disableSearch,
    hideSelectedArea,
    clientName,
    onButtonClick,
    buttonText,
    buttonIcon,
    showDownloadButton = true,
}) => {
    const { name } = useLocalStorage();
    const rearrange = useMediaQuery("(max-width:560px)");

    const render = () => {
        const clientRegion = (
            <Grid item xs={rearrange ? 12 : 6}>
                <Box component="div" sx={{ display: "inline-flex" }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "600",
                            fontSize: "16px",
                            lineHeight: "20px",
                            width: `${clientName ? "300px" : "56px"}`,
                            mt: "46px",
                            height: "20px",
                            mb: "26px",
                        }}
                    >
                        Clients{clientName && `/ ${clientName}`}
                    </Typography>
                    {!hideSelectedArea && (
                        <Paper
                            elevation={3}
                            sx={{
                                display: `${selected.length ? "flex" : "none"}`,
                                backgroundColor: "primary.main",
                                height: "30px",
                                borderRadius: "5px",
                                width: "115px",
                                ml: "15px",
                                mt: "40px",
                                padding: "8px 20px 10px 21px",
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    height: "12px",
                                    width: "59px",
                                    fontsize: "10px",
                                    lineHeight: "12px",
                                    fontWeight: "600",
                                    color: "white",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {selected.length} Selected
                            </Typography>
                        </Paper>
                    )}
                </Box>
            </Grid>
        );

        const profileRegion = (
            <Grid item xs={rearrange ? 12 : 6}>
                <Box
                    component="div"
                    sx={{
                        float: "right",
                        display: "flex",
                        marginRight: "14px",
                    }}
                >
                    <NotificationsOutlined
                        sx={{
                            ml: "494px",
                            width: "13px",
                            height: "15px",
                            mt: "46px",
                        }}
                    />
                    <Avatar
                        sx={{
                            marginLeft: "64px",
                            marginTop: "30px",
                            height: "40px",
                            width: "40px",
                        }}
                    >
                        {name[0].toUpperCase()}
                    </Avatar>
                    <Typography
                        sx={{
                            marginLeft: "11px",
                            mt: "37px",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
            </Grid>
        );

        if (rearrange) {
            return (
                <Fragment>
                    {profileRegion}
                    {clientRegion}
                </Fragment>
            );
        }

        return (
            <Fragment>
                {clientRegion}
                {profileRegion}
            </Fragment>
        );
    };

    return (
        <Fragment>
            {/* {render()} */}
            <Grid container item>
                <Grid item xs={rearrange ? 12 : 8}>
                    <FormControl
                        sx={{ mb: "30px", width: "100%" }}
                        variant="filled"
                    >
                        <Input
                            disableUnderline
                            value={disableSearch ? "" : search}
                            onChange={(event) =>
                                disableSearch
                                    ? ""
                                    : setSearch(event.target.value)
                            }
                            placeholder="Search for clients"
                            inputProps={{ "aria-label": "description" }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Search
                                            sx={{
                                                width: "11px",
                                                height: "9px",
                                            }}
                                        />
                                    </IconButton>
                                </InputAdornment>
                            }
                            sx={{
                                backgroundColor: "white",
                                pl: "15px",
                                fontSize: "9px",
                                lineHeight: "11px",
                                height: "30px",
                                bordeRadius: "5px",
                            }}
                        />
                    </FormControl>
                </Grid>
                {showDownloadButton ? (
                    <Grid
                        item
                        xs={rearrange ? 12 : 4}
                        sx={{ display: "flex", justifyContent: "right" }}
                    >
                        <Button
                            variant="filled"
                            onClick={onButtonClick}
                            sx={{
                                minHeight: 0,
                                textTransform: "None",
                                backgroundColor: "black",
                                color: "white",
                                width: "150px",
                                height: "30px",
                                px: "10px",
                                ":hover": { backgroundColor: "black" },
                            }}
                        >
                            {buttonIcon ? (
                                <Box component="img" src={NewClientIcon} />
                            ) : null}
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    ml: "8px",
                                }}
                            >
                                {buttonText}
                            </Typography>
                        </Button>
                    </Grid>
                ) : null}{" "}
            </Grid>
        </Fragment>
    );
};
