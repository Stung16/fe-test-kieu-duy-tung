import type { TaskStatus, TaskPriority } from "@/types";

export const APP_NAME = "TaskBoard";
export const APP_DESCRIPTION = "Ứng dụng quản lý công việc nội bộ";

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_CURRENT_PAGE = 1;

// Debounce
export const SEARCH_DEBOUNCE_MS = 300;

// Status config
export const STATUS_OPTIONS: {
  label: string;
  value: TaskStatus;
  color: string;
}[] = [
  { label: "Todo", value: "todo", color: "default" },
  { label: "In Progress", value: "in_progress", color: "processing" },
  { label: "Done", value: "done", color: "success" },
];

// Priority config
export const PRIORITY_OPTIONS: {
  label: string;
  value: TaskPriority;
  color: string;
}[] = [
  { label: "Low", value: "low", color: "success" },
  { label: "Medium", value: "medium", color: "warning" },
  { label: "High", value: "high", color: "error" },
];

// Status map for quick lookup
export const STATUS_MAP = Object.fromEntries(
  STATUS_OPTIONS.map((s) => [s.value, s]),
) as Record<TaskStatus, (typeof STATUS_OPTIONS)[number]>;

export const PRIORITY_MAP = Object.fromEntries(
  PRIORITY_OPTIONS.map((p) => [p.value, p]),
) as Record<TaskPriority, (typeof PRIORITY_OPTIONS)[number]>;

// Date format
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_FORMAT_DISPLAY = "DD MMM, YYYY";
