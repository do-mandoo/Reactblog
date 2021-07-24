import qs from 'qs';
import client from './client';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = id => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }) => {
  console.log(12);
  const queryString = qs.stringify({
    page,
    username,
    tag
  });
  console.log(21);
  return client.get(`/api/posts?${queryString}`);
};
