import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query';

import EmailForm from './EmailForm';
import Inbox from './Inbox';
import Message from './Message';

import { getRandomAddress } from '../utils/index';

const Home: React.FC = () => {
  const [newAddress, setNewAddress] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const { isLoading, error, data } = useQuery(
    'emailAddress',
    () => getRandomAddress(),
    { enabled: newAddress }
  );
  // setAddress(data);

  useEffect(() => {
    setNewAddress(false);
  }, [newAddress]);

  const newAddressHandler = () => {
    setNewAddress(true);
  };

  const selectMessageHandler = (id: string) => {
    console.log(id);
    setSelectedMessage(id);
    setShowMessage(true);
  };

  const closeMessageHandler = () => {
    setShowMessage(false);
  };

  if (isLoading) return <>Loading...</>;
  if (error) return <>{error}</>;
  return (
    <div>
      <EmailForm address={data} getNewAddress={newAddressHandler} />
      {data && <Inbox address={data} selectMessage={selectMessageHandler} />}
      {data && selectedMessage && showMessage && (
        <Message
          address={data}
          id={selectedMessage}
          closeMessage={closeMessageHandler}
        />
      )}
    </div>
  );
};

export default Home;
