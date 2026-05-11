import {
  AppstoreOutlined,
  DashboardOutlined,
  MoonOutlined,
  SunOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Switch, theme } from "antd";

import { useDispatch, useSelector } from "@/stores/hooks";
import {
  ChangeCollapsed,
  ChangeMode,
  selectCollapsed,
} from "@/stores/slices/commonSlice";
import { useCallback, useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { APP_NAME } from "@/constants";
import { fetchTasks } from "@/stores/middlewares/tasksThunks";

const { Header, Sider, Content } = Layout;
const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};
export default function AppLayout({ isDarkMode }: { isDarkMode: boolean }) {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectCollapsed);
  const location = useLocation();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const menuItems = useMemo(
    () => [
      {
        key: "/",
        icon: <DashboardOutlined style={{ fontSize: 16 }} />,
        label: (
          <div className="flex items-center gap-2">
            <span>Dashboard</span>
          </div>
        ),
        title: "Dashboard",
      },
      {
        key: "/tasks",
        icon: <UnorderedListOutlined style={{ fontSize: 16 }} />,
        label: (
          <div className="flex items-center gap-2">
            <span>Tasks</span>
          </div>
        ),
        title: "Tasks",
      },
    ],
    [],
  );
  const handleMenuClick = useCallback(
    (info: { key: string }) => {
      navigate(info.key);
    },
    [navigate],
  );
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const currentTitle = menuItems.find(
      (item) => item.key === location.pathname,
    )?.title;
    document.title = currentTitle ? `${currentTitle} | ${APP_NAME}` : APP_NAME;
  }, [location.pathname, menuItems]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value, type) => {
          if (type === "responsive" && !value && collapsed) return;
          dispatch(ChangeCollapsed(value));
        }}
        breakpoint="lg"
        theme={isDarkMode ? "dark" : "light"}
        width={240}
        style={siderStyle}
      >
        <div
          className="flex items-center whitespace-nowrap overflow-hidden"
          style={{
            height: 64,
            paddingLeft: collapsed ? 28 : 24,
            transition: "all 0.2s",
          }}
        >
          <AppstoreOutlined
            style={{
              fontSize: 24,
              color: token.colorPrimary,
              minWidth: 24,
              transition: "all 0.2s",
            }}
          />
          <span
            style={{
              marginLeft: 12,
              color: token.colorPrimary,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.02em",
              opacity: collapsed ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {APP_NAME}
          </span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          theme={isDarkMode ? "dark" : "light"}
          style={{ borderInlineEnd: "none" }}
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center justify-between px-6 shadow-sm"
          style={{
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            position: "sticky",
            top: 0,
            zIndex: 40,
            height: 56,
            lineHeight: "56px",
          }}
        >
          <div
            className="text-base font-medium"
            style={{ color: token.colorPrimary }}
          >
            {menuItems.find((item) => item.key === location.pathname)?.title}
          </div>
          <div className="flex items-center gap-2">
            {isDarkMode ? (
              <SunOutlined
                style={{
                  color: isDarkMode
                    ? token.colorTextSecondary
                    : token.colorWarning,
                }}
              />
            ) : (
              <MoonOutlined
                style={{
                  color: isDarkMode
                    ? token.colorPrimary
                    : token.colorTextSecondary,
                }}
              />
            )}
            <Switch
              checked={isDarkMode}
              onChange={() =>
                dispatch(ChangeMode(isDarkMode ? "light" : "dark"))
              }
              size="small"
            />
          </div>
        </Header>
        <Content className="p-6 ">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
