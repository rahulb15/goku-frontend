import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  dbcooperStatus: {},
  dbCoopererror: {},
};

const dbcooperSlice = createSlice({
  name: "dbcooper",
  initialState,
  reducers: {
    dbcooperSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.dbcooperStatus = payload;
      state.dbCoopererror = "";
    },
    dbcooperFail: (state, { payload }) => {
      state.isLoading = false;
      state.dbCoopererror = payload;
    },
  },
});

const { reducer, actions } = dbcooperSlice;
export const { dbcooperSuccess, dbcooperFail } = actions;
export default reducer;
