import React from "react";
import { DaytimeMedication } from "./daytime_medication";
import { DurationEfficiencyQuality } from "./duration_efficiency_quality";

export interface RatingsProps {
    sleepDuration: string;
    SE: number;
    Quality: number;
    DayTimeFunctionValue: number;
    medicinePath: string;
    medicationMessageValue: string;
}

export const Ratings = ({ sleepDuration, SE, Quality, DayTimeFunctionValue, medicinePath, medicationMessageValue } : RatingsProps) => {
    return (
        <div
          className="ratings"
          style={{
            display: "-webkit-flex",
            padding: "0 10px",
            fontSize: "15px",
              gap: "10px",
              position: "relative",
            bottom: "65px"
          }}
        >
            <DurationEfficiencyQuality
                SE={SE}
                Quality={Quality}
                sleepDuration={sleepDuration}
            />
            <DaytimeMedication
                DayTimeFunctionValue={DayTimeFunctionValue}
                medicationMessageValue={medicationMessageValue}
                medicinePath={medicinePath}
            />
        </div>
    )
}