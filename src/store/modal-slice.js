import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    props: {},
  },
  reducers: {
    showModal: (state, action) => action.payload,
    hideModal: () => ({ type: null, props: {} }),
  },
});

export { modalSlice };

export const { showModal, hideModal } = modalSlice.actions;
