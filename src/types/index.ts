export interface Inbox {
  id: number;
  subject: string;
  from: string;
  date: string;
}

export interface Attachment {
  size: number;
  contentType: string;
  filename: string;
}

export interface Message {
  id: number;
  subject: string;
  from: string;
  date: string;
  attachments: Attachment[];
  body: string;
  textBody: string;
  htmlBody: string;
}
