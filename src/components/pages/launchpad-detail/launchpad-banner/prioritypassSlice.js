import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  mintStatus: {},
  error: {},
};

const mintSlice = createSlice({
  name: "mint",
  initialState,
  reducers: {
    mintSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.mintStatus = payload;
      state.error = "";
    },
    mintFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = mintSlice;

export const { mintSuccess, mintFail } = actions;
export default reducer;
