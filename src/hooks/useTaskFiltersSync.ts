import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "@/stores/hooks";
import {
  selectFilters,
  selectPagination,
  setFilter,
  setPage,
} from "@/stores/slices/tasksSlice";
import type { TaskStatus, TaskPriority } from "@/types";

export const useTaskFiltersSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const status =
      (searchParams
        .get("status")
        ?.split(",")
        .filter(Boolean) as TaskStatus[]) || [];
    const priority = (searchParams.get("priority") as TaskPriority) || null;
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const size = parseInt(searchParams.get("size") || "10", 10);

    const initialFilters = {
      searchText: q,
      status,
      priority,
      dateRange: start && end ? ([start, end] as [string, string]) : null,
    };

    dispatch(setFilter(initialFilters));
    dispatch(setPage({ currentPage: page, pageSize: size }));

    isInitialMount.current = false;
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (isInitialMount.current) return;

    const params = new URLSearchParams();

    if (filters.searchText) params.set("q", filters.searchText);
    if (filters.status.length > 0)
      params.set("status", filters.status.join(","));
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.dateRange) {
      params.set("start", filters.dateRange[0]);
      params.set("end", filters.dateRange[1]);
    }

    if (pagination.currentPage > 1)
      params.set("page", pagination.currentPage.toString());
    if (pagination.pageSize !== 10)
      params.set("size", pagination.pageSize.toString());

    setSearchParams(params, { replace: true });
  }, [filters, pagination, setSearchParams]);
};
