import React from 'react';
import Responsive from '../component/common/Responsive';
import EditorContainer from '../component/write/EditorContainer';
import TagBoxContainer from '../component/write/TagBoxContainer';
import WriteActionButtonsContainer from '../component/write/WriteActionButtonsContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
