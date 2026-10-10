
# TTKSA Lab — Experiment Module Template

## 1. Mục đích

_template là khuôn mẫu tạo thí nghiệm mới.

Mỗi thí nghiệm sử dụng chung:
- Experiment Module Contract
- Experiment Registry
- Route Factory
- Session Navigation
- Experiment Shell
- Sáu bước thí nghiệm

Module tự quản lý nghiệp vụ và mô phỏng riêng.

Không chỉnh sửa trực tiếp _template khi phát triển
một thí nghiệm cụ thể.

## 2. Cấu trúc module

```text
<module>/
├── SessionLayout.tsx
├── routes.tsx
├── context.ts
├── styles.css
│
├── model/
│   ├── data.ts
│   └── types.ts
│
├── controller/
│   └── useTemplateController.ts
│
├── components/
│   ├── TemplatePanel.tsx
│   └── TemplateRuntimeDemo.tsx
│
└── view/
    ├── IntroPage.tsx
    ├── PreparationPage.tsx
    ├── PracticePage.tsx
    ├── ConclusionPage.tsx
    ├── QuizPage.tsx
    └── ReportPage.tsx
```

## 3. Trách nhiệm các thành phần

### Model
Khai báo metadata, dữ liệu, cấu hình và kiểu
dữ liệu riêng của thí nghiệm.

Các công thức vật lý thuần túy có thể được
tách sang model/physics.ts khi cần.

### Controller
Quản lý trạng thái phiên và các thao tác:
- Chuẩn bị dụng cụ
- Ghi và xóa số liệu
- Kết luận
- Luyện tập
- Reset

Không chứa JSX.

### Context
Cung cấp controller và navigation cho các page.

### SessionLayout
Khởi tạo controller, context, điều hướng và
runtime dùng chung giữa các bước.

Controller đặt ở SessionLayout để giữ state
khi chuyển phase.

### View
Gồm sáu trang:
intro, preparation, practice, conclusion,
quiz, report.

Mỗi trang phụ trách nội dung và tương tác
của bước tương ứng.

### Runtime
Hiển thị mô phỏng riêng của thí nghiệm.

Runtime có thể dùng Canvas, SVG hoặc HTML.
Không bắt buộc mọi module phải sử dụng Three.js.

### Routes
Sử dụng createModuleRoutes().

Không khai báo lại thủ công cây route sáu bước.

## 4. Quy trình tạo thí nghiệm mới

Bước 1:
Sao chép thư mục _template thành thư mục mới.

Tên thư mục sử dụng quy ước:
<grade>_<sequence>_<experiment-name>

Ví dụ:
11_05_pendulum-period

Bước 2:
Đổi tên các thành phần Template tương ứng
với thí nghiệm mới:

- TemplateSessionLayout
- TemplateSessionContext
- useTemplateSession
- useTemplateController
- TemplateController

Đổi các tên dữ liệu liên quan trong model,
context, controller và view.

Không thay thế hàng loạt các tên CSS hoặc
import khi chưa kiểm tra nơi sử dụng.

Bước 3:
Cập nhật model/data.ts:
- sourceCode
- slug
- grade
- chapterSlug
- topic
- title
- description
- accent
- phases

Bước 4:
Cập nhật nội dung sáu page.

Giữ nguyên quy tắc:
mỗi phase có URL riêng.

Bước 5:
Thay thế runtime demo bằng mô phỏng thật.

Xây dựng công thức và logic vật lý riêng,
không sửa shared core nếu không cần thiết.

Bước 6:
Đăng ký module tại:

src/experiments/registry.ts

Đăng ký:
- meta
- phases
- routes
- implementation

Bước 7:
Nếu là thí nghiệm mới trong chương trình,
thêm thông tin nội dung vào:

src/catalog/registry.ts

Không thêm runtimePath thủ công.

Bước 8:
Chạy lint, TypeScript và production build.

Kiểm tra sáu bước và thao tác thực hành.

## 5. Quy tắc kiến trúc

- Không sửa shared core để phục vụ riêng
  một thí nghiệm.
- Không lưu trạng thái phiên chính trong
  từng Page.
- Không sao chép logic navigation.
- Không tự viết lại sáu route.
- Không đưa thuật toán vật lý vào router.
- Không buộc mọi module phải dùng Three.js.
- Không đăng ký module chưa tích hợp
  như một runtime đã hoàn thành.

## 6. Giới hạn hiện tại

Dữ liệu phiên được giữ trong bộ nhớ React
khi SessionLayout vẫn còn mounted.

Refresh trang có thể khởi tạo lại state.

Template chưa cung cấp lưu trữ bền vững,
đồng bộ backend hoặc khôi phục phiên.

Các chức năng đó thuộc giai đoạn sau.

## 7. Hoàn thành module khi

- Module khai báo đúng metadata.
- Đăng ký thành công trong registry.
- Mở được sáu phase.
- Chuyển bước bằng URL bình thường.
- Controller giữ state qua chuyển phase.
- Mô phỏng hoạt động.
- Lint, TypeScript và build đạt.
```
