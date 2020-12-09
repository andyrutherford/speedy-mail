import { useState } from 'react';
import { useQuery } from 'react-query';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { getMessage } from '../utils';

import parse from 'html-react-parser';

import ReactHtmlParser from 'react-html-parser';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

type Props = {
  open: boolean;
  handleClose: () => void;
  address: string;
  message: any;
};

const Message: React.FC<Props> = ({ open, handleClose, message, address }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { isLoading, error, data } = useQuery('message', () =>
    getMessage(address.split('@')[0], address.split('@')[1], message.id)
  );

  // const data = {
  //   attachments: [],
  //   body: 'Testetstetsetsetstset',
  //   date: '2020-12-09 10:21:37',
  //   from: 'andrewtr89@gmail.com',
  //   htmlBody: '',
  //   id: 98888975,
  //   subject: 'Test',
  //   textBody: 'Testetstetsetsetstset',
  // };

  const body = data ? (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>{data.subject}</h2>
      <p id='simple-modal-description'>From: {data.from}</p>
      <p id='simple-modal-description'>{data.date} </p>
      <hr />
      <div> {parse(data.textBody)}</div>
      {/* <Message /> */}
    </div>
  ) : (
    <h1>Loading...</h1>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='message-modal'
      aria-describedby='message-modal'
    >
      {body}
    </Modal>
  );
};

export default Message;
