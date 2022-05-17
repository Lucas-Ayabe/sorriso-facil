import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface UserState {
  loggedUser: User;
  users: User[];
}

const initialState: UserState = {
  loggedUser: {
    id: 1,
    email: "foo@bar.com",
    name: "Foo Bar",
  },
  users: [],
};

export const userSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    userAdded: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    usersCleared: (state) => {
      state.users = [];
    },
  },
});

export const { userAdded, usersCleared } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const select = {
  loggedUser: (state: RootState) => selectUser(state).loggedUser,
  users: (state: RootState) => selectUser(state).users,
};

export const userReducer = userSlice.reducer;
