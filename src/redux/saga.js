import { all } from 'redux-saga/effects'
import { saga as autorizationSaga } from '../legacyCode/ducks/authorization'
import { saga as peopleSaga } from '../legacyCode/ducks/people'
import { chatListSaga } from './saga/chatListSaga';
import { chatMessagesSaga } from './saga/chatMessagesSaga';

export default function* rootSaga() {
  yield all([autorizationSaga(), peopleSaga(), chatListSaga(), chatMessagesSaga()])
}
