import { BASE_URL } from './baseUrl';

const apiUrl = `${BASE_URL}/api`;

export async function getApi(pathname: string) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function postApi(pathname: string, data: object) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
}

export async function putApiFormDataWithAuth(
  pathname: string,
  formData: FormData
) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  });
}

export async function putApiWithAuth(pathname: string, data: object) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
}

export async function postApiWithAuth(pathname: string, data: object) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
}

export async function postApiFormDataWithAuth(
  pathname: string,
  formData: FormData
) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
}

export async function getApiWithAuth(pathname: string) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function deleteApiWithAuth(pathname: string) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'DELETE',
    credentials: 'include',
  });
}
