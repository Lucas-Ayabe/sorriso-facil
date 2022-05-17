import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AppState {
  routes: [];
}

const initialState: AppState = {
  routes: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const selectApp = (state: RootState) => state.app;
export const appReducer = appSlice.reducer;
