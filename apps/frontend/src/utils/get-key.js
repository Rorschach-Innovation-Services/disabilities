/**
 * Getting the key of a S3 object based off the object url
 * @param url object link
 * @returns key of the object
 * */
export const getKey = (url) => {
  const split = url.split("/");

  if (split[split.length - 1]) return split[split.length - 1];
  return split[split.length - 2];
};
