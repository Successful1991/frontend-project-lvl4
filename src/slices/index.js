import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel: function(state, action) {
      state.channels = state.channels.concat(action.payload);
    },
    removeChannel: function(state, action) {
      const deletedChannel = action.payload;
      state.channels = state.channels.filter(channel => channel.id !== deletedChannel.id);
      if (deletedChannel.id === state.currentChannelId) {
        state.currentChannelId = state.channels[0].id;
      }
    },
    renameChannel: function(state, action) {
      const updateChannel = action.payload;
      state.channels = state.channels.map(channel => channel.id === updateChannel.id ? updateChannel : channel);

      if (updateChannel.id === state.currentChannelId) {
        state.currentChannelId = updateChannel;
      }
    },
    setCurrentChannelId: function(state, action) {
      state.currentChannelId = action.payload;
    },
    clearAll: function(state) {
      state.channels = [];
      state.currentChannelId = null;
    },
  },
});

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: function(state, action) {
      state.messages = state.messages.concat(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(channelsSlice.actions.clearAll, (state) => {
      state.messages = [];
    })
}

});

export { channelsSlice, messagesSlice };
// export default channelsReducer.reducer;

// export const {
//   addChannelAction,
//   removeChannelAction,
//   addMessageAction,
//   renameChannelAction,
//   setCurrentChannelAction,
//   updateState,
// } = channelsReducer.actions;
