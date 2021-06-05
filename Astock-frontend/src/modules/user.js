// 사용자 상태를 담는 리덕스 모듈

import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TMEP_SET_USER'; // 새로고침 이후 임시 로그인 처리

// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK'
);

// 로그아웃. 리듀서에서 스토어의 user값을 null로 설정
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

// 사가 생성
const checkSaga = createRequestSaga(CHECK, authAPI.check);

// 로그인 정보 만료되었을때 사용자 정보 초기화하는 작업.
function checkFailureSaga() {
  try {
    localStorage.removeItem('user'); // localStorage에서 user를 제거
  } catch (e) {
    console.log('localStorage is not working');
  }
}

// 로그아웃은 성공/실패가 중요하지 않아서 success, failure 액션을 따로 만들지 않는다.
function* logoutSaga() {
  try {
    yield call(authAPI.logout); // logout API호출
    localStorage.removeItem('user'); // localStorage에서 user를 제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null
    })
  },
  initialState
);
