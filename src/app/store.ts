import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../slices/leadSlice";
import { masterSlice } from "../slices/masterSlice";
import { leadLocalStoreSlice } from "../slices/leadCacheSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistLeadConfig = {
  key: 'leads',
  version: 1,
  storage: AsyncStorage,
  // blacklist: ['isSubmitting', 'isFetchingForm'],
};

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';

const persistedReducer = persistReducer(
  persistLeadConfig, 
  leadLocalStoreSlice.reducer)

export const store = configureStore({
  reducer: {
    [leadSlice.reducerPath]: leadSlice.reducer,
    [masterSlice.reducerPath]: masterSlice.reducer,
    persistedLeads: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }).concat(leadSlice.middleware)
      .concat(masterSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
