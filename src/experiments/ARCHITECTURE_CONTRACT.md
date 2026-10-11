# TTKSA Lab — Experiment Architecture Contract (GĐ3.4)

- **Phiên bản:** 1.0 — 11/10/2026
- **Phạm vi:** `_template` và năm module: `11_01_harmonic-motion`, `11_02_damped-oscillation`, `11_03_forced-resonance`, `11_04_seismograph`, `12_07_boyle`
- **Nhánh chuẩn bị:** `refactor/experiment-framework`; `main` là nhánh deploy, không tác động ở GĐ3.
- **Baseline đã đọc:** GitHub commit `81ef77a1199` (sửa PCF shadow map). Đây là **hợp đồng kiến trúc dự kiến**, không phải khẳng định mã nguồn hiện tại đã tuân thủ.
- **Hiệu lực:** GĐ3.5 áp dụng tái cấu trúc; GĐ3.6–3.8 áp dụng Practice UI; GĐ3.9 dọn mã cũ; GĐ3.10 nghiệm thu.

## 1. Mục tiêu và bất biến

Mục tiêu: các module có **cùng cách tổ chức, cùng ranh giới phụ thuộc, cùng vòng đời phiên và cùng giao diện Practice**, nhưng giữ **mô hình vật lý, số liệu và thành phần mô phỏng riêng**. Không tạo kiến trúc nhiều lớp hơn cần thiết.

Bất biến khi chuyển đổi:

1. **Không đổi public slug, URL `/lab/<slug>/<phase>`**, thứ tự sáu bước (`intro → preparation → practice → conclusion → quiz → report`), registry và nội dung giáo dục nếu không có yêu cầu riêng.
2. `SessionLayout` sở hữu **Controller/session**; chuyển bước trong cùng module không tạo lại Controller.
3. `ExperimentRuntimeHost` là anh em với vùng `<Outlet />` trong `ExperimentViewShell`; đổi phase không tự động unmount Canvas đã được khởi tạo.
4. Giữ chính xác công thức, đơn vị, tham số, đường cong, dữ liệu đo, đồ thị, Play/Pause, camera, reset và việc in báo cáo hiện có.
5. UI nổi chỉ phủ lên mô phỏng và không chiếm pointer events ở vùng trống. Fullscreen tự thoát khi rời Practice; dữ liệu phiên không mất.
6. **Không hứa khôi phục sau refresh**: hiện dữ liệu chỉ sống khi SessionLayout còn mounted. Persistence là yêu cầu khác, không được thêm ngầm trong GĐ3.
7. Không nâng dependency, thay thuật toán vật lý hoặc đổi cấu trúc đồng thời trong một commit. Cảnh báo `THREE.Clock` còn thuộc bài toán tương thích dependency GĐ3.3, không được che log bằng `console.warn` override.

## 2. Cấu trúc đích duy nhất

```text
src/experiments/modules/<grade>_<sequence>_<slug>/
├── SessionLayout.tsx              # điều phối phiên, runtime keep-alive
├── context.ts                     # truy cập session typed, không có nghiệp vụ
├── routes.tsx                     # sử dụng createModuleRoutes()
├── styles.css                     # style nền riêng của module
├── model/
│   ├── data.ts                    # meta/phases/nội dung khai báo
│   ├── types.ts                   # kiểu dữ liệu VẬT LÝ thuần TS
│   ├── constants.ts               # tùy chọn
│   ├── physics.ts                 # tùy chọn; hàm tính toán thuần
│   └── questions.ts               # tùy chọn
├── controller/
│   ├── use<Name>Controller.ts     # React hook quản lý phiên
│   └── types.ts                   # tùy chọn; contract Controller, RefObject
├── simulation/
│   ├── <Name>Runtime.tsx          # điểm vào simulation/Canvas/SVG
│   ├── <Name>Scene.tsx             # tùy chọn; scene WebGL
│   └── ...                        # các đối tượng, materials, geometry
├── components/                    # tùy chọn; panel/graph/UI riêng module
├── view/
│   ├── IntroPage.tsx
│   ├── PreparationPage.tsx
│   ├── PracticePage.tsx
│   ├── ConclusionPage.tsx
│   ├── QuizPage.tsx
│   └── ReportPage.tsx
├── styles/                        # tùy chọn; practice.css, content.css
└── assets/                        # tùy chọn; ảnh, texture, model...
```

**Bắt buộc:** `SessionLayout.tsx`, `context.ts`, `routes.tsx`, `styles.css`, `model/data.ts`, một điểm vào `controller/`, một điểm vào `simulation/`, và sáu `view/*Page.tsx`.

**Tùy chọn:** `physics.ts`, `questions.ts`, `controller/types.ts`, `Scene.tsx`, `components/`, `styles/`, `assets/` và các file phục vụ bài học. Không tạo thư mục rỗng cho đủ hình thức.

**Ngoại lệ có thời hạn:** `legacy/` được giữ trong quá trình chuyển đổi, không phải một tầng kiến trúc đích. Chỉ xóa sau khi chức năng được đối chiếu và không còn import sử dụng.

## 3. Quyền sở hữu và quy tắc phụ thuộc

| Vùng | Sở hữu | Có thể import | Không được phụ thuộc |
|---|---|---|---|
| `model/` | metadata, dữ liệu, type domain, công thức tính toán thuần | `model/*`, type thuần ở `core/types` nếu cần | React, Three.js, Router, JSX, DOM, Controller, View |
| `controller/` | hook, state/ref phiên, lệnh play/pause/record/reset, điều phối hoạt động | `model/*`, React hooks | View, UI panel, CSS, Router, React Three Fiber, JSX |
| `simulation/` | render runtime, scene, tích phân theo frame, đối tượng 3D/SVG | `model/*`, `controller/types`, React/R3F/Three | View, navigation, registry, core UI floating |
| `components/` | UI và biểu đồ riêng bài học | `model/*`, `controller/types` và thư viện render thích hợp | định tuyến hoặc sở hữu session |
| `view/` | nội dung sáu bước, nối controller với UI, tương tác học sinh | `context`, `model`, `components`, shared `core` UI | tự tạo lại session Controller, trực tiếp sở hữu Canvas chính |
| `context.ts` | type session, Context + hook đọc Context | `core/session`, `core/types`, `controller/types` | tạo lại Controller hoặc thực hiện side-effect |
| `SessionLayout.tsx` | controller, provider, runtime, navigation, error/suspense boundary, warm-up | các vùng trong module + shared core | chứa toàn bộ UI Practice hoặc thuật toán tính toán chi tiết |
| `routes.tsx` | khai báo lazy route theo 6 bước | `core/createModuleRoutes`, `model/data`, dynamic-import pages/layout | tự viết lại routing system |
| `core/` | UI và điều phối dùng chung cho mọi bài | core/shared độc lập module | bất kỳ import ngược nào từ `modules/<name>` |

### 3.1 Quy tắc type

- `model/types.ts` chỉ chứa kiểu vật lý/giáo dục thuần (`Config`, `Measurement`, `Snapshot`, `PendulumId`...), không chứa `React.RefObject`, `THREE.Vector3` hoặc component props.
- Contract Controller có `RefObject`, callbacks, `isRunning`... đặt tại `controller/types.ts` (hoặc ở hook khi đủ ngắn). Scene props đặc thù cho rendering được đặt tại `simulation/types.ts` nếu cần.
- Hằng số vật lý/config ở `model/constants.ts` hoặc `model/data.ts` tùy quy mô; không để mặc định con lắc trong `simulation/types.ts` chỉ vì lịch sử.
- Tránh vòng import bằng cách đặt type ở tầng thấp nhất mà **chỉ những consumer thực sự cần** cùng sử dụng.

### 3.2 Quy tắc import

- Import trong cùng module bằng relative path; không import từ một module thí nghiệm khác.
- Chỉ `registry.ts`/`routes.tsx` cấp tổng mới tập hợp module. Module không tự đăng ký hay dò runtime của module khác.
- Không thêm barrel `index.ts` hàng loạt vì có thể tạo vòng phụ thuộc và làm sai lazy loading. Barrel chỉ dùng nếu được chứng minh cần.
- Không tạo `shared` mới cho code chỉ đang được dùng tại một module; chia sẻ khi có ít nhất hai nhu cầu **thực sự tương đồng**, không dựa vào tên gần giống.

## 4. Vòng đời phiên và luồng dữ liệu

```text
URL /lab/:slug/:phase
   │
   └─ createModuleRoutes ──> SessionLayout (mounted ổn định qua 6 phase)
                                │
               ┌────────────────┼──────────────────┐
               ▼                ▼                  ▼
            Controller       Context          ExperimentViewShell
          (state/refs)     (typed access)         │
                                             ┌─────┴───────┐
                                             ▼             ▼
                                     PersistentRuntime  <Outlet />
                                         (Canvas)         PhasePage
                                             ▲             │
                                             └── data/actions từ Context
```

- **`activePhase` luôn suy ra từ URL**, không duplicate trong `useState`.
- Controller được gọi trong `SessionLayout`; UI mô phỏng nhận state/callbacks qua props/context, không tự gọi hook controller mới ở `PracticePage`.
- Runtime có thể `mounted=false` lúc chưa cần, warm-up khi Preparation/Practice. Một khi đã mount thì giữ mounted trong suốt session, trừ khi người học chủ động reset/toàn module unmount hoặc gặp error boundary cần remount được kiểm soát.
- `active=false` nghĩa là runtime bị ẩn hoặc tạm dừng; **không có nghĩa dữ liệu bị xóa**. Các mô phỏng dùng frame loop phải định nghĩa rõ khi nào pause, visibility và `frameloop` (`always/demand/never`).
- Trạng thái mô phỏng cần tồn tại qua phase (thời gian, phép đo, config, snapshot, lựa chọn của người học, camera nếu yêu cầu) nằm trong Controller/session.
- Trạng thái **UI tạm của Practice** (panel đang mở, tọa độ panel, toolbar mở rộng, fullscreen) nằm trong `PracticePage`. Trường hợp trạng thái visual thực sự ảnh hưởng mô phỏng phải tồn tại qua bước (như bật particles, nhiệt độ) thì giữ ở session/controller; phân loại theo hành vi, không chỉ theo tên `Ui`.
- `Escape`: ưu tiên đóng panel đang mở, sau đó thu nhỏ Workspace; khi rời Practice bằng Dock, phase navigation hoặc browser Back/Forward, fullscreen không còn. Không dùng Fullscreen API nếu không có yêu cầu.
- `resetRun`, `resetMeasurement`, `resetSession`, `resetUi` là các ý nghĩa khác nhau; không gom tùy tiện thành `reset()` làm mất số liệu.

## 5. Hợp đồng Practice UI (GĐ2)

- `ExperimentPracticeWorkspace`: lớp phủ UI, nhận `expanded`; không sở hữu physics.
- `ExperimentPracticeToolbar`: cấu hình danh sách panel/action theo từng thí nghiệm, chỉ **một** floating panel mở.
- `ExperimentFloatingPanel`: kéo trên desktop; bottom sheet ở mobile/màn hình thấp; không chặn interaction với Canvas ngoài panel.
- `ExperimentPracticeDock`: trạng thái, chỉ số, hành động điều hướng/đo; dữ liệu từ Controller.
- `PracticePage` chịu trách nhiệm lắp các component trên. Không tự tạo Toolbar/Dock thay thế bằng giao diện copy-paste.
- Giao diện từng thí nghiệm được tùy biến qua `items`, `metrics`, `actions`, nội dung panel; **không bắt buộc năm bài giống nhau về số công cụ hay số liệu**.
- Thay đổi UI không được tạo key mới cho Canvas, làm mất `WebGLRenderer` hoặc reset state vật lý.
- Nội dung sáu phase vẫn có URL riêng. Không chuyển trở lại kiểu nhiều tab chỉ điều khiển bằng local state.

## 6. CSS / assets / performance

- `styles.css` là entry cho style dùng chung **trong module** (root layout, phase wrappers); `styles/` chỉ dùng khi một phần riêng đủ lớn, ví dụ `styles/practice.css` / `styles/content.css`.
- CSS dùng prefix duy nhất theo module (`.boyle-*`, `.seismo-*`, `.harmonic-motion-*`...). Không định nghĩa lại `.experiment-*` dùng chung trong CSS module, trừ override có chủ đích và ghi chú lý do.
- Không để `view/practice.css` ở module A nhưng `styles/practice.css` ở module B sau GĐ3.5. Chọn một nơi cố định là `styles/`.
- CSS dành riêng phase nên import từ đúng page khi có lợi cho lazy chunk; CSS module-wide import trong `SessionLayout`. Không import cùng file theo hai đường làm tăng nguy cơ style override.
- Xóa CSS/legacy theo **kết quả dò import, kiểm tra computed style và print preview**, không xóa chỉ vì selector có vẻ cũ.
- `assets/` chỉ chứa tài nguyên module; tham chiếu bằng import hợp lệ, không hard-code đường dẫn dist hash.
- `Canvas`/R3F nên lazy khi module nặng; lưu ý StrictMode, clean-up geometry/material, treo listener/RAF, WebGL context và performance. Không đổi thư viện ở bước di chuyển file.
- Việc tách bundle lớn, tối ưu `OrbitControls` và dependency nằm tại GĐ3.9, trừ khi một bước refactor phát sinh lỗi rõ rệt.

## 7. Ma trận di chuyển file cho GĐ3.5

| Module | Hiện trạng | Đích / quyết định |
|---|---|---|
| `11_01_harmonic-motion` | `legacy/Experiment.tsx` ~2015 dòng chứa Canvas + điều khiển + UI; bốn file legacy nội dung | Trước hết bọc adapter để giữ tính năng; tách `controller/`, `simulation/`, `components/`; `view/PracticePage` thành nơi lắp shared UI. Rà import trước khi bỏ các trang legacy nội dung. |
| `11_02_damped-oscillation` | `legacy/Experiment.tsx` ~1981 dòng; `PracticePage` gần như rỗng | Tách state/physics/Canvas/UI bằng thay đổi nhỏ có kiểm thử; giữ snapshot, biểu đồ, reset, camera, ContactShadows; xóa `legacy/` sau migration. |
| `11_03_forced-resonance` | `simulation/useResonanceController.ts`, `simulation/types.ts`, `view/practice.css` | Chuyển hook sang `controller/`; tách `PendulumConfig`/defaults sang `model/`, Controller refs vào `controller/types.ts`; CSS chuyển `styles/`. |
| `11_04_seismograph` | `simulation/useSeismographController.ts`; `model/types.ts` chứa `RefObject`; `simulation/SeismogramGraph.tsx`; CSS ở `view/` | Hook sang `controller/`; tách React-aware controller types khỏi model; xác minh SeismogramGraph là UI hay scene rồi đặt tại `components/` hoặc `simulation/`; CSS vào `styles/`. |
| `12_07_boyle` | Có `controller/`, `model/`, `simulation/`, `components/`; `workspaceExpanded` tại `SessionLayout` | Dùng làm mốc đối chiếu; phân loại state mô phỏng vs UI tạm; không dịch chuyển file chỉ để giống hình thức; chuyển Practice UI ở GĐ3.6. |
| `_template` | `components/TemplateRuntimeDemo.tsx` | Đồng bộ contract trong GĐ3.5, chuyển demo runtime sang `simulation/` (khi làm); sửa `README.md` sau khi cấu trúc thật đã thống nhất. |

**Không chuyển bất kỳ file nào ở GĐ3.4.** Bảng là kế hoạch kiểm soát cho GĐ3.5, không phải lệnh đổi tên tự động.

## 8. Chiến lược chuyển đổi an toàn

1. Trước mỗi module: ghi danh sách chức năng, state cần bảo toàn, ảnh/đồ thị, snapshot, trạng thái camera, luồng in và warning baseline.
2. Di chuyển **một module / một commit refactor cấu trúc**, dùng `git mv` khi thích hợp, sửa import và compile trước khi xóa legacy.
3. Nếu phải tách file lớn: tách lần lượt domain types/constants → hook Controller → Runtime/Scene → component UI. Giữ adapter tạm thời nếu cần; phải có kế hoạch xóa ở GĐ3.9.
4. Chạy `git diff --check`, `npm.cmd run lint`, `npx.cmd tsc -b`, `npm.cmd run build`; mở trực tiếp URL Practice + một lượt sáu phase, xác minh keep-alive và điều khiển. Không coi build là thay thế cho test WebGL.
5. GĐ3.5 dừng ở **đồng nhất kiến trúc/đường dẫn**, không đại tu Practice UI. GĐ3.6–3.8 mới migrate UI theo template đã khóa.
6. Mỗi module giữ public URL/meta và data shape hiện hành; thay đổi serializable shape cần xem xét riêng. Không đổi công thức vật lý trong refactor.
7. Commit tách biệt: `refactor(<module>): align architecture contract`; không thay `main`. Sửa warning dependency nằm GĐ3.3, cleanup global CSS nằm GĐ3.9.
8. Sau module cuối, update `_template/README.md`, kiểm tra registry và lập danh sách legacy/dead CSS cần loại bỏ tại GĐ3.9.

## 9. Definition of Done — GĐ3.4

- [ ] Hợp đồng kiến trúc được lưu đúng path `src/experiments/ARCHITECTURE_CONTRACT.md`.
- [ ] Cây thư mục đích được chốt, phân biệt file bắt buộc và tùy chọn.
- [ ] Quy tắc phụ thuộc không tạo vòng, core không import ngược module, model thuần TS.
- [ ] Vòng đời Runtime/Controller, quyền sở hữu UI state và reset semantics được chốt.
- [ ] Quy tắc CSS, lazy import, legacy adapter và mapping 5 module được chốt.
- [ ] Audit xác nhận không sửa source, không thay physics, không thay `main` trong 3.4.
- [ ] Commit tài liệu trên nhánh `refactor/experiment-framework`.

**GĐ3.4 hoàn thành khi tài liệu được chấp thuận và commit; không yêu cầu di chuyển file, chạy lại mô phỏng hay tuyên bố GĐ3.3 đã đóng.**

## 10. Ngoài phạm vi

- Tạo framework/state manager mới; đổi Router hoặc package manager.
- Viết lại động học/vật lý, cải biên đồ họa để 'đẹp' hơn.
- Cập nhật các package Three.js/R3F/Drei trong commit refactor.
- Triển khai persistence qua reload, backend, tài khoản, phân quyền.
- Hợp nhất sáu trang giáo dục thành một component khổng lồ.
