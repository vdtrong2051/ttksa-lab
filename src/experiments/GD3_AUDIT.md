# GĐ3.1 — Audit tổng hợp 5 thí nghiệm

**Repository:** `vdtrong2051/ttksa-lab`  
**Branch:** `refactor/experiment-framework`  
**Baseline commit (đã đối chiếu GitHub):** `380e7daa41139377af0b2ec8ef79ab9a728b11fd`  
**Ngày lập:** 11/10/2026  
**Trạng thái:** *Static/source audit hoàn tất; browser baseline và build trên máy người dùng CHƯA xác nhận.*

## 1. Phạm vi và nguồn bằng chứng

- Đọc cây thư mục, source `SessionLayout`, `context`, `PracticePage`, `controller`, `legacy/Experiment`, cùng các stylesheet của 5 module trên branch làm việc.
- Đối chiếu `src/app/router.tsx`, `src/experiments/core/` và `_template` dùng làm chuẩn GĐ2.
- Dùng nhóm cảnh báo Console do người dùng báo ngày 10/10/2026 làm **issue đã báo**, không coi chúng là kết quả tái hiện hiện tại.
- Chưa chạy Chrome/Vite, chưa đo tốc độ FPS, chưa chạy lệnh build/lint trên máy người dùng, chưa khẳng định các warnings đã hết.

## 2. Ma trận cấu trúc hiện tại

| Module | Số file | PracticePage | Controller | Simulation & legacy | CSS | Rủi ro chính |
|---|---:|---|---|---|---|---|
| `11_01_harmonic-motion` | 16 | 11 dòng, placeholder | Chưa tách thành hook riêng | `legacy/Experiment.tsx` ~2015 dòng, chứa Canvas, useFrame và UI state; 4 file legacy khác | `styles.css` ~2277 dòng | Phân tách UI/Runtime/Controller, KaTeX, mã legacy còn được tham chiếu hay không |
| `11_02_damped-oscillation` | 12 | 4 dòng, placeholder | Chưa tách thành hook riêng | `legacy/Experiment.tsx` ~1981 dòng, chứa Canvas, ContactShadows, Environment, useFrame, UI state | `styles.css` ~1970 dòng | Three.js/driver warnings, runtime khởi tạo sớm, phân lớp legacy |
| `11_03_forced-resonance` | 18 | ~545 dòng, UI riêng | `simulation/useResonanceController.ts` | `simulation/` gồm runtime, scene, pendulum | `styles.css` ~2677; `view/practice.css` ~779 dòng | Controller nằm sai tầng, UI/CSS trùng Framework |
| `11_04_seismograph` | 23 | ~666 dòng, UI riêng | `simulation/useSeismographController.ts` | Runtime, scene và đồ thị cùng trong `simulation/` | `styles.css` ~130; `view/practice.css` ~699; `view/content.css` ~998 dòng | Controller nằm sai tầng, ranh giới biểu đồ/Runtime/CSS chưa đồng bộ |
| `12_07_boyle` | 20 | ~738 dòng, UI riêng | `controller/useBoyleController.ts` | Runtime, scene, particles; `components/BoyleGraph.tsx` | `styles.css` ~1739 dòng | Cơ sở tương đối tốt để đối chiếu; UI tự quản toolbar/dock và fullscreen |

**Ghi chú:** số dòng dựa trên bản GitHub tại baseline; không quy đổi trực tiếp sang mức độ lỗi. `_template` là chuẩn thử nghiệm, không nằm trong 5 module bắt buộc chuyển đổi.

## 3. Ma trận cảnh báo Console (issue ledger)

| ID | Nhóm / dấu hiệu | Bằng chứng đã có | Trạng thái audit | Hướng xác minh ở GĐ3.2–3.3 |
|---|---|---|---|---|
| W01 | React Router: `No HydrateFallback element provided` | Log người dùng; `src/app/router.tsx` sử dụng lazy routes | **Đã báo; chưa tái hiện** | Phân biệt framework warning và lỗi render thực tế; kiểm tra direct-route refresh, router fallback, dev vs preview |
| W02 | KaTeX: `unicodeTextInMathMode` cho `ò`/`Đ` | Log người dùng; `11_01_harmonic-motion/view/IntroPage.tsx`, `ConclusionPage.tsx` có `\mathrm{tròn}` / `\mathrm{DĐĐH}` | **Đã định vị mã nguồn cần xử lý** | Chỉnh chỉ công thức liên quan; kiểm tra hiển thị toán, Intro và Conclusion |
| W03 | `THREE.Clock` deprecated | Log/stack người dùng; đường đi qua R3F `<Canvas>` của `11_02_damped-oscillation/legacy/Experiment.tsx` | **Đã định vị call-chain; nguồn cụ thể cần xác minh** | Xác minh dependency khởi tạo Clock, không thay bừa `new THREE.Clock()` nếu source không có |
| W04 | `PCFSoftShadowMap` removed/deprecated | Log người dùng; Damped có `<ContactShadows>` từ Drei | **Nghi vấn phụ thuộc trong renderer/Drei** | Phân biệt mã dự án và package; thử bản compatible, kiểm tra quality shadow |
| W05 | Shader `warning X4122` | Log người dùng; xuất hiện trong quá trình biên dịch shader/PMREM Damped | **Chưa kết luận có lỗi ứng dụng** | Thu thập console đầy đủ, GPU/driver, chỉ coi đã xử lý khi xác định tác động và điều kiện tái hiện |
| W06 | Lazy image browser intervention | Log người dùng | **Thông báo môi trường; chưa xác định lỗi app** | Kiểm tra tải ảnh thực tế và network trước khi quyết định sửa |
| W07 | Console warnings chưa biết của các module còn lại | Chưa có log 6 phase × 5 module | **Thiếu dữ liệu** | Chạy ma trận browser baseline; phân loại Error/Warning/Info, tách nguồn app/dependency/browser |

Không được làm sạch Console bằng cách ghi đè `console.warn`/`console.error`, lọc tab Console rồi tuyên bố đã hết lỗi hoặc sửa trực tiếp `node_modules`.

## 4. Ma trận sở hữu Runtime / State / UI

| Module | Runtime sống ở SessionLayout? | Runtime mount/lazy | Trạng thái nghiệp vụ | UI Practice | Phương án an toàn |
|---|---|---|---|---|---|
| Harmonic | Có | Trì hoãn khởi tạo (preparation ~180 ms / practice ngay) | Chủ yếu ở legacy Experiment | Legacy Experiment | Tách UI từng bước; giữ nguyên scene & update loop; tạo controller/adapter khi có test xác nhận state |
| Damped | Có | `Experiment` đặt trực tiếp dưới RuntimeHost, chưa lazy tương tự các module khác | Chủ yếu ở legacy Experiment | Legacy Experiment | Sửa warning/dependency trước; phân tách theo đường đi dữ liệu, tránh remount Canvas khi chuyển bước |
| Forced | Có | Lazy runtime + Suspense | `useResonanceController` tạo ở SessionLayout, file đặt trong `simulation/` | Custom PracticePage | Di chuyển controller sang `controller/`, giữ API/identity; sau đó chuyển UI |
| Seismograph | Có | Lazy runtime + Suspense | `useSeismographController` tạo ở SessionLayout, file đặt trong `simulation/` | Custom PracticePage | Chuyển controller, xác định vị trí đúng cho biểu đồ; sau đó chuyển UI |
| Boyle | Có | Lazy/warm-up Runtime | `useBoyleController` tạo ở SessionLayout; UI runtime giữ ở SessionLayout | Custom PracticePage | Giữ model/physics; dùng làm module thử nghiệm UI đầu tiên |

**Điểm cần bảo toàn:** lifecycle của Controller và Persistent Runtime; trạng thái Play/Pause, số liệu/snapshot, tương tác camera, chuẩn bị, chuyển bước, in báo cáo, fullscreen, phản hồi khi không đủ dữ liệu.

## 5. Nợ kỹ thuật phát hiện từ mã nguồn

- **A01 — Legacy monolith:** `legacy/Experiment.tsx` của Harmonic và Damped xấp xỉ 2.000 dòng mỗi file, chứa nhiều trách nhiệm. Chia module là ưu tiên, nhưng không sửa scene/physics chỉ để giảm số dòng.
- **A02 — PracticePage chưa thực sự sở hữu Practice:** trang Practice của hai legacy là placeholder; không thể chỉ chép mẫu JSX từ Boyle.
- **A03 — Controller đặt trong simulation:** Forced/Seismograph cần chuyển đúng vai trò, đồng thời cập nhật import và phân định type.
- **A04 — CSS mỗi module một kiểu:** root stylesheet, `view/practice.css`, `view/content.css` cùng tồn tại; chuyển về contract chung theo ownership, không tái format toàn bộ cùng một commit.
- **A05 — Nghi vấn mã legacy không còn được sử dụng:** `11_01_harmonic-motion/legacy/{Preparation,Practice,Conclusion,Report}.tsx` hiện không phải entry của sáu route mới; phải xác minh references trước khi xóa. Riêng `legacy/Report.tsx` có `dangerouslySetInnerHTML` nhúng `@media print` và `@page`, cần kiểm tra xung đột với framework print nếu còn được sử dụng.
- **A06 — Practice UI trùng lặp:** Boyle, Forced, Seismograph duy trì toolbar/panel/dock riêng. Chỉ xóa sau khi UI dùng chung đã có tương đương hành vi.
- **A07 — Kỷ luật kiểm thử:** `package.json` có `lint`, `build`, `dev`, `preview`; không phát hiện file `.test.ts`, `.spec.ts` hoặc bộ E2E trong cây repo. Build không thay thế kiểm thử browser/runtime.
- **A08 — Hợp đồng overlay:** `ExperimentFloatingPanel` hiện tìm `.experiment-template__route--practice` bằng DOM selector để giới hạn kéo; cần kiểm thử khi fullscreen, thu phóng và responsive trước khi nhân sang module khác.

## 6. Hợp đồng cấu trúc đích (đề xuất; chốt ở GĐ3.4)

```text
<module>/
  SessionLayout.tsx         # Context + controller + keep-alive runtime
  context.ts
  routes.tsx
  styles.css                # entry CSS của riêng module
  model/
    data.ts
    types.ts                 # nếu có
    constants.ts             # nếu có
    physics.ts               # nếu có; hàm thuần
    questions.ts             # nếu có
  controller/
    use...Controller.ts      # nếu có nghiệp vụ/state riêng
  simulation/
    ...Runtime.tsx
    ...Scene.tsx             # tùy mô phỏng
    ...                     # objects/animation
  components/               # UI riêng module, ví dụ graph
  view/
    IntroPage.tsx
    PreparationPage.tsx
    PracticePage.tsx
    ConclusionPage.tsx
    QuizPage.tsx
    ReportPage.tsx
  styles/
    practice.css             # tùy chọn
    content.css              # tùy chọn
  assets/                    # tùy chọn
```

Quy tắc: không tạo thư mục rỗng; `model/` không phụ thuộc React; `view/` chỉ dùng Controller do SessionLayout cung cấp; `simulation/` không chứa Router; `core/` không chứa các tính toán vật lý riêng; tránh cyclic imports. Các file di chuyển phải giữ nguyên public slug/route và API tại thời điểm move-only commit.

## 7. Test matrix GĐ3.1 (cần chạy trên máy người dùng)

**Hai chế độ:** `npm.cmd run dev` và `npm.cmd run build; npm.cmd run preview` (trong PowerShell, chạy hai lệnh tách dòng).

**Mỗi module:** `harmonic-motion`, `damped-oscillation`, `forced-resonance`, `seismograph`, `boyle`.

**Các phase:** `/lab/<slug>/intro`, `/preparation`, `/practice`, `/conclusion`, `/quiz`, `/report`.

| Test | Các thao tác | Bằng chứng cần giữ |
|---|---|---|
| R1 | Truy cập trực tiếp URL, refresh, chuyển sáu bước, Back/Forward | Có/không có 404, fallback, reset state |
| R2 | Mở DevTools Console với Preserve log; tải lại Practice | Nguyên văn warning/error và stack đầu tiên, module + phase |
| R3 | Bấm Play/Pause, điều chỉnh tham số, camera, ghi/xóa dữ liệu | Kết quả và trạng thái trước/sau |
| R4 | Thực hành → Kết luận → Thực hành | Canvas có remount/reset không; dữ liệu còn không |
| R5 | Fullscreen → Escape/Thu nhỏ/đổi bước | Overlay tự thoát, không chặn tương tác |
| R6 | Desktop 1366×768, tablet 768×1024, mobile 390×844 | Chồng panel, dock, scrollbars, thao tác cảm ứng |
| R7 | In bản báo cáo từ Report | Print preview A4, nội dung không bị mất |

**Mỗi issue Console cần có:** `ID`, `module`, `phase`, `browser`, `dev/preview`, `severity`, `nguyên văn log`, `stack đầu tiên`, `repro steps`, `owner (app/dependency/browser/driver)`, `trạng thái`.

## 8. Risk register và điều kiện chặn

| Ưu tiên | Rủi ro | Cổng kiểm soát |
|---|---|---|
| P0 | Shader/renderer crash, Canvas mất, sai công thức hoặc mất dữ liệu | Không chuyển UI module đó trước khi xác định nguyên nhân và có đường rollback |
| P1 | Legacy state gắn với runtime, di chuyển file gây remount; fullscreen/route rò state | Ghi baseline behavior trước move; kiểm tra transition sau mỗi commit |
| P1 | Dependency warnings bị nhầm là app-code, vá sai nơi | Xác định stack root/dependency; thử thay đổi nhỏ, đo regression |
| P1 | Xóa legacy import tưởng không dùng | Chạy reference search + build + manual 6 phases, chỉ xóa ở cleanup sau migrate |
| P2 | CSS root/view trùng selector, scrollbar/print sai | Di chuyển theo ownership, so visual trước/sau |

## 9. Phân công công việc cho các mốc sau

- **GĐ3.2:** W01, W02; xác minh W06; sửa cảnh báo nền tảng có phạm vi rõ.
- **GĐ3.3:** W03–W05 và các warning bổ sung từ baseline, theo từng runtime; phân loại dependency/driver.
- **GĐ3.4:** Chốt cấu trúc và quy tắc import, state, CSS đã đề xuất.
- **GĐ3.5:** Move-only + phân tách module theo thứ tự Boyle → Forced → Seismograph → Harmonic → Damped; module/commit, không trộn UI migration.
- **GĐ3.6–3.8:** Áp dụng shared Practice UI, kiểm tra toàn màn hình và route, không thay physics.
- **GĐ3.9:** Xóa dead code, CSS trùng, adapter hết vai trò sau chứng minh references.
- **GĐ3.10:** Regression toàn bộ 5 modules × 6 phases; build, console, runtime, print, responsive.

## 10. Tiêu chuẩn đóng GĐ3.1

### Đã hoàn tất (qua kiểm kê source)
- [x] Inventory và ma trận cấu trúc năm module.
- [x] Nêu các warning người dùng đã ghi nhận và mức độ chắc chắn của nguyên nhân.
- [x] Phân loại ownership Controller/Simulation/Practice và rủi ro Legacy.
- [x] Dự thảo cấu trúc đích và kế hoạch thứ tự sửa.
- [x] Tách rõ audit source khỏi kết quả chạy trình duyệt.

### Cần người dùng xác minh nếu muốn baseline runtime đầy đủ trước GĐ3.2
- [ ] Chạy lint, tsc, build trên working tree.
- [ ] Lấy console log đầy đủ của 5 module ở Dev, tối thiểu Practice; ưu tiên cả Production Preview.
- [ ] Kiểm thử các hành vi R1–R7 và ghi các lỗi hiện hữu.

**Không chỉnh sửa code trong GĐ3.1.** Chỉ commit tài liệu audit sau khi đã đọc và bổ sung thực trạng chạy trên máy nếu cần. `main` là deploy branch, không merge.
