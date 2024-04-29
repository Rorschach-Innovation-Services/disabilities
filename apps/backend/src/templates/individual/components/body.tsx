import React from "react";
import { Score } from "./score";
import { Scale } from "./scale";
import { Ratings } from "./ratings";
import { Tips } from "./tips";

interface IndividualReportProps {
  name: string;
  SleepHealthScorePercentage: number;
  categoryValue: string;
  sleepFeedbackMessageValue: string;
  TSTValue: number;
  SE: number;
  Quality: number;
  DayTimeFunctionValue: number;
  medicationMessageValue: string;
  sleepDuration: string;

  //Assets
  logoPath: string;
  facePath: string;
  rightArrowPath: string;
  downArrowPath: string;
  instagramPath: string;
  facebookPath: string;
  emailPath: string;
  websitePath: string;
  medicinePath: string;
}
export const ReportBody = ({
  name,
  SleepHealthScorePercentage,
  categoryValue,
  sleepFeedbackMessageValue,
  TSTValue,
  SE,
  Quality,
  DayTimeFunctionValue,
  medicationMessageValue,
  sleepDuration,
  logoPath,
  facePath,
  rightArrowPath,
  downArrowPath,
  instagramPath,
  facebookPath,
  emailPath,
  websitePath,
  medicinePath,
}: IndividualReportProps) => {

  return (
    <div className="container">
      <div
        className="banner"
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "205px",
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "30px",
          marginBottom: "-30px",
        }}
      >
        <div
          className="logo"
          style={{
            width: "100%",
            marginLeft: "25px",
            marginTop: "18px",
            marginRight: "40px",
          }}
        >
          <img
            width="100%"
            src={`data:image/png;base64,${logoPath}`}
            alt="logo image"
          />
        </div>
        <div
          style={{ width: "100%", position: "relative", left: "70px" }}
          className="contact_info"
        >
          <p
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Brought to you by Sleep Science
          </p>
          <img
            className="email_icon"
            width="28px"
            height="28px"
            src={`data:image/png;base64,${emailPath}`}
            style={{ marginBottom: "5px", marginTop: "-4px" }}
            alt="email"
          />
          <a
            target="_blank"
            href="mailto:info@sleepscience.co.za"
            style={{
              marginLeft: "10px",
              textDecoration: "none",
              color: "#fff",
              fontSize: "15px",
              position: "relative",
              bottom: "13px",
              display: "inline-block",
              marginTop: "-6px",
            }}
          >
            info@sleepscience.co.za
          </a>
          <br />
          <img
            className="website_icon"
            width="28px"
            height="28px"
            style={{ marginBottom: "5px" }}
            src={`data:image/png;base64,${websitePath}`}
            alt="email"
          />
          <a
            target="_blank"
            href="https://www.sleepscience.co.za"
            style={{
              marginLeft: "10px",
              marginTop: "-4px",
              textDecoration: "none",
              color: "#fff",
              fontSize: "15px",
              position: "relative",
              bottom: "13px",
              display: "inline-block",
            }}
          >
            www.sleepscience.co.za
          </a>
          <br />
          <img
            className="instagram_icon"
            width="28px"
            height="28px"
            style={{ marginBottom: "5px" }}
            src={`data:image/png;base64,${instagramPath}`}
            alt="email"
          />
          <a
            target="_blank"
            href="https://www.instagram.com/sleepscience_/"
            style={{
              marginLeft: "10px",
              textDecoration: "none",
              marginTop: "-4px",
              color: "#fff",
              fontSize: "15px",
              position: "relative",
              bottom: "13px",
              display: "inline-block",
            }}
          >
            @sleepscience_
          </a>
          <br />
          <img
            className="facebook_icon"
            width="28px"
            height="28px"
            style={{ marginBottom: "5px" }}
            src={`data:image/png;base64,${facebookPath}`}
            alt="email"
          />
          <a
            target="_blank"
            href="https://www.facebook.com/www.sleepscience.co.za/"
            style={{
              marginLeft: "10px",
              textDecoration: "none",
              color: "#fff",
              fontSize: "15px",
              position: "relative",
              bottom: "13px",
              display: "inline-block",
            }}
          >
            Sleep Science
          </a>
        </div>
      </div>
      <div className="body" style={{ paddingRight: "4px" }}>
        <p
          className="welcome_message"
          style={{
            fontSize: "28px",
            textAlign: "center",
            marginBottom: "28px",
            fontWeight: 600,
            letterSpacing: "0.7px",
          }}
        >
          Hi {name.split(" ")[0]}. Thanks for completing your sleep health screen.
        </p>
        <Score
          SleepHealthScorePercentage={SleepHealthScorePercentage}
          rightArrowPath={rightArrowPath}
          categoryValue={categoryValue}
        />
        <div
          className="feedback_scale"
          style={{
            marginTop: "19px",
            display: "-webkit-flex",
            width: "100%",
            gap: "10px"
          }}
        >
          <div
            className="feedback"
            style={{
              backgroundColor: "#afc8e8",
              margin: "0 0 0 10px",
              width: "50%",
              borderRadius: "20px",
              textAlign: "center",
              height: "100%",
              padding: "5px 10px",
              position: "relative",
              // bottom: "10px",
            }}
          >
            <p style={{ fontSize: "22px", fontWeight: 600, color: "#fff" }}>
              {sleepFeedbackMessageValue}
            </p>
          </div>
          <Scale
            SleepHealthScorePercentage={SleepHealthScorePercentage}
            downArrowPath={downArrowPath}
          />
        </div>
        <div
          className="notice"
          style={{
            position: "relative",
            bottom: "45px"
          }}
        >
          <p style={{ fontSize: "25px", fontWeight: 600, textAlign: "center" }}>
            Your sleep health score is made up of the following components:
          </p>
        </div>
        <Ratings
          sleepDuration={sleepDuration}
          SE={SE}
          Quality={Quality}
          DayTimeFunctionValue={DayTimeFunctionValue}
          medicationMessageValue={medicationMessageValue}
          medicinePath={medicinePath}
        />
        <Tips/>
      </div>
      <div
        className="footer"
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          fontSize: "10px",
          position: "relative",
          bottom: "55px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "14px" }}>
          Data provided here are for informative purposes only, and do not
          substitute for professional medical advice.
          <br /> Please always consult a medical or healthcare professional for
          advice, diagnosis or treatment.
        </p>
      </div>
    </div>
  );
};
