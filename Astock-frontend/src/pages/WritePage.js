import React from 'react';
import { Helmet } from 'react-helmet-async';
import Responsive from '../component/common/Responsive';
import EditorContainer from '../component/write/EditorContainer';
import TagBoxContainer from '../component/write/TagBoxContainer';
import WriteActionButtonsContainer from '../component/write/WriteActionButtonsContainer';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>글 작성하기 - REACTERS</title>
      </Helmet>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
