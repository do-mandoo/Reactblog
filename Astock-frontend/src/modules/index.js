// 루트 리듀서.
import { combineReducers } from 'redux';
// import auth from './auth';
// import post, { postSaga } from './post';
// import post from './post';
import { all } from 'redux-saga/effects';
import sample, { sampleSaga } from './sample';
import loading from './loading';

const rootReducer = combineReducers({
  // auth,
  // post
  sample,
  loading
});

export function* rootSaga() {
  yield all([sampleSaga()]);
}

export default rootReducer;
