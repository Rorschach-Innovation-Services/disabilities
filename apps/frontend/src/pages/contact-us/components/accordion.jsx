import { useState, Fragment } from "react";
import { Box, Collapse, Stack, Typography, Divider } from "@mui/material";
import {
    AddCircleOutlineOutlined,
    RemoveCircleOutlineOutlined,
} from "@mui/icons-material";

export const CustomSingleAccordion = ({
    id,
    label,
    question,
    setQuestion,
    sx,
    description,
}) => {
    const toggle = () => {
        if (id === question) setQuestion(0);
        else setQuestion(id);
    };

    return (
        <Box sx={{ padding: "18px", ...sx }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                onClick={() => toggle()}
            >
                <Typography sx={{ fontSize: "24px", mt: "20px", mb: "13px" }}>
                    {label}
                </Typography>
                {id === question && question !== 0 ? (
                    <RemoveCircleOutlineOutlined
                        sx={{ fontSize: "36px", mt: "20px", color: "#657173" }}
                    />
                ) : (
                    <AddCircleOutlineOutlined
                        sx={{ fontSize: "36px", mt: "20px", color: "#657173" }}
                    />
                )}
            </Stack>
            <Collapse in={id === question && question !== 0}>
                <Typography
                    sx={{
                        fontSize: "20px",
                        color: "#657173",
                        width: "798px",
                        height: "72px",
                        marginTop: "30px",
                    }}
                >
                    {description}
                </Typography>
            </Collapse>
        </Box>
    );
};

/**
Creating multiple accordions together
@param data for each accordion of type: Array<{label:string;description:string;}>
*/
export const CustomAccordionGroup = ({ data }) => {
    const [question, setQuestion] = useState(0);

    return (
        <Box>
            {data.map((accordion, index) => (
                <Fragment>
                    <CustomSingleAccordion
                        id={index + 1}
                        label={accordion.label}
                        question={question}
                        setQuestion={setQuestion}
                        description={accordion.description}
                        sx={{}}
                    />
                    <Divider sx={{ height: "1px", backgroundColor: "black" }} />
                </Fragment>
            ))}
        </Box>
    );
};
