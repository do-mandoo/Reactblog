import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';
// import createRequestSaga from '../lib/createRequestSaga';
// import { finishLoading, startLoading } from './loading';

// import createRequestThunk from '../lib/createRequestThunk';

// 액션타입을 선언
// 한 요청당 세 개를 만들어야 한다.
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
// const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
// const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

//saga
export const getPost = createAction(GET_POST);
export const getUsers = createAction(GET_USERS);

// function* getPostSaga(action) {
//   yield put(startLoading(GET_POST)); // 로딩 시작
//   // 파라미터로 action을 받아오면, 액션의 정보를 조회할 수 있다.
//   try {
//     // call을 사용하면 Promise를 반환하고, 함수를 호출하고, 기다릴 수 있다.
//     // 첫번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
//     const post = yield call(api.getPost, action.payload); // api.getPost(action.payload)를 의미
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data
//     });
//     console.log(1);
//   } catch (e) {
//     // try/catch문을 사용하여 에러도 잡을 수 있다.
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true
//     });
//     console.log(2);
//   }
//   yield put(finishLoading(GET_POST)); // 로딩 완료
// }

// function* getUsersSaga() {
//   yield put(startLoading(GET_USERS)); // 로딩 시작
//   try {
//     // call을 사용하면 Promise를 반환하고, 함수를 호출하고, 기다릴 수 있다.
//     // 첫번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
//     const users = yield call(api.getUsers); // api.getPost(action.payload)를 의미
//     yield put({
//       type: GET_USERS_SUCCESS,
//       payload: users.data
//     });
//     console.log(5);
//   } catch (e) {
//     // try/catch문을 사용하여 에러도 잡을 수 있다.
//     yield put({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true
//     });
//     console.log(4);
//   }
//   yield put(finishLoading(GET_USERS)); // 로딩 완료
// }

const getPostSage = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSage);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// // thunk 함수를 생성.
// // thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치한다.
// export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// 초기 상태를 선언.
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리한다.
const initialState = {
  // loading: {
  //   GET_POST: false,
  //   GET_USERS: false
  // },
  post: null,
  users: null
};

const sample = handleActions(
  {
    // [GET_POST]: state => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: true //요청 시작
    //   }
    // }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      // loading: {
      //   ...state.loading,
      //   GET_POST_SUCCESS: false //요청 완료
      // },
      post: action.payload
    }),
    // [GET_POST_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: false // 요청 완료
    //   }
    // }),
    // [GET_USERS]: state => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: true //요청 시작
    //   }
    // }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      // loading: {
      //   ...state.loading,
      //   GET_USERS_SUCCESS: false //요청 완료
      // },
      users: action.payload
    })
    // [GET_USERS_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: false // 요청 완료
    //   }
    // })
  },
  initialState
);

export default sample;
