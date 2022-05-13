import { configureStore } from "@reduxjs/toolkit";
import { appReducer as app } from "./app.slice";

export const store = configureStore({
  reducer: {
    app,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
