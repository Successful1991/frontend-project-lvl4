import { createSlice } from '@reduxjs/toolkit';

const channelsReducer = createSlice({
  name: 'channels',
  initialState: {
    channels: []
  },
  reducers: {
    channels_update: function(state, action) {
      console.log('reduce', state, action);
      state.channels = action.payload;
    }
  },
});

export default channelsReducer.reducer;

export const { channels_update } = channelsReducer.actions;
