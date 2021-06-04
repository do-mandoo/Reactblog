import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const SubInfoBlock = styled.div`
  ${props =>
    props.hasMarginTop &&
    css`
      margin-top: 16px;
    `}
  color: ${palette.gray[6]};

  /* span 사이에 가운뎃 점 문자 보여주기 */
  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0;
    padding-right: 0;
    content: '\\B7'; /* 가운뎃 점 문자 */
  }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;
