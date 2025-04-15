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
      let currentValA;
      let currentValB;
      if (a[nestedArr][0]) {
        currentValA = a[nestedArr][0][sortedVal[1]];
      } else {
        currentValA = 0;
      }

      if (b[nestedArr][0]) {
        currentValB = b[nestedArr][0][sortedVal[1]];
      } else {
        currentValB = 0;
      }
      return (
        (currentValA < currentValB && -1) ||
        (currentValA > currentValB && 1) ||
        0
      );
    }

    return undefined;
  };
}
