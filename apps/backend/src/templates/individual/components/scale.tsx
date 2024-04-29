import React from "react";

export interface ScaleProps {
    SleepHealthScorePercentage: number;
    downArrowPath: string;
}

/**
 * Scale with 4 categories: poor, fair, good, excellent
 * @param SleepHealthScorePercentage - The sleep health score to position the arrow
 * @param downArrowPath - arrow icon src location
 * @returns 
 */
export const Scale = ({ SleepHealthScorePercentage, downArrowPath }: ScaleProps) => {

  /**
   * Function to position the arrow on the scale
   * @returns 
   */
  const setArrowPosition = () => {
      const percentageNumber = SleepHealthScorePercentage;
      if (percentageNumber >= 0 && percentageNumber <= 65) {
        return Math.round((percentageNumber / 65) * 105);
      }
      else if (percentageNumber > 65 && percentageNumber <= 75) {
        return Math.round((percentageNumber / 85) * 105 * 2);
      }
      else if (percentageNumber > 75 && percentageNumber <= 85) {
        return Math.round((percentageNumber / 85) * 105 * 3);
      }
      else {
        return Math.round((percentageNumber / 100) * 105 * 4);
      }
  };
    
    return (
        <div
            className="scale"
            style={{
              // marginLeft: "20px",
            //   marginRight: "-150px", 
              position: "relative",
              width: "50%"
            }}
          >
            <img
              style={{
                position: "relative",
                marginBottom: "5px",
                left: setArrowPosition() - 5,
              }}
              className="down_arrow"
              width="15px"
              height="30px"
              src={`data:image/png;base64,${downArrowPath}`}
              alt="down arrow"
            />
            <div
              className="scale_blocks"
              style={{
                display: "-webkit-flex",
                textAlign: "center",
                justifyContent: "center",
                marginTop: "-10px",
              }}
            >
              <div
                className="poor"
                style={{
                  width: "105px",
                  height: "50px",
                  textAlign: "center",
                  margin: "auto 0",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 600,
                  position: "relative",
                  backgroundColor: "#b1cbed",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    marginTop: "9px",
                  }}
                >
                  poor
                </p>
              </div>
              <div
                className="fair"
                style={{
                  width: "105px",
                  height: "50px",
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: 600,
                  position: "relative",
                  justifyContent: "center",
                  backgroundColor: "#c5d8f1",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    marginTop: "9px",
                  }}
                >
                  fair
                </p>
              </div>
              <div
                className="good"
                style={{
                  width: "105px",
                  height: "50px",
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: 600,
                  position: "relative",
                  justifyContent: "center",
                  backgroundColor: "#d5e3f5",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    marginTop: "9px",
                  }}
                >
                  good
                </p>
              </div>
              <div
                className="excellent"
                style={{
                  width: "105px",
                  height: "50px",
                  textAlign: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 600,
                  position: "relative",
                  backgroundColor: "#e4eefa",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    marginTop: "9px",
                  }}
                >
                  excellent
                </p>
              </div>
            </div>
            <div
              className="scale_values"
              style={{
                display: "-webkit-flex",
                position: "relative",
                // left: "10px",
                top: "-10px",
                fontSize: "20px",
              }}
            >
              <p>0%</p>
              <p style={{position: "relative", left: "75px"}}>65%</p>
              <p style={{position: "relative", left: "138px"}}>75%</p>
              <p style={{position: "relative", left: "208px"}}>85%</p>
              <p style={{position: "relative", left: "242px"}}>100%</p>
            </div>
          </div>
    )
}