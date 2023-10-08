import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../slices/leadSlice";
import { masterSlice } from "../slices/masterSlice";

export const store = configureStore({
  reducer: {
    [leadSlice.reducerPath]: leadSlice.reducer,
    [masterSlice.reducerPath]: masterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(leadSlice.middleware)
      .concat(masterSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
