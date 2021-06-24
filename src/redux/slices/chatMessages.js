import { createSlice } from '@reduxjs/toolkit';

export const { reducer: chatMessages, actions: chatMessagesActions } =
  createSlice({
    name: 'chatMessages',
    initialState: {
      messages: [],
      isLoading: false,
      isSending: false,
    },
    reducers: {
      getChatMessages: (state) => {
        state.isLoading = true;
      },
      getChatMessagesSuccess: (state, { payload: { data } }) => {
        state.isLoading = false;
        state.messages = data;
      },
      sendChatMessage: (state) => {
        state.isSending = true;
      },
      sendChatMessageSuccess: (state, { payload: { data } }) => {
        state.isSending = false;
        state.messages.push(data);
      },
      sendChatMessageFailed: (state) => {
        state.isSending = false;
      }
    },
  });

export const chatMessagesSelector = (state) => state.messenger.chatMessages;
