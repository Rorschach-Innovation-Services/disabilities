import React from "react";
import ReactDOMServer from "react-dom/server";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import puppeteer from "puppeteer";
import { Main } from "../templates/group-report/main";
import { promises as fs } from "fs";
import { join } from "path";
import { PDFData } from "./pdf-data";
import report from "puppeteer-report";

const theme = createTheme({
    typography: {
        fontFamily: ["HK Grotesk", "Arial"].join(","),
    },
});

export const generateGroupReport = async (data: PDFData) => {
    const cache = createCache({ key: "css" });
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(cache);
    const participationIcon = await fs.readFile(
        join(__dirname, "../assets/icons/Participation.png")
    );
    const sleepDurationicon = await fs.readFile(
        join(__dirname, "../assets/icons/sleep-duration.png")
    );
    const percentageIcon = await fs.readFile(
        join(__dirname, "../assets/icons/percentage.png")
    );
    const tripleStarIcon = await fs.readFile(
        join(__dirname, "../assets/icons/triple-start.png")
    );
    const filledStarIcon = await fs.readFile(
        join(__dirname, "../assets/icons/filled-star.png")
    );
    const outlinedStarIcon = await fs.readFile(
        join(__dirname, "../assets/icons/outlined-start.png")
    );
    const medicalAidIcon = await fs.readFile(
        join(__dirname, "../assets/icons/medical-aid.png")
    );
    const pillIcon = await fs.readFile(
        join(__dirname, "../assets/icons/pill.png")
    );
    const downArrowIcon = await fs.readFile(
        join(__dirname, "../assets/icons/down-arrow.png")
    );

    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Main
                    participationIcon={participationIcon.toString("base64")}
                    sleepDurationIcon={sleepDurationicon.toString("base64")}
                    percentageIcon={percentageIcon.toString("base64")}
                    tripleStarIcon={tripleStarIcon.toString("base64")}
                    filledStarIcon={filledStarIcon.toString("base64")}
                    outlinedStarIcon={outlinedStarIcon.toString("base64")}
                    medicalAidIcon={medicalAidIcon.toString("base64")}
                    pillIcon={pillIcon.toString("base64")}
                    downArrowIcon={downArrowIcon.toString("base64")}
                    data={data}
                />
            </ThemeProvider>
        </CacheProvider>
    );

    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(html);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);
    const logo = await fs.readFile(join(__dirname, "../assets/pdf-logo.png"));

    // Send the rendered page back to the client.
    const webPage = renderFullPage(html, emotionCss);

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--font-render-hinting=none"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    );
    await page.setContent(webPage, {
        waitUntil: ["networkidle0", "networkidle2", "load"],
    });

    const footerTemplate = `
      <div style="
    bottom: 20px;  
    width: 100%;  
    color: black;  
font-family: 'HK Grotesk';
      ">
<div style="text-align:center;">
      <p style="font-size:10px;margin-bottom:-10px;font-family:'HK Grotesk'";>Brought to you by Sleep Science</p>
      <p style="font-size:10px;margin-bottom:-8px;font-family:'HK Grotesk'";><span style="text-decoration:underline;color:blue;margin-right:5px;cursor:pointer">info@sleepscience.co.za</span>  |  <span style="text-decoration:underline;color:blue;margin-left:5px;cursor:pointer">www.sleepscience.co.za</span></p>
      <p style="font-size:10px;font-family:'HK Grotesk';">Instagram: <span style="margin-right:5px">sleepscience_</span>    <span style="margin-left:5px">Facebook: Sleep Science</span></p>
      </div>
</div>
`;
    const headerTemplate = `
<div style="height:auto;position:relative;z-index:100;width:100%;margin-top:-20px;"><img src="data:image/png;base64,${logo.toString(
        "base64"
    )}" style="height:auto;width:100%;"/></div>
`;
    // create a pdf buffer
    const pdfBuffer = await page.pdf({
        format: "a4",
        displayHeaderFooter: true,
        preferCSSPageSize: true,
        margin: {
            top: "240px",
            bottom: "100px",
        },
        headerTemplate,
        footerTemplate,
        printBackground: true,
    });

    // close the browser
    await browser.close();

    return pdfBuffer;
};

const renderFullPage = (html: string, css: string) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        ${css}
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <style>
@import url('http://fonts.cdnfonts.com/css/hk-groteks');
* {
    font-family: "HK Grotesk" !important;
}
footer {
    font-family: "HK Grotesk" !important;

}
        body {
   display: flex;
  flex-direction: column;
  min-height: 100vh;
line-height:1.6
        }

        </style>
      </head>
      <body>
      
        <div id="root">${html}</div>
      </body>
    </html>
  `;
};
