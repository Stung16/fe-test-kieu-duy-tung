import { describe, it, expect } from "vitest";
import commonReducer, { ChangeMode, ChangeCollapsed } from "./commonSlice";

describe("commonSlice reducer", () => {
  const initialState = {
    mode: "light" as const,
    collapsed: false,
  };

  it("should handle changing mode to dark", () => {
    const action = ChangeMode("dark");
    const state = commonReducer(initialState, action);
    expect(state.mode).toBe("dark");
  });

  it("should handle changing mode to light", () => {
    const action = ChangeMode("light");
    const state = commonReducer({ ...initialState, mode: "dark" }, action);
    expect(state.mode).toBe("light");
  });

  it("should handle changing collapsed state", () => {
    const action = ChangeCollapsed(true);
    const state = commonReducer(initialState, action);
    expect(state.collapsed).toBe(true);
  });
});
