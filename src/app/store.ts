import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../slices/leadSlice";

export const store = configureStore({
  reducer: {
    [leadSlice.reducerPath]: leadSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(leadSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
