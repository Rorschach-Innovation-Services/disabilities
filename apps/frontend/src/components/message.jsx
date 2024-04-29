import { Button, Typography, Backdrop } from "@mui/material";
import { Fragment } from "react";
import { MessageDialogue } from "../pages/questionnaire/components/answer-section";

export const CustomMessage = ({
    open,
    onCancelClick,
    onContinueClick,
    buttons,
    okayButton,
    onOkayClick,
    message,
}) => {
    return (
        <Backdrop
            open={open}
            sx={{ backgroundColor: "rgb(240,240,240,0.7)", zIndex: 10 }}
        >
            <MessageDialogue
                message={message}
                display={open}
                rootSx={{ margin: "auto", mb: 0 }}
                messageSx={{ fontWeight: 600 }}
                dividerSx={{ mb: "8px" }}
                setError={() => {}}
            >
                {buttons ? (
                    <Fragment>
                        <Button
                            variant="text"
                            sx={{ textTransform: "none" }}
                            onClick={onCancelClick}
                        >
                            <Typography
                                sx={{
                                    fontSize: "15px",
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
                            onClick={onContinueClick}
                        >
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    color: "#8CB8E2",
                                }}
                            >
                                Continue
                            </Typography>
                        </Button>
                    </Fragment>
                ) : null}{" "}
                {okayButton && (
                        <Button
                            variant="text"
                            sx={{ textTransform: "none" }}
                            onClick={onOkayClick}
                        >
                            <Typography
                                sx={{
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    color: "#8CB8E2",
                                }}
                            >
                            Okay
                            </Typography>
                        </Button>

                )}
            </MessageDialogue>
        </Backdrop>
    );
};
