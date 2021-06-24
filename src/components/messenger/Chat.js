import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useGetChatMessages } from '../../useEffects/useGetChatMessages';
import { chatMessagesActions } from '../../redux/slices/chatMessages';
import { useDispatch } from 'react-redux';

export const Chat = () => {
  const { messages, chat, isSending, isLoading } = useGetChatMessages();
  const [value, onChange] = useState('');
  const dispatch = useDispatch();

  const handleSend = () => {
    if (!value) {
      return;
    }
    dispatch(chatMessagesActions.sendChatMessage({ value, chat }));
    onChange('');
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  if (!chat || isLoading) {
    return null;
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90vh',
      }}
    >
      <Box>
        {messages.map((el) => (
          <Box
            p={2}
            m={1}
            style={{
              color: '#fff',
              background: '#1791ff',
              borderRadius: 10,
            }}
            key={el.value}
          >
            {el.value}
          </Box>
        ))}
      </Box>
      <Box>
        <TextField
          value={value}
          onChange={handleChange}
          label={'Message'}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isSending}
          onClick={handleSend}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
