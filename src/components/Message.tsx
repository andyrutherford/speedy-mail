import { useQuery } from 'react-query';
import parse from 'html-react-parser';

import { getMessage, getAttachment } from '../utils';
import { Attachment } from '../types';
import { Button } from '@material-ui/core';

type Props = {
  address: string;
  id: string;
  closeMessage: () => void;
};

const Message: React.FC<Props> = ({ address, id, closeMessage }) => {
  const { isLoading, error, data } = useQuery(['message', id], () =>
    getMessage(address.split('@')[0], address.split('@')[1], id)
  );

  if (isLoading) return <h1>Loading message</h1>;

  if (error) return <h1>Error fetching message.</h1>;

  return (
    <>
      <Button onClick={() => closeMessage()}>Close</Button>
      {data && (
        <>
          <h2>{data.subject ? data.subject : 'No subject'}</h2>
          <p>From: {data.from}</p>
          <p>Received: {data.date}</p>
          {data.attachments.length > 0 && (
            <>
              <hr />
              <h2>Attachments ({data.attachments.length})</h2>
              <ul>
                {data.attachments.map((attachment: Attachment) => (
                  <li key={attachment.filename}>
                    <a
                      href={getAttachment(
                        address.split('@')[0],
                        address.split('@')[1],
                        id,
                        attachment.filename
                      )}
                    >
                      {attachment.filename}
                    </a>
                    ({attachment.size} bytes)
                  </li>
                ))}
              </ul>
            </>
          )}

          <hr />
          {data.htmlBody.length > 0
            ? parse(data.htmlBody)
            : data.textBody
            ? data.textBody
            : 'This message does not contain any content.'}
        </>
      )}
    </>
  );
};

export default Message;
