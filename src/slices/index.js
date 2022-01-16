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

    setCurrentChannelId(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload;
    },

    setAll(state, action) {
      channelsAdapter.setAll(state, action.payload.channels);
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload.currentChannelId;
    },
    removeAll: channelsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannelBy, (state, action) => {
      const deletedChannel = action.payload;
      if (deletedChannel === state.currentChannelId) {
        const [currentChannelId] = state.ids;
        // eslint-disable-next-line no-param-reassign,
        state.currentChannelId = currentChannelId;
      }
    });
  },
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsSlice.actions.removeAll, (state) => {
        messagesAdapter.removeAll(state);
      })
      .addCase(channelsSlice.actions.setAll, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(channelsSlice.actions.removeChannel, (state, { payload: id }) => {
        const messages = messagesAdapter.getSelectors().selectAll(state);
        const removeIds = messages.filter((m) => m.channelId === id).map((m) => m.id);

        messagesAdapter.removeMany(state, removeIds);
      });
  },

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
