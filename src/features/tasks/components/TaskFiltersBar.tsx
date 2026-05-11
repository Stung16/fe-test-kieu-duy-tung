import { useCallback, useEffect, useMemo, useState } from "react";
import { Input, Select, DatePicker, Button, Card, theme } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { TaskStatus, TaskPriority } from "@/types";
import { useDispatch, useSelector } from "@/stores/hooks";
import {
  selectFilters,
  setFilter,
  resetFilters,
} from "@/stores/slices/tasksSlice";
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  SEARCH_DEBOUNCE_MS,
} from "@/constants";
import { useDebounce } from "@/hooks/index";

const { RangePicker } = DatePicker;

export default function TaskFiltersBar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const { token } = theme.useToken();

  const [localSearch, setLocalSearch] = useState(filters.searchText);
  const debouncedSearch = useDebounce(localSearch, SEARCH_DEBOUNCE_MS);

  const handleStatusChange = useCallback(
    (value: TaskStatus[]) => {
      dispatch(setFilter({ status: value }));
    },
    [dispatch],
  );

  const handlePriorityChange = useCallback(
    (value: TaskPriority | null) => {
      dispatch(setFilter({ priority: value ?? null }));
    },
    [dispatch],
  );

  const handleDateRangeChange = useCallback(
    (_: unknown, dateStrings: [string, string]) => {
      if (dateStrings[0] && dateStrings[1]) {
        dispatch(setFilter({ dateRange: dateStrings }));
      } else {
        dispatch(setFilter({ dateRange: null }));
      }
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    setLocalSearch("");
    dispatch(resetFilters());
  }, [dispatch]);

  const hasActiveFilters =
    filters.searchText.trim() !== "" ||
    filters.status.length > 0 ||
    filters.priority !== null ||
    filters.dateRange !== null;

  const statusFilterOptions = useMemo(
    () => STATUS_OPTIONS.map((s) => ({ label: s.label, value: s.value })),
    [],
  );

  const priorityFilterOptions = useMemo(
    () => PRIORITY_OPTIONS.map((p) => ({ label: p.label, value: p.value })),
    [],
  );
  useEffect(() => {
    dispatch(setFilter({ searchText: debouncedSearch.trim() }));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalSearch(filters.searchText);
  }, [filters.searchText]);

  return (
    <Card
      size="small"
      className="animate-fade-in"
      style={{ border: `1px solid ${token.colorBorderSecondary}` }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <FilterOutlined
          style={{ color: token.colorTextSecondary, fontSize: 16 }}
        />

        <Input
          placeholder="Search tasks..."
          prefix={
            <SearchOutlined style={{ color: token.colorTextSecondary }} />
          }
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          allowClear
          style={{ width: 220 }}
        />

        <Select
          mode="multiple"
          placeholder="Status"
          value={filters.status}
          onChange={handleStatusChange}
          options={statusFilterOptions}
          allowClear
          style={{ minWidth: 180 }}
          maxTagCount="responsive"
        />

        <Select
          placeholder="Priority"
          value={filters.priority}
          onChange={handlePriorityChange}
          options={priorityFilterOptions}
          allowClear
          style={{ width: 140 }}
        />

        <RangePicker
          value={
            filters.dateRange
              ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
              : null
          }
          onChange={handleDateRangeChange}
          format="DD/MM/YYYY"
          placeholder={["From date", "To date"]}
        />

        {hasActiveFilters && (
          <Button
            type="text"
            icon={<ClearOutlined />}
            onClick={handleReset}
            danger
            size="small"
          >
            Reset filters
          </Button>
        )}
      </div>
    </Card>
  );
}
