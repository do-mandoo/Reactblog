import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  /* 페이지 위아래 여백 지정 */
  padding-top: 80px;
  padding-bottom: 80px;
`;

const TitleInput = styled.input`
  font-size: 48px;
  outline: none;
  padding-bottom: 8px;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 32px;
  width: 100%;
`;

const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 18px;
    line-height: 1.5;
  }
  /* .ql-editor.ql-blank::before {
    left: 0px;
  } */
`;

const Editor = ({ title, body, onChangeField }) => {
  // 외부 라이브러리 연동할 때는 useRef와 useEffect적절하게 사용하면 됨.
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스르 설정

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요오',
      modules: {
        // 더 많은 옵션 ('https://quilljs.com/docs/modules/toolbar/')참고
        toolbar: [
          [{ header: 1 }, { header: 2 }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image']
        ]
      }
    });

    // Quill에 text-change이벤트 핸들러 등록
    // 참고 : https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = e => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <>
      <EditorBlock>
        <TitleInput
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle}
          value={title}
        />
        <QuillWrapper>
          <div ref={quillElement} />
        </QuillWrapper>
      </EditorBlock>
    </>
  );
};

export default Editor;
