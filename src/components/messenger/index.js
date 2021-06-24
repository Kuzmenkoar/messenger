import React from 'react'
import { Grid  } from '@material-ui/core'
import {ChatList} from './ChatList';
import {Chat} from './Chat';

export const Messenger = () => {
    return     <Grid container spacing={3}>
      <Grid item lg={4} md={4} xl={4} xs={12}>
        <ChatList />
      </Grid>
      <Grid item lg={4} md={8} xl={3} xs={12}>
        <Chat />
      </Grid>
    </Grid>
}
