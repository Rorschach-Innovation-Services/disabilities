/**
 * Used to merge csv files together
 * @param csvList an array of strings (being the csv files)
 * @returns string merged csv file
 * */
export const mergeCSV = (csvList) => {
  const result = [];

  // Get headers
  const splitList = csvList[0].split("\n");
  result.push(splitList[1]);

  for (const csv of csvList) {
    const splitList = csv.split("\n");

    splitList.shift(); // remove sep=,
    splitList.shift(); // remove headers
    result.push(...splitList);
  }
  return result.join("\n");
};
