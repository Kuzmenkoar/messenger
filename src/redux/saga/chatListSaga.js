import {all, takeLatest, put, call} from 'redux-saga/effects';

import { chatListActions } from '../slices/chatList';
import firebase from 'firebase';

const getChatListSaga = function* () {
  try {
    const chatListRef = firebase.database().ref('chats')
    const response = yield call([chatListRef, chatListRef.once], 'value')

    const data = Object.keys(response.val())

    yield put(
      chatListActions.getChatListSuccess({
        data,
      }),
    );
  } catch (e) {
    console.log('ERROR', e)
  }
};

export const chatListSaga = function* () {
  yield all([takeLatest(chatListActions.getChatList.type, getChatListSaga)]);
};
