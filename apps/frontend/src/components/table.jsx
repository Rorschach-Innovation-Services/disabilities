import React from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const styles = {
    tableCell: {
        borderBottom: "none",
        textAlign: "center",
        color: "inherit",
    },
    tableHeader: {
        fontWeight: "500",
        fontSize: "8px",
        color: "rgba(137, 137, 137, 1)",
        lineHeight: "10px",
    },
};

export const CustomTable = ({
    tableContainerSx,
    tableSx,
    headCellSx,
    headings,
    children,
}) => {
    return (
        <TableContainer
            component={Box}
            sx={{ height: "auto", ...tableContainerSx }}
        >
            <Table
                sx={{
                    borderCollapse: "separate",
                    "td, th": { ...styles.tableCell },
                    borderSpacing: "0px 7px",
                    ...tableSx,
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow key={headings.join("")}>
                        {headings.map((heading, index) => (
                            <TableCell
                                key={heading || index}
                                sx={{
                                    ...styles.tableHeader,
                                    ...headCellSx,
                                }}
                            >
                                {heading}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>{children}</TableBody>
            </Table>
        </TableContainer>
    );
};
