import { Box, Typography } from "@mui/material";
import React from "react";
import { SleepMedicationTable } from ".";
import { PDFData } from "../../../utilities/pdf-data";

type SleepMedicationProps = {
  pillIcon: string;
  data: PDFData;
};

/**
Sleep medication section of what is assessed
@param pillIcon icon of pill
@param data pdf data
*/
export const SleepMedication = ({ pillIcon, data }: SleepMedicationProps) => {
  return (
    <Box sx={{ marginTop: "90px", display: "flex" }}>
      <Box
        component="img"
        src={`data:image/png;base64,${pillIcon}`}
        sx={{
          width: "40px",
          height: "46px",
          marginLeft: "15px",
        }}
      />
      <Box sx={{ marginLeft: "25px" }}>
        <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
          Sleep medication use:
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
          Two main types of medications are typically prescribed to help people
          sleep: <b>hypnotics</b>, which act on regions in the brain to “flip a
          neurological” switch to initiate sleep (e.g. Zolpidem) and{" "}
          <b>sedatives</b>, which are used for their side effects, such as
          drowsiness (e.g. antidepressants, anti-anxiolytics, anti- histamines).
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
          While there are circumstances requiring prescription of medication to
          help an individual sleep, the guidelines are clear that this needs to
          be for the <b>shortest timeframe possible </b> (usually 2-4 weeks),
          with a clear plan to wean off the medication, and should be
          accompanied by <b>psychological</b> (such as cognitive behavioural
          therapy for insomnia) and/or <b>lifestyle support</b>. In addition,
          sleep medication should only be taken via <b>prescription </b> and
          under the <b>supervision </b> of a medical doctor, since they are all
          potentially <b>habit-forming</b> and have some{" "}
          <b>undesirable side effects</b>. Many sleep medications alter the
          structure of our sleep such that we may not obtain sufficient{" "}
          <b>deep </b> sleep or <b>REM</b> sleep. Both of these scenarios reduce
          our sleep quality and <b>compromise </b> the role of sleep in{" "}
          <b>physical repair </b> and <b>emotional recovery</b>. The reality is
          that the use of sleep medication is almost always a short-term
          solution to sleeping issues. True, sustained resolution of sleep
          challenges typically requires identification and removal or addressing
          of specific <b>triggers </b> causing trouble with sleep (we call this,
          the root causes).
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
          We have <b>flagged </b> individuals who, during the past 6 weeks, have{" "}
          <b>regularly</b> used medication to sleep since they may be at risk
          for longer-than-desired use of sleep medication (i.e. longer than 4
          weeks). We also specifically flag employees regularly using sleep
          medication in the <b>absence of a diagnosed sleep disorder</b>, since
          this suggests either unsupervised or potentially inappropriate
          management of sleep issues.
        </Typography>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 700,
            color: "rgb(147,184,228)",
            marginTop: "60px",
          }}
        >
          Profile of employees regularly using sleep medication
        </Typography>
        <SleepMedicationTable
          sx={{ marginTop: "20px" }}
          rows={[
            {
              name: "All employees",
              usingSleepMedication:
                data.sleepMedication.allEmployess.usingMedication,
              hasSleepDisorder: data.summary.allCount
                ? Math.round(
                    (data.sleepMedication.allEmployess.withSleepDisorder /
                      data.summary.allCount) *
                      100
                  )
                : 0,
              noSleepDisorder: data.summary.allCount
                ? Math.round(
                    (data.sleepMedication.allEmployess.withoutSleepDisorder /
                      data.summary.allCount) *
                      100
                  )
                : 0,
            },
            {
              name: "Women",
              usingSleepMedication: data.sleepMedication.women.usingMedication,
              hasSleepDisorder: data.summary.womenCount
                ? Math.round(
                    (data.sleepMedication.women.withSleepDisorder /
                      data.summary.womenCount) *
                      100
                  )
                : 0,
              noSleepDisorder: data.summary.womenCount
                ? Math.round(
                    (data.sleepMedication.women.withoutSleepDisorder /
                      data.summary.womenCount) *
                      100
                  )
                : 0,
            },
            {
              name: "Men",
              usingSleepMedication: data.sleepMedication.men.usingMedication,
              hasSleepDisorder: data.summary.menCount
                ? Math.round(
                    (data.sleepMedication.men.withSleepDisorder /
                      data.summary.menCount) *
                      100
                  )
                : 0,
              noSleepDisorder: data.summary.menCount
                ? Math.round(
                    (data.sleepMedication.men.withoutSleepDisorder /
                      data.summary.menCount) *
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
