export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.status === 400) {
      return Promise.reject(new Error('Некорректно заполнено одно из полей'));
    }
    if (res) {
      return res;
    } else {
      return Promise.reject(
        new Error(`Ошибка ${res.status} - ${res.statusText}`)
      );
    }
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.status === 400) {
      return Promise.reject(new Error('Не передано одно из полей'));
    }
    if (res.status === 401) {
      return Promise.reject(new Error('Пользователь с email не найден'));
    }
    if (res) {
      return res.json();
    } else {
      return Promise.reject(
        new Error(`Ошибка ${res.status} - ${res.statusText}`)
      );
    }
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res) {
      return Promise.reject(
        new Error(`Ошибка ${res.status} - ${res.statusText}`)
      );
    }
    if (res.status === 401) {
      return Promise.reject(new Error('Переданный токен некорректен'));
    }
    if (res) {
      return res.json();
    }
  });
};
