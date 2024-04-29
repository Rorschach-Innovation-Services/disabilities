import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  LinePercentage,
  SleepDisorder,
  SleepDurationTable,
  SleepMedication,
} from ".";
import { PDFData } from "../../../utilities/pdf-data";
import { StarComponent } from "./star";
import { SleepEfficiencyTable } from "./table";

type AssessProps = {
  sleepDurationIcon: string;
  percentageIcon: string;
  tripleStarIcon: string;
  filledStarIcon: string;
  outlinedStarIcon: string;
  medicalAidIcon: string;
  pillIcon: string;
  data: PDFData;
};

export const Assess = ({
  sleepDurationIcon,
  percentageIcon,
  tripleStarIcon,
  outlinedStarIcon,
  filledStarIcon,
  medicalAidIcon,
  pillIcon,
  data,
}: AssessProps) => {
  const safeRounding = (numerator: number, denominator: number) => {
    if (denominator === 0) return 0;
    return Math.round((numerator / denominator) * 100);
  };

  return (
    <Box sx={{ px: "60px" }}>
      <Typography
        sx={{
          fontSize: "25px",
          color: "rgb(147,184,228)",
          textAlign: "center",
          fontWeight: 800,
          textTransform: "uppercase",
        }}
      >
        What did we assess?
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          color: "rgb(147,184,228)",
          marginTop: "5px",
        }}
      >
        Our sleep health score
      </Typography>
      <Typography
        sx={{
          fontSize: "15px",
          marginTop: "10px",
          fontWeight: 500,
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        This is a composite score combining key factors that determine an
        individual’s sleep health: sleep duration, sleep efficiency, perceived
        sleep quality, the impact of sleep on daytime function, presence of
        sleep disorders and sleep medication use. Scores in the range of{" "}
        <b>0- 65%</b> indicate <b>poor </b> sleep health, <b>66-85%</b> suggest{" "}
        <b>fair </b> sleep health and individuals scoring <b>86-100%</b> have{" "}
        <b>excellent</b> sleep health. The purpose of the score is to{" "}
        <b>flag </b> individuals <b>at risk </b> for <b>poor sleep health</b>.
        It is strongly advised that employees in the poor sleep health range
        undergo <b>further investigations </b> as they likely require an
        intervention to resolve their sleep issues. Those with{" "}
        <b>fair sleep health </b> are encouraged to make use of the{" "}
        <b>sleep hygiene </b> recommendations provided in their individual
        reports to optimise their sleep. Should these individuals also wish to
        undergo further investigations they would be welcome to do so.
      </Typography>
      <Box sx={{ marginTop: "35px", display: "flex" }}>
        <Box
          component="img"
          src={`data:image/png;base64,${sleepDurationIcon}`}
          sx={{ width: "40px", height: "44px", marginLeft: "15px" }}
        />
        <Box sx={{ marginLeft: "25px" }}>
          <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
            Sleep duration:
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
            The recommended range for adults (18-64y) is <b>7-9h</b>. People who
            regularly sleep <b>less than 7h</b> are likely to suffer from{" "}
            <b>sleep insufficiency</b>, while sleeping <b>more than 9h</b> may
            indicate an <b>underlying</b> physical or mental health condition.
            Both these groups of individuals are likely to feel the effects of
            being sleep <b>deprived</b> through accumulated <b>sleep debt</b>.
            Not only are they at greater risk for physical and mental health
            problems in the long term, but the effects of sleep debt are likely
            to impact performance in the workplace.
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 700,
              color: "rgb(147,184,228)",
              marginTop: "10px",
            }}
          >
            Average sleep duration:{" "}
            <span style={{ color: "black" }}>
              {data.sleepDuration.average}h
            </span>
          </Typography>
          <SleepDurationTable
            sx={{ marginTop: "10px" }}
            rows={[
              {
                name: "Women",
                less7: safeRounding(
                  data.sleepDuration.women.lessThan7,
                  data.summary.womenCount
                ),
                between79: safeRounding(
                  data.sleepDuration.women.between7and9,
                  data.summary.womenCount
                ),
                more9: safeRounding(
                  data.sleepDuration.women.moreThan9,
                  data.summary.womenCount
                ),
              },
              {
                name: "Men",
                less7: safeRounding(
                  data.sleepDuration.men.lessThan7,
                  data.summary.menCount
                ),
                between79: safeRounding(
                  data.sleepDuration.men.between7and9,
                  data.summary.menCount
                ),
                more9: safeRounding(
                  data.sleepDuration.men.moreThan9,
                  data.summary.menCount
                ),
              },
            ]}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: "110px", display: "flex" }}>
        <Box
          component="img"
          src={`data:image/png;base64,${percentageIcon}`}
          sx={{
            width: "30px",
            height: "33px",
            marginLeft: "15px",
            marginTop: "20px",
          }}
        />
        <Box sx={{ marginLeft: "25px" }}>
          <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
            Sleep efficiency:
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
            This refers to the time a person is <b>actually asleep </b> while in
            bed trying to sleep. Thus, a person who is in bed for 8h (for
            example, from 23h00 – 07h00), and is 90% efficient, will actually
            get 7h12min of sleep. Sleep efficiency is <b>poor </b> in people who{" "}
            <b>struggle to fall asleep</b> ({">"}30min), whose sleep is{" "}
            <b>disturbed </b> during the night or who <b>wake too early </b> in
            the morning. A sleep efficiency of <b>{"<"}85%</b> is considered{" "}
            <b>poor</b> sleep efficiency and typically the threshold at which
            one would suspect an <b>insomnia</b>-like sleep disorder. An
            inefficient sleeper is also more likely to accumulate{" "}
            <b>sleep debt</b>, and in so doing also be at higher risk for health
            and suboptimal work performance.
          </Typography>
          <SleepEfficiencyTable
            sx={{ marginTop: "10px" }}
            rows={[
              {
                name: "All",
                value: safeRounding(
                  data.sleepEfficiency.all,
                  data.summary.allCount
                ),
              },
              {
                name: "Women",
                value: safeRounding(
                  data.sleepEfficiency.women,
                  data.summary.womenCount
                ),
              },
              {
                name: "Men",
                value: safeRounding(
                  data.sleepEfficiency.men,
                  data.summary.menCount
                ),
              },
            ]}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: "30px", display: "flex" }}>
        <Box
          component="img"
          src={`data:image/png;base64,${tripleStarIcon}`}
          sx={{
            width: "63px",
            height: "25px",
            marginLeft: "-13px",
          }}
        />
        <Box sx={{ marginLeft: "25px" }}>
          <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
            Perceived sleep quality:
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
            Sleep quality is an all-inclusive term describing a person’s overall
            sleep including ease of falling asleep and waking up, fragmentation,
            depth, timing, duration, satisfaction and restoration. While many
            people are concerned about sleep duration, it has become evident
            that sleep quality may be a more important component of sleep
            health. Evidence is now emerging to link poor sleep quality with
            worse health outcomes, more daytime sleepiness and dysfunction and
            as a consequence, poorer work productivity.
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 700,
              color: "rgb(147,184,228)",
              marginTop: "10px",
            }}
          >
            Average perceived sleep quality rating:{" "}
            <span style={{ color: "black", marginBottom: "15px" }}>
              {data.perceivedSleepQuality.average}/10
            </span>
          </Typography>
          <StarComponent
            numberOfWomen={data.perceivedSleepQuality.women}
            numberOfMen={data.perceivedSleepQuality.men}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: "90px", display: "flex" }}>
        <Box
          component="div"
          sx={{
            width: "110px",
            height: "33px",
            marginLeft: "15px",
            marginTop: "20px",
          }}
        />
        <Box sx={{ marginLeft: "25px" }}>
          <Typography sx={{ fontSize: "15px", fontWeight: 700 }}>
            Impact of sleep on daytime function:
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
            This refers to the extent to which one’s <b>sleep interferes </b>{" "}
            with <b>daytime function</b>, whether it be at work, socially or
            physically. It may manifest as lower productivity, forgetfulness,
            inability to multitask, less creativity, reduced problem-solving
            ability, fluctuations in mood or irritability, impulsivity or an
            inability to control one’s emotions, and an increase in
            fatigue-related accidents. Quite simply, if sleep is impairing
            daytime function, something needs to be done. This is a{" "}
            <b>key indicator</b> that the sleep health of an individual is cause
            for concern.
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 700,
              color: "rgb(147,184,228)",
              marginTop: "10px",
            }}
          >
            Average employee rating of the impact of sleep on daytime function:{" "}
            <span style={{ color: "black" }}>
              {data.daytimeFunction.average}/10
            </span>
          </Typography>
          <Stack direction="row" sx={{ marginTop: "50px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
              Women:
            </Typography>
            <LinePercentage
              percentage={data.perceivedSleepQuality.women * 10}
              textLeft="Not at all"
              textRight="Very"
              percentageSx={{ marginLeft: "40px" }}
              textContainterSx={{ marginLeft: "40px" }}
            />
          </Stack>
          <Stack direction="row" sx={{ marginTop: "30px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
              Men:
            </Typography>
            <LinePercentage
              percentage={data.perceivedSleepQuality.men * 10}
              textLeft="Not at all"
              textRight="Very"
              percentageSx={{ marginLeft: "60px" }}
              textContainterSx={{ marginLeft: "60px" }}
            />
          </Stack>
        </Box>
      </Box>
      <SleepDisorder medicalAidIcon={medicalAidIcon} data={data} />
      <SleepMedication pillIcon={pillIcon} data={data} />
    </Box>
  );
};
