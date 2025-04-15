// eslint-disable-next-line import/prefer-default-export
export const MAIN_URL = 'http://localhost:3000';
export const ACCOUNTS_URL = `${MAIN_URL}/accounts`;
export const CREATE_ACCOUNT_URL = `${MAIN_URL}/create-account`;
export const GET_ACCOUNT_INFO_URL = `${MAIN_URL}/account`;
export const TRANSFER_FUNDS_URL = `${MAIN_URL}/transfer-funds`;
export const ACCOUNT_CURRENCY_URL = `${MAIN_URL}/currencies`;
export const ALL_CURRENCY_URL = `${MAIN_URL}/all-currencies`;
export const TRANSFER_CURRENCY_URL = `${MAIN_URL}/currency-buy`;
export const EXCHANGE_FEED_URL = `${MAIN_URL}/currency-feed`;
export const ATMS_URL = `${MAIN_URL}/banks`;

export const API_LOGIN_ERRORS = {
  'No such user': 'Пользователь не найден',
  'Invalid password': 'Неверный пароль',
};
export const API_TRANSFER_ERRORS = {
  'Invalid account from': 'Не найден счет отправки',
  'Invalid account to': 'Неверно указан счет получателя',
  'Invalid amount': 'Некорректная сумма перевода',
  'Overdraft prevented': 'Сумма перевода превышает остаток на счете',
};
