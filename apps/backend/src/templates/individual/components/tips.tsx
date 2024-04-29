import React from "react";

export const Tips = () => {
    return (
        <div
          className="tips"
          style={{
            backgroundColor: "#afc8e8",
            position: "relative",
            padding: "5px 10px",
            width: "100%",
            bottom: "40px"
          }}
        >
          <p
            className="tips_heading"
            style={{
              padding: "0 5px",
              color: "#fff",
              fontWeight: 600,
              fontSize: "25px",
              marginTop: "-7px",
              marginBottom: "-13px",
            }}
          >
            Tips to improve your sleep:
          </p>
          <ul style={{ fontSize: "19px" }}>
            <li
              style={{
                fontSize: "17px",
                fontWeight: 600,
                marginBottom: "5px",
              }}
            >
              Have a consistent bedtime and wake-up time.
            </li>
            <li
              style={{
                fontSize: "17px",
                fontWeight: 600,
                marginBottom: "5px",
              }}
            >
              Minimise electronic device use after sunset. If you have to use
              electronics, make use of bluelight blocking filters.
            </li>
            <li
              style={{
                fontSize: "17px",
                fontWeight: 600,
                marginBottom: "5px",
              }}
            >
              Budget 60 minutes for winding down before bed.
            </li>
            <li
              style={{
                fontSize: "17px",
                fontWeight: 600,
                marginBottom: "5px",
              }}
            >
              Be wary of too much caffeine (coffee, ceylon tea, energy drinks &
              some soft drinks) 6 hours before bedtime.
            </li>
            <li
              style={{
                fontSize: "17px",
                fontWeight: 600,
                marginBottom: "2px",
              }}
            >
              Excessive alcohol intake and other sedative use can impair sleep.
            </li>
          </ul>
          <p
            style={{
              margin: "3px 0 3px 0",
              fontSize: "19px",
              fontStyle: "italic",
              fontWeight: 600,
              padding: "0 5px",
              textAlign: "center",
            }}
          >
            If you are concerned about your sleep, please contact your
            healthcare provider or Sleep Science.
          </p>
        </div>
    )
}