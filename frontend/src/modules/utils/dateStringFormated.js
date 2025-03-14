/* eslint-disable implicit-arrow-linebreak */
import { DateTime } from 'luxon';

export default (dateString, monthFormat = 'long') => {
  const dateOptions = {
    year: 'numeric',
    month: monthFormat,
    day: 'numeric',
  };
  return DateTime.fromISO(dateString)
    .setLocale('ru')
    .toLocaleString(dateOptions)
    .replace('г.', '');
};
