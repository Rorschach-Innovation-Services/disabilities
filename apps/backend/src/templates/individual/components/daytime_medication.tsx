import React from "react";
import { Divider } from "@mui/material";

export interface DaytimeMedicationProps {
    DayTimeFunctionValue: number;
    medicinePath: string;
    medicationMessageValue: string;
}

export const DaytimeMedication = ({ DayTimeFunctionValue, medicinePath, medicationMessageValue } : DaytimeMedicationProps) => {
    return (
        <div
            className="daytime_medication"
            style={{
              backgroundColor: "#afc8e8",
              borderRadius: "20px",
              height: "370px",
              padding: "5px",
              // width: "50%",
              WebkitFlex: 1,
              position: "relative",
              top: "10px",
            }}
          >
            <div
              className="daytime"
              style={{ display: "-webkit-flex", marginTop: "-15px" }}
            >
              <div
                className="daytime_value"
                style={{
                  width: "110px",
                  fontSize: "40px",
                  textAlign: "center",
                  alignItems: "center",
                  fontWeight: 600,
                }}
              >
                <div style={{ height: "40px", marginTop: "30px" }}>
                  <p className="value">{DayTimeFunctionValue}</p>
                  <Divider
                    sx={{
                      height: "4px",
                      width: "50px",
                      backgroundColor: "black",
                      marginTop: "-50px",
                      marginLeft: "30px",
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      borderBottomRightRadius: "5px",
                    }}
                  />
                  <p className="value" style={{ marginTop: "-5px" }}>
                    10
                  </p>
                </div>
              </div>
              <div
                className="message_section"
                style={{ width: "300px", position: "inherit", right: "20px" }}
              >
                <p
                  className="heading"
                  style={{ fontWeight: 600, fontSize: "25px" }}
                >
                  Daytime function:
                </p>
                <p
                  className="message"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#fff",
                    fontStyle: "italic",
                    // width: "330px",
                    marginTop: "-25px",
                  }}
                >
                  Optimal sleep enables you to be on your A-game. Poor sleep may
                  impair productivity, creativity, decision making and mood.
                  Higher daytime function is better.
                </p>
              </div>
            </div>
            <div
              className="medication"
              style={{ display: "-webkit-flex", marginTop: "-34px" }}
            >
              <div
                className="medication_icon_container"
                style={{
                  width: "110px",
                  textAlign: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <img
                  className="medicine_icon"
                  width="60px"
                  height="80px"
                  style={{ position: "absolute", top: "30%", left: "30%" }}
                  src={`data:image/png;base64,${medicinePath}`}
                  alt="medicine icon"
                />
              </div>
              <div
                className="message_section"
                style={{ width: "300px", position: "inherit", right: "20px" }}
              >
                <p
                  className="heading"
                  style={{ fontWeight: 600, fontSize: "25px" }}
                >
                  Sleep Medication:
                </p>
                <p
                  className="message"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#fff",
                    fontStyle: "italic",
                    // width: "330px",
                    marginTop: "-25px",
                  }}
                >
                  {medicationMessageValue}
                </p>
              </div>
            </div>
          </div>
    )
}