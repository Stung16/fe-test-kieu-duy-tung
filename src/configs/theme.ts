import type { ThemeConfig } from "antd";

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#6366f1",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorInfo: "#3b82f6",
    borderRadius: 8,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f5f5f7",
    controlHeight: 36,
  },
  components: {
    Card: {
      paddingLG: 20,
    },
    Table: {
      borderRadius: 8,
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Select: {
      borderRadius: 8,
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#818cf8",
    colorSuccess: "#34d399",
    colorWarning: "#fbbf24",
    colorError: "#f87171",
    colorInfo: "#60a5fa",
    borderRadius: 8,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    colorBgContainer: "#1e1e2e",
    colorBgLayout: "#11111b",
    colorText: "#cdd6f4",
    colorTextSecondary: "#a6adc8",
    colorBorder: "#313244",
    controlHeight: 36,
  },
  components: {
    Card: {
      paddingLG: 20,
      colorBgContainer: "#1e1e2e",
    },
    Table: {
      borderRadius: 8,
      colorBgContainer: "#1e1e2e",
      headerBg: "#181825",
    },
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
      colorBgContainer: "#181825",
    },
    Select: {
      borderRadius: 8,
      colorBgContainer: "#181825",
    },
    Modal: {
      contentBg: "#1e1e2e",
      headerBg: "#1e1e2e",
    },
    Layout: {
      siderBg: "#181825",
      headerBg: "#181825",
      bodyBg: "#11111b",
    },
    Menu: {
      darkItemBg: "#181825",
      darkSubMenuItemBg: "#11111b",
    },
  },
};
