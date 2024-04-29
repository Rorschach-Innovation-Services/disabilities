import React, { Fragment } from "react";
import { Typography, useMediaQuery, Box } from "@mui/material";
import { CustomTable } from "../../../components/table";
import { CustomTableSingleRow } from "./single-row";

export const ClientTable = ({
    selected,
    toggleSelection,
    assessments,
    clientName,
    setOpenMessage,
    setSelected,
    setErrorInfo
}) => {
    const changePadding = useMediaQuery("(max-width:560px)");
    return (
        <Fragment>
            <CustomTable
                headings={[
                    "Select",
                    "",
                    "Date of last assessment",
                    "Number of people",
                    "Download",
                    "Delete",
                ]}
                headCellSx={{
                    fontSize: changePadding ? "9px" : "12px",
                    color: "grey !important",
                    fontWeight: "bold !important",
                    padding: changePadding ? "8px" : "16px",
                }}
            >
                {assessments &&
                    assessments.map((assessment) => (
                        <CustomTableSingleRow
                            key={assessment._id}
                            setErrorInfo={setErrorInfo}
                            clientName={clientName}
                            assessment={assessment}
                            toggleSelection={toggleSelection}
                            selected={selected}
                            setOpenMessage={setOpenMessage}
                            setSelected={setSelected}
                        />
                    ))}
            </CustomTable>
        </Fragment>
    );
};
