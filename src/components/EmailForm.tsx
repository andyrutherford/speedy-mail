import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';

import EmailFormWrapper from './EmailForm.styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const EmailForm: React.FC = () => {
  const classes = useStyles();
  const [emailAddress] = useState<string>(
    Math.floor(Math.random() * 1000000) + '@mail.com'
  );

  const newAddressHandler = () => console.log('new address');
  const customAddressHandler = () => console.log('custom address');
  const deleteAddressHandler = () => console.log('delete address');

  return (
    <EmailFormWrapper>
      <h1>Your email address</h1>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='outlined-basic'
          variant='outlined'
          value={emailAddress}
        />
        <Tooltip title='Copy' placement='right'>
          <Button
            size='large'
            variant='contained'
            color='primary'
            startIcon={<FileCopyIcon />}
          />
        </Tooltip>
      </form>
      <ButtonGroup color='primary' aria-label='outlined primary button group'>
        <Button onClick={newAddressHandler}>New Email Address</Button>
        <Button onClick={customAddressHandler}>Custom Address</Button>
        <Button onClick={deleteAddressHandler}>Delete Forever</Button>
      </ButtonGroup>
    </EmailFormWrapper>
  );
};

export default EmailForm;
