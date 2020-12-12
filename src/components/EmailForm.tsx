import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import EmailFormWrapper from './EmailForm.styles';

import { API_DOMAINS, RESTRICTED_WORDS } from '../utils';

type Props = {
  address: string;
  getNewAddress: () => void;
  customAddress: (address: string) => void;
};

const EmailForm: React.FC<Props> = ({
  address,
  getNewAddress,
  customAddress,
}) => {
  const [emailAddress, setEmailAddress] = useState<string>(address);
  const [toggleCustomEmail, setToggleCustomEmail] = useState<boolean>(false);
  const [customEmail, setCustomEmail] = useState<{
    address: string;
    domain: any;
  }>({ address: '', domain: API_DOMAINS[0] });
  const [copyTooltipText, setCopyTooltipText] = useState<string>('Copy');

  useEffect(() => {
    setEmailAddress(address);
  }, [address]);

  const newAddressHandler = () => {
    getNewAddress();
    setCustomEmail({ address: '', domain: API_DOMAINS[0] });
    setTimeout(() => setToggleCustomEmail(false), 200);
  };

  const deleteAddressHandler = () => {
    if (window.confirm('This action is irreversible.  Are you sure?')) {
      console.log('delete email');
      newAddressHandler();
    }
  };

  const customAddressHandler = () => {
    if (RESTRICTED_WORDS.includes(customEmail.address)) {
      alert('bad words');
    } else {
      setEmailAddress(customEmail.address + '@' + customEmail.domain);
      setToggleCustomEmail(false);
      customAddress(customEmail.address + '@' + customEmail.domain);
      alert('ok');
    }
  };

  const copyAddressHandler = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopyTooltipText('Copied!');
  };

  return (
    <EmailFormWrapper>
      <h1>Your temporary email address</h1>
      {toggleCustomEmail ? (
        <form noValidate autoComplete='off'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={customEmail.address}
            onChange={(e) =>
              setCustomEmail({ ...customEmail, address: e.target.value })
            }
          />
          {' @ '}
          <FormControl>
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
          <Button
            size='large'
            variant='contained'
            color='primary'
            onClick={customAddressHandler}
          >
            Save
          </Button>
          <Tooltip
            title={copyTooltipText}
            placement='right'
            onClose={() => setTimeout(() => setCopyTooltipText('Copy'), 100)}
          >
            <Button
              size='large'
              variant='contained'
              color='primary'
              onClick={copyAddressHandler}
              startIcon={<FileCopyIcon />}
            />
          </Tooltip>
          <p>Restricted words: {RESTRICTED_WORDS.join(', ')}</p>
        </form>
      ) : (
        <form noValidate autoComplete='off'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={emailAddress}
          />
          <Tooltip
            title={copyTooltipText}
            placement='right'
            onClose={() => setTimeout(() => setCopyTooltipText('Copy'), 100)}
          >
            <Button
              size='large'
              variant='contained'
              color='primary'
              onClick={copyAddressHandler}
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
