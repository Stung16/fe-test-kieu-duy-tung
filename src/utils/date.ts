import dayjs from "dayjs";
import { DATE_FORMAT_DISPLAY } from "@/constants";

export const formatDate = (date: string | undefined): string => {
  if (!date) return "—";
  return dayjs(date).format(DATE_FORMAT_DISPLAY);
};

export const isOverdue = (dueDate: string | undefined): boolean => {
  if (!dueDate) return false;
  return dayjs(dueDate).isBefore(dayjs(), "day");
};

export const sortByDate = (a: string, b: string): number => {
  return dayjs(a).unix() - dayjs(b).unix();
};
