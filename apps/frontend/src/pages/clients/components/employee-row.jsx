import React, { useEffect, useState } from "react";
import {
    Box,
    TableCell,
    Typography,
    TableRow,
    IconButton,
    useMediaQuery,
    Popover,
} from "@mui/material";
import { SelectedBlackIcon } from "../../../assets/icons/selected-black";
import { UnselectedIcon } from "../../../assets/icons/unselected";
import { useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
import DeleteIcon from "../../../assets/icons/delete-icon.svg";
import PDFIcon from "../../../assets/icons/download_pdf.svg";
import { useAxios } from "../../../hooks/axios.js";

const styles = {
    tableRowText: {
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "10px",
    },
    tableHeader: {
        fontWeight: "500",
        fontSize: "12px",
        color: "rgba(137, 137, 137, 1)",
        lineHeight: "10px",
    },
};

export const CustomTableEmployeeRow = ({
    employee,
    toggleSelection,
    selected,
    setOpenMessage,
    setSelected,
}) => {
    const changePadding = useMediaQuery("(max-width:560px)");
    const { push } = useHistory();
    const { pathname } = useLocation();
    const { response, execute, error, loading } = useAxios({
        url: `/employees/${employee._id}`,
        method: "delete",
    });
    const getPDF = useAxios({
        url: `/employees/report/${employee._id}`,
        method: "get",
    });

    useEffect(() => {
        const { response, error } = getPDF;
        if (response && !error) {
            const url = window.URL.createObjectURL(
                new Blob([response], { type: "application/pdf" })
            );
            const link = document.createElement("a");
            // link.setAttribute("style", "display:none");
            link.href = url;
            link.setAttribute("download", `${employee.name}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
        }
    }, [getPDF.response, getPDF.error]);

    useEffect(() => {
        if (response && !error) {
            window.location.reload();
        }
    }, [response, error]);

    return (
        <TableRow
            key={employee._id}
            onClick={() => {
                const index = pathname.lastIndexOf("/");
                const departmentId = pathname.substring(index + 1);
                push(`/employee/${employee._id}`, [{ departmentId }]);
            }}
            sx={{
                backgroundColor: `${selected.includes(employee._id) ? "primary.main" : "white"
                    }`,
                color: `${selected.includes(employee._id) ? "white" : "black"}`,
                marginBottom: "7%",
                cursor: "pointer",
            }}
        >
            <TableCell
                component="th"
                scope="row"
                sx={{
                    "td:first-of-type,": {
                        borderRadius: "15px 0 0 15px",
                    },
                    padding: changePadding ? "8px" : "16px",
                }}
            >
                <IconButton
                    onClick={(event) => {
                        event.stopPropagation();
                        toggleSelection(employee);
                    }}
                >
                    {selected.includes(employee._id) ? (
                        <SelectedBlackIcon />
                    ) : (
                        <UnselectedIcon />
                    )}
                </IconButton>
            </TableCell>
            <TableCell
                sx={{
                    padding: changePadding ? "8px" : "16px",
                }}
            >
                <Typography
                    sx={{
                        ...styles.tableRowText,
                    }}
                >
                    {employee.name}
                </Typography>
            </TableCell>
            <TableCell
                sx={{
                    padding: changePadding ? "8px" : "16px",
                }}
            >
                <Typography sx={{ ...styles.tableRowText }}>
                    {employee.lastAssessmentDate === "none" ? "none" : format(
                        new Date(employee.lastAssessmentDate),
                        "dd/MM/yyyy"
                    )}
                </Typography>
            </TableCell>
            <TableCell
                sx={{
                    padding: changePadding ? "8px" : "16px",
                }}
            >
                {getPDF.loading ? (
                    <Typography sx={{ ...styles.tableRowText }}>
                        Downloading...
                    </Typography>
                ) : (
                    <IconButton
                        onClick={(event) => {
                            event.stopPropagation();
                            // setAnchorEl(event.currentTarget);
                            const request = getPDF.createRequest({
                                url: `/employees/individual-report/${employee._id}`,
                                method: "get",
                                options: { responseType: "blob" },
                            });
                            request();
                        }}
                    >
                        <Box
                            sx={{
                                width: "54px",
                                height: "38px",
                                backgroundColor: "#F7F7F7",
                                borderRadius: "10px",
                            }}
                        >
                            <Box
                                component="img"
                                src={PDFIcon}
                                sx={{ mt: "6px" }}
                            />
                        </Box>
                    </IconButton>
                )}
                {/* <Popover */}
                {/*     open={Boolean(anchorEl)} */}
                {/*     anchorEl={anchorEl} */}
                {/*     onClose={(event) => { */}
                {/*         event.stopPropagation(); */}
                {/*         setAnchorEl(null); */}
                {/*     }} */}
                {/*     elevation={2} */}
                {/*     anchorOrigin={{ */}
                {/*         vertical: "bottom", */}
                {/*         horizontal: "center", */}
                {/*     }} */}
                {/*     transformOrigin={{ */}
                {/*         vertical: "top", */}
                {/*         horizontal: "right", */}
                {/*     }} */}
                {/*     sx={{ */}
                {/*         ".css-ubpweo-MuiPaper-root-MuiPopover-paper": { */}
                {/*             width: "110px", */}
                {/*             height: "86px", */}
                {/*             maxWidth: "auto", */}
                {/*             maxHeight: "auto", */}
                {/*             borderRadius: "15px", */}
                {/*             textAlign: "center", */}
                {/*         }, */}
                {/*     }} */}
                {/* > */}
                {/*     <IconButton */}
                {/*         onClick={(event) => { */}
                {/*             event.stopPropagation(); */}
                {/*             setAnchorEl(null); */}
                {/*             execute(); */}
                {/*         }} */}
                {/*         sx={{ */}
                {/*             marginBottom: "-6px", */}
                {/*         }} */}
                {/*     > */}
                {/*         <Box */}
                {/*             sx={{ */}
                {/*                 width: "54px", */}
                {/*                 height: "38px", */}
                {/*                 backgroundColor: "#F7F7F7", */}
                {/*                 borderRadius: "10px", */}
                {/*             }} */}
                {/*         > */}
                {/*             <Box */}
                {/*                 component="img" */}
                {/*                 src={PDFIcon} */}
                {/*                 sx={{ mt: "6px" }} */}
                {/*             /> */}
                {/*         </Box> */}
                {/*     </IconButton> */}
                {/*     <Typography */}
                {/*         sx={{ */}
                {/*             fontSize: "9px", */}
                {/*             fontWeight: 500, */}
                {/*             textAlign: "center", */}
                {/*         }} */}
                {/*     > */}
                {/*         Download */}
                {/*     </Typography> */}
                {/* </Popover> */}
            </TableCell>
            <TableCell
                sx={{
                    "td:last-of-type,": {
                        borderRadius: "0 15px 15px 0 ",
                    },
                    padding: changePadding ? "8px" : "16px",
                }}
            >
                {loading ? (
                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontWeight: 500,
                        }}
                    >
                        Deleting...
                    </Typography>
                ) : (
                    <IconButton
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpenMessage(true);
                            setSelected((prev) => [...prev, employee._id]);
                        }}
                    >
                        <Box component="img" src={DeleteIcon} />
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    );
};
