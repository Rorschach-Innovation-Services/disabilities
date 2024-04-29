import {
    Button,
    Divider,
    Grid,
    Stack,
    Typography,
    Modal,
    Box,
} from "@mui/material";

/**
Line item showcasing the questionnaire responses for an employe
@param label question text
@param answer employee response for question
@param edit if section is editable
@param dispatch update state
@param id if it is a sleep health question
@param name if it is a employee personal question
*/
export const LineItem = ({
    label,
    answer,
    edit,
    dispatch,
    name,
    id,
    state,
}) => {
    return (
        <Grid item xs={12}>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ px: "10px", mb: "10px", mt: "10px" }}
            >
                <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {label}
                </Typography>
                {edit && (
                    <Button
                        variant="outlined"
                        onClick={() => {
                            dispatch({
                                type: "edit question",
                                payload: {
                                    editting: true,
                                    name,
                                    id,
                                    title: label,
                                },
                            });
                        }}
                        sx={{
                            minHeight: 0,
                            height: "21px",
                            width: "60px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "none",
                            color: "black",
                            borderColor: "black",
                            ":hover": {
                                backgroundColor: "transparent",
                                borderColor: "black",
                            },
                        }}
                    >
                        Edit
                    </Button>
                )}
                {!edit && (
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {answer}
                    </Typography>
                )}
            </Stack>
            <Divider sx={{ backgroundColor: "#A2A2A2" }} />
        </Grid>
    );
};
