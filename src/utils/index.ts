import { Inbox, Message } from '../types';

const API_ENDPOINT = 'https://www.1secmail.com/api/v1';

export const API_DOMAINS = [
  '1secmail.com',
  '1secmail.org',
  '1secmail.net',
  'esiix.com',
  'wwjmp.com',
];

export const RESTRICTED_WORDS = [
  'abuse',
  'webmaster',
  'contact',
  'postmaster',
  'hostmaster',
  'admin',
];

export const getRandomAddress = async (): Promise<string> => {
  const response = await fetch(`${API_ENDPOINT}/?action=genRandomMailbox`);
  if (!response.ok) {
    throw new Error(`HttpError: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();

  return json[0];
};

export const getInbox = async (
  username: string,
  domain: string
): Promise<Inbox[]> => {
  const response = await fetch(
    `${API_ENDPOINT}/?action=getMessages&login=${username}&domain=${domain}`
  );
  if (!response.ok) {
    throw new Error(`HttpError: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json;
};

export const getMessage = async (
  username: string,
  domain: string,
  id: string
): Promise<Message> => {
  const response = await fetch(
    `${API_ENDPOINT}/?action=readMessage&login=${username}&domain=${domain}&id=${id}`
  );
  if (!response.ok) {
    throw new Error(`HttpError: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json as Message;
};
