/* eslint-disable implicit-arrow-linebreak */
import { DateTime } from 'luxon';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default (dateString) =>
  DateTime.fromISO(dateString)
    .setLocale('ru')
    .toLocaleString(dateOptions)
    .replace('г.', '');
