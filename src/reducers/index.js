import { createSlice } from '@reduxjs/toolkit';

const channelsReducer = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    currentChannel: null,
  },
  reducers: {
    updateChannels: function(state, action) {
      state.channels = action.payload;
    },
    updateMessage: function(state, action) {
      state.messages = action.payload;
    },
    updateCurrentChannel: function(state, action) {
      state.currentChannel = action.payload;
    }
  },
});

export default channelsReducer.reducer;

export const { updateChannels, updateMessage, updateCurrentChannel } = channelsReducer.actions;
