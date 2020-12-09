import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query';

import EmailForm from './EmailForm';
import Inbox from './Inbox';

import { getRandomAddress } from '../utils/index';

const Home: React.FC<RouteComponentProps> = (props) => {
  const [newAddress, setNewAddress] = useState(true);

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

  if (isLoading) return <>Loading...</>;
  if (error) return <>{error}</>;
  return (
    <div>
      <EmailForm address={data} getNewAddress={newAddressHandler} />
      {data && <Inbox address={data[0]} />}
    </div>
  );
};

export default Home;
