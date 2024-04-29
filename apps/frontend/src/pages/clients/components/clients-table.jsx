import React, { Fragment } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { CustomTable } from "../../../components/table";
import { CustomTableRow } from "./table-row";

export const ClientsTable = ({
    selected,
    toggleSelection,
    clients,
    links,
    setOpenMessage,
    setSelected,
}) => {
    const changePadding = useMediaQuery("(max-width:560px)");

    return (
        <Fragment>
            <CustomTable
                headings={[
                    "Select",
                    "",
                    "Client name",
                    "Date of assessment",
                    "Status",
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
                {clients &&
                    clients.map((row, index) => (
                        <CustomTableRow
                            key={row._id}
                            row={row}
                            index={index}
                            links={links}
                            selected={selected.includes(row._id)}
                            setSelected={setSelected}
                            setOpenMessage={setOpenMessage}
                            toggleSelection={toggleSelection}
                        />
                    ))}
            </CustomTable>
            <Box component="div" sx={{ float: "right" }}>
                <IconButton></IconButton>
                <IconButton></IconButton>
            </Box>
        </Fragment>
    );
};
