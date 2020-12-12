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
import { IconButton } from '@material-ui/core';

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
      newAddressHandler();
    }
  };

  const customAddressHandler = () => {
    if (customEmail.address.length < 5) {
      return alert('Your custom address must be atleast 5 characters.');
    } else if (RESTRICTED_WORDS.includes(customEmail.address)) {
      return alert(
        'Your custom address cannot use any of the restricted words.'
      );
    } else {
      setEmailAddress(customEmail.address + '@' + customEmail.domain);
      setToggleCustomEmail(false);
      customAddress(customEmail.address + '@' + customEmail.domain);
      alert('Your custom address is saved.');
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
        <>
          <form noValidate autoComplete='off'>
            <TextField
              id='random-address'
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
                id='address-domain'
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
          </form>
          <p>Restricted words: {RESTRICTED_WORDS.join(', ')}</p>
        </>
      ) : (
        <form noValidate autoComplete='off'>
          <TextField
            id='outlined-basic'
            variant='outlined'
            value={emailAddress}
          ></TextField>
          <Tooltip
            title={copyTooltipText}
            placement='right'
            onClose={() => setTimeout(() => setCopyTooltipText('Copy'), 100)}
          >
            <IconButton
              className='copy-button'
              color='primary'
              onClick={copyAddressHandler}
            >
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
        </form>
      )}
      <ButtonGroup
        className='form-actions'
        color='primary'
        aria-label='outlined primary button group'
      >
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
