import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from './PostViewer';

const PostViewerContainer = ({ match }) => {
  // 처음 마운트 될 때 포스트 읽기 API 요청
  console.log(1);
  const { postId } = match.params;
  console.log({ postId }, 'postId');
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST']
  }));
  console.log({ post }, 'post');
  useEffect(() => {
    dispatch(readPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  return <PostViewer post={post} loading={loading} error={error} />;
};

export default withRouter(PostViewerContainer);
