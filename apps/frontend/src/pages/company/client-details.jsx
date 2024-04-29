import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Colours } from "../../colours";
import { Shell } from "../../components/shell";
import { useAxios } from "../../hooks/axios";
import SpreadsheetIcon from "../../assets/icons/spreadsheet-icon.svg"
import DownloadIcon from "../../assets/icons/download.svg"
import { CSVLink } from "react-csv";
import EditIcon from '@mui/icons-material/Edit';

export const ClientDetails = () => {
    const [editProp, setEditProp] = useState({ edit: false, prop: null, value: null });
    const [editDetails, setEditDetails] = useState(false);
    const { company } = useParams();
    const companyID = localStorage.getItem("companyID");
    const history = useHistory();
    const [data, setData] = useState([]);
    const { execute, response, error } = useAxios({
        url: `/companies/${companyID}`,
        method: "get"
    });
    const saveProp = useAxios({
        url: `/companies/${companyID}/update`,
        method: "post"
    });
    useEffect(() => {
        execute({});
    }, []);
    useEffect(() => {
        if (error || !response) return;
        const clientData = [
            {
                label: "Company name",
                value: response.company.name,
                propName: "name"
            },
            {
                label: "Company Sector",
                value: response.company.sector,
                propName: "sector"
            },
            {
                label: "Number of employees assessed",
                value: response.company.employeeSize,
                propName: "employeeSize"
            },
            {
                label: "Company consultant",
                value: response.company.hrConsultantName,
                propName: "hrConsultantName"
            },
            {
                label: "Phone number",
                value: response.company.phone,
                propName: "phone"
            },
            {
                label: "Company e-mail",
                value: response.company.hrConsultantEmail,
                propName: "hrConsultantEmail"
            },
        ];
        setData(clientData);
    }, [response]);
    useEffect(() => {
        if (!saveProp.response || saveProp.error) return;
        setEditProp({ edit: false, prop: null, value: null });
        const clientData = [
            {
                label: "Company name",
                value: saveProp.response.company.name,
                propName: "name"
            },
            {
                label: "Company Sector",
                value: saveProp.response.company.sector,
                propName: "sector"
            },
            {
                label: "Number of Employees assessed",
                value: saveProp.response.company.employeeSize,
                propName: "employeeSize"
            },
            {
                label: "Company consultant",
                value: saveProp.response.company.hrConsultantName,
                propName: "hrConsultantName"
            },
            {
                label: "Phone number",
                value: saveProp.response.company.phone,
                propName: "phone"
            },
            {
                label: "Company e-mail",
                value: saveProp.response.company.hrConsultantEmail,
                propName: "hrConsultantEmail"
            },
        ];
        setData(clientData);
    }, [saveProp.response]);
    return (
        <Shell
            heading={company}
        >
            <Dialog
                open={editProp.edit}
                onClose={() => setEditProp({ edit: false, prop: null, value: null })}
            >
                <DialogTitle>Edit { !data.filter(item => item.propName === editProp.prop)[0] ? "" : data.filter(item => item.propName === editProp.prop)[0].label.toLowerCase()}</DialogTitle>
                <DialogContent>
                    <TextField
                        placeholder={!data.filter(item => item.propName === editProp.prop)[0] ? "" : data.filter(item => item.propName === editProp.prop)[0].label}
                        value={!editProp.value ? "" : editProp.value}
                        onChange={(event) => setEditProp({ ...editProp, value: event.target.value })}
                        sx={{
                            width: "100%"
                        }}
                    />
                </DialogContent>
                <DialogActions>
                <Button
                    sx={{
                        textTransform: "none",
                        backgroundColor: "#000",
                        ":hover": {
                            backgroundColor: "#000",
                        },
                        color: "#fff",
                        boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                        width: "100%",
                        margin: "0 15px"
                    }}
                    variant="contained"
                    onClick={() => saveProp.executeWithData({[editProp.prop]: editProp.value})}
                >
                    Update
                </Button>
                </DialogActions>
            </Dialog>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Button
                    sx={{
                        textTransform: "none",
                        backgroundColor: Colours.yellow,
                        ":hover": {
                            backgroundColor: Colours.yellow,
                        },
                        color: "#000",
                        fontSize: "12px",
                        margin: "5px 0 20px 0",
                        boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                        
                    }}
                    variant="contained"
                    onClick={() => history.push("/assessment/questions", { id: companyID })}
                >
                    Start new assessment
                </Button>
                <Typography
                    sx={{
                        cursor: "pointer",
                        textDecoration: "underline"
                    }}
                    onClick={() => setEditDetails(!editDetails)}
                >
                    {!editDetails ? "Edit client" : "Exit editing mode"}
                </Typography>
            </Container>
            <Container
                sx={{
                    margin: "0 !important",
                    padding: "0 !important"
                }}>
                {
                    data.map((item, index) => (
                        <Container
                            key={index}
                            sx={{
                                display: "flex",
                                borderTop: `1px solid ${Colours.lightGrey}`,
                                borderBottom: index === data.length - 1 ? `1px solid ${Colours.lightGrey}` : "unset",
                                margin: "0 !important",
                                height: "40px",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography>
                                {item.label}
                            </Typography>
                            <Container
                                sx={{
                                    margin: "0 !important",
                                    padding: "0 !important",
                                    width: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >
                                <Typography>
                                    {item && item.value}
                                </Typography>
                                {
                                    editDetails &&
                                    <IconButton
                                        onClick={() => setEditProp({ edit: true, prop: item.propName, value: item.value })}
                                    >
                                        <EditIcon sx={{color: "#000" }} />
                                    </IconButton>
                                }
                            </Container>
                        </Container>
                    ))
                }
            </Container>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "20px 0 0 0 !important",
                    padding: "0 !important",
                }}
            >
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: "500"
                        }}
                    >
                        Company History excel Spreadsheet
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "16px",
                            color: Colours.darkGrey
                        }}
                    >
                        Historical assessment
                    </Typography>
                </Container>
                <Container
                    sx={{
                        display: "flex",
                        marginTop: "20px",
                        alignItems: "center",
                    }}
                >
                    <Container
                        sx={{
                            display: "flex",
                            backgroundColor: Colours.yellow,
                            color: "#000",
                            height: "80px",
                            boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                            width: "320px",
                            alignItems: "center",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                    >
                        {/* <CSVLink
                            data={assessment.csvFile}
                            filename={`${clientName}.csv`}
                        > */}
                            <Container
                                sx={{
                                    backgroundColor: "#000",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "60px",
                                    height: "40px",
                                    margin: "0 !important",
                                    padding: "0 !important",
                                    borderRadius: "10px"
                                }}>
                                <img
                                    src={SpreadsheetIcon}
                                    width="20px"
                                />
                            </Container>
                            <Container
                                sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: "500"
                                    }}
                                >
                                    Excel Spreadsheet
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "10px",
                                        color: Colours.darkGrey
                                    }}
                                >
                                    Click assessment to view
                                </Typography>
                            </Container>
                            <img
                                src={DownloadIcon}
                                width="30px"
                            />
                        {/* </CSVLink> */}
                    </Container>
                    <Container
                        sx={{
                            textAlign: "right",
                            padding: "0 !important"
                        }}
                    >
                        <Button
                            sx={{
                                textTransform: "none",
                                backgroundColor: "#000",
                                ":hover": {
                                    backgroundColor: "#000",
                                },
                                color: "#fff",
                                // borderRadius: "15px",
                                // margin: "5px 0 20px 0",
                                boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                            }}
                            variant="contained"
                            onClick={() => history.goBack()}
                        >
                            Go back
                        </Button>
                    </Container>
                </Container>
            </Container>
        </Shell>
    )
}