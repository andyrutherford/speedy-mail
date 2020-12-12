import styled from 'styled-components';

const EmailFormWrapper = styled.div`
  border: 1px solid #ccc;
  width: 600px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 6px;

  h1 {
    text-align: center;
  }

  input {
    font-size: 1.5em;
    min-width: 370px;
    /* text-align: center; */
  }

  #address-domain {
    font-size: 1.5em;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 20px 0;
  }

  #random-address {
    min-width: 200px;
  }

  .copy-button {
    position: absolute;
    top: 8px;
    right: 110px;
  }

  .form-actions {
    display: flex;
    justify-content: center;
  }
`;

export default EmailFormWrapper;
