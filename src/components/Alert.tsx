import styled, { css } from 'styled-components';

type WrapperProps = {
  type: string;
};

const AlertWrapper = styled.div<WrapperProps>`
  text-align: center;

  ${(props) => {
    if (props.type === 'danger') {
      return css`
        color: #d31404;
      `;
    } else {
      return css`
        color: #000;
      `;
    }
  }};
`;

type Props = {
  type: string;
  text: string;
};

const Alert: React.FC<Props> = ({ type, text }) => {
  return (
    <AlertWrapper type={type}>
      <p>{text}</p>
    </AlertWrapper>
  );
};

export default Alert;
