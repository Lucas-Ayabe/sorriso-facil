import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface AppState {
  loggedUser: User;
  users: User[];
}

const initialState: AppState = {
  loggedUser: {
    name: "",
    email: "",
    password: "",
    isAdmin: true,
  },
  users: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    userAdded: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const selectApp = (state: RootState) => state.app;
export const select = {
  loggedUser: (state: RootState) => selectApp(state).loggedUser,
  users: (state: RootState) => selectApp(state).users,
};

export const appReducer = appSlice.reducer;
