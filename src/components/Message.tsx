import { useQuery } from 'react-query';
import parse from 'html-react-parser';

import { getMessage, getAttachment } from '../utils';
import { Attachment } from '../types';
import { Button } from '@material-ui/core';
import MessageWrapper from './Message.styles';

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
    <MessageWrapper>
      {data && (
        <>
          <div className='message-header'>
            <h2 className='font-italic'>
              {data.subject ? data.subject : 'No subject'}
            </h2>
            <Button
              variant='contained'
              color='primary'
              onClick={() => closeMessage()}
            >
              Close
            </Button>
          </div>
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
          <div className='message-body'>
            {data.htmlBody.length > 0
              ? parse(data.htmlBody)
              : data.textBody
              ? data.textBody
              : 'This message does not contain any content.'}
          </div>
        </>
      )}
    </MessageWrapper>
  );
};

export default Message;
