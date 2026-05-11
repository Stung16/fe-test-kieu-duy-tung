import { mockTasks } from "@/assets/mockData";
import type { Task, TaskStats, TaskStatus } from "@/types";
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";
import type { RootState } from "../store";

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: mockTasks,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.items.unshift(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    deleteManyTasks(state, action: PayloadAction<string[]>) {
      const idsToDelete = new Set(action.payload);
      state.items = state.items.filter((t) => !idsToDelete.has(t.id));
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>,
    ) {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

// ─── Selectors ───────────────────────────────────────────────────────────────

const selectTasksState = (state: RootState) => state.tasks;

export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasks) => tasks.items,
);

export const selectTaskStats = createSelector(
  [selectAllTasks],
  (items): TaskStats => ({
    total: items.length,
    todo: items.filter((t) => t.status === "todo").length,
    inProgress: items.filter((t) => t.status === "in_progress").length,
    done: items.filter((t) => t.status === "done").length,
  }),
);

export const selectRecentTasks = createSelector(
  [selectAllTasks],
  (items): Task[] =>
    [...items]
      .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
      .slice(0, 5),
);

export const {
  addTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
  updateTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
