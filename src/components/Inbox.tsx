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
import Modal from '@material-ui/core/Modal';

import Message from './Message';
import { getInbox } from '../utils/index';

type Props = {
  address: string;
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

const Inbox: React.FC<Props> = ({ address }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  const classes = useStyles();

  const { isLoading, error, data } = useQuery(
    'inbox',
    () => getInbox(address.split('@')[0], address.split('@')[1]),
    { refetchInterval: 3000 }
  );

  // const data = [
  //   {
  //     id: 123456,
  //     from: 'mail@mail.com',
  //     subject: 'super cool message',
  //     date: '1/1/2020',
  //   },
  // ];

  // if (error) return <h1>An error occurred.</h1>;

  const handleOpen = (e: any, message: any) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
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
                  onClick={(e: any) => handleOpen(e, r)}
                >
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

      {open && (
        <Message
          open={open}
          handleClose={handleClose}
          address={address}
          message={selectedMessage}
        ></Message>
      )}
    </>
  );
};

export default Inbox;
