import styled from 'styled-components';

const MessageWrapper = styled.div`
  border-radius: 6px;
  max-width: 1200px;
  margin: 20px auto;
  padding: 10px 25px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .message-body {
    margin: 20px 0;
  }
`;

export default MessageWrapper;
