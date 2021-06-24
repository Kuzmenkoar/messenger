import React from 'react';
import { Button, Box } from '@material-ui/core';
import { useGetChatList } from '../../useEffects/useGetChatList';
import history from '../../history';

export const ChatList = () => {
  const { isLoading, list } = useGetChatList();

  if (isLoading) {
    return null;
  }

  const onClick = (el) => () => {
    history.push(`/messenger/${el}`)
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      {list.map((el) => (
        <Box p={1} key={el}>
          <Button variant="contained" color="primary" onClick={onClick(el)}>
            {el}
          </Button>
        </Box>
      ))}
    </Box>
  );
};
