import { Fragment } from "react";
import { LineItem } from "./line-item";
import { FullWidth } from "./full-width";
import { Divider, Typography, Button, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";

export const CompanyDetails = ({ state }) => {
    const { push } = useHistory();

    return (
        <Fragment>
            <FullWidth>
                <Typography
                    sx={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        mt: "43px",
                    }}
                >
                    Company Details
                </Typography>
            </FullWidth>
            <FullWidth>
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        mt: "15px",
                        color: "#707070",
                        mb: "47px",
                    }}
                >
                    Historical assessment
                </Typography>
            </FullWidth>
            <FullWidth>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "300px" }}
                >
                    <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                        {state.company.name}
                    </Typography>
                    <Button
                        onClick={() => push("/assessment/questions", { id: state.company.id })}
                        sx={{
                            textTransform: "none",
                            width: "171px",
                            height: "38px",
                            backgroundColor: "#FFE96B",
                            color: "black",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            ":hover": {
                                backgroundColor: "#FFE96B",
                            },
                        }}
                    >
                        Start New Assessment
                    </Button>
                </Stack>
            </FullWidth>
            <FullWidth>
                <Divider sx={{ backgroundColor: "#A2A2A2", mt: "30px" }} />
            </FullWidth>
            <LineItem
                label="Company name:"
                answer={state.company.name}
                state={state}
                dispatch={() => { }}
            />
            <LineItem
                label="Company sector:"
                answer={state.company.sector}
                state={state}
                dispatch={() => { }}
            />
            <LineItem
                label="Number of employees assessed:"
                answer={state.company.employeesAssessed}
                state={state}
                dispatch={() => { }}
            />
            <LineItem
                label="Company consultant:"
                answer={state.company.consultantName}
                dispatch={() => { }}
                state={state}
            />
            <LineItem
                label="Phone number:"
                answer={state.company.consultantPhone}
                state={state}
                dispatch={() => { }}
            />
            <LineItem
                label="Company e-mail:"
                state={state}
                answer={state.company.consultantEmail}
                dispatch={() => { }}
            />
        </Fragment>
    );
};
