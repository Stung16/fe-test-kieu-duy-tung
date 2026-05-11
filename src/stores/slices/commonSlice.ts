import {} from "@/constants";
import type { RootState } from "../store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  mode: "light" | "dark";
  collapsed: boolean;
} = {
  mode: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  collapsed: localStorage.getItem("collapsed") === "true" ? true : false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    ChangeMode(state, action: PayloadAction<"light" | "dark">) {
      localStorage.setItem("theme", action.payload);
      state.mode = action.payload;
    },
    ChangeCollapsed(state, action: PayloadAction<boolean>) {
      localStorage.setItem("collapsed", action.payload.toString());
      state.collapsed = action.payload;
    },
  },
});

export const selectMode = (state: RootState) => state.common.mode;
export const selectCollapsed = (state: RootState) => state.common.collapsed;

export const { ChangeMode, ChangeCollapsed } = commonSlice.actions;

export default commonSlice.reducer;
