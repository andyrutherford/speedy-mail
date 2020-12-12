import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getMessage } from '../utils';

import parse from 'html-react-parser';

type Props = {
  address: string;
  id: string;
  closeMessage: () => void;
};

const Message: React.FC<Props> = ({ address, id, closeMessage }) => {
  const [showMessage, setShowMessage] = useState<boolean>(true);
  console.log(address, id);
  const { isLoading, error, data } = useQuery(['message', id], () =>
    getMessage(address.split('@')[0], address.split('@')[1], id)
  );

  // const [data, setData] = useState<any>();
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await getMessage(
  //       address.split('@')[0],
  //       address.split('@')[1],
  //       id
  //     );
  //     setData(res);
  //   };
  //   fetch();
  // });

  // const data = {
  //   attachments: [],
  //   body: 'Testetstetsetsetstset',
  //   date: '2020-12-09 10:21:37',
  //   from: 'andrewtr89@gmail.com',
  //   id: 98888975,
  //   subject: 'Test',
  //   textBody: 'Testetstetsetsetstset',
  //   htmlBody: '<p>testestetsetssetsetsetsetset</p>',
  // };

  if (isLoading) return <h1>Loading message</h1>;

  if (error) return <h1>Error fetching message</h1>;

  return (
    <>
      {showMessage && (
        <div>
          <button onClick={() => closeMessage()}>Close</button>
          {data && (
            <>
              <h2>{data.subject}</h2>
              <p>From: {data.from}</p>
              <p>Received: {data.date}</p>
              <hr />
              <div>
                {data.htmlBody.length > 0
                  ? parse(data.htmlBody)
                  : data.textBody}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Message;
