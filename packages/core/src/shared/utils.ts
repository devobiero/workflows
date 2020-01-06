import fetch from 'node-fetch';

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

interface Params {
  url: string;
  options: any;
}

export function api<T>({ url, options }: Params): Promise<T> {
  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}
