import { Container, Typography } from "@mui/material"
import { Colours } from "../../../colours"
import Icon from "../../../assets/icons/clients.svg"

export const AddQuestionnaire = () => {
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                backgroundColor: Colours.main,
                borderRadius: "20px",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                height: "65px",
                border: "4px white solid",
                paddingRight: "90px !important",
                gap: "30px",
                cursor: "pointer"
            }}
        >
            <Typography
                sx={{
                    fontSize: "14px"
                }}
            >
                Add New Questionnaire
            </Typography>
            <img
                src={Icon}
                width="15px"
            />
        </Container>
    )
}