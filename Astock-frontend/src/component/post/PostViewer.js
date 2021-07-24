import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
// import SubInfo from '../common/SubInfo';
// import Tags from '../common/Tags';

const PostViewerBlock = styled(Responsive)`
  margin-top: 64px;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 48px;
  margin-bottom: 48px;
  h1 {
    font-size: 48px;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 21px;
  color: ${palette.gray[8]};
`;

const SubSubInfo = styled.div`
  margin-top: 16px;
  color: ${palette.gray[6]};
  span + span:before {
    color: ${palette.gray[5]};
    padding-left: 4px;
    padding-right: 4px;
    content: '\\B7';
  }
`;

const TTags = styled.div`
  margin-top: 8px;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 8px;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

// const PostViewer = ({ post, error, loading }) => {
//   // 에러 발생 시
//   // if (post === null) {

//   // }
//   if (error) {
//     if (error.response && error.response.status === 404) {
//       return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
//     } else if (post === null) {
//       return <PostViewerBlock>nullnull</PostViewerBlock>;
//     }
//     return <PostViewerBlock>오류발생!!</PostViewerBlock>;
//   }
//   // 로딩중이거나 아직 포스트 데이터가 없을때
//   if (loading || !post) {
//     return null;
//   }
//   const { title, body, user, publishedDate, tags } = post;
//   return (
//     <PostViewerBlock>
//       <PostHead>
//         <h1>{title}</h1>
//         <SubInfo username={user.username} publishedDate={publishedDate} />
//         <Tags tags={tags} />
//       </PostHead>
//       <PostContent dangerouslySetInnerHTML={{ __html: body }} />
//     </PostViewerBlock>
//   );
// };

const PostViewer = ({ post, error, loading }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류발생!!</PostViewerBlock>;
  }
  // 로딩중이거나 아직 포스트 데이터가 없을때
  if (loading || !post) {
    return null;
  }
  const { title, body, user, publishedDate, tags } = post;
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubSubInfo>
          <span>
            <b>{user.username}</b>
          </span>
          <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </SubSubInfo>
        <TTags>
          {tags.map(tag => (
            <div className="tag">#{tag}</div>
          ))}
        </TTags>
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: { body } }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
