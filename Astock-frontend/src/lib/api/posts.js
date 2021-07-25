import qs from 'qs';
import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = id => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag
  });
  return client.get(`/api/posts?${queryString}`);
};

// write상태에 originalPostId값이 주어졌다면 포스트 작성 API 대신 수정API를 사용하는 기능
export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags
  });

// 포스트삭제
export const removePost = id => client.delete(`/api/posts/${id}`);
