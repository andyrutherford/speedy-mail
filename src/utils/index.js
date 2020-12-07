export const API_ENDPOINT = {
  genRandomAddress:
    'https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1',
};

export const API_DOMAINS = [
  '1secmail.com',
  '1secmail.org',
  '1secmail.net',
  'esiix.com',
  'wwjmp.com',
];

export const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HttpError: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json;
};
