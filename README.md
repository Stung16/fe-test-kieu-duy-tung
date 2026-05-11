# TaskBoard - Ứng dụng Quản lý Công việc

Ứng dụng quản lý công việc nội bộ (Internal Task Management) được xây dựng phục vụ cho bài kiểm tra năng lực Frontend Developer.

## 🚀 Tính năng chính

- **Quản lý danh sách công việc (CRUD):** Thêm, sửa, xoá công việc mượt mà.
- **Phân loại & Bộ lọc:** Tìm kiếm theo tên, lọc theo trạng thái, mức độ ưu tiên và khoảng thời gian.
- **Báo cáo thống kê (Dashboard):** Biểu đồ tỷ lệ hoàn thành và các chỉ số Todo/In Progress/Done.
- **Smart Loading:** Sử dụng Skeleton UI và Table loading tích hợp với Redux Async Thunk để tối ưu trải nghiệm người dùng.
- **Xử lý bất đồng bộ:** Mô phỏng các tác vụ API với độ trễ thực tế.
- **Responsive Design:** Giao diện tương thích hoàn toàn với Mobile, Tablet và Desktop.
- **Dark Mode:** Hỗ trợ giao diện sáng/tối tự động lưu vào localStorage.

## 🛠 Tech Stack

- **Core:** React 18 + TypeScript 5
- **UI Component:** Ant Design 5.x
- **State Management:** Redux Toolkit 2.x (createSlice, createAsyncThunk, createSelector)
- **Styling:** Tailwind CSS 3.x
- **Build Tool:** Vite 8.x
- **Date Library:** Dayjs

## 📁 Cấu trúc thư mục

```text
src/
├── assets/          # Mock data và tài nguyên tĩnh
├── components/      # Các component dùng chung (Layout, UI)
├── constants/       # Các hằng số cấu hình hệ thống
├── features/        # Các module chức năng (Dashboard, Tasks)
├── hooks/           # Custom hooks (useDebounce, etc.)
├── stores/          # Cấu hình Redux Store, Slices và Thunks
├── types/           # Định nghĩa kiểu dữ liệu TypeScript
└── utils/           # Các hàm tiện ích (Date formatter, validation)
```

## ⚙️ Cài đặt và Chạy ứng dụng

1. **Clone repository:**
   ```bash
   git clone [url-repo]
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy ở chế độ phát triển (Dev Mode):**
   ```bash
   npm run dev
   ```

4. **Kiểm tra lỗi (Lint & Type check):**
   ```bash
   npm run validate
   ```

5. **Build cho Production:**
   ```bash
   npm run build
   ```

---
*Phát triển bởi [Tên của bạn]*
