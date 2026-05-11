import { useCallback, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Radio } from "antd";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import type { Task, TaskStatus, TaskPriority } from "@/types";
import { STATUS_OPTIONS, PRIORITY_OPTIONS, DATE_FORMAT } from "@/constants";

interface TaskFormModalProps {
  open: boolean;
  editingTask: Task | null;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

interface TaskFormValues {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: dayjs.Dayjs;
  tags?: string[];
}

export default function TaskFormModal({
  open,
  editingTask,
  onSubmit,
  onCancel,
}: TaskFormModalProps) {
  const [form] = Form.useForm<TaskFormValues>();

  useEffect(() => {
    if (open) {
      if (editingTask) {
        form.setFieldsValue({
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
          priority: editingTask.priority,
          assignee: editingTask.assignee,
          dueDate: editingTask.dueDate ? dayjs(editingTask.dueDate) : undefined,
          tags: editingTask.tags,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ status: "todo", priority: "medium" });
      }
    }
  }, [open, editingTask, form]);

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const task: Task = {
          id: editingTask?.id ?? uuidv4(),
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          assignee: values.assignee,
          dueDate: values.dueDate
            ? values.dueDate.format("YYYY-MM-DD")
            : undefined,
          createdAt: editingTask?.createdAt ?? new Date().toISOString(),
          tags: values.tags,
        };
        onSubmit(task);
        form.resetFields();
      })
      .catch(() => {});
  }, [form, editingTask, onSubmit]);

  return (
    <Modal
      title={editingTask ? "✏️ Edit Task" : "➕ Add New Task"}
      open={open}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText={editingTask ? "Update" : "Create"}
      cancelText="Cancel"
      destroyOnHidden
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
        requiredMark="optional"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter a title" },
            { min: 3, message: "At least 3 characters" },
          ]}
        >
          <Input placeholder="Enter a title..." maxLength={200} showCount />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            placeholder="Enter a description..."
            rows={3}
            maxLength={500}
            showCount
          />
        </Form.Item>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select
              options={STATUS_OPTIONS.map((s) => ({
                label: s.label,
                value: s.value,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select a priority" }]}
          >
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={PRIORITY_OPTIONS.map((p) => ({
                label: p.label,
                value: p.value,
              }))}
            />
          </Form.Item>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <Form.Item name="assignee" label="Assignee">
            <Input placeholder="Enter a name..." />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[
              {
                validator: (_, value) => {
                  if (value && dayjs(value).isBefore(dayjs().startOf("day"))) {
                    return Promise.reject(
                      new Error("Due date must not be before today"),
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker
              format={DATE_FORMAT}
              className="w-full"
              placeholder="Select a date"
            />
          </Form.Item>
        </div>
        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            placeholder="Enter a tag..."
            tokenSeparators={[","]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
