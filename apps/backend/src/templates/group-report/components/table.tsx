import {
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    Box,
} from "@mui/material";
import React, { CSSProperties } from "react";

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(147,184,228)",
        fontWeight: 700,
        fontSize: "16px",
        border: "1px solid rgb(147,184,228) !important",
    },
}));

type SleepDurationTableProps = {
    sx?: CSSProperties;
    rows: Array<{
        name: string;
        less7: number;
        between79: number;
        more9: number;
    }>;
};

/**
Custom table component for the sleep duration
@param sx styling of table container
@param rows data to be presented
*/
export const SleepDurationTable = ({ sx, rows }: SleepDurationTableProps) => {
    return (
        <TableContainer component={Box} sx={sx}>
            <Table
                size="small"
                sx={{
                    width: "100%",
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                    },
                    borderBottom: "1px solid rgb(147,184,228)",
                }}
                aria-label="custom table"
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="center">Less than 7h</StyledTableCell>
                        <StyledTableCell align="center">7-9h</StyledTableCell>
                        <StyledTableCell align="center">More than 9h</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                        >
                            <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{ color: "rgb(147,184,228)", fontWeight: 700 }}
                            >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.less7}%</StyledTableCell>
                            <StyledTableCell align="center">{row.between79}%</StyledTableCell>
                            <StyledTableCell align="center">{row.more9}%</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type SleepEfficiencyTableProps = {
    sx?: CSSProperties;
    rows: Array<{
        name: string;
        value: number;
    }>;
};

/**
Custom table component for the sleep efficiency
@param sx styling of table container
@param rows data to be presented
*/
export const SleepEfficiencyTable = ({
    sx,
    rows,
}: SleepEfficiencyTableProps) => {
    return (
        <TableContainer component={Box} sx={sx}>
            <Table
                size="small"
                sx={{
                    width: "50%",
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                    },
                    borderBottom: "1px solid rgb(147,184,228)",
                }}
                aria-label="custom table"
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="center">
                            Poor sleep efficiency
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                        >
                            <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{ color: "rgb(147,184,228)", fontWeight: 700 }}
                            >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.value}%</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type SleepDisorderManagementProps = {
    sx?: CSSProperties;
    rows: Array<{
        name: string;
        well: number;
        not: number;
    }>;
};

/**
Custom table component for the sleep disorder management
@param sx styling of table container
@param rows data to be presented
*/
export const SleepDisorderManagement = ({
    sx,
    rows,
}: SleepDisorderManagementProps) => {
    return (
        <TableContainer component={Box} sx={sx}>
            <Table
                size="small"
                sx={{
                    width: "80%",
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                    },
                    borderBottom: "1px solid rgb(147,184,228)",
                }}
                aria-label="custom table"
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="center">Well-managed</StyledTableCell>
                        <StyledTableCell align="center">Not well-managed</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                        >
                            <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{ color: "rgb(147,184,228)", fontWeight: 700 }}
                            >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.well}%</StyledTableCell>
                            <StyledTableCell align="center">{row.not}%</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type SleepMedicationProps = {
    sx?: CSSProperties;
    rows: Array<{
        name: string;
        usingSleepMedication: number;
        hasSleepDisorder: number;
        noSleepDisorder: number;
    }>;
};

/**
Custom table component for the sleep medication section
@param sx styling of table container
@param rows data to be presented
*/
export const SleepMedicationTable = ({ sx, rows }: SleepMedicationProps) => {
    return (
        <TableContainer component={Box} sx={sx}>
            <Table
                size="small"
                sx={{
                    width: "95%",
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                    },
                    borderBottom: "1px solid rgb(147,184,228)",
                }}
                aria-label="custom table"
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: "170px" }}>
                            Number using sleep medication
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            With sleep disorder
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Without sleep disorder
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                        >
                            <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{
                                    color: "rgb(147,184,228)",
                                    fontWeight: 700,
                                    width: "130px",
                                }}
                            >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.usingSleepMedication}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.hasSleepDisorder}%
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.noSleepDisorder}%
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type SummaryTableProps = {
    sx?: CSSProperties;
    count: {
        all: number;
        men: number;
        women: number;
    };
    rows: Array<{
        name: string;
        all: number;
        women: number;
        men: number;
    }>;
};

/**
Custom table component for the summary & interpretation section
@param sx styling of table container
@param rows data to be presented
@param count for total of genders
*/
export const SummaryTable = ({ sx, rows, count }: SummaryTableProps) => {
    return (
        <TableContainer component={Box} sx={sx}>
            <Table
                size="small"
                sx={{
                    width: "100%",
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                    },
                    borderBottom: "1px solid rgb(147,184,228)",
                }}
                aria-label="custom table"
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: "350px" }}></StyledTableCell>
                        <StyledTableCell align="center">All ({count.all})</StyledTableCell>
                        <StyledTableCell align="center">
                            Women ({count.women})
                        </StyledTableCell>
                        <StyledTableCell align="center">Men ({count.men})</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                        >
                            <StyledTableCell
                                component="th"
                                scope="row"
                                sx={{
                                    color: "rgb(147,184,228)",
                                    fontWeight: 700,
                                    width: "350px",
                                }}
                            >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.all}%</StyledTableCell>
                            <StyledTableCell align="center">{row.women}%</StyledTableCell>
                            <StyledTableCell align="center">{row.men}%</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
