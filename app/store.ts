import { configureStore } from "@reduxjs/toolkit";
import { appReducer as app } from "./app.slice";
import { userReducer as user } from "@modules/users";

export const store = configureStore({
  reducer: {
    app,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
