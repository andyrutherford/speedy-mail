import { useState } from 'react';
import { useQuery } from 'react-query';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
  selectMessage: (id: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const Inbox: React.FC<Props> = ({ address, selectMessage }) => {
  const classes = useStyles();
  const { isLoading, error, data } = useQuery(
    'inbox',
    () => getInbox(address.split('@')[0], address.split('@')[1]),
    { refetchInterval: 3000 }
  );

  if (error) return <h1>An error occurred. Please try again.</h1>;

  return (
    <>
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
                  <TableCell>{r.subject ? r.subject : 'No subject'}</TableCell>
                  <TableCell>{r.date}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {data && data.length < 1 && (
          <>
            <h1>Your inbox is empty.</h1>
            <p>Waiting for incoming emails...</p>
          </>
        )}
      </TableContainer>
    </>
  );
};

export default Inbox;
