import { configureStore } from "@reduxjs/toolkit";
import { counterReducer as counter } from "@modules/counter";
import { appReducer as app } from "./app.slice";

export const store = configureStore({
  reducer: {
    app,
    counter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
