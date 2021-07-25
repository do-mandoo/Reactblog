import { finishLoading, startLoading } from '../modules/loading';
import { call, put } from 'redux-saga/effects';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); //로딩 시작
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        // action안에 meta값을 response로 넣어주면 나중에 HTTP 헤더 및 상태 코드를 쉽게 조회할 수 있다.
        meta: response // 페이지네이션
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  };
}
