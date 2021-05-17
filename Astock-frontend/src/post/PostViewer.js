import React from 'react';
import styled from 'styled-components';

const PostViewerBlock = styled.div`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid #aaa;
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;
const SubInfo = styled.div`
  margin-top: 1rem;
  color: skyblue;

  span + span::before {
    color: gray;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;
const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: snow;
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: darkcyan;
    }
  }
`;
const PostContent = styled.div`
  font-size: 1.3125rem;
  color: yellowgreen;
`;

const PostViewer = ({ post, error, loading }) => {
  if (error) {
    if (error.response && error.response.status === 400) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }
  // 로딩중이거나 아직  포스트 데이터가 없을때
  if (loading || !post) {
    return null;
  }

  const { title, body, user, publishedData, tags, rangeId, data, name } = post;

  return (
    <PostViewerBlock>
      <PostHead>
        <h1>
          {name}
          {rangeId}
          {data}
        </h1>
        <SubInfo>
          <span>
            {title}
            <b>{user.username}</b>
          </span>
          <span>{new Date(publishedData).toLocaleDateString()}</span>
        </SubInfo>
        <Tags>
          {tags.map(tag => (
            <div className="tag">#{tag}</div>
          ))}
        </Tags>
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
