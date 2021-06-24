import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {chatMessagesActions, chatMessagesSelector} from '../redux/slices/chatMessages';
import { useParams } from 'react-router';

export const useGetChatMessages = () => {
  const dispatch = useDispatch();
  const { chat } = useParams();
  const { messages,  isLoading, isSending} = useSelector(chatMessagesSelector);

  useEffect(() => {
    dispatch(chatMessagesActions.getChatMessages(chat));
  }, [dispatch, chat]);

  return { messages,  isLoading, isSending, chat};
};
