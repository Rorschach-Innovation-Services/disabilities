import puppeteer, { PDFOptions } from "puppeteer";

interface GeneratePDFReportParameters {
  webpage: string;
  footerTemplate?: string;
  headerTemplate?: string;
  margin?: {
    top?: string;
    right?: string;
    left?: string;
    bottom?: string;
  };
}

export const generatePDFReport = async ({
  webpage,
  footerTemplate,
  headerTemplate,
  margin,
}: GeneratePDFReportParameters) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--font-render-hinting=none"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
  );
  await page.setContent(webpage, {
    waitUntil: ["networkidle0", "networkidle2", "load"],
  });

  const opts: PDFOptions = {};
  let display = false;

  if (typeof footerTemplate !== "undefined") {
    if (!display) {
      opts.displayHeaderFooter = true;
      display = true;
    }
    opts.footerTemplate = footerTemplate;
  }
  if (typeof headerTemplate !== "undefined") {
    if (!display) {
      opts.displayHeaderFooter = true;
      display = true;
    }
    opts.headerTemplate = headerTemplate;
  }
  if (typeof margin !== "undefined") opts.margin = margin;

  // create a pdf buffer
  const pdfBuffer = await page.pdf({
    format: "a4",
    preferCSSPageSize: true,
    printBackground: true,
    ...opts,
  });

  // close the browser
  await browser.close();

  return pdfBuffer;
};
