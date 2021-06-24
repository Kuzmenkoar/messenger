import { createSlice } from '@reduxjs/toolkit';

export const { reducer: chatList, actions: chatListActions } = createSlice({
  name: 'chatList',
  initialState: {
    list: [],
    isLoading: false,
  },
  reducers: {
    getChatList: (state) => {
      state.isLoading = true;
    },
    getChatListSuccess: (state, { payload: { data } }) => {
      state.isLoading = false;
      state.list = data;
    },
  },
});

export const chatListSelector = (state) => state.messenger.chatList;
