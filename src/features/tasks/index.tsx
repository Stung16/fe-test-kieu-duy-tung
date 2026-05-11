import { PRIORITY_MAP, STATUS_MAP, STATUS_OPTIONS } from "@/constants";
import { useDispatch, useSelector } from "@/stores/hooks";
import {
  addTask,
  deleteManyTasks,
  deleteTask,
  selectFilteredTotal,
  selectPaginatedTasks,
  selectPagination,
  setPage,
  updateTask,
  updateTaskStatus,
} from "@/stores/slices/tasksSlice";
import type { Task, TaskStatus } from "@/types";
import { formatDate } from "@/utils";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import {
  App,
  Button,
  Empty,
  Select,
  Space,
  Table,
  Tag,
  theme,
  Tooltip,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import TaskFiltersBar from "./components/TaskFiltersBar";
import TaskFormModal from "./components/TaskFormModal";

const { Title, Text } = Typography;

export default function TaskListPage() {
  const dispatch = useDispatch();
  const paginatedTasks = useSelector(selectPaginatedTasks);
  const filteredTotal = useSelector(selectFilteredTotal);
  const pagination = useSelector(selectPagination);
  const { token } = theme.useToken();
  const { message, modal } = App.useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleAdd = useCallback(() => {
    setEditingTask(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    (task: Task) => {
      if (editingTask) {
        dispatch(updateTask(task));
        message.success("Update task successfully");
      } else {
        dispatch(addTask(task));
        message.success("Add task successfully");
      }
      setModalOpen(false);
      setEditingTask(null);
    },
    [dispatch, editingTask, message],
  );

  const handleDelete = useCallback(
    (id: string) => {
      modal.confirm({
        title: "Confirm delete task",
        icon: <ExclamationCircleFilled />,
        content: "Are you sure you want to delete this task?",
        okText: "Delete",
        okType: "danger",
        cancelText: "Cancel",
        onOk: () => {
          dispatch(deleteTask(id));
          setSelectedRowKeys((prev) => prev.filter((k) => k !== id));
          message.success("Delete task successfully");
        },
      });
    },
    [dispatch, modal, message],
  );

  const handleDeleteMany = useCallback(() => {
    modal.confirm({
      title: "Confirm delete tasks",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete ${selectedRowKeys.length} tasks?`,
      okText: "Delete all",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(deleteManyTasks(selectedRowKeys as string[]));
        setSelectedRowKeys([]);
        message.success(`Deleted ${selectedRowKeys.length} tasks successfully`);
      },
    });
  }, [dispatch, selectedRowKeys, modal, message]);

  const handleStatusChange = useCallback(
    (id: string, status: TaskStatus) => {
      dispatch(updateTaskStatus({ id, status }));
      message.success("Update task status successfully");
    },
    [dispatch, message],
  );

  const statusOptions = useMemo(
    () => STATUS_OPTIONS.map((s) => ({ label: s.label, value: s.value })),
    [],
  );

  const columns: ColumnsType<Task> = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (title: string, record: Task) => (
          <div>
            <Text strong className="block">
              {title}
            </Text>
            {record.tags && record.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {record.tags.map((tag) => (
                  <Tag key={tag} bordered={false} className="text-xs">
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        ),
        width: "25%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 160,
        render: (status: TaskStatus, record: Task) => (
          <Select
            value={status}
            onChange={(val: TaskStatus) => handleStatusChange(record.id, val)}
            options={statusOptions}
            size="small"
            variant="borderless"
            popupMatchSelectWidth={false}
            labelRender={({ value }) => {
              const current = STATUS_MAP[value as TaskStatus];
              return <Tag color={current?.color}>{current?.label}</Tag>;
            }}
          />
        ),
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        width: 120,
        sorter: (a, b) => {
          const order: Record<string, number> = { high: 3, medium: 2, low: 1 };
          return (order[a.priority] ?? 0) - (order[b.priority] ?? 0);
        },
        render: (priority: string) => {
          const current = PRIORITY_MAP[priority as keyof typeof PRIORITY_MAP];
          return <Tag color={current?.color}>{current?.label}</Tag>;
        },
      },
      {
        title: "Assignee",
        dataIndex: "assignee",
        key: "assignee",
        width: 150,
        render: (text: string | undefined) =>
          text || <Text type="secondary">—</Text>,
      },
      {
        title: "Due date",
        dataIndex: "dueDate",
        key: "dueDate",
        width: 130,
        sorter: (a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix();
        },
        render: (date: string | undefined) => {
          if (!date) return <Text type="secondary">—</Text>;
          const isLate = dayjs(date).isBefore(dayjs(), "day");
          return (
            <Text type={isLate ? "danger" : undefined}>
              {formatDate(date)}
              {isLate && " ⚠️"}
            </Text>
          );
        },
      },
      {
        title: "Actions",
        key: "actions",
        width: 100,
        render: (_: unknown, record: Task) => (
          <Space size="small">
            <Tooltip title="Edit">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
            <Tooltip title="Xoá">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [handleStatusChange, handleEdit, handleDelete, statusOptions],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <Title level={3} style={{ margin: 0 }}>
            📋 List Tasks
          </Title>
          <Text type="secondary">Managing and tracking work</Text>
        </div>
        <Space>
          {selectedRowKeys.length > 0 && (
            <Button danger icon={<DeleteOutlined />} onClick={handleDeleteMany}>
              Delete {selectedRowKeys.length} task
            </Button>
          )}
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add New Task
          </Button>
        </Space>
      </div>

      <TaskFiltersBar />

      <Table<Task>
        rowKey="id"
        columns={columns}
        dataSource={paginatedTasks}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: filteredTotal,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} / ${total} task`,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (page, size) =>
            dispatch(setPage({ currentPage: page, pageSize: size })),
        }}
        scroll={{ x: 800 }}
        className="rounded-xl overflow-hidden"
        style={{
          border: `1px solid ${token.colorBorderSecondary}`,
          borderRadius: 12,
        }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No tasks found"
            />
          ),
        }}
      />

      <TaskFormModal
        open={modalOpen}
        editingTask={editingTask}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
}
