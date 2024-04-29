import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const Introduction = () => {
    return (
        <Box sx={{ margin: "0 auto", marginTop: "220px", px: "60px" }}>
            <Typography
                sx={{
                    fontSize: "25px",
                    color: "rgb(147,184,228)",
                    textAlign: "center",
                    fontWeight: 800,
                    textTransform: "uppercase",
                }}
            >
                Introduction
            </Typography>
            <Typography
                sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    marginTop: "20px",
                    textAlign: "justify",
                    textJustify: "inter-character",
                }}
            >
                Sleep is a natural and <b>critical</b> part of life, yet we often ignore
                just how important it really is. The bottom line is that we need healthy
                sleep to <b>thrive</b> since a good night’s sleep is <b>essential</b>{" "}
                for our physical and mental health, quality of life and workplace
                performance. <b>Healthy sleep</b> is that which allows our bodies and
                minds the time and opportunity to rest, repair and recover so that we
                are energised, happy, healthy and productive while awake.
            </Typography>
            <Typography
                sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    marginTop: "20px",
                    textAlign: "justify",
                    textJustify: "inter-character",
                }}
            >
                To promote optimal health, the recommended sleep duration for adults
                (18-64 years) is{" "}
                <b>
                    7-9 hours<sup>1</sup>
                </b>
                . Sleeping less than 6 hours or more than 10 hours per night has
                consistently been shown to increase the risk for mortality.{" "}
                <b>Short, poor quality sleep</b> can lead to obesity, hypertension,
                cardiovascular disease, insulin resistance, type 2 diabetes mellitus
                <sup>2–5</sup>
                and burnout; exacerbate symptoms of depression, anxiety and other
                psychiatric disorders<sup>6</sup>; and is associated with poor workplace
                performance, absenteeism, lack of productivity and more work-related
                accidents<sup>7,8</sup>. <b>Long sleep</b> duration, on the other hand,
                may point to an underlying health concern and has also been linked to
                mood-related disorders such as depression<sup>9-13</sup>.
            </Typography>
            <Typography
                sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    marginTop: "20px",
                    textAlign: "justify",
                    textJustify: "inter-character",
                }}
            >
                Although there are limited data describing the sleep of South Africans,
                one study observed that{" "}
                <b>2/3 of employed individuals sleep less than 7 hours</b> per night,
                and were more likely to have depression, cardiometabolic disease and
                cancer<sup>14</sup>.This study also estimated that treating the diseases
                exacerbated by short sleep costs a medical aid scheme about{" "}
                <b>R22-billion each year</b>
                <sup>14</sup>. Furthermore, there is global evidence to suggest that
                tired employees with sub-optimal productivity cost countries such as
                Germany, the UK, the USA and Japan between 1.5 and 2.9% of their annual
                gross domestic product<sup>15</sup>.
            </Typography>
            <Typography
                sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    marginTop: "20px",
                    textAlign: "justify",
                    textJustify: "inter-character",
                }}
            >
                With all this at stake, we view sleep as a{" "}
                <b>critical human behaviour</b>, which is fortunately <b>modifiable</b>.
                We have measured key indicators of your employee’s overall sleep health
                to flag individuals who are at risk for poor sleep. These measures are
                sleep duration, sleep efficiency, perceived sleep quality, the impact of
                sleep on daytime function, presence of sleep disorders and use of sleep
                medication. We present A) an <b>overview </b>of your employee’s sleep
                health, B) a detailed explanation of <b>what we assessed</b>, C) a{" "}
                <b>summary and interpretation</b> of the results and D) a proposed{" "}
                <b>way forward</b>.
            </Typography>
        </Box>
    );
};
