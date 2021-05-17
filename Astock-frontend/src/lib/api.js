import axios from 'axios';

// const client = axios.create();

export const getPost = id =>
  // axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  axios.get(`https://jsonplaceholder.typicode.com/posts`);

export const getUsers = id =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);
