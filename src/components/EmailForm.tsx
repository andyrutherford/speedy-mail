import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Alert from './Alert';

import EmailFormWrapper from './EmailForm.styles';

import { API_DOMAINS, RESTRICTED_WORDS } from '../utils';
import { IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
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
  const [copyTooltipText, setCopyTooltipText] = useState<string>(
    'Copy to clipboard'
  );
  const [saveTooltipText, setSaveTooltipText] = useState<string>('Save');
  const [alertText, setAlertText] = useState<string | null>('');

  useEffect(() => {
    setEmailAddress(address);
  }, [address]);

  // Clear alert after 3 seconds.
  useEffect(() => {
    if (alertText) {
      setTimeout(() => {
        setAlertText(null);
      }, 4000);
    }
  }, [alertText]);

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
    setAlertText(null);
    if (customEmail.address.length < 5 || customEmail.address.length > 12) {
      return setAlertText(
        'Your custom address must be between 5 and 12 characters in length.'
      );
    } else if (RESTRICTED_WORDS.includes(customEmail.address)) {
      return setAlertText(
        'Your custom address cannot use any of the restricted words.'
      );
    } else {
      setEmailAddress(customEmail.address + '@' + customEmail.domain);
      customAddress(customEmail.address + '@' + customEmail.domain);
      setSaveTooltipText('Saved!');
      setTimeout(() => setToggleCustomEmail(false), 1000);
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
          <form noValidate autoComplete='off' className='custom-address'>
            <TextField
              id='custom-address'
              value={customEmail.address}
              onChange={(e) =>
                setCustomEmail({ ...customEmail, address: e.target.value })
              }
            />
            <span> @ </span>
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
            <Tooltip
              title={saveTooltipText}
              placement='right'
              onClose={() => setTimeout(() => setSaveTooltipText('Save'), 150)}
            >
              <IconButton
                color='inherit'
                aria-label='menu'
                onClick={customAddressHandler}
              >
                <CheckIcon className='save-button' color='primary' />
              </IconButton>
            </Tooltip>
          </form>
          <p className='subtext'>
            Restricted words: {RESTRICTED_WORDS.join(', ')}
          </p>
        </>
      ) : (
        <form noValidate autoComplete='off'>
          <TextField
            id='random-address'
            variant='outlined'
            value={emailAddress}
          ></TextField>
          <Tooltip
            title={copyTooltipText}
            placement='right'
            onClose={() =>
              setTimeout(() => setCopyTooltipText('Copy to clipboard'), 150)
            }
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
      {alertText && <Alert type='danger' text={alertText} />}
    </EmailFormWrapper>
  );
};

export default EmailForm;
