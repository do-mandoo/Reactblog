import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '../../../node_modules/joi/lib/index';
// import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

// ObjectId검증. checkObjectId를 getPostById로 바꾸자.
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const write = async ctx => {
  // Request Body 검증
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required() 가 있으면 필수 항목.
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required() // 문자열로 이루어진 배열
  });
  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user // 포스트 작성 시 사용자 정보 넣기
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* GET /api/posts?username=&tag=&page= */
export const list = async ctx => {
  // query는 문자열이기 때문에 숫자로 변환해줘야한다.
  // 값이 주어지지않았다면 1을 기본으로 사용한다.
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  //특정사용자가 작성포스트조회 또는 태그포스트조회
  const { tag, username } = ctx.query;
  // tag, username값이 유효하면 객체안에 넣고, 아니면 넣지 않음.
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {})
  };
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async ctx => {
  // const { id } = ctx.params; 이 코드를 아래 코드로 간소화.
  ctx.body = ctx.state.post;

  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; //NOT FOUND
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

// DELETE
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content 성공하기는 했지만, 응답할 데이터는 없음
  } catch (e) {
    ctx.throw(500, e);
  }
};

// UPDATE
export const update = async ctx => {
  const { id } = ctx.params;
  // write에서 사용한 schema와 비슷한데, requeired()가 없다.
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string(), // required() 가 있으면 필수 항목.
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()) // 문자열로 이루어진 배열
  });
  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  // MongoDB에서 조회한 데이터의 id값을 문자열과 비교할때는 반드시 .toString()을 해줘야함!!
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};
