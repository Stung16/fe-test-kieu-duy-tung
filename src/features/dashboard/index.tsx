import { PRIORITY_MAP, STATUS_MAP } from "@/constants";
import { useSelector } from "@/stores/hooks";
import { selectMode } from "@/stores/slices/commonSlice";
import {
  selectLoading,
  selectRecentTasks,
  selectTaskStats,
} from "@/stores/slices/tasksSlice";
import { formatDate } from "@/utils";
import {
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  Card,
  Empty,
  List,
  Progress,
  Skeleton,
  Statistic,
  Tag,
  Typography,
  theme,
} from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

export default function DashboardPage() {
  const stats = useSelector(selectTaskStats);
  const isDark = useSelector(selectMode);
  const recentTasks = useSelector(selectRecentTasks);
  const loading = useSelector(selectLoading);
  const navigate = useNavigate();

  const { token } = theme.useToken();
  const completionRate =
    stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
  const inProgressRate =
    stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0;
  const todoRate =
    stats.total > 0 ? Math.round((stats.todo / stats.total) * 100) : 0;

  const statCards = [
    {
      title: "Total Task",
      value: stats.total,
      icon: <BarChartOutlined />,
      bg: token.colorPrimary,
    },
    {
      title: "Todo",
      value: stats.todo,
      icon: <ClockCircleOutlined />,
      bg: token.colorTextSecondary,
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <SyncOutlined />,
      bg: token.colorInfo,
    },
    {
      title: "Done",
      value: stats.done,
      icon: <CheckCircleOutlined />,
      bg: token.colorSuccess,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title level={3} style={{ margin: 0 }}>
            <ThunderboltOutlined className="mr-2 text-primary" />
            Dashboard
          </Title>
          <Text type="secondary" className="mt-1 block">
            Overview statistics
          </Text>
        </div>
        {loading && <Skeleton.Button active size="small" />}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card
            key={card.title}
            hoverable
            style={{ borderColor: "transparent" }}
          >
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-lg"
              style={{ background: card.bg }}
            />
            <div className="flex items-center justify-between">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 80, height: 16 }}
                  />
                  <Skeleton.Input
                    active
                    size="large"
                    style={{ width: 60, height: 32 }}
                  />
                </div>
              ) : (
                <Statistic
                  title={
                    <span
                      className="text-sm font-medium"
                      style={{ color: token.colorTextSecondary }}
                    >
                      {card.title}
                    </span>
                  }
                  value={card.value}
                  valueStyle={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: token.colorText,
                  }}
                />
              )}
              {loading ? (
                <Skeleton.Avatar
                  active
                  shape="square"
                  size={48}
                  style={{ borderRadius: 12 }}
                />
              ) : (
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl text-xl"
                  style={{
                    background: `${card.bg}15`,
                    color: card.bg,
                  }}
                >
                  {card.icon}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Progress & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card
          title={
            <span className="font-semibold">
              <BarChartOutlined
                className="mr-2"
                style={{ color: token.colorPrimary }}
              />
              Rate by status
            </span>
          }
          className="lg:col-span-1"
        >
          {loading ? (
            <div className="flex flex-col items-center gap-6">
              <Skeleton.Avatar active size={140} shape="circle" />
              <div className="w-full space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 60, height: 12 }}
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 80, height: 12 }}
                      />
                    </div>
                    <Skeleton.Button active block style={{ height: 8 }} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <Progress
                type="dashboard"
                percent={completionRate}
                strokeColor={token.colorSuccess}
                trailColor={token.colorBorderSecondary}
                size={140}
                format={(percent) => (
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: token.colorSuccess }}
                    >
                      {percent}%
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: token.colorTextSecondary }}
                    >
                      Completed
                    </div>
                  </div>
                )}
              />
              <div className="w-full space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <Text className="text-xs">Todo</Text>
                    <Text className="text-xs" type="secondary">
                      {stats.todo} task ({todoRate}%)
                    </Text>
                  </div>
                  <Progress
                    percent={todoRate}
                    showInfo={false}
                    strokeColor={token.colorTextSecondary}
                    size="small"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <Text className="text-xs">In Progress</Text>
                    <Text className="text-xs" type="secondary">
                      {stats.inProgress} task ({inProgressRate}%)
                    </Text>
                  </div>
                  <Progress
                    percent={inProgressRate}
                    showInfo={false}
                    strokeColor={token.colorInfo}
                    size="small"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <Text className="text-xs">Done</Text>
                    <Text className="text-xs" type="secondary">
                      {stats.done} task ({completionRate}%)
                    </Text>
                  </div>
                  <Progress
                    percent={completionRate}
                    showInfo={false}
                    strokeColor={token.colorSuccess}
                    size="small"
                  />
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card
          title={
            <span className="font-semibold">
              <ClockCircleOutlined
                className="mr-2"
                style={{ color: token.colorWarning }}
              />
              Recent tasks
            </span>
          }
          extra={
            loading ? (
              <Skeleton.Button active size="small" style={{ width: 80 }} />
            ) : (
              <a
                onClick={() => navigate("/tasks")}
                style={{ color: token.colorPrimary }}
                className="cursor-pointer text-sm hover:underline"
              >
                View all →
              </a>
            )
          }
          className="lg:col-span-2"
        >
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <Skeleton.Button active size="small" style={{ width: 60, height: 20 }} />
                      <Skeleton.Button active size="small" style={{ width: 60, height: 20 }} />
                      <Skeleton.Input active size="small" style={{ width: 150, height: 20 }} />
                    </div>
                    <div className="flex gap-4">
                      <Skeleton.Input active size="small" style={{ width: 100, height: 14 }} />
                      <Skeleton.Input active size="small" style={{ width: 100, height: 14 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentTasks.length === 0 ? (
            <Empty description="Chưa có task nào" />
          ) : (
            <List
              dataSource={recentTasks}
              renderItem={(task) => (
                <List.Item
                  className={`hover:bg-gray-200 rounded-lg transition-colors !px-3 ${isDark ? "dark:hover:bg-gray-500" : ""} cursor-pointer`}
                  onClick={() => navigate("/tasks")}
                >
                  <List.Item.Meta
                    title={
                      <div className="flex items-center flex-wrap">
                        <Tag color={STATUS_MAP[task.status].color}>
                          {STATUS_MAP[task.status].label}
                        </Tag>
                        <Tag
                          color={PRIORITY_MAP[task.priority].color}
                          bordered={false}
                          className="text-xs"
                        >
                          {PRIORITY_MAP[task.priority].label}
                        </Tag>
                        <span className="font-medium">{task.title}</span>
                      </div>
                    }
                    description={
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        {task.assignee && (
                          <Text type="secondary" className="text-xs">
                            👤 {task.assignee}
                          </Text>
                        )}
                        {task.dueDate && (
                          <Text type="secondary" className="text-xs">
                            📅 {formatDate(task.dueDate)}
                          </Text>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
