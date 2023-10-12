import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passDetails: {},
};

const passDetailSlice = createSlice({
  name: "pasDetailsSlice",
  initialState,
  reducers: {
    passDetailSuccess: (state, { payload }) => {
      state.passDetails = payload;
    },
  },
});

const { reducer, actions } = passDetailSlice;

export const { passDetailSuccess } = actions;
export default reducer;
