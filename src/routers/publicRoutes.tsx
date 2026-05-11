import DashboardPage from "@/features/dashboard";
import TaskListPage from "@/features/tasks";
import { Route } from "react-router-dom";

export const publicRoutes = (
  <>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/tasks" element={<TaskListPage />} />
  </>
);
