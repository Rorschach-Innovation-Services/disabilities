/**
 * Creating the email body for contact us input
 * @param data responses from the contact us page
 * @returns string of the body
 * */
export const createEmailBody = (data) => {
  let body = [
    `Hello,\n\n${data.fullName} is enquiring about the services offered by Sleep Science. Details are provided below.\n\n`,
  ];

  body.push(`Email address: ${data.email}\n`);
  body.push(`Job level: ${data.jobLevel}\n`);

  if (data.number) body.push(`Contact number: ${data.number}\n`);
  if (data.foundMethod)
    body.push(
      `Method through which they heard about Sleep Science: ${data.foundMethod}\n`
    );
  if (data.business) body.push(`Their business: ${data.business}\n`);
  if (data.help)
    body.push(`Sleep Science service being enquired about: ${data.help}\n`);
  if (data.message) body.push(`Message: ${data.message}\n`);

  return body.join("");
};
