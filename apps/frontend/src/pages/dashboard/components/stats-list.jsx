import { Container } from "@mui/material";
import { StatsBox } from "./stats-box";
import ClientIcon from "../../../assets/icons/clients.svg";
import SleepIcon from "../../../assets/icons/average-sleep.svg";
import CompleteAssIcon from "../../../assets/icons/assessments-complete.svg";
import DocIcon from "../../../assets/icons/documents.svg";

export const StatsList = ({ state }) => {
    return (
        <Container
            sx={{
              display: "flex",
              gap: "10px",
              padding: "0 !important",
              margin: "0 !important"
            }}
          >
            <StatsBox
              Icon={SleepIcon}
              name="Average Sleep"
              figure={
                state.averageSleepingHours ? state.averageSleepingHours : 0
              }
              units="h"
            />
            <StatsBox
              Icon={CompleteAssIcon}
              name="Completed Assessments"
              figure={
                state.completedAssessments ? state.completedAssessments : 0
              }
            />
            <StatsBox
              Icon={ClientIcon}
              name="Total clients"
              figure={state.clients ? state.clients.length : 0}
            />
            <StatsBox
              Icon={DocIcon}
              name="Assessments"
              figure={state.assessmentCount ? state.assessmentCount : 0}
            />
          </Container>
    )
}