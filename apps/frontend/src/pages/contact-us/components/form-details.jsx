import React, { useEffect } from "react";
import {
    Grid,
    TextField,
    Typography,
    Button,
    MenuItem,
    Select,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAxios } from "../../../hooks/axios";
import { createEmailBody } from "../../../utils/email-body";
import { useSnackbar } from "notistack";

const styles = {
    textField: {
        width: "100%",
        marginBottom: "3px",
        label: {
            ml: "15px",
        },
    },
};

// Component for each input the user is supposed to enter text in
const FormInput = ({
    gridBreakpoints,
    label,
    inputSx,
    required,
    stateName,
    formik,
    children,
    ...props
}) => {
    return (
        <Grid item xs={6} {...gridBreakpoints}>
            {props.select ? (
                <Select
                    required={required || false}
                    {...formik.getFieldProps(stateName)}
                    error={Boolean(
                        formik.touched[stateName] && formik.errors[stateName]
                    )}
                    placeholder={label}
                    variant="standard"
                    sx={{
                        marginTop: "5px",
                        ...styles.textField,
                        color: "darkgrey",
                        ...inputSx,
                    }}
                    displayEmpty
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return label;
                        }

                        return selected;
                    }}
                >
                    {children}
                </Select>
            ) : (
                <TextField
                    {...props}
                    required={required || false}
                    {...formik.getFieldProps(stateName)}
                    error={Boolean(
                        formik.touched[stateName] && formik.errors[stateName]
                    )}
                    helperText={formik.errors[stateName] || ""}
                    placeholder={label}
                    variant="standard"
                    sx={{ marginTop: "5px", ...styles.textField, ...inputSx }}
                >
                    {children}
                </TextField>
            )}
        </Grid>
    );
};

// Validation for the required fields
const formDetailsSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
});

// Valid options for the 'How did you hear about us' form
const findingUsOptions = [
    "Referral",
    "Social media (Instagram, Facebook, Linkedin)",
    "Conference/ podcast/ workshop/ lecture",
    "Direct marketing",
];
// Valid options for the 'How can we help' form
const ourHelpOptions = [
    "Sleep check",
    "Sleep coaching",
    "Jet lag toolkit",
    "Sleep health screen",
    "Talks, webinars, workshops, and Q&As",
    "Sleep health promotion",
];

// Handles & showcases the inputs a user can fill in
export const FormDetails = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { executeWithData, response, loading } = useAxios({
        url: "/contact",
        method: "post",
    });
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            number: "",
            foundMethod: "", // Method by which the person heard about sleep science
            help: "", // How we can help
            message: "",
        },
        validationSchema: formDetailsSchema,
        onSubmit: (values) => {
            executeWithData({
                subject: `Enquiry by ${values.fullName}`,
                message: createEmailBody(values),
            });
        },
    });

    useEffect(() => {
        if (!response) return;
        enqueueSnackbar("Success sent!", { variant: "success" });
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }, [response]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    marginTop: "-54px",
                    fontSize: "24px",
                    fontWeight: 410,
                    marginBottom: "20px",
                }}
            >
                Book an appointment
            </Typography>
            <Grid
                container
                sx={{
                    px: "10%",
                    mt: "3%",
                    "input[type='text'], select, textarea": {
                        border: "none",
                        marginBottom: "5px",
                    },
                    ".css-45h3ry-MuiFormLabel-root-MuiInputLabel-root": {
                        marginTop: "10px",
                    },
                    "label[data-shrink=false]+.MuiInputBase-formControl .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                        { marginTop: "14px" },
                    ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.MuiSelect-select":
                        { marginLeft: "12px" },
                    maxWidth: "1100px",
                    margin: "auto",
                }}
                spacing={2}
            >
                <FormInput
                    required
                    gridBreakpoints={{ xs: 12, md: 6 }}
                    label="Full Name*"
                    stateName="fullName"
                    formik={formik}
                />
                <FormInput
                    label="Contact number"
                    stateName="number"
                    formik={formik}
                    gridBreakpoints={{ xs: 12, md: 6 }}
                />
                <FormInput
                    required
                    label="Email*"
                    stateName="email"
                    formik={formik}
                    gridBreakpoints={{ xs: 12, md: 6 }}
                />
                <FormInput
                    label="How can we help?"
                    stateName="help"
                    formik={formik}
                    gridBreakpoints={{ xs: 12, md: 6 }}
                    select
                >
                    {ourHelpOptions.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            sx={{
                                backgroundColor:
                                    option === formik.values.help
                                        ? "black !important"
                                        : "white !important",
                                color:
                                    option === formik.values.help
                                        ? "white !important"
                                        : "black !important",
                                borderRadius: "30px",
                            }}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </FormInput>
                <FormInput
                    label="How did you hear about us?"
                    stateName="foundMethod"
                    formik={formik}
                    gridBreakpoints={{ xs: 12, md: 6 }}
                    select
                    inputSx={{ marginTop: "8px" }}
                >
                    {findingUsOptions.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            sx={{
                                backgroundColor:
                                    option === formik.values.foundMethod
                                        ? "black !important"
                                        : "white !important",
                                color:
                                    option === formik.values.foundMethod
                                        ? "white !important"
                                        : "black !important",
                                borderRadius: "30px",
                            }}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </FormInput>
                <Grid item xs={6}></Grid>
                <FormInput
                    label="Send us a message"
                    gridBreakpoints={{ xs: 12, md: 12 }}
                    stateName="message"
                    formik={formik}
                    inputSx={{ marginTop: "15px" }}
                />
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    {loading ? (
                        <LoadingButton
                            loading={loading}
                            variant="outlined"
                            loadingPosition="start"
                            startIcon={<Save sx={{ color: "transparent" }} />}
                            sx={{
                                textTransform: "none",
                                backgroundColor: "black",
                                color: "white !important",
                                padding: "1% 2%",
                                borderRadius: "2px",
                                width: "220px",
                                height: "40px",
                                mt: "3%",
                            }}
                        >
                            Submitting..
                        </LoadingButton>
                    ) : (
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                textTransform: "none",
                                backgroundColor: "black",
                                color: "white",
                                padding: "1% 2%",
                                width: "220px",
                                height: "40px",
                                borderRadius: "2px",
                                mt: "3%",
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{ fontSize: "14px" }}
                            >
                                Submit
                            </Typography>
                        </Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};
