const API_ENDPOINT = 'https://www.1secmail.com/api/v1';

export const API_DOMAINS = [
  '1secmail.com',
  '1secmail.org',
  '1secmail.net',
  'esiix.com',
  'wwjmp.com',
];

export const getRandomAddress = async () => {
  const response = await fetch(
    `${API_ENDPOINT}/?action=genRandomMailbox&count=1`
  );
  if (!response.ok) {
    throw new Error(`HttpError: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json;
};

export const getInbox = async (username, domain) => {
  const response = await fetch(
    `${API_ENDPOINT}/?action=getMessages&login=${username}&domain=${domain}`
  );
  if (!response.ok) {
    throw new Error(`HttpError: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json;
};

export const getMessage = async (username, domain, id) => {
  const response = await fetch(
    `${API_ENDPOINT}/?action=readMessage&login=${username}&domain=${domain}&id=${id}`
  );
  if (!response.ok) {
    throw new Error(`HttpError: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json;
};
