const apiUrl = import.meta.env.VITE_API_URL;

export async function getApi(pathname: string) {
  return fetch(`${apiUrl}/${pathname}`);
}

export async function postApi(pathname: string, data: object) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function putApiWithAuth(pathname: string, formData: FormData) {
  return fetch(`${apiUrl}/${pathname}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
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
