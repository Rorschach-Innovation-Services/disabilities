import {
    Modal,
    Box,
    Breadcrumbs,
    Link,
    Button,
    Typography,
    Backdrop,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Loading } from "../../components/loading";
import { Shell } from "../../components/shell";
import React, { useEffect, useReducer, useRef } from "react";
import { TopSection } from "./components/top-section";
import { useAxios } from "../../hooks/axios";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { EmployeeDetails } from "./components/employee-details";
import { CompanyDetails } from "./components/company-details";
import { employeeReducer, initialState } from "./reducer.js";
import { MessageDialogue } from "../questionnaire/components/answer-section";
import { Question } from "../questionnaire/components/question";
import { isDate, getHours, getMinutes } from "date-fns";
import { Save } from "@mui/icons-material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
};

export const EmployeeView = () => {
    const { employeeId } = useParams();
    const topElement = useRef(null);
    const [state, dispatch] = useReducer(employeeReducer, initialState);
    const location = useLocation();
    const history = useHistory();
    const { error, response, execute, loading } = useAxios({
        url: `/employees/${employeeId}`,
        method: "get",
    });
    const saveEmployeeDetails = useAxios({
        url: `/employees/${employeeId}`,
        method: "post",
    });

    useEffect(() => {
        execute();
    }, []);

    useEffect(() => {
        const { response, error } = saveEmployeeDetails;
        if (response && !error) {
            execute();
            dispatch({
                type: "general",
                payload: { key: "edit", value: false },
            });
        }
    }, [saveEmployeeDetails.response, saveEmployeeDetails.error]);

    useEffect(() => {
        if (response && !error) {
            dispatch({
                type: "add data",
                payload: {
                    employee: response.employee,
                    company: response.employee.company,
                },
            });
        }
    }, [response, error]);

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

    const getQuestion = () => {
        const id = state.editQuestion.id;

        if (id) {
            for (const question of state.employee.questionnaire) {
                if (question.id === id) return question;
            }
        }
    };

    const getQuestionResponse = () => {
        return getQuestion().response;
    };

    const validFields = () => {
        const email =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const bedtimes = [17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6];
        const wakeUpTimes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        // Personal questions
        if (
            state.editQuestion.name === "name" &&
            state.employee.name.length === 0
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "name" },
            });
            return false;
        }
        if (
            state.editQuestion.name === "email" &&
            !email.test(state.employee.email)
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "email" },
            });
            return false;
        }
        if (
            state.editQuestion.name === "idNumber" &&
            state.employee.idNumber.length !== 13
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "idNumber" },
            });
            return false;
        }
        if (
            state.editQuestion.name === "age" &&
            (state.employee.age < 15 || state.employee.age > 100)
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "age" },
            });
            return false;
        }
        if (
            state.editQuestion.name === "gender" &&
            state.employee.gender.length === 0
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "gender" },
            });
            return false;
        }

        // Sleep health questions
        if (
            state.editQuestion.id === "1" &&
            (getQuestionResponse().length === 0 ||
                !isDate(getQuestionResponse()))
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "1" },
            });
            return false;
        }
        if (state.editQuestion.id === "1" && isDate(getQuestionResponse())) {
            const hours = getHours(getQuestionResponse());
            const minutes = getMinutes(getQuestionResponse());
            if (bedtimes.includes(hours)) return true;
            if (hours === 7 && minutes === 0) return true;
            dispatch({
                type: "general",
                payload: { key: "error", value: "1" },
            });
            return false;
        }
        if (
            state.editQuestion.id === "2" &&
            (getQuestionResponse().length === 0 ||
                !isDate(getQuestionResponse()))
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "2" },
            });
            return false;
        }
        if (state.editQuestion.id === "2" && isDate(getQuestionResponse())) {
            const hours = getHours(getQuestionResponse());
            const minutes = getMinutes(getQuestionResponse());
            if (wakeUpTimes.includes(hours)) return true;
            if (hours === 15 && minutes === 0) return true;
            dispatch({
                type: "general",
                payload: { key: "error", value: "2" },
            });
            return false;
        }
        if (
            state.editQuestion.id === "3" &&
            (getQuestionResponse().length === 0 ||
                parseFloat(getQuestionResponse()) < 0 ||
                parseFloat(getQuestionResponse()) > 20)
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "3" },
            });
            return false;
        }
        if (
            state.editQuestion.id === "6a" &&
            getQuestionResponse().length === 0
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "6a" },
            });
            return false;
        }
        if (
            state.editQuestion.id === "6b" &&
            (getQuestionResponse().length === 0 ||
                (getQuestionResponse() === "Other" &&
                    state.otherDisorder.length === 0))
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "6b" },
            });
            return false;
        }
        if (
            state.editQuestion.id === "6c" &&
            getQuestionResponse().length === 0
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "6c" },
            });
            return false;
        }
        if (
            state.editQuestion.id === "7" &&
            getQuestionResponse().length === 0
        ) {
            dispatch({
                type: "general",
                payload: { key: "error", value: "7" },
            });
            return false;
        }
        return true;
    };

    return (
        <Box ref={topElement}>
            <Modal
                open={state.editQuestion.editting}
                onClose={() =>
                    dispatch({
                        type: "edit question",
                        payload: { editting: false },
                    })
                }
                sx={{}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {state.editQuestion.editting ? (
                        <Question
                            name={state.editQuestion.name}
                            id={state.editQuestion.id}
                            state={state}
                            dispatch={dispatch}
                            title={state.editQuestion.title}
                            error={state.error}
                            setError={(value) =>
                                dispatch({
                                    type: "general",
                                    payload: { key: "error", value },
                                })
                            }
                            customGetQuestion={() => getQuestion()}
                        />
                    ) : (
                        <Box />
                    )}
                    <Box sx={{ width: "100%", textAlign: "center" }}>
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: "reset question",
                                    payload: {
                                        name: state.editQuestion.name,
                                        id: state.editQuestion.id,
                                    },
                                });
                                dispatch({
                                    type: "edit question",
                                    payload: {
                                        editting: false,
                                        name: "",
                                        id: "",
                                        title: "",
                                    },
                                });
                            }}
                            variant="outlined"
                            sx={{
                                minHeight: 0,
                                height: "30px",
                                width: "140px",
                                fontSize: "12px",
                                fontWeight: 600,
                                borderRadius: "10px",
                                textTransform: "none",
                                color: "black",
                                marginRight: "10px",
                                borderColor: "black",
                                ":hover": {
                                    backgroundColor: "transparent",
                                    borderColor: "black",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                if (!validFields()) return;
                                dispatch({
                                    type: "edit question",
                                    payload: {
                                        editting: false,
                                        name: "",
                                        id: "",
                                        title: "",
                                    },
                                });
                            }}
                            sx={{
                                minHeight: 0,
                                height: "30px",
                                width: "140px",
                                fontSize: "12px",
                                fontWeight: 600,
                                borderRadius: "10px",
                                textTransform: "none",
                                color: "white",
                                backgroundColor: "black",
                                borderColor: "black",
                                ":hover": { backgroundColor: "black" },
                            }}
                        >
                            Save & continue
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Shell
                heading={
                    response
                        ? `All Clients / ${response.employee.company.name} / Employees / ${response.employee.name}`
                        : ""
                }
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
                        <Link
                            underline="hover"
                            href="/clients"
                            sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "HK Grotesk",
                                color: "black",
                            }}
                        >
                            All Clients
                        </Link>
                        <Link
                            underline="hover"
                            href={
                                response
                                    ? `/clients/${response.employee.company._id}`
                                    : ""
                            }
                            sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "HK Grotesk",
                                color: "black",
                            }}
                        >
                            {response ? response.employee.company.name : ""}
                        </Link>
                        <Link
                            underline="hover"
                            href={
                                response
                                    ? `/departments/${location.state[0].departmentId}`
                                    : ""
                            }
                            sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "HK Grotesk",
                                color: "black",
                            }}
                        >
                            Employees
                        </Link>
                        <Typography
                            underline="hover"
                            sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "HK Grotesk",
                                color: "black",
                            }}
                        >
                            {response ? response.employee.name : ""}
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
                <TopSection state={state} dispatch={dispatch} />
                <Backdrop
                    open={state.showWarning}
                    sx={{
                        backgroundColor: "rgb(240,240,240,0.7)",
                        zIndex: 10,
                    }}
                >
                    <MessageDialogue
                        message="You are about to edit the patients documents. Are you sure you would like to continue?"
                        display={state.showWarning}
                        rootSx={{ margin: "auto", mb: 0 }}
                        messageSx={{ fontWeight: 600 }}
                        dividerSx={{ mb: "8px" }}
                        setError={() => {
                            dispatch({
                                type: "general",
                                payload: { key: "edit", value: true },
                            });
                            dispatch({
                                type: "general",
                                payload: {
                                    key: "showWarning",
                                    value: false,
                                },
                            });
                        }}
                    >
                        <Button
                            variant="text"
                            sx={{ textTransform: "none" }}
                            onClick={() =>
                                dispatch({
                                    type: "general",
                                    payload: {
                                        key: "showWarning",
                                        value: false,
                                    },
                                })
                            }
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#8CB8E2",
                                }}
                            >
                                Cancel
                            </Typography>
                        </Button>
                        <Button
                            variant="text"
                            sx={{ textTransform: "none", ml: "67px" }}
                            onClick={() => {
                                dispatch({
                                    type: "general",
                                    payload: { key: "edit", value: true },
                                });
                                dispatch({
                                    type: "general",
                                    payload: {
                                        key: "showWarning",
                                        value: false,
                                    },
                                });
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#8CB8E2",
                                }}
                            >
                                Continue
                            </Typography>
                        </Button>
                    </MessageDialogue>
                </Backdrop>
                <Backdrop
                    open={state.showCancelWarning}
                    sx={{
                        backgroundColor: "rgb(240,240,240,0.7)",
                        zIndex: 10,
                    }}
                >
                    <MessageDialogue
                        message="You are about to exit without saving. Your changes will be lost. Are you sure you want to continue?"
                        display={state.showCancelWarning}
                        rootSx={{ margin: "auto", mb: 0 }}
                        sx={{ height: "180px" }}
                        messageSx={{ fontWeight: 600 }}
                        dividerSx={{ mb: "8px" }}
                        setError={() => { }}
                    >
                        <Button
                            variant="text"
                            sx={{ textTransform: "none" }}
                            onClick={() =>
                                dispatch({
                                    type: "general",
                                    payload: {
                                        key: "showCancelWarning",
                                        value: false,
                                    },
                                })
                            }
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#8CB8E2",
                                }}
                            >
                                Cancel
                            </Typography>
                        </Button>
                        <Button
                            variant="text"
                            sx={{ textTransform: "none", ml: "67px" }}
                            onClick={() => {
                                dispatch({
                                    type: "reset employee",
                                });
                                dispatch({
                                    type: "general",
                                    payload: {
                                        key: "showCancelWarning",
                                        value: false,
                                    },
                                });
                                history.goBack();
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#8CB8E2",
                                }}
                            >
                                Continue
                            </Typography>
                        </Button>
                    </MessageDialogue>
                </Backdrop>
                <Backdrop
                    open={state.showSuccess}
                    sx={{
                        backgroundColor: "rgb(240,240,240,0.7)",
                        zIndex: 10,
                    }}
                >
                    <MessageDialogue
                        message="Successfully updated employee's responses"
                        display={state.showSuccess}
                        rootSx={{ margin: "auto", mb: 0 }}
                        sx={{ height: "180px" }}
                        messageSx={{ fontWeight: 600 }}
                        dividerSx={{ mb: "8px" }}
                        setError={() => { }}
                    ></MessageDialogue>
                </Backdrop>
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <EmployeeDetails state={state} dispatch={dispatch} />
                    <CompanyDetails state={state} />
                    <Box
                        sx={{
                            textAlign: "right",
                            width: "100%",
                            mt: "70px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => {
                                dispatch({
                                    type: "general",
                                    payload: {
                                        key: "showCancelWarning",
                                        value: true,
                                    },
                                });
                            }}
                            sx={{
                                minHeight: 0,
                                height: "30px",
                                width: "140px",
                                fontSize: "12px",
                                fontWeight: 600,
                                borderRadius: "10px",
                                textTransform: "none",
                                color: "black",
                                marginRight: "10px",
                                borderColor: "black",
                                ":hover": {
                                    backgroundColor: "transparent",
                                    borderColor: "black",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        {saveEmployeeDetails.loading ? (
                            <LoadingButton
                                loading={saveEmployeeDetails.loading}
                                variant="outlined"
                                loadingPosition="start"
                                startIcon={
                                    <Save sx={{ color: "transparent" }} />
                                }
                                sx={{
                                    minHeight: 0,
                                    height: "30px",
                                    width: "140px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    color: "white !important",
                                    backgroundColor: "black",
                                    borderColor: "black",
                                    ":hover": { backgroundColor: "black" },
                                }}
                            >
                                Saving...
                            </LoadingButton>
                        ) : (
                            <Button
                                onClick={() => {
                                    saveEmployeeDetails.executeWithData({
                                        ...state.employee,
                                        departmentId:
                                            location.state[0].departmentId,
                                    });
                                }}
                                sx={{
                                    minHeight: 0,
                                    height: "30px",
                                    width: "140px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    color: "white",
                                    backgroundColor: "black",
                                    borderColor: "black",
                                    ":hover": { backgroundColor: "black" },
                                }}
                            >
                                Save & continue
                            </Button>
                        )}
                    </Box>
                </Box>
            </Shell>
        </Box>
    );
};
