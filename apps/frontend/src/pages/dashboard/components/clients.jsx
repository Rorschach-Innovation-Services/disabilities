import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  IconButton,
  Container,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Colours } from "../../../colours";

const CLIENTS_TO_DISPLAY = 4;

const styles = {
  tableRowText: {
    fontSize: "0.8rem",
    textAlign: "center"
  },
  tableCell: {
    borderBottom: "none"
  },
  tableHeader: {
    fontSize: "12px",
    color: Colours.darkGrey,
    padding: "0 15px",
    width: "120px",
    textAlign: "center"
  },
};

export const Clients = ({ state, dispatch, links }) => {
  const [step, setStep] = useState(1);
  const headings = ["", "Client Member", "Date Added", "Status", "Email"]

  useEffect(() => {
    dispatch({ type: "client", payload: state.clients[0] })
  }, []);

  const getBackgroundColor = (row) => {
    if (state.selectedClient && state.selectedClient._id === row._id)
      return Colours.blue;
    return "white";
  };

  // return only 4 clients to display at a time
  const getClients = () => {
    if (!state.clients) return;

    const result = [];

    let i = (step - 1) * CLIENTS_TO_DISPLAY;
    let count = 0;

    while (count < CLIENTS_TO_DISPLAY && i < state.clients.length) {
      result.push(state.clients[i]);
      i++;
      count++;
    }

    return result;
  };

  const renderClients = () => {
    if (!state.clients) return <TableBody></TableBody>;
    console.log(state)
    return (
      <TableBody>
        {getClients().map((row, index) => (
          <TableRow
            key={row.name + index}
            component={Container}
            sx={{
              backgroundColor: getBackgroundColor(row),
              cursor: "pointer",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
              margin: "0 !important",
              padding: "0 !important",
              borderRadius: "15px !important"
            }}
            onClick={() => dispatch({ type: "client", payload: row })}
          >
            
            <TableCell 
              sx={{ 
                ...styles.tableCell,
                width: "70px",
                borderBottomLeftRadius: "15px",
                borderTopLeftRadius: "15px",
              }}
            >
              <Avatar
                alt="Company image"
                src={row.logo}
              />
            </TableCell>
            <TableCell
              sx={{
                ...styles.tableCell,
              }}
            >
              <Typography
                sx={{
                  ...styles.tableRowText,
                  textAlign: "center",
                  fontWeight: "600"
                }}
              >
                {row.name}
              </Typography>
            </TableCell>
            <TableCell sx={{ ...styles.tableCell }}>
              <Typography sx={{ ...styles.tableRowText }}>
                {(new Date(row.created)).toLocaleDateString()}
              </Typography>
            </TableCell>
            <TableCell sx={{ ...styles.tableCell }}>
              <Typography sx={{ ...styles.tableRowText }}>
                {row.status}
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                ...styles.tableCell,
                borderBottomRightRadius: "15px",
                borderTopRightRadius: "15px"
              }}
            >
              <Typography sx={{ ...styles.tableRowText }}>
                {row.hrConsultantEmail}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 !important",
        padding: "0 !important",
      }}
    >
      <TableContainer
        component={Container}
        sx={{
          margin: "0 !important",
          padding: "0 !important",
          overflowX: "unset",
          minHeight: "350px"
        }}>
        <Table
          sx={{
            minWidth: 500,
            borderCollapse: "separate",
            borderSpacing: "0px 10px",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {
                headings.map((heading, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      ...styles.tableCell,
                      ...styles.tableHeader,
                      textDecoration: (heading === "See all") ? "underline" : undefined,
                      width: (heading === "See all") ? "70px" : undefined,
                    }}
                  >
                    { heading }
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          {renderClients()}
        </Table>
      </TableContainer>
      <Container>
        <IconButton onClick={() => setStep((prev) => prev - 1)} disabled={step === 1}>
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => setStep((prev) => prev + 1)}
          disabled={getClients().length < CLIENTS_TO_DISPLAY}
        >
          <ArrowForward />
        </IconButton>
      </Container>
    </Container>
  );
};
