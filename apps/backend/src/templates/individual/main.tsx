interface IndividualReportProps {
  name: string;
  body: string;
  css: string;
}

export const getIndividualReport = ({
  name,
  css,
  body,
}: IndividualReportProps): string => {
  return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name} Report</title>
        <style>
@import url('http://fonts.cdnfonts.com/css/hk-groteks');
            * {
                font-family: 'HK Grotesk', sans-serif;
            }


html {
  line-height: 1.15; 
  -webkit-text-size-adjust: 100%; 
}

body {
  margin: 0;
}

main {
  display: block;
}


h1 {
  font-size: 2em;
  margin: 0.67em 0;
}


hr {
  box-sizing: content-box; 
  height: 0; 
  overflow: visible; 
}

pre {
  font-family: monospace, monospace; 
  font-size: 1em; 
}

a {
  background-color: transparent;
}


abbr[title] {
  border-bottom: none; 
  text-decoration: underline; 
  text-decoration: underline dotted; 
}

b,
strong {
  font-weight: bolder;
}


code,
kbd,
samp {
  font-family: monospace, monospace; 
  font-size: 1em; 
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

img {
  border-style: none;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; 
  font-size: 100%; 
  line-height: 1.15; 
  margin: 0; 
}


button,
input { 
  overflow: visible;
}

button,
select { 
  text-transform: none;
}

j
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}


button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  box-sizing: border-box; 
  color: inherit; 
  display: table; 
  max-width: 100%; 
  padding: 0; 
  white-space: normal; 
}

progress {
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; 
  padding: 0; 
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  -webkit-appearance: textfield; 
  outline-offset: -2px; 
}

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button; 
  font: inherit; 
}

details {
  display: block;
}

summary {
  display: list-item;
}


template {
  display: none;
}


[hidden] {
  display: none;
}
            ${css}
        </style>
    </head>
    <body style="margin: 0; padding: 0;max-height:300px;overflow:hidden;">
    ${body}

        <!-- Jacvascript code for scale pointer -->
        <script>
            const downArrow = document.querySelector('.down_arrow');
            const percentage = document.querySelector('.score_percentage').innerHTML;
            const percentageNumber = parseInt(percentage.slice(0, percentage.length - 1));
            const poorScale = document.querySelector('.poor');
            const poorScaleWidth = poorScale.offsetWidth;
            const fairScale = document.querySelector('.fair');
            const fairScaleWidth = fairScale.offsetWidth + poorScaleWidth;
            const excellentScale = document.querySelector('.excellent');
            const excellentScaleWidth = excellentScale.offsetWidth + fairScaleWidth;

            if(percentageNumber >= 0 && percentageNumber <= 65){
                /* position of the arrow in the scale*/
                const position =  Math.round((percentageNumber/65) * poorScaleWidth);

                /* Move to the percentage position */
                document.querySelector('.down_arrow').style.position = 'relative';
                document.querySelector('.down_arrow').style.left = position + "px";
            }
            else if(percentageNumber > 65 && percentageNumber <= 85){
                /* position of the arrow in the scale*/
                const position =  Math.round((percentageNumber/85) * fairScaleWidth);

                /* Move to the percentage position */
                document.querySelector('.down_arrow').style.position = 'relative';
                document.querySelector('.down_arrow').style.left = position + "px"
            }
            else{
                /* position of the arrow in the scale*/
                const position =  Math.round((percentageNumber/100) * excellentScaleWidth);

                /* Move to the percentage position */
                document.querySelector('.down_arrow').style.position = 'relative';
                document.querySelector('.down_arrow').style.left = position + "px";
            }
        </script>
    </body>
</html>
`;
};
