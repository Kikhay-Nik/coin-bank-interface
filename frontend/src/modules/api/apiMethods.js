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
