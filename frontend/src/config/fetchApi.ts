const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchApi(pathname: string) {
  return fetch(`${apiUrl}/${pathname}`);
}
