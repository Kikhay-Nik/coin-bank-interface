/* eslint-disable operator-linebreak */
/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable implicit-arrow-linebreak */
export default function compare(field) {
  return (a, b) => {
    const sortedVal = field.split('.');
    const len = sortedVal.length;
    const i = 0;
    if (len === 1) {
      return (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
    }
    if (len === 2) {
      const nestedArr = sortedVal[i];
      const currentValA = a[nestedArr][0][sortedVal[1]];
      const currentValB = b[nestedArr][0][sortedVal[1]];
      return (
        (currentValA < currentValB && -1) ||
        (currentValA > currentValB && 1) ||
        0
      );
    }

    return undefined;
  };
}
