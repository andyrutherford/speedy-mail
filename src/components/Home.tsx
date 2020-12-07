import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query';

import EmailForm from './EmailForm';
import Inbox from './Inbox';

import { API_ENDPOINT, fetchJson } from '../utils/index';

const Home: React.FC<RouteComponentProps> = (props) => {
  const [newAddress, setNewAddress] = useState(true);

  const { isLoading, error, data } = useQuery(
    'emailAddress',
    () => fetchJson(API_ENDPOINT.genRandomAddress),
    { enabled: newAddress }
  );
  const emailAddress = data;

  useEffect(() => {
    setNewAddress(false);
  }, [newAddress]);

  const newAddressHandler = () => {
    setNewAddress(true);
  };

  if (isLoading) return <>'Loading...'</>;
  if (error) return <>'An error has occurred: ' + error</>;
  return (
    <div>
      <EmailForm address={data} getNewAddress={newAddressHandler} />
      <Inbox />
      {data}
    </div>
  );
};

export default Home;
