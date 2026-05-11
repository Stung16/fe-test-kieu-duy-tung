import { darkTheme, lightTheme } from "@/configs";
import { useSelector } from "@/stores/hooks";
import { selectMode } from "@/stores/slices/commonSlice";
import { App as AntApp, ConfigProvider, theme as antTheme } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import { publicRoutes } from "./routers/publicRoutes";

export default function App() {
  const mode = useSelector(selectMode);
  const isDarkMode = mode === "dark";
  return (
    <ConfigProvider
      theme={{
        ...(isDarkMode ? darkTheme : lightTheme),
        algorithm: isDarkMode
          ? antTheme.darkAlgorithm
          : antTheme.defaultAlgorithm,
      }}
    >
      <AntApp>
        <div className={`${isDarkMode ? "dark-mode" : ""}`}>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout isDarkMode={isDarkMode} />}>
                {publicRoutes}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </AntApp>
    </ConfigProvider>
  );
}
