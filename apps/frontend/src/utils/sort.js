/**
 * Sort an order in alphanumerical order
 * @param array to sort
 * */
export const sortQuestionArray = (array) => {
  array.sort(function (a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    // names must be equal
    return 0;
  });
};
