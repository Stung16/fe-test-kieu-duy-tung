import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import commonReducer from "./slices/commonSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    common: commonReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
