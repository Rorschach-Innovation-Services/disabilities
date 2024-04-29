import React from "react";
import { Divider } from "@mui/material";

export interface DurationEfficiencyQualityProps {
    sleepDuration: string;
    SE: number;
    Quality: number;
}

export const DurationEfficiencyQuality = ({ sleepDuration, SE, Quality } : DurationEfficiencyQualityProps) => {
    return (
        <div
            className="duration_efficiency_quality"
            style={{
              backgroundColor: "#afc8e8",
              padding: "5px",
              // width: "50%",
              WebkitFlex: 1,
              height: "370px",
              borderRadius: "20px",
              position: "relative",
              top: "10px",
            }}
          >
            <div
              className="duration"
              style={{ display: "-webkit-flex", width: "100%" }}
            >
              <div
                className="duration_value"
                style={{
                  fontWeight: 600,
                  width: "125px",
                  fontSize: "30px",
                  textAlign: "center",
                  alignContent: "center",
                }}
              >
                <p
                  className="value"
                  style={{
                    fontWeight: 600,
                    width: "125px",
                    fontSize: "40px",
                    textAlign: "center",
                  }}
                >
                  {sleepDuration}h
                </p>
              </div>
              <div
                className="message_section"
                style={{
                  width: "300px",
                  position: "inherit",
                  right: "20px",
                  marginTop: "-19px",
                }}
              >
                <p
                  className="heading"
                  style={{
                    fontWeight: 600,
                    fontSize: "25px",
                  }}
                >
                  Sleep Duration:
                </p>
                <p
                  className="message"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#fff",
                    fontStyle: "italic",
                    width: "250px",
                    marginTop: "-28px",
                  }}
                >
                  The recommended range is 7-9 hours.
                </p>
              </div>
            </div>
            <div
              className="efficiency"
              style={{
                display: "-webkit-flex",
                width: "100%",
                marginTop: "-36px",
              }}
            >
              <div
                className="efficiency_value"
                style={{
                  fontWeight: 600,
                  width: "125px",
                  fontSize: "40px",
                  textAlign: "center",
                  alignContent: "center",
                }}
              >
                <p className="value" style={{ marginBottom: "-50px" }}>
                  {SE}%
                </p>
              </div>
              <div
                className="message_section"
                style={{ width: "310px", position: "inherit", right: "20px" }}
              >
                <p
                  className="heading"
                  style={{
                    fontWeight: 600,
                    fontSize: "25px",
                  }}
                >
                  Sleep efficiency:
                </p>
                <p
                  className="message"
                  style={{
                    fontSize: "20px",
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: "#fff",
                    width: "265px",
                    marginTop: "-25px",
                  }}
                >
                  We aim to be asleep for at least 85% of the time we spend in
                  bed at night.
                </p>
              </div>
            </div>
            <div
              className="quality"
              style={{
                display: "-webkit-flex",
                width: "100%",
                marginTop: "-33px",
              }}
            >
              <div
                className="quality_value"
                style={{
                  fontWeight: 600,
                  width: "125px",
                  fontSize: "40px",
                  textAlign: "center",
                  alignContent: "center",
                }}
              >
                <div style={{ height: "40px", marginTop: "-25px" }}>
                  <p className="value">{Quality}</p>
                  <Divider
                    sx={{
                      height: "4px",
                      width: "50px",
                      backgroundColor: "black",
                      marginTop: "-50px",
                      marginLeft: "37px",
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
                style={{
                  width: "310px",
                  position: "inherit",
                  right: "20px",
                  marginBottom: "-25px",
                }}
              >
                <p
                  className="heading"
                  style={{
                    fontWeight: 600,
                    fontSize: "25px",
                  }}
                >
                  Perceived sleep quality:
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
                  This is your perception of your sleep quality. Higher is
                  better.
                </p>
              </div>
            </div>
          </div>
    )
}