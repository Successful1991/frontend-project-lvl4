import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    isShowing: false,
    props: {},
  },
  reducers: {
    showModal: (state, action) => ({ ...action.payload, isShowing: true }),
    hideModal: () => ({ type: null, props: {}, isShowing: false }),
  },
});

export { modalSlice };

export const { showModal, hideModal } = modalSlice.actions;
