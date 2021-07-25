import React from 'react';
import HeaderContainer from '../component/common/HeaderContainer';
import PaginationContainer from '../component/posts/PaginationContainer';
// import PostList from '../component/posts/PostList';
import PostListContainer from '../component/posts/PostListContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};

export default PostListPage;
