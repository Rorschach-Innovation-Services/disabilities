import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomText, SummaryTable } from ".";
import { PDFData } from "../../../utilities/pdf-data";

type SummaryProps = {
  data: PDFData;
};

export const Summary = ({ data }: SummaryProps) => {
  const safeRounding = (numerator: number, denominator: number) => {
    if (denominator === 0) return 0;
    return Math.round((numerator / denominator) * 100);
  };

  return (
    <Box sx={{ marginTop: "350px", px: "60px" }}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 800,
          color: "rgb(147,184,228)",
          textTransform: "uppercase",
          marginBottom: "15px",
        }}
      >
        SUMMARY AND INTERPRETATION
      </Typography>
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 500,
        }}
      >
        Based on {data.companyName} sleep health score, the average sleep health
        of participating employees is in the{" "}
        <span style={{ color: "rgb(147,184,228)", fontWeight: 700 }}>
          {data.sleepHealthScore.textValue}
        </span>{" "}
        range. This suggests that for the most part, the employees who underwent
        this sleep health screen are{" "}
        <span style={{ color: "rgb(147,184,228)", fontWeight: 700 }}>
          managing their sleep well
        </span>
        , but might benefit from some{" "}
        <span style={{ color: "rgb(147,184,228)", fontWeight: 700 }}>
          sleep-hygiene-related support
        </span>
        .
      </Typography>
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 500,
          marginTop: "10px",
        }}
      >
        There are, however, individuals who are{" "}
        <span style={{ color: "rgb(147,184,228)", fontWeight: 700 }}>
          flagged
        </span>{" "}
        as having poor sleep health, or sub- components thereof (see Table
        below). To mitigate the repercussions of sub-optimal sleep health, it is
        recommended that interventions be put in place to promote their health
        and well-being and maximise workplace performance. We also note from the
        Table below that men fare worse than women with respect to x, y, z,
        while more women appear to struggle with x, y, z.
      </Typography>
      <SummaryTable
        sx={{ marginTop: "20px" }}
        count={{
          men: data.summary.menCount,
          all: data.summary.allCount,
          women: data.summary.womenCount,
        }}
        rows={[
          {
            name: "Poor sleep health (≤65%)",
            all: safeRounding(
              data.summary.all.poorSleepHealth,
              data.summary.allCount
            ),
            women: safeRounding(
              data.summary.women.poorSleepHealth,
              data.summary.womenCount
            ),
            men: safeRounding(
              data.summary.men.poorSleepHealth,
              data.summary.menCount
            ),
          },
          {
            name: "Short sleep (<7h)",
            all: safeRounding(
              data.summary.all.shortSleep,
              data.summary.allCount
            ),
            women: safeRounding(
              data.summary.women.shortSleep,
              data.summary.womenCount
            ),
            men: safeRounding(
              data.summary.men.shortSleep,
              data.summary.menCount
            ),
          },
          {
            name: "Poor sleep efficiency (<85%)",
            all: safeRounding(
              data.summary.all.poorSleepEfficiency,
              data.summary.allCount
            ),
            women: safeRounding(
              data.summary.women.poorSleepEfficiency,
              data.summary.womenCount
            ),
            men: safeRounding(
              data.summary.men.poorSleepEfficiency,
              data.summary.menCount
            ),
          },
          {
            name: "Low perceived sleep quality (<5/10)",
            all: safeRounding(
              data.summary.all.lowPerceivedSleepQuality,
              data.summary.allCount
            ),
            women: safeRounding(
              data.summary.women.lowPerceivedSleepQuality,
              data.summary.womenCount
            ),
            men: safeRounding(
              data.summary.men.lowPerceivedSleepQuality,
              data.summary.menCount
            ),
          },
          {
            name: "Significant impact on daytime function (<5/10)",
            all: safeRounding(
              data.summary.all.impactOnDaytimeFunction,
              data.summary.allCount
            ),
            women: safeRounding(
              data.summary.women.impactOnDaytimeFunction,
              data.summary.womenCount
            ),
            men: safeRounding(
              data.summary.men.impactOnDaytimeFunction,
              data.summary.menCount
            ),
          },
          {
            name: "Sleep disorder not well managed",
            all: safeRounding(
              data.summary.all.notManagedSleepDisorders,
              data.summary.allCount
            ),
            women: safeRounding(
              data.summary.women.notManagedSleepDisorders,
              data.summary.womenCount
            ),
            men: safeRounding(
              data.summary.men.notManagedSleepDisorders,
              data.summary.menCount
            ),
          },
          {
            name: "Regular use of sleep medication",
            all: safeRounding(
              data.summary.all.useOfSleepMedication,
              data.summary.allCount
            ),
            women: safeRounding(
              data.summary.women.useOfSleepMedication,
              data.summary.womenCount
            ),
            men: safeRounding(
              data.summary.men.useOfSleepMedication,
              data.summary.menCount
            ),
          },
        ]}
      />
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 800,
          color: "rgb(147,184,228)",
          textTransform: "uppercase",
          marginBottom: "15px",
          marginTop: "50px",
        }}
      >
        PROPOSED WAY FORWARD
      </Typography>

      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 500,
          marginTop: "10px",
        }}
      >
        Taking into account all our findings for {data.companyName} between
        'Insert timeline', x,y,z appear to be the most problematic sleep health
        areas. We advocate for comprehensive sleep assessments in those
        individuals flagged as having poor sleep health. This would also be a
        viable avenue for those wishing to gain further insight into their sleep
        health. With regards to {data.companyName}, we propose the following
        evidence-based recommendations to encourage a workplace culture that
        prides itself in promoting healthy sleep:
      </Typography>
      <CustomText
        first="1."
        second="Group based solutions"
        sx={{ marginTop: "30px", marginLeft: "20px" }}
        firstSx={{ fontWeight: 700 }}
        secondSx={{
          marginLeft: "10px",
          textDecoration: "underline",
          fontWeight: 700,
        }}
      />
      <CustomText
        first="a."
        second={
          <span>
            <b>Sleep Health Promotion Content:</b> Provision of sleep-related
            content-written content, infographics and brief videos, drip fed
            over 3 or 4 months
          </span>
        }
        sx={{ marginTop: "10px", marginLeft: "60px" }}
        secondSx={{
          marginLeft: "10px",
        }}
      />
      <CustomText
        first="b."
        second={
          <span>
            <b>Sleep Chats:</b> Lunch and learn or short talks / webinar to
            create awareness around sleep and its role on individuals health,
            well-being and work performance. These are 30-40min talks with 20min
            of question time.
          </span>
        }
        sx={{ marginTop: "10px", marginLeft: "60px" }}
        secondSx={{
          marginLeft: "10px",
        }}
      />
      <CustomText
        first="c."
        second={
          <span>
            <b>Workshops:</b> Half-day interactive workshop in which we provide
            group-based sleep assessments and feedback (interpretation and Q&A)
          </span>
        }
        sx={{ marginTop: "10px", marginLeft: "60px" }}
        secondSx={{
          marginLeft: "10px",
        }}
      />
      <CustomText
        first="2."
        second="Individual solutions"
        sx={{ marginTop: "10px", marginLeft: "20px" }}
        firstSx={{ fontWeight: 700 }}
        secondSx={{
          marginLeft: "10px",
          textDecoration: "underline",
          fontWeight: 700,
        }}
      />
      <CustomText
        first="a."
        second={
          <span>
            <b>Individual assessments:</b> Remote or in-person Sleep Check
          </span>
        }
        sx={{ marginTop: "10px", marginLeft: "60px" }}
        secondSx={{
          marginLeft: "10px",
        }}
      />
      <CustomText
        first="b."
        second={
          <span>
            <b>Travel toolkit:</b> Personalised travel recommendations based on
            an individual’s flight plan to prevent or manage jet lag, fatigue
            and circadian disruption.
          </span>
        }
        sx={{ marginTop: "10px", marginLeft: "60px" }}
        secondSx={{
          marginLeft: "10px",
        }}
      />
    </Box>
  );
};
