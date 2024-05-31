import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../slices/leadSlice";
import { masterSlice } from "../slices/masterSlice";
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistedLeadReducer from "./persistedLeadReducer";
import persistedVisitReducer from "./persistedVisitReducer";
import { customerSlice } from "../slices/customerSlice";
import { reportLocalStoreSlice } from "../slices/reportCacheSlice";

export const store = configureStore({
  reducer: {
    [leadSlice.reducerPath]: leadSlice.reducer,
    [masterSlice.reducerPath]: masterSlice.reducer,
    [customerSlice.reducerPath]: customerSlice.reducer,
    reportsCached: reportLocalStoreSlice.reducer,
    persistedLeads: persistedLeadReducer,
    persistedVisists: persistedVisitReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }).concat(leadSlice.middleware)
      .concat(masterSlice.middleware)
      .concat(customerSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
