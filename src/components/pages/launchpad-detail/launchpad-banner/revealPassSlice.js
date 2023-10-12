import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  revealPP: false,
  revealDb: false,
};

const revealPassSLice = createSlice({
  name: "pasDetailsSlice",
  initialState,
  reducers: {
    revealPriorityPassSuccess: (state, { payload }) => {
      state.revealPP = payload;
    },
    revealDbPassSuccess: (state, { payload }) => {
      state.revealDb = payload;
    },
  },
});

const { reducer, actions } = revealPassSLice;

export const { revealPriorityPassSuccess, revealDbPassSuccess } = actions;
export default reducer;
