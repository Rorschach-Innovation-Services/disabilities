/**
 * Generate a PDF report from an html file
 */
import fs from "fs";
import pdf from "pdf-creator-node";
import { join } from "path";
import { Employee } from "../models";
import { AssessmentDocument, Score } from "../models/assessment.model";
import sendReport from "./sendReport";
import { Stream } from "stream";
import { EmployeeDocument } from "../models/employee.model";
import { getIndividualReport } from "../templates/individual/main";
import { generatePDFReport } from "./generate-pdf";
import { Readable } from "stream";
import React from "react";
import ReactDOMServer from "react-dom/server";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { ReportBody } from "../templates/individual/components/body";

const theme = createTheme({
  typography: {
    fontFamily: ["HK Grotesk", "Arial"].join(","),
  },
});

/**Category: Poor, Fair, Excellent */
const category: Array<string> = ["Poor", "Fair", "Good", "Excellent"];
/**Medication Feedback Messages */
const medicationMessage: string[] = [
  "You are regularly using medication to help you sleep. It is preferable not to use sleep medication on a long term basis.",
  "You are not regularly using medication to help you sleep. It is preferable not to use sleep medication on a long term basis.",
];
/**Report Options */
const sleepFeedbackMessage: Array<string> = [
  "Oh no! Consider seeking assistance to improve your sleep health.",
  "Room to improve - there are a few things to work on to optimise your sleep.",
  "Your sleep health is solid. A few minor tweaks will optimise your sleep.",
  "Well done, your sleep health looks great!",
];

const generateReport = async (assessment: AssessmentDocument) => {
  try {
    const employee = await Employee.findOne({ _id: assessment.employee });
    if (!employee) {
      return { error: "Employee Not Found!" };
    }
    let categoryValue: string | undefined;
    let sleepFeedbackMessageValue: string | undefined;

    const score = assessment.score as Score;
    const sleepDuration = assessment.questionnaire.filter(item => item.id === "3")[0].response;

    /**Icons */
    let facePath: string | undefined;
    const poorFace = fs.readFileSync(
      join(__dirname, "../assets/icons/clipart2569310.png")
    );
    const poorFacePath = poorFace.toString("base64");
    const fairFace = fs.readFileSync(
      join(__dirname, "../assets/icons/clipart3071872.png")
    );
    const fairFacePath = fairFace.toString("base64");
    const excellentFace = fs.readFileSync(
      join(__dirname, "../assets/icons/smiley-face-png-transparent-5.png")
    );
    const excellentFacePath = excellentFace.toString("base64");
    const rightArrowFile = fs.readFileSync(
      join(__dirname, "../assets/icons/right_arrow.png")
    );
    const rightArrowPath = rightArrowFile.toString("base64");
    const downArrowFile = fs.readFileSync(
      join(__dirname, "../assets/icons/down-arrow.png")
    );
    const downArrowPath = downArrowFile.toString("base64");
    const instagramFile = fs.readFileSync(
      join(__dirname, "../assets/icons/instagram.png")
    );
    const instagramPath = instagramFile.toString("base64");
    const facebookFile = fs.readFileSync(
      join(__dirname, "../assets/icons/facebook.png")
    );
    const facebookPath = facebookFile.toString("base64");
    const emailFile = fs.readFileSync(
      join(__dirname, "../assets/icons/email.png")
    );
    const emailPath = emailFile.toString("base64");
    const websiteFile = fs.readFileSync(
      join(__dirname, "../assets/icons/website.png")
    );
    const websitePath = websiteFile.toString("base64");
    const medicineFile = fs.readFileSync(
      join(__dirname, "../assets/icons/medicine.png")
    );
    const medicinePath = medicineFile.toString("base64");

    /**Logo Image */
    const logoFile = fs.readFileSync(
      join(__dirname, "../assets/individual-logo.png")
    );
    const logoPath = logoFile.toString("base64");

    if (score.SleepHealthScorePercentage <= 65) {
      categoryValue = category[0];
      sleepFeedbackMessageValue = sleepFeedbackMessage[0];
      facePath = poorFacePath;
    }
    else if (
      score.SleepHealthScorePercentage > 65 &&
      score.SleepHealthScorePercentage <= 75
    )
    {
      categoryValue = category[1];
      sleepFeedbackMessageValue = sleepFeedbackMessage[1];
      facePath = fairFacePath;
    }
    else if (
      score.SleepHealthScorePercentage > 75 &&
      score.SleepHealthScorePercentage <= 85
    )
    {
      categoryValue = category[2];
      sleepFeedbackMessageValue = sleepFeedbackMessage[2];
      facePath = fairFacePath;
    }
    else {
      categoryValue = category[3];
      sleepFeedbackMessageValue = sleepFeedbackMessage[3];
      facePath = excellentFacePath;
    }

    /**Read the html file */
    const data = {
      //Data
      name: employee.name,
      SleepHealthScorePercentage: Math.round(score.SleepHealthScorePercentage),
      categoryValue,
      sleepFeedbackMessageValue,
      TSTValue: score.TSTValue,
      sleepDuration,
      SE: Math.round(score.SE),
      Quality: score.Quality,
      DayTimeFunctionValue: score.DayTimeFunction,
      medicationMessageValue:
        score.MedToSleepValue === 1
          ? medicationMessage[0]
          : medicationMessage[1],

      //Assets
      logoPath,
      facePath,
      rightArrowPath,
      downArrowPath,
      instagramPath,
      facebookPath,
      emailPath,
      websitePath,
      medicinePath,
    };

    /**Read the html file */
    const cache = createCache({ key: "css" });
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(cache);

    /**Read the html file */
    const bodyHtml = ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReportBody {...data} />
        </ThemeProvider>
      </CacheProvider>
    );

    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(bodyHtml);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    const html = getIndividualReport({
      name: data.name,
      css: emotionCss,
      body: bodyHtml,
    });
    generatePDFReport({
      webpage: html,
    })
      .then((res) => {
        console.log("PDF Generated");
        sendReport(employee.email, employee.name, res)
          .then(() => {
            console.log("PDF Sent");
            return { message: "Successfully Generated Report!" };
          })
          .catch((error) => {
            console.log("Error PDF Generated", error);
            return {
              message: "An issue occurred while sending report!",
              error,
            };
          });
      })
      .catch((error: any) => {
        console.error("PDF Error...: ", error);
        return { error: "An error occurred while generating the report!" };
      });
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const generateStreamReport = async (
  assessment: AssessmentDocument,
  employee: EmployeeDocument
): Promise<Stream> => {
  try {
    console.log("Starting to generate");
    let categoryValue: string | undefined;
    let sleepFeedbackMessageValue: string | undefined;

    const score = assessment.score as Score;
    const sleepDuration = assessment.questionnaire.filter(item => item.id === "3")[0].response;

    /**Icons */
    let facePath: string | undefined;
    const poorFace = fs.readFileSync(
      join(__dirname, "../assets/icons/clipart2569310.png")
    );
    const poorFacePath = poorFace.toString("base64");
    const fairFace = fs.readFileSync(
      join(__dirname, "../assets/icons/clipart3071872.png")
    );
    const fairFacePath = fairFace.toString("base64");
    const excellentFace = fs.readFileSync(
      join(__dirname, "../assets/icons/smiley-face-png-transparent-5.png")
    );
    const excellentFacePath = excellentFace.toString("base64");
    const rightArrowFile = fs.readFileSync(
      join(__dirname, "../assets/icons/right_arrow.png")
    );
    const rightArrowPath = rightArrowFile.toString("base64");
    const downArrowFile = fs.readFileSync(
      join(__dirname, "../assets/icons/down-arrow.png")
    );
    const downArrowPath = downArrowFile.toString("base64");
    const instagramFile = fs.readFileSync(
      join(__dirname, "../assets/icons/instagram.png")
    );
    const instagramPath = instagramFile.toString("base64");
    const facebookFile = fs.readFileSync(
      join(__dirname, "../assets/icons/facebook.png")
    );
    const facebookPath = facebookFile.toString("base64");
    const emailFile = fs.readFileSync(
      join(__dirname, "../assets/icons/email.png")
    );
    const emailPath = emailFile.toString("base64");
    const websiteFile = fs.readFileSync(
      join(__dirname, "../assets/icons/website.png")
    );
    const websitePath = websiteFile.toString("base64");
    const medicineFile = fs.readFileSync(
      join(__dirname, "../assets/icons/medicine.png")
    );
    const medicinePath = medicineFile.toString("base64");

    /**Logo Image */
    const logoFile = fs.readFileSync(
      join(__dirname, "../assets/individual-logo.png")
    );
    const logoPath = logoFile.toString("base64");

    if (score.SleepHealthScorePercentage <= 65) {
      categoryValue = category[0];
      sleepFeedbackMessageValue = sleepFeedbackMessage[0];
      facePath = poorFacePath;
    } else if (
      score.SleepHealthScorePercentage > 65 &&
      score.SleepHealthScorePercentage <= 85
    ) {
      categoryValue = category[1];
      sleepFeedbackMessageValue = sleepFeedbackMessage[1];
      facePath = fairFacePath;
    } else {
      categoryValue = category[2];
      sleepFeedbackMessageValue = sleepFeedbackMessage[2];
      facePath = excellentFacePath;
    }

    const data = {
      //Data
      name: employee.name,
      SleepHealthScorePercentage: Math.round(score.SleepHealthScorePercentage),
      categoryValue,
      sleepFeedbackMessageValue,
      TSTValue: score.TSTValue,
      sleepDuration,
      SE: Math.round(score.SE),
      Quality: score.Quality,
      DayTimeFunctionValue: score.DayTimeFunction,
      medicationMessageValue:
        score.MedToSleepValue === 1
          ? medicationMessage[0]
          : medicationMessage[1],

      //Assets
      logoPath,
      facePath,
      rightArrowPath,
      downArrowPath,
      instagramPath,
      facebookPath,
      emailPath,
      websitePath,
      medicinePath,
    };
    const cache = createCache({ key: "css" });
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(cache);

    /**Read the html file */
    const bodyHtml = ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReportBody {...data} />
        </ThemeProvider>
      </CacheProvider>
    );

    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(bodyHtml);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    const html = getIndividualReport({
      name: data.name,
      css: emotionCss,
      body: bodyHtml,
    });
    const pdfBuffer = await generatePDFReport({
      webpage: html,
    });
    return Readable.from(pdfBuffer);
  } catch (error) {
    console.log("generation error", error);
    throw error;
  }
};

export default generateReport;
