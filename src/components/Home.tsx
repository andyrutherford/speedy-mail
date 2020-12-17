import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import EmailForm from './EmailForm';
import Inbox from './Inbox';
import Message from './Message';

import { getRandomAddress } from '../utils/index';

const Home: React.FC = () => {
  const [newAddress, setNewAddress] = useState<boolean>(true);
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [customAddress, setCustomAddress] = useState<string | undefined>();

  const { isLoading, error, data } = useQuery(
    'emailAddress',
    () => getRandomAddress(),
    { enabled: newAddress }
  );

  useEffect(() => {
    setNewAddress(false);
  }, [newAddress]);

  const newAddressHandler = () => {
    setNewAddress(true);
    setShowMessage(false);
    setCustomAddress(undefined);
  };

  const selectMessageHandler = (id: string) => {
    setSelectedMessage(id);
    setShowMessage(true);
  };

  const closeMessageHandler = () => setShowMessage(false);

  const customAddressHandler = (address: string) => setCustomAddress(address);

  if (isLoading) return <></>;
  if (error) return <>{error}</>;
  return (
    <div>
      {data && (
        <EmailForm
          address={data}
          getNewAddress={newAddressHandler}
          customAddress={customAddressHandler}
        />
      )}
      {data && (
        <Inbox
          address={customAddress || data}
          selectMessage={selectMessageHandler}
        />
      )}
      {data && selectedMessage && showMessage && (
        <Message
          address={customAddress || data}
          id={selectedMessage}
          closeMessage={closeMessageHandler}
        />
      )}
    </div>
  );
};

export default Home;
