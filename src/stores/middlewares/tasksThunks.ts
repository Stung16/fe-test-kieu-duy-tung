import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Task, TaskStatus } from "@/types";
import { mockTasks } from "@/assets/mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  await delay(800);
  return mockTasks;
});

export const addTaskAsync = createAsyncThunk(
  "tasks/addTaskAsync",
  async (task: Task) => {
    await delay(500);
    return task;
  },
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTaskAsync",
  async (task: Task) => {
    await delay(500);
    return task;
  },
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTaskAsync",
  async (id: string) => {
    await delay(500);
    return id;
  },
);

export const deleteManyTasksAsync = createAsyncThunk(
  "tasks/deleteManyTasksAsync",
  async (ids: string[]) => {
    await delay(500);
    return ids;
  },
);

export const updateTaskStatusAsync = createAsyncThunk(
  "tasks/updateTaskStatusAsync",
  async (payload: { id: string; status: TaskStatus }) => {
    await delay(300);
    return payload;
  },
);
