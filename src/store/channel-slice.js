import { createAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter({
  currentChannelId: null,
});

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

export { channelsSlice };

export const {
  addChannel,
  updateChannel,
  removeChannel,
  setCurrentChannelId,
  setAll,
  removeAll,
} = channelsSlice.actions;
