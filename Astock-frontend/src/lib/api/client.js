import axios from 'axios';

// const client = axios.create();

export const getPost = id =>
  axios.get(`httpsL//jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = id =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);

// const client = async () => {
//   const response = await axios.get('http://localhost:4000/ExStock');
//   return response.data;
// };
// console.log(client, 'client');
// export const getPostById = async id => {
//   const response = await axios.get(`http://localhost:4000/ExStock/${id}`);
//   return response.data;
// };

// export default client;
