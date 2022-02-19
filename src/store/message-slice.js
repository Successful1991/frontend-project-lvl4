import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { removeChannel, setAll } from './channel-slice.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAll, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(removeChannel, (state, { payload: id }) => {
        const messages = messagesAdapter.getSelectors().selectAll(state);
        const removeIds = messages.filter((m) => m.channelId === id).map((m) => m.id);

        messagesAdapter.removeMany(state, removeIds);
      });
  },

});

export { messagesSlice };

export const { addMessage } = messagesSlice.actions;
