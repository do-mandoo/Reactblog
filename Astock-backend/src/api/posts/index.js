import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as AllPostsCtrl from './posts.ctrl';

const posts = new Router();

// 데이터 조회
posts.get('/', AllPostsCtrl.list);

// 데이터 생성
posts.post('/', checkLoggedIn, AllPostsCtrl.write); // 로그인했을때만 API를 사용할수있게하기

// 특정 데이터 조회. 이거 중요한것같기도
posts.get('/:id', AllPostsCtrl.getPostById, AllPostsCtrl.read);

// 특정 데이터 삭제
posts.delete(
  '/:id',
  checkLoggedIn,
  AllPostsCtrl.checkOwnPost,
  AllPostsCtrl.getPostById,
  AllPostsCtrl.remove
);

// 특정 데이터 수정
posts.patch(
  '/:id',
  checkLoggedIn,
  AllPostsCtrl.checkOwnPost,
  AllPostsCtrl.getPostById,
  AllPostsCtrl.update
);

export default posts;
