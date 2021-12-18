import { createSlice, createEntityAdapter, createAction } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter({
  currentChannelId: null,
});
const messagesAdapter = createEntityAdapter();

const removeChannelBy = createAction('removeChannel');

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,

    setCurrentChannelId: function(state, action) {
      state.currentChannelId = action.payload;
    },

    setAll: function(state, action) {
      channelsAdapter.setAll(state, action.payload.channels);
      state.currentChannelId = action.payload.currentChannelId;
    },
    removeAll: channelsAdapter.removeAll,
  },
  extraReducers: builder => {
    builder.addCase(removeChannelBy, (state, action) => {
      const deletedChannel = action.payload;
      if (deletedChannel === state.currentChannelId) {
        state.currentChannelId = state.ids[0];
      }
    })
  }
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: builder => {
    builder
      .addCase(channelsSlice.actions.removeAll, (state) => {
        messagesAdapter.removeAll(state);
      })
      .addCase(channelsSlice.actions.setAll, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(channelsSlice.actions.removeChannel, (state, { payload: id }) => {
        const messages = messagesAdapter.getSelectors().selectAll(state);
        const removeIds = messages.filter(m => m.channelId === id).map(m => m.id);

        messagesAdapter.removeMany(state, removeIds);
      })
}

});

export { channelsSlice, messagesSlice };
export const {
  addChannel,
  updateChannel,
  removeChannel,
  setCurrentChannelId,
  setAll,
  removeAll,
} = channelsSlice.actions;

export const { addMessage } = messagesSlice.actions;
