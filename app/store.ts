import { configureStore } from "@reduxjs/toolkit";
import { counterReducer as counter } from "@modules/counter";

export const store = configureStore({
  reducer: {
    counter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
