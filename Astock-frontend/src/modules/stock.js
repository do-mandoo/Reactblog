import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import * as api from '../lib/stockAPI';

const GET_DATA = 'stock/GET_DATA';
const GET_DATA_SUCCESS = 'stock/GET_DATA_SUCCESS';

//saga
export const getData = createAction(GET_DATA);

const getDataSaga = createRequestSaga(GET_DATA, api.getData);

export function* stockSaga() {
  yield takeLatest(GET_DATA, getDataSaga);
}

// 초기상태 선언.
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리한다.
const initialState = {
  stockData: null
};
const stock = handleActions(
  {
    [GET_DATA_SUCCESS]: (state, action) => ({
      ...state,
      stockData: action.payload
    })
  },
  initialState
);

export default stock;
