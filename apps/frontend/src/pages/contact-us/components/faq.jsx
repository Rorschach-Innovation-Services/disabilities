import { Box } from "@mui/material";
import { CustomAccordionGroup } from "./accordion";

export const FAQ = () => {
    return (
        <Box
            sx={{
                ".css-1mitor1-MuiPaper-root-MuiAccordion-root:before": {
                    backgroundColor: "white !important",
                },
            }}
        >
            <CustomAccordionGroup
                data={[
                    {
                        label: "1. Where are we based? How can you find us?",
                        description:
                            "We are based at the Sports Science Institute of South Africa on the 3rd floor. Please note that visitation is by appointment only.",
                    },
                    {
                        label: "2. Are any of your services covered by medical aid?",
                        description:
                            "Unfortunately, no. Our services are not covered by medical aid.",
                    },
                    {
                        label: "3. What if I don’t live in Cape Town, South Africa?",
                        description:
                            "No problem, we will happily do the sessions with you remotely.",
                    },
                    {
                        label: "4. I want to become a sleep scientist, what do I do next?",
                        description:
                            "Get in contact. We are happy to chat to you via phone or email to see what qualifications you have, what you would like to do in the future and what steps you can take next.",
                    },
                ]}
            />
        </Box>
    );
};
