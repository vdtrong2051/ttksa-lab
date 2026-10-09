
import type {
  ExperimentModuleMeta,
  ExperimentPhaseDefinition,
} from '../../../core/types'

export const seismographMeta: ExperimentModuleMeta = {
  sourceCode: '11_04',
  slug: 'seismograph',
  grade: 11,
  chapterSlug: 'dao-dong-co',
  topic: 'Dao động cơ',
  title: 'Máy đo địa chấn',
  description:
    'Khảo sát dao động của máy đo địa chấn, ghi và phân tích đồ thị để tìm hiểu hiện tượng cộng hưởng cơ học.',
  accent: 'rose',
}

export const seismographPhases:
  readonly ExperimentPhaseDefinition[] = [
    {
      id: 'intro',
      label: '1. Giới thiệu',
      title: 'Máy đo địa chấn và ứng dụng',
      description:
        'Lịch sử hình thành, vai trò và ứng dụng của máy đo địa chấn.',
    },
    {
      id: 'preparation',
      label: '2. Chuẩn bị',
      title: 'Cấu tạo và nguyên lý hoạt động',
      description:
        'Tìm hiểu khung máy, quả nặng, lò xo, bút ghi và nguyên lý quán tính.',
    },
    {
      id: 'practice',
      label: '3. Thực hành',
      title: 'Khảo sát máy đo địa chấn',
      description:
        'Điều chỉnh thông số, quan sát đường ghi và thu thập ba mẫu địa chấn.',
    },
    {
      id: 'conclusion',
      label: '4. Kết luận',
      title: 'Nguyên lý quán tính và cộng hưởng',
      description:
        'Rút ra điều kiện hoạt động phù hợp của máy đo địa chấn.',
    },
    {
      id: 'quiz',
      label: '5. Luyện tập',
      title: 'Kiểm tra kiến thức',
      description:
        'Trả lời năm câu hỏi về dao động, cộng hưởng và máy đo địa chấn.',
    },
    {
      id: 'report',
      label: '6. Báo cáo',
      title: 'Báo cáo thực hành',
      description:
        'Hoàn thành bảng đo, trả lời câu hỏi và in báo cáo.',
    },
  ]
