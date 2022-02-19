import { createAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter({
  currentChannelId: null,
});

const removeChannelBy = createAction('removeChannel');

/* eslint-disable no-param-reassign */
const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannel: (state, action) => {
      channelsAdapter.addOne(state, action);
      state.currentChannelId = action.payload.id;
    },
    updateChannel: channelsAdapter.updateOne,
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state, action);
      state.currentChannelId = state.entities[state.ids[0]].id;
    },

    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },

    setAll(state, action) {
      channelsAdapter.setAll(state, action.payload.channels);
      state.currentChannelId = action.payload.currentChannelId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannelBy, (state, action) => {
      const deletedChannel = action.payload;
      if (deletedChannel === state.currentChannelId) {
        const [currentChannelId] = state.ids;
        state.currentChannelId = currentChannelId;
      }
    });
  },
});
/* eslint-enable */
export { channelsSlice };

export const {
  addChannel,
  updateChannel,
  removeChannel,
  setCurrentChannelId,
  setAll,
} = channelsSlice.actions;
