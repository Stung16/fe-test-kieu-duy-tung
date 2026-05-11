import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import type {
  Task,
  TaskPagination,
  TaskStatus,
  TaskPriority,
  TaskStats,
  TaskFilters,
} from "@/types";
import { mockTasks } from "@/assets/mockData";
import { DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from "@/constants";
import type { RootState } from "../store";

dayjs.extend(isBetween);

interface TasksState {
  items: Task[];
  filters: TaskFilters;
  pagination: TaskPagination;
}

const initialState: TasksState = {
  items: mockTasks,
  filters: {
    searchText: "",
    status: [],
    priority: null,
    dateRange: null,
  },
  pagination: {
    currentPage: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  },
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
    setFilter(state, action: PayloadAction<Partial<TaskFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = DEFAULT_CURRENT_PAGE;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
      state.pagination.currentPage = DEFAULT_CURRENT_PAGE;
    },
    setPage(state, action: PayloadAction<Partial<TaskPagination>>) {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
});

const selectTasksState = (state: RootState) => state.tasks;

export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasks) => tasks.items,
);

export const selectFilters = createSelector(
  [selectTasksState],
  (tasks) => tasks.filters,
);

export const selectPagination = createSelector(
  [selectTasksState],
  (tasks) => tasks.pagination,
);

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (items, filters): Task[] => {
    let result = items;
    if (filters.searchText.trim()) {
      const search = filters.searchText.toLowerCase().trim();
      result = result.filter((t) => t.title.toLowerCase().includes(search));
    }
    if (filters.status.length > 0) {
      const statusSet = new Set<TaskStatus>(filters.status);
      result = result.filter((t) => statusSet.has(t.status));
    }
    if (filters.priority) {
      const priority: TaskPriority = filters.priority;
      result = result.filter((t) => t.priority === priority);
    }
    if (filters.dateRange) {
      const [start, end] = filters.dateRange;
      result = result.filter((t) => {
        if (!t.dueDate) return false;
        return dayjs(t.dueDate).isBetween(dayjs(start), dayjs(end), "day", "[]");
      });
    }
    return result;
  },
);

export const selectFilteredTotal = createSelector(
  [selectFilteredTasks],
  (tasks) => tasks.length,
);

export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPagination],
  (filtered, pagination): Task[] => {
    const { currentPage, pageSize } = pagination;
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  },
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
  setFilter,
  resetFilters,
  setPage,
} = tasksSlice.actions;

export default tasksSlice.reducer;
