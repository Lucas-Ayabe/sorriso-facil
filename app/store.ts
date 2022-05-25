import { configureStore } from "@reduxjs/toolkit";
import { appReducer as app } from "./app.slice";
import { userReducer as user } from "@modules/users";
import { clientReducer as client } from "@modules/clients";

export const store = configureStore({
  reducer: {
    app,
    user,
    client,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
