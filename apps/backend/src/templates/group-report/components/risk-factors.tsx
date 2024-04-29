import { Box, Stack, Typography } from "@mui/material";
import React, { CSSProperties } from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryPie } from "victory";
import { Legend, LinePercentage } from ".";
import { PDFData } from "../../../utilities/pdf-data";

type SleepHealthRiskFactorsProps = {
    data: PDFData;
};

/**
Sleep health risks
@param data pdf data
*/
export const SleepHealthRiskFactors = ({
    data,
}: SleepHealthRiskFactorsProps) => {
    return (
        <Box sx={{ marginTop: "40px", px: "60px" }}>
            <Typography
                sx={{
                    fontSize: "23px",
                    color: "rgb(147,184,228)",
                    fontWeight: 800,
                    marginBottom: "10px",
                }}
            >
                Sleep health risk factors
            </Typography>
            <Typography
                sx={{ fontSize: "16px", fontWeight: 500, marginBottom: "15px" }}
            >
                <b>Sleep duration:</b> {data.sleepDuration.average}h
            </Typography>
            <Stack direction="row" sx={{ marginTop: "-50px" }}>
                <Box>
                    <VictoryChart
                        domainPadding={{ x: 20 }}
                        style={{
                            parent: {
                                width: "340px",
                                height: "270px",
                            },
                        }}
                    >
                        <VictoryAxis
                            label="Hours of sleep"
                            style={{
                                axisLabel: { fontSize: "25px", padding: 50 },
                                tickLabels: { fontSize: "22px" },
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            label="Number"
                            offsetX={62}
                            style={{
                                axisLabel: {
                                    fontSize: "22px",
                                    padding: 35,
                                },
                                tickLabels: { fontSize: "21px" },
                                grid: {
                                    stroke: "#d8d8d8",
                                    strokeWidth: 1.5,
                                },
                            }}
                        />
                        <VictoryBar
                            style={{
                                data: { fill: "#b1cbed" },
                            }}
                            data={[
                                { x: "≤5", y: data.sleepDuration.data["5h"] },
                                { x: "6", y: data.sleepDuration.data["6h"] },
                                { x: "7", y: data.sleepDuration.data["7h"] },
                                { x: "8", y: data.sleepDuration.data["8h"] },
                                { x: "9", y: data.sleepDuration.data["9h"] },
                                { x: "10", y: data.sleepDuration.data["10h"] },
                                { x: "≥11", y: data.sleepDuration.data["11h"] },
                            ]}
                        />
                    </VictoryChart>
                    <Box
                        sx={{
                            width: "115px",
                            height: "200px",
                            marginLeft: "115px",
                            marginTop: "-220px",
                            backgroundColor: "rgb(235,241,249)",
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex" }}>
                    <VictoryPie
                        colorScale={["#3b3838", "#93b7e4", "#d9d9d9"]}
                        labels={({ datum }) => (datum.y === 0 ? "" : `${datum.y}%`)}
                        labelRadius={80}
                        style={{
                            parent: {
                                height: "280px",
                                width: "280px",
                            },
                            labels: { fontSize: "25px", fill: "white" },
                        }}
                        data={[
                            {
                                x: 1,
                                y: Math.round(
                                    ((data.sleepDuration.men.lessThan7 +
                                        data.sleepDuration.women.lessThan7) /
                                        data.summary.allCount) *
                                    100
                                ),
                            },
                            {
                                x: 2,
                                y: Math.round(
                                    ((data.sleepDuration.men.between7and9 +
                                        data.sleepDuration.women.between7and9) /
                                        data.summary.allCount) *
                                    100
                                ),
                            },
                            {
                                x: 3,
                                y: Math.round(
                                    ((data.sleepDuration.men.moreThan9 +
                                        data.sleepDuration.women.moreThan9) /
                                        data.summary.allCount) *
                                    100
                                ),
                            },
                        ]}
                    />
                    <Legend
                        direction="column"
                        data={[
                            { label: "<7h", color: "#3b3838" },
                            { label: "7-9h", color: "#93b7e4" },
                            { label: ">9", color: "#d9d9d9" },
                        ]}
                        sx={{ marginLeft: "10px", marginTop: "100px" }}
                        labelSx={{ width: "50px" }}
                    />
                </Box>
            </Stack>
            <Stack direction="row" sx={{ marginTop: "15px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                    Employees with poor sleep efficiency:
                </Typography>
                <LinePercentage
                    percentage={data.sleepEfficiency.poorSleepEfficiency * 10}
                />
            </Stack>
            <Stack direction="row" sx={{ marginTop: "40px" }}>
                <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                        Perceived sleep quality:
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                        {data.perceivedSleepQuality.average}/10
                    </Typography>
                </Box>
                <LinePercentage
                    percentage={data.perceivedSleepQuality.average * 10}
                    textLeft="Poor"
                    textRight="Excellent"
                    percentageSx={{ marginLeft: "105px" }}
                    textContainterSx={{ marginLeft: "105px" }}
                />
            </Stack>
            <Stack direction="row" sx={{ marginTop: "25px" }}>
                <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                        Impact of sleep on daytime function:
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                        {data.daytimeFunction.average}/10
                    </Typography>
                </Box>
                <LinePercentage
                    percentage={data.daytimeFunction.average * 10}
                    textLeft="Not at all"
                    textRight="Very"
                    percentageSx={{ marginLeft: "23px" }}
                    textContainterSx={{ marginLeft: "23px" }}
                />
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginTop: "20px" }}
            >
                <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                        Employees reporting a diagnosed
                        <br /> sleep disorder:
                    </Typography>
                    <Stack direction="row">
                        <VictoryPie
                            colorScale={["#d5e2f6", "#b1cbed"]}
                            labels={({ datum }) => (datum.y === 0 ? "" : `${datum.y}%`)}
                            labelRadius={80}
                            style={{
                                parent: {
                                    height: "200px",
                                    width: "200px",
                                    marginTop: "-28px",
                                },
                                labels: { fontSize: "30px" },
                            }}
                            data={[
                                {
                                    x: 1,
                                    y: Math.round(
                                        (data.sleepDisorder.no /
                                            (data.sleepDisorder.no + data.sleepDisorder.yes)) *
                                        100
                                    ),
                                },
                                {
                                    x: 2,
                                    y: Math.round(
                                        (data.sleepDisorder.yes /
                                            (data.sleepDisorder.no + data.sleepDisorder.yes)) *
                                        100
                                    ),
                                },
                            ]}
                        />
                        <Legend
                            direction="column"
                            data={[
                                { label: "Yes", color: "#b1cbed" },
                                { label: "No", color: "#d5e2f6" },
                            ]}
                            sx={{ marginTop: "50px" }}
                        />
                    </Stack>
                </Box>
                <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                        Employees regularly using sleep
                        <br /> medication:
                    </Typography>
                    <Stack direction="row">
                        <VictoryPie
                            colorScale={["#d5e2f6", "#b1cbed"]}
                            labels={({ datum }) => (datum.y === 0 ? "" : `${datum.y}%`)}
                            labelRadius={80}
                            style={{
                                parent: {
                                    height: "200px",
                                    width: "200px",
                                    marginTop: "-28px",
                                },
                                labels: { fontSize: "30px" },
                            }}
                            data={[
                                {
                                    x: 1,
                                    y: Math.round(
                                        (data.sleepMedication.no /
                                            (data.sleepMedication.no + data.sleepMedication.yes)) *
                                        100
                                    ),
                                },
                                {
                                    x: 2,
                                    y: Math.round(
                                        (data.sleepMedication.yes /
                                            (data.sleepMedication.no + data.sleepMedication.yes)) *
                                        100
                                    ),
                                },
                            ]}
                        />
                        <Legend
                            direction="column"
                            data={[
                                { label: "Yes", color: "#b1cbed" },
                                { label: "No", color: "#d5e2f6" },
                            ]}
                            sx={{ marginTop: "50px" }}
                        />
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};
