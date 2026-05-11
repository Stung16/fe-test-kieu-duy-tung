import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import { store } from "@/stores/store";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider>
      <AntApp>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </AntApp>
    </ConfigProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
