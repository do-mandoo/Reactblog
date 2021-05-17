import Router from 'koa-router';
import * as AllPostsCtrl from './posts.ctrl';

const posts = new Router();

// 데이터 조회
posts.get('/', AllPostsCtrl.list);

// 데이터 생성
posts.post('/', AllPostsCtrl.write);

// 특정 데이터 조회. 이거 중요한것같기도
posts.get('/:id', AllPostsCtrl.read);

// 특정 데이터 삭제
posts.delete('/:id', AllPostsCtrl.remove);

// 특정 데이터 수정
posts.patch('/:id', AllPostsCtrl.update);

export default posts;
