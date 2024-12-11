const apiUrl = import.meta.env.VITE_API_URL;

export async function getApi(pathname: string) {
  return fetch(`${apiUrl}/${pathname}`);
}
