import { all } from 'redux-saga/effects';
import formActionSaga from 'redux-form-saga';

import saga from './saga';

export default function* rootSaga() {
  yield all([
    formActionSaga(),
    saga(),
  ]);
}
