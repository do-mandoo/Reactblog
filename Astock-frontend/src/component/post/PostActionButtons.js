import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveMdal';

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
  margin-top: -24px;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 4px;
  }
`;

const PostActionButtons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default PostActionButtons;
