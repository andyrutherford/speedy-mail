import styled from 'styled-components';

const EmailFormWrapper = styled.div`
  width: 600px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  h1 {
    text-align: center;
  }

  input {
    font-size: 1.25em;
    min-width: 360px;
  }

  form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    margin: 20px 0;
  }

  form .custom-address {
    display: flex;
    justify-content: space-evenly;
  }

  .custom-address span {
    font-size: 1.5rem;
  }

  .subtext {
    text-align: center;
    font-size: 0.825rem;
    color: #666;
  }

  #address-domain {
    font-size: 1.25em;
    width: 135px;
    text-align: center;
  }

  #custom-address {
    min-width: 200px;
    text-align: center;
  }

  .copy-button {
    position: absolute;
    top: 8px;
    right: 95px;
  }

  .save-button {
    transform: scale(1.5);
  }

  .form-actions {
    display: flex;
    justify-content: center;
  }
`;

export default EmailFormWrapper;
