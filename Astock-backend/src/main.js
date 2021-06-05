require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import cors from '@koa/cors';

// src>api>index.js가져오기
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware'; // 상단에 위치해야함.
// import createFakeData from './createFakeData';

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;
console.log(process.env.MONGO_URI, 'mongouriInTheENV');

// mongoose
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB!');
    // createFakeData();
  })
  .catch(e => {
    console.error(e, 'itserror');
  });

// Koa
const app = new Koa();

app.use(cors());
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// PORT가 지정되어 있지 않다면 4000을 사용
// PORT 5000번으로 지정되어있음. .env파일참고
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
