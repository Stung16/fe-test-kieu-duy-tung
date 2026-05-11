import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/test-utils";
import TaskListPage from "./index";

vi.mock("@/hooks/index", () => ({
  useTaskFiltersSync: vi.fn(),
  useDebounce: vi.fn((val) => val),
}));

describe("TaskListPage", () => {
  it("should render the page title", () => {
    render(<TaskListPage />);
    expect(screen.getByText(/List Tasks/i)).toBeInTheDocument();
  });

  it("should render the add button", () => {
    render(<TaskListPage />);
    expect(screen.getByRole("button", { name: /Add New Task/i })).toBeInTheDocument();
  });

  it("should render the search input", () => {
    render(<TaskListPage />);
    expect(screen.getByPlaceholderText(/Search tasks.../i)).toBeInTheDocument();
  });
});
