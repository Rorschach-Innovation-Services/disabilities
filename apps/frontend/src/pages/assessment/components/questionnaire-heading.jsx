import { Container, Typography } from "@mui/material";
import { Colours } from "../../../colours";

export const QuestionnaireHeading = ({ headings }) => {
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "space-around"
            }}
        >
            {
                headings.map((heading, index) => (
                    <Typography
                        key={index}
                        sx={{
                            fontSize: "12px",
                            color: Colours.darkGrey,
                            width: "110px",
                            textAlign: "center"
                        }}
                    >
                        { heading }
                    </Typography>
                ))
            }
        </Container>
    )
}