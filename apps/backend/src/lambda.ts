export const handler = async (params: any) => {
  console.log('Sending email...', params);

  return {
    statusCode: 200,
    body: 'Sent!',
  };
};
