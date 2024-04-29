import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Colours } from "../../colours";
import { Shell } from "../../components/shell";
import { useAxios } from "../../hooks/axios";
import SpreadsheetIcon from "../../assets/icons/spreadsheet-icon.svg"
import DownloadIcon from "../../assets/icons/download.svg"
import { CSVLink } from "react-csv";

export const EmployeeDetails = () => {
    const { company, employee } = useParams();
    const employeeID = localStorage.getItem("employeeID");
    const { goBack } = useHistory();
    const [data, setData] = useState([]);
    const { executeWithData, response, error } = useAxios({
        url: `/get-assessment`,
        method: "post"
    });
    useEffect(() => {
        executeWithData({employee: employeeID});
    }, []);
    useEffect(() => {
        if(error || !response) return;
        setData(response.assessment.questionnaire);
    }, [response]);
    return (
        <Shell
            heading={employee}
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
            >
                Start new assessment
            </Button>
            <Container
                sx={{
                    margin: "0 !important",
                    padding: "0 !important"
                }}
            >
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
                                {item.Content}
                            </Typography>
                            <Typography>
                                {item.response}
                            </Typography>
                        </Container>
                    ))
                }
            </Container>
        </Shell>
    )
}