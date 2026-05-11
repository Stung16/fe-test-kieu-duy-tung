import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import App from "./App";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
