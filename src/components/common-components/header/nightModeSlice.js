import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isLoading: false,
  nightModeStatus: "false",
  message: "",
};

const nightModeSlice = createSlice({
  name: "nightMode",
  initialState,
  reducers: {
    nightModeSuccess: (state, { payload }) => {
      state.nightModeStatus = payload;
    },
    // addStudentError: (state, { payload }) => {
    // 	state.isLoading = false;
    // 	state.walletStatus = 'error';
    // 	state.message = payload;
    // },
    // addStudentResetMessage: (state) => {
    // 	state.message = '';
    // },
  },
});

const { reducer, actions } = nightModeSlice;

export const { nightModeSuccess } = actions;

export default reducer;
