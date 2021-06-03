import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

/* 회원가입 또는 로그인 폼Form을 보여줍니다. */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0%;
    color: ${palette.gray[8]};
    margin-bottom: 16px;
  }
`;

const StyledInput = styled.input`
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 8px;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 16px;
  }
`;

const Footer = styled.div`
  margin-top: 32px;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 16px;
`;

const textMap = {
  login: '로그인',
  register: '회원가입'
};

/* 에러를 보여 줍니다. */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>로그인</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="newPassword"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="newPassword"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
