import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    entities: {},
    ids: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel: function(state, action) {
      state.entities[action.payload.id] = action.payload;
      state.ids.push(action.payload.id);
    },
    removeChannel: function(state, action) {
      const deletedChannel = action.payload;
      delete state.entities[deletedChannel.id];
      state.ids = state.ids.filter(id => id !== deletedChannel.id);
      if (deletedChannel.id === state.currentChannelId) {
        state.currentChannelId = state.ids[0].id;
      }
    },
    renameChannel: function(state, action) {
      const updateChannel = action.payload;
      state.entities[updateChannel.id] = updateChannel;

      if (updateChannel.id === state.currentChannelId) {
        state.currentChannelId = updateChannel.id;
      }
    },
    setCurrentChannelId: function(state, action) {
      state.currentChannelId = action.payload;
    },

    clearAll: function(state) {
      state.entities = {};
      state.ids = [];
      state.currentChannelId = null;
    },

    setAll: function(state, action) {
      const entities = action.payload.channels.reduce((acc, el) => {
        acc[el.id] = el;
        return acc;
      }, {});
      state.entities = entities || {};
      state.ids = action.payload.channels.map(channel => channel.id);
      state.currentChannelId = action.payload.currentChannelId;
    }
  },
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    entities: [],
    ids: [],
  },
  reducers: {
    addMessage: function(state, action) {
      state.entities[action.payload.id] = action.payload;
      state.ids.push(action.payload.id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(channelsSlice.actions.clearAll, (state) => {
        state.entities = [];
        state.ids = [];
      })
      .addCase(channelsSlice.actions.setAll, (state, action) => {
        const messages = action.payload.messages;
        state.entities = messages.reduce((acc, el) => {
          acc[el.id] = el;
          return acc;
        }, {});
        state.ids = messages.map(message => message.id);
      })
}

});

export { channelsSlice, messagesSlice };
