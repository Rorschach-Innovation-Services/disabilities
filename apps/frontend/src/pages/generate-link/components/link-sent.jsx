import { Container, Typography } from "@mui/material"
import emailSentIcon from "../../../assets/icons/email-sent-icon.svg";
import { Colours } from "../../../colours";
import { useHistory } from "react-router-dom";
import { useEffect} from "react"

export const LinkSent = ({ email }) => {
    const { push } = useHistory();
    useEffect(() => {
        setTimeout(() => {
            push("/dashboard");
        }, 1500);
    }, []);
    return(
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                padding: "30px",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container
                sx={{
                    background: Colours.main,
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <img
                    src={emailSentIcon}
                    width="60px"
                />
            </Container>
            <Typography
                variant="body1"
                sx={{
                fontSize: "28px",
                fontWeight: "600",
                whiteSpace: "nowrap",
                textAlign: "center"
                }}
            >
                Email has been sent.
            </Typography>
            <Typography
                sx={{
                    fontSize: "18px",
                    color: Colours.darkGrey,
                    textAlign: "center"
                }}
            >
                {`Your link has been sent to ${email}.`}
            </Typography>
        </Container>
    )
}