import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

/* 회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다. */

const AuthTemplateBlock = styled.div`
  /* 화면 전체를 채움 */
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  /* 흰색박스 */
  .logoArea {
    display: block;
    padding-bottom: 32px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 32px;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logoArea">
          <Link to="/">REACTERS</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
