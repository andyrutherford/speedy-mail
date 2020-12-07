import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import EmailFormWrapper from './EmailForm.styles';

import { API_DOMAINS } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > input': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

type Props = {
  address: string;
  getNewAddress: () => void;
};

const EmailForm: React.FC<Props> = ({ address, getNewAddress }) => {
  const classes = useStyles();
  const [emailAddress, setEmailAddress] = useState<string>(address);
  const [toggleCustomEmail, setToggleCustomEmail] = useState<boolean>(false);
  const [customEmail, setCustomEmail] = useState<{
    address: string;
    domain: any;
  }>({ address: '', domain: API_DOMAINS[0] });

  useEffect(() => {
    setEmailAddress(address);
  }, [address]);

  const newAddressHandler = () => {
    getNewAddress();
    setTimeout(() => setToggleCustomEmail(false), 200);
  };

  const deleteAddressHandler = () => {
    if (window.confirm('This action is irreversible.  Are you sure?')) {
      console.log('delete email');
      newAddressHandler();
    }
  };

  return (
    <EmailFormWrapper>
      <h1>Your email address</h1>
      {toggleCustomEmail ? (
        <form className={classes.root} noValidate autoComplete='off'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={customEmail.address}
            onChange={(e) =>
              setCustomEmail({ ...customEmail, address: e.target.value })
            }
          />
          {' @ '}
          <FormControl className={classes.formControl}>
            <Select
              labelId='domain'
              id='outlined-basic'
              onChange={(e) =>
                setCustomEmail({ ...customEmail, domain: e.target.value })
              }
              value={customEmail.domain}
            >
              {API_DOMAINS.map((domain) => (
                <MenuItem key={domain} value={domain}>
                  {domain}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title='Copy' placement='right'>
            <Button
              size='large'
              variant='contained'
              color='primary'
              startIcon={<FileCopyIcon />}
            />
          </Tooltip>
        </form>
      ) : (
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
      )}
      <ButtonGroup color='primary' aria-label='outlined primary button group'>
        <Button onClick={newAddressHandler}>New Email Address</Button>
        <Button onClick={() => setToggleCustomEmail(!toggleCustomEmail)}>
          Custom Address
        </Button>
        <Button onClick={deleteAddressHandler}>Delete Forever</Button>
      </ButtonGroup>
    </EmailFormWrapper>
  );
};

export default EmailForm;
