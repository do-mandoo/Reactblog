import axios from 'axios';

// public폴더 안에 있는 seed.json을 가져온다.
export const getData = id => axios.get('seed.json');
