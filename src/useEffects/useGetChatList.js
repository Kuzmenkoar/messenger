import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {chatListActions, chatListSelector} from '../redux/slices/chatList';

export const useGetChatList = () => {
  const dispatch = useDispatch();
  const chatList = useSelector(chatListSelector);

  useEffect(() => {
    dispatch(chatListActions.getChatList());
  }, [dispatch]);

  return chatList;
};
