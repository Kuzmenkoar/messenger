import { all, takeLatest, put, call } from 'redux-saga/effects';

import { chatMessagesActions } from '../slices/chatMessages';
import firebase from 'firebase';

const getChatMessagesSaga = function* ({payload}) {
  try {
    const messagesRef = firebase.database().ref('messages');
    const response = yield call([messagesRef, messagesRef.once], 'value');

    const data = Object.values(response.val()).filter(el => el.chat === payload);

    yield put(
      chatMessagesActions.getChatMessagesSuccess({
        data: data,
      }),
    );
  } catch (e) {}
};

const sendChatMessagesSaga = function* ({ payload: { value, chat } }) {
  try {
    const messagesRef = firebase.database().ref('messages');
    yield call([messagesRef, messagesRef.push], { value, chat });

    yield put(
      chatMessagesActions.sendChatMessageSuccess({
        data: { value, chat },
      }),
    );
  } catch (e) {
    yield put(chatMessagesActions.sendChatMessageFailed());
  }
};

export const chatMessagesSaga = function* () {
  yield all([
    takeLatest(chatMessagesActions.getChatMessages.type, getChatMessagesSaga),
  ]);
  yield all([
    takeLatest(chatMessagesActions.sendChatMessage.type, sendChatMessagesSaga),
  ]);
};
