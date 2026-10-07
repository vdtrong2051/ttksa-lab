import type {
  ExperimentModuleMeta,
} from '../../../core/types'

import type {
  BoyleAssessmentQuestion,
  BoyleObservationId,
  BoylePhaseDefinition,
  BoylePreparationToolDefinition,
} from './types'


export const boyleMeta:
  ExperimentModuleMeta = {
  sourceCode: '12_07',
  slug: 'boyle',
  grade: 12,
  chapterSlug: 'khi-li-tuong',
  topic: 'Khí Lí Tưởng',
  title: 'Định luật Boyle-Mariotte',
  description:
    'Khảo sát mối liên hệ giữa áp suất và thể tích của một lượng khí xác định trong quá trình đẳng nhiệt.',
  accent: 'sky',
}


export const boylePhases:
  readonly BoylePhaseDefinition[] = [
  {
    id: 'intro',
    label: '1. Giới thiệu',
    title: 'Định luật Boyle-Mariotte',
    description:
      'Tìm hiểu quá trình đẳng nhiệt, đường đẳng nhiệt và biểu thức pV = const.',
  },
  {
    id: 'preparation',
    label: '2. Chuẩn bị',
    title: 'Chuẩn bị dụng cụ',
    description:
      'Lựa chọn đúng bộ thiết bị trước khi tiến hành khảo sát.',
  },
  {
    id: 'practice',
    label: '3. Thực hành',
    title: 'Khảo sát quá trình đẳng nhiệt',
    description:
      'Thay đổi thể tích, chờ cân bằng nhiệt và ghi số liệu ở năm mức thể tích khác nhau.',
  },
  {
    id: 'conclusion',
    label: '4. Kết luận',
    title: 'Phân tích kết quả',
    description:
      'Đối chiếu số liệu, đồ thị và giải thích hiện tượng ở mức độ vi mô.',
  },
  {
    id: 'quiz',
    label: '5. Luyện tập',
    title: 'Kiểm tra kiến thức',
    description:
      'Củng cố định luật Boyle-Mariotte và điều kiện của quá trình đẳng nhiệt.',
  },
  {
    id: 'report',
    label: '6. Báo cáo',
    title: 'Báo cáo thực hành',
    description:
      'Đối chiếu dữ liệu phiên thí nghiệm và hoàn thành phiếu A4.',
  },
]


export const boylePreparationTools:
  readonly BoylePreparationToolDefinition[] = [
  {
    id: 'set_boyle',
    name: 'Bộ thí nghiệm Boyle',
    description:
      'Xi-lanh có vạch chia, pít-tông kín và áp kế.',
    icon: 'gauge',
    correct: true,
  },
  {
    id: 'stand',
    name: 'Giá đỡ kim loại',
    description:
      'Trụ kim loại giúp giữ cố định hệ thống.',
    icon: 'activity',
    correct: true,
  },
  {
    id: 'clamp',
    name: 'Ngàm kẹp',
    description:
      'Dùng để cố định xi-lanh vào giá đỡ.',
    icon: 'cog',
    correct: true,
  },
  {
    id: 'calorimeter',
    name: 'Nhiệt lượng kế',
    description:
      'Bình cách nhiệt dùng cho thí nghiệm nhiệt học.',
    icon: 'thermometer',
    correct: false,
  },
  {
    id: 'balance',
    name: 'Cân phân tích',
    description:
      'Thiết bị đo khối lượng chính xác.',
    icon: 'activity',
    correct: false,
  },
  {
    id: 'flask',
    name: 'Bình cầu chịu nhiệt',
    description:
      'Dụng cụ dùng để đun nóng chất lỏng.',
    icon: 'flask',
    correct: false,
  },
]


export const boyleIntroContent = {
  isothermalProcess: {
    title: 'Quá trình đẳng nhiệt',
    description:
      'Là quá trình biến đổi trạng thái của một khối lượng khí xác định trong đó nhiệt độ được giữ không đổi (T = const). Để giữ nhiệt độ gần như không đổi trong thực nghiệm, cần nén hoặc giãn khí đủ chậm để hệ kịp trao đổi nhiệt với môi trường.',
  },
  graph: {
    title: 'Đường đẳng nhiệt',
    description:
      'Ở nhiệt độ không đổi, áp suất p và thể tích V tỉ lệ nghịch. Trong hệ trục (p, V), đường biểu diễn là một đường hypebol.',
  },
  formula: 'p · V = const',
  equivalentFormula:
    'p₁ · V₁ = p₂ · V₂',
} as const


export const boylePracticeInstructions = [
  'Kéo pít-tông từ từ để thay đổi thể tích khí.',
  'Chỉ ghi số liệu khi trạng thái nhiệt đã trở về cân bằng.',
  'Không ghi hai lần ở cùng một mức thể tích.',
  'Thu thập đủ 5 lần đo rồi chuyển sang phần Kết luận.',
  'Có thể bật góc nhìn vi mô và thử nút Nén nhanh để quan sát sai lệch khi quá trình không còn đẳng nhiệt.',
] as const


export const boyleObservationPrompts:
  readonly {
    id: BoyleObservationId
    prompt: string
  }[] = [
  {
    id: 'pressure-volume-relationship',
    prompt:
      'Từ số liệu và đồ thị, hãy nhận xét mối liên hệ giữa áp suất p và thể tích V.',
  },
  {
    id: 'microscopic-explanation',
    prompt:
      'Khi giảm thể tích khối khí, hãy giải thích ở mức độ vi mô vì sao áp suất tăng.',
  },
]


export const boyleAssessmentQuestions:
  readonly BoyleAssessmentQuestion[] = [
  {
    id: 'q1',
    prompt:
      'Trong hệ tọa độ (p, V), đường đẳng nhiệt có dạng nào?',
    options: [
      'A. Đường thẳng qua gốc tọa độ',
      'B. Đường hypebol',
      'C. Đường parabol',
      'D. Đường cong bậc ba',
    ],
    correctOption: 1,
  },
  {
    id: 'q2',
    prompt:
      'Vì sao áp suất tăng khi nén khí đẳng nhiệt?',
    options: [
      'A. Kích thước phân tử tăng',
      'B. Mật độ phân tử tăng nên va chạm với thành bình thường xuyên hơn',
      'C. Nhiệt độ tăng liên tục',
      'D. Lực hút giữa các phân tử tăng mạnh',
    ],
    correctOption: 1,
  },
  {
    id: 'q3',
    prompt:
      'Điều kiện để áp dụng định luật Boyle-Mariotte cho một lượng khí xác định là gì?',
    options: [
      'A. Áp suất không đổi',
      'B. Thể tích không đổi',
      'C. Nhiệt độ không đổi',
      'D. Khối lượng riêng không đổi',
    ],
    correctOption: 2,
  },
  {
    id: 'q4',
    prompt:
      'Một lượng khí có V₁ = 3,0 cm³. Nếu nén đẳng nhiệt xuống V₂ = 1,5 cm³ thì áp suất thay đổi thế nào?',
    options: [
      'A. Tăng gấp đôi',
      'B. Giảm một nửa',
      'C. Tăng gấp bốn',
      'D. Không đổi',
    ],
    correctOption: 0,
  },
]
