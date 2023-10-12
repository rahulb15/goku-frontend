import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import nightModeSlice from "./components/common-components/header/nightModeSlice";
import walletStatusSlice from "./components/pages/home/connect-wallet-popup/connectWalletSlice";
import loginSlice from "./components/pages/home/connect-wallet-popup/loginSlice";
import dbcooperSlice from "./components/pages/launchpad-detail/launchpad-banner/dbCooperSlice";
import passDetails from "./components/pages/launchpad-detail/launchpad-banner/passDetailSlice";
import prioritypassSlice from "./components/pages/launchpad-detail/launchpad-banner/prioritypassSlice";
import revealPassSLice from "./components/pages/launchpad-detail/launchpad-banner/revealPassSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  walletStatus: walletStatusSlice,
  nightModeStatus: nightModeSlice,
  loginStatus: loginSlice,
  priorityMintStatus: prioritypassSlice,
  dbcooperMintStatus: dbcooperSlice,
  passDetails: passDetails,
  revealPassStatus: revealPassSLice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
