import {
  ACCOUNT_CURRENCY_URL,
  GET_ACCOUNT_INFO_URL,
  TRANSFER_FUNDS_URL,
  ALL_CURRENCY_URL,
  TRANSFER_CURRENCY_URL,
} from '../constants/api';

export const getAccountsData = async (url) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь неавторизован');
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const createAccount = async (url) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь неавторизован');
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getAccountById = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь неавторизован');
  }
  try {
    const response = await fetch(`${GET_ACCOUNT_INFO_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const postTransferFunds = async (from, to, amount) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь неавторизован');
  }
  try {
    const response = await fetch(TRANSFER_FUNDS_URL, {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getAllCurrency = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь неавторизован');
  }
  try {
    const response = await fetch(`${ALL_CURRENCY_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getAccountCurrency = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь неавторизован');
  }
  try {
    const response = await fetch(`${ACCOUNT_CURRENCY_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const postTransferCurrency = async (from, to, amount) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Пользователь неавторизован');
  }
  try {
    const response = await fetch(TRANSFER_CURRENCY_URL, {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};
