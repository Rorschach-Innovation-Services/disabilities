import React from "react";
import { CircularProgressBar } from "../../group-report/components/progress";

export interface ScoreProps {
    SleepHealthScorePercentage: number;
    rightArrowPath: string;
    categoryValue: string;
}

export const Score = ({SleepHealthScorePercentage, rightArrowPath, categoryValue}: ScoreProps) => {
    return (
        <div className="score" style={{ display: "-webkit-flex", width: "100%", justifyContent: "center" }}>
            <p
                className="score_message"
                style={{
                fontSize: "24px",
                // margin: "0 0 0 30px",
                // marginTop: "-14px",
                // marginBottom: "15px",
                // width: "450px",
                // maxWidth: "100%",
                // textAlign: "center",
                    fontWeight: 800,
                textAlign: "center",
                WebkitFlex: 1,
                lineHeight: 1.2,
                }}
            >
                Your sleep health score:
            </p>
            <CircularProgressBar
                value={SleepHealthScorePercentage}
                strokeColor="#afc8e8"
                strokeWidth={17}
                rootSx={{
                    height: "160px",
                    width: "230px",
                    marginTop: 10,
                    WebkitFlex: 1,
                    // marginRight: "-30px",
                }}
                percentageSx={{
                    marginTop: "-130px",
                    marginLeft: SleepHealthScorePercentage === 100 ? "76px" : "80px",
                    fontSize: SleepHealthScorePercentage === 100 ? "34px" : "40px",
                }}
            />
            <div
                style={{
                    WebkitFlex: 1,
                    display: "-webkit-flex",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                <img
                    className="right_arrow"
                    width="50px"
                    height="30px"
                    style={{
                        // left: "20px",
                        position: "relative",
                        // marginTop: "20px",
                    }}
                    src={`data:image/png;base64,${rightArrowPath}`}
                    alt="right arrow"
                />
                <p
                    className="score_category"
                    style={{
                        // margin: "0 50px",
                        fontSize: "24px",
                        fontStyle: "italic",
                        // width: "33.3%",
                        position: "relative",
                        // left: "120px",
                        // marginTop: "20px",
                        fontWeight: 600,
                    }}
                >
                    {categoryValue}
                </p>
            </div>
        </div>
    )
}