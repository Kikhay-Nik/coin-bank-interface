/* eslint-disable consistent-return */
import { MAIN_URL } from '../../constants/api';

export default async (login, password) => {
  try {
    const response = await fetch(`${MAIN_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};
