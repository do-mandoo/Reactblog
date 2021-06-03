import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  padding: 4px 16px;
  color: #fff;
  outline: none;
  cursor: pointer;
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 12px;
      padding-bottom: 12px;
      width: 100%;
      font-size: 18px;
    `}
  ${props =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;
const StyledLink = styled.button`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
