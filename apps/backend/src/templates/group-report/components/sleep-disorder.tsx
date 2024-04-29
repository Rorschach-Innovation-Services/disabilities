import { Box, Typography } from "@mui/material";
import React from "react";
import { PDFData } from "../../../utilities/pdf-data";
import { SleepDisorderManagement } from "./table";

type SleepDisorderProps = {
    medicalAidIcon: string;
    data: PDFData;
};

/**
 sleep disorder section
@param medicalAidIcon medical aid icon
@param data pdf data
*/
export const SleepDisorder = ({ medicalAidIcon, data }: SleepDisorderProps) => {
    return (
        <Box sx={{ marginTop: "90px", display: "flex" }}>
            <Box
                component="img"
                src={`data:image/png;base64,${medicalAidIcon}`}
                sx={{
                    width: "30px",
                    height: "33px",
                    marginLeft: "15px",
                    marginTop: "20px",
                }}
            />
            <Box sx={{ marginLeft: "25px" }}>
                <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
                    Presence of a sleep disorder
                </Typography>
                <Typography
                    sx={{
                        fontSize: "15px",
                        textAlign: "justify",
                        fontWeight: 500,
                        textJustify: "inter-word",
                        marginTop: "15px",
                    }}
                >
                    The most common sleep disorders are insomnia, obstructive sleep apnoea
                    and restless legs syndrome. Less common, but nonetheless as impactful
                    on health and daytime function are circadian rhythm sleep-wake
                    disorders, narcolepsy and parasomnias. A person with a well-managed
                    sleep disorder can be high functioning. It is individuals with
                    unmanaged disorders that are of primary concern when it comes to long
                    term health (physical and mental) and workplace performance since
                    these individuals usually experience the highest levels of daytime
                    fatigue and dysfunction. While the prevalence data for sleep disorders
                    in South Africa are limited, indications are that it is not too
                    different from global data.
                </Typography>
                <Typography
                    sx={{
                        fontSize: "15px",
                        textAlign: "justify",
                        textJustify: "inter-word",
                        marginTop: "15px",
                        fontWeight: 500,
                    }}
                >
                    <b>Insomnia:</b> This disorder manifests as difficulties falling
                    asleep, staying asleep, or waking too early, and presents together
                    with high levels of daytime fatigue and dysfunction. While most people
                    experience acute insomnia from time to time, it is chronic insomnia
                    (difficulties with sleep on at least 3 nights per week, present for at
                    least 3 months) that is of concern and requires intervention.
                    Globally, about 35% of adults report suffering from insomnia, which is
                    more common in older people, women, people under stress and in people
                    with mental health conditions like depression. At any given time, it
                    is estimated that 15-20% of people are experiencing acute insomnia and
                    10% have chronic insomnia<sup>16</sup>.
                </Typography>
                <Typography
                    sx={{
                        fontSize: "15px",
                        textAlign: "justify",
                        textJustify: "inter-word",
                        marginTop: "15px",
                        fontWeight: 500,
                    }}
                >
                    <b>Obstructive sleep apnoea:</b> This is a sleep-related breathing
                    disorder in which a person’s upper airways collapse during sleep for
                    many brief periods throughout the night. Thus, the person briefly
                    stops breathing each time this happens (between 5 and 60 times per
                    hour). Not only do the brain and body receive less oxygen during the
                    night as a result, but tremendous strain is placed on the heart and
                    sleep is very disrupted. The overall prevalence of obstructive sleep
                    apnoea ranges from 9% to 38%. This prevalence is increasing annually
                    around the world and is worse in individuals who are obese, male and
                    older than 50y<sup>17</sup>. It is estimated that up to 80% of people
                    who suffer from this disorder are undiagnosed and individuals with
                    unmanaged obstructive sleep apnoea are at higher risk for
                    hypertension, heart disease, stroke, insulin resistance, diabetes and
                    depression<sup>18</sup>.
                </Typography>
                <Typography
                    sx={{
                        fontSize: "15px",
                        textAlign: "justify",
                        textJustify: "inter-word",
                        fontWeight: 500,
                        marginTop: "15px",
                    }}
                >
                    <b>Restless legs syndrome:</b> This is a neurological condition,
                    classed as a movement-related sleep disorder. Suffers describe
                    uncomfortable sensations (crawly, creepy, itching) usually in their
                    legs that are worse when they are lying down trying to fall asleep.
                    The sensations can be relieved to some extent by moving the limbs or
                    walking around. The condition typically impairs the ability to fall
                    asleep and can reduce both duration and quality of sleep such that
                    those with this condition report high levels of daytime sleepiness and
                    dysfunction. Untreated restless legs syndrome is associated with mood
                    and concentration difficulties, as well as anxiety and depression.
                    This disorder thought to affect 5-10% of adults, typically appears in
                    adults older than 45y, is twice as common among women than men and is
                    thought to be largely hereditary<sup>19,20</sup>.
                </Typography>
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "rgb(147,184,228)",
                        marginTop: "190px",
                    }}
                >
                    Employees with a diagnosed sleep disorder:{" "}
                    <span style={{ color: "black" }}>
                        {data.sleepDisorder.yes + data.sleepDisorder.no
                            ? Math.round(
                                (data.sleepDisorder.yes /
                                    (data.sleepDisorder.yes + data.sleepDisorder.no)) *
                                100
                            )
                            : 0}
                        %
                    </span>
                </Typography>
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "rgb(147,184,228)",
                        marginTop: "10px",
                    }}
                >
                    Most common sleep disorder reported:{" "}
                    <span style={{ color: "black" }}>
                        {data.sleepDisorder.mostCommon}
                    </span>
                </Typography>
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "rgb(147,184,228)",
                        marginTop: "10px",
                    }}
                >
                    Other sleep disorders reported:{" "}
                    <span style={{ color: "black" }}>
                        {data.sleepDisorder.others.length > 0
                            ? data.sleepDisorder.others.join(",")
                            : "none"}
                    </span>
                </Typography>

                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "rgb(147,184,228)",
                        marginTop: "30px",
                    }}
                >
                    Of those with a diagnosed sleep disorder:{" "}
                </Typography>
                <SleepDisorderManagement
                    sx={{ marginTop: "20px" }}
                    rows={[
                        {
                            name: "All employees",
                            well: data.sleepDisorder.yes
                                ? Math.round(
                                    (data.sleepManagement.allEmployees.wellManaged /
                                        data.sleepDisorder.yes) *
                                    100
                                )
                                : 0,
                            not: data.sleepDisorder.yes
                                ? Math.round(
                                    (data.sleepManagement.allEmployees.notManaged /
                                        data.sleepDisorder.yes) *
                                    100
                                )
                                : 0,
                        },
                        {
                            name: "Women",
                            well:
                                data.sleepManagement.women.notManaged +
                                    data.sleepManagement.women.wellManaged
                                    ? Math.round(
                                        (data.sleepManagement.women.wellManaged /
                                            (data.sleepManagement.women.notManaged +
                                                data.sleepManagement.women.wellManaged)) *
                                        100
                                    )
                                    : 0,
                            not:
                                data.sleepManagement.women.notManaged +
                                    data.sleepManagement.women.wellManaged
                                    ? Math.round(
                                        (data.sleepManagement.women.notManaged /
                                            (data.sleepManagement.women.notManaged +
                                                data.sleepManagement.women.wellManaged)) *
                                        100
                                    )
                                    : 0,
                        },
                        {
                            name: "Men",
                            well:
                                data.sleepManagement.men.notManaged +
                                    data.sleepManagement.men.wellManaged
                                    ? Math.round(
                                        (data.sleepManagement.men.wellManaged /
                                            (data.sleepManagement.men.notManaged +
                                                data.sleepManagement.men.wellManaged)) *
                                        100
                                    )
                                    : 0,
                            not:
                                data.sleepManagement.men.notManaged +
                                    data.sleepManagement.men.wellManaged
                                    ? Math.round(
                                        (data.sleepManagement.men.notManaged /
                                            (data.sleepManagement.men.notManaged +
                                                data.sleepManagement.men.wellManaged)) *
                                        100
                                    )
                                    : 0,
                        },
                    ]}
                />
            </Box>
        </Box>
    );
};
