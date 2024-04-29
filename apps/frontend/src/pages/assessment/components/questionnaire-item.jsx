import { Container, Typography } from "@mui/material"
import { Colours } from "../../../colours";

export const QuestionnaireItem = ({ questionnaire, children, onClick, selected }) => {
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: !selected && "#fff",
                borderRadius: "20px",
                border: selected && `1px solid ${Colours.blue}`,
                boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                height: "65px",
                alignItems: "center",
                cursor: "pointer"
            }}
            onClick={onClick}
        >
            {
                [
                    questionnaire.name, 
                    questionnaire.creator, 
                    questionnaire.date.toLocaleDateString(), 
                    questionnaire.questionnaire.length
                ].map((item, index) => (
                    <Typography
                        sx={{
                            width: "110px",
                            fontSize: "14px",
                            textAlign: "center",
                            paddingRight: item === questionnaire.questionnaire.length && "50px"
                        }}
                        key={index}
                    >
                        { item }
                    </Typography>
                ))
            }
            { children }
    </Container>
    )
}