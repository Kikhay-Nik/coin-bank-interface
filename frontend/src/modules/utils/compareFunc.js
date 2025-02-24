/* eslint-disable implicit-arrow-linebreak */
export default function compare(field) {
  return (a, b) =>
    (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
}
