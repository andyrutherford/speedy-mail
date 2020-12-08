import { useQuery } from 'react-query';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getInbox } from '../utils/index';

type Props = {
  address: string;
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Inbox: React.FC<Props> = ({ address }) => {
  const classes = useStyles();
  const username = address.split('@')[0];
  const domain = address.split('@')[1];

  const { isLoading, error, data } = useQuery(
    'inbox',
    () => getInbox(username, domain),
    { refetchInterval: 10000 }
  );

  if (error) return <h1>An error occurred.</h1>;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            data &&
            data.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell component='th' scope='row'>
                  {r.from}
                </TableCell>
                <TableCell>{r.subject}</TableCell>
                <TableCell>{r.date}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {data && data.length < 1 && <h1>Your inbox is empty.</h1>}
    </TableContainer>
  );
};

export default Inbox;
