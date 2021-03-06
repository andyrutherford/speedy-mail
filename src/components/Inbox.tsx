import { useQuery } from 'react-query';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getInbox } from '../utils/index';
import { InboxWrapper } from './Inbox.styles';

type Props = {
  address: string;
  selectMessage: (id: string) => void;
};

const Inbox: React.FC<Props> = ({ address, selectMessage }) => {
  const { isLoading, error, data } = useQuery(
    'inbox',
    () => getInbox(address.split('@')[0], address.split('@')[1]),
    { refetchInterval: 3000 }
  );

  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h1>An error occurred. Please try again.</h1>;

  return (
    <InboxWrapper>
      <TableContainer component={Paper}>
        <Table aria-label='inbox'>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((r: any) => (
                <TableRow
                  hover
                  key={r.id}
                  id={r.id}
                  onClick={() => selectMessage(r.id)}
                >
                  <TableCell component='th' scope='row'>
                    {r.from}
                  </TableCell>
                  <TableCell>
                    {r.subject ? (
                      r.subject
                    ) : (
                      <span className='font-italic'>No subject</span>
                    )}
                  </TableCell>
                  <TableCell>{r.date}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {data && data.length < 1 && (
          <div className='inbox-status'>
            <h1>Your inbox is empty.</h1>
            <p>Waiting for incoming emails...</p>
          </div>
        )}
      </TableContainer>
    </InboxWrapper>
  );
};

export default Inbox;
