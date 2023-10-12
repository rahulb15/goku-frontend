import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isLoading: false,
  walletName: "",
  walletStatus: "false",
  walletAddress: "",
  userName: "",
  userEmail: "",
};

const walletStatusSlice = createSlice({
  name: "walletStatus",
  initialState,
  reducers: {
    walletConnectSuccess: (state, { payload }) => {
      state.walletStatus = payload.walletStatus;
      state.walletName = payload.walletName;
      state.walletAddress = payload.walletAddress;
    },
    userRegisterSuccess: (state, { payload }) => {
      state.userName = payload.firstName;
      state.userEmail = payload.email;
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

const { reducer, actions } = walletStatusSlice;

export const { walletConnectSuccess, userRegisterSuccess } = actions;

export default reducer;
