import type {
  ExperimentAssessmentQuestion,
} from '../../../core/assessment'

import type {
  ExperimentModuleMeta,
  ExperimentPhaseDefinition,
} from '../../../core/types'

import type {
  TemplatePreparationToolId,
  TemplateQuestionId,
} from './types'

import type {
  TemplateObservationId,
} from './types'

export const templateMeta:
  ExperimentModuleMeta =
  {
    sourceCode:
      '_template',

    slug:
      'template',

    grade:
      12,

    chapterSlug:
      'khi-li-tuong',

    topic:
      'Khung chuẩn GĐ2',

    title:
      'Thí nghiệm mẫu',

    description:
      'Module kiểm thử kiến trúc chung trước khi tích hợp các thí nghiệm thật.',

    accent:
      'cyan',
  }


export const templatePhases =
  [
    {
      id:
        'intro',

      label:
        '1. Giới thiệu',

      title:
        'Giới thiệu',

      description:
        'Kiểm tra content phase và navigation bằng URL.',
    },

    {
      id:
        'preparation',

      label:
        '2. Chuẩn bị',

      title:
        'Chuẩn bị',

      description:
        'Kiểm tra preparation state được giữ xuyên route.',
    },

    {
      id:
        'practice',

      label:
        '3. Thực hành',

      title:
        'Thực hành',

      description:
        'Kiểm tra persistent runtime và dữ liệu phiên.',
    },

    {
      id:
        'conclusion',

      label:
        '4. Kết luận',

      title:
        'Kết luận',

      description:
        'Kiểm tra dữ liệu từ Practice được sử dụng ở phase khác.',
    },

    {
      id:
        'quiz',

      label:
        '5. Luyện tập',

      title:
        'Luyện tập',

      description:
        'Kiểm tra shared assessment infrastructure.',
    },

    {
      id:
        'report',

      label:
        '6. Báo cáo',

      title:
        'Báo cáo',

      description:
        'Kiểm tra printable report infrastructure.',
    },
  ] as const satisfies
    readonly ExperimentPhaseDefinition[]


export const templateQuestions:
  readonly ExperimentAssessmentQuestion<
    TemplateQuestionId
  >[] =
  [
    {
      id:
        'q1',

      prompt:
        'Trong kiến trúc mới, thành phần nào là nguồn xác định phase hiện tại?',

      options: [
        'A. Controller',
        'B. URL Router',
        'C. Simulation',
        'D. Component local state',
      ],

      correctOption:
        1,
    },

    {
      id:
        'q2',

      prompt:
        'Trạng thái số liệu của một phiên thí nghiệm nên được giữ ở đâu để không mất khi chuyển phase?',

      options: [
        'A. Trong từng Page component',
        'B. Trong CSS của workspace',
        'C. Trong Controller ở SessionLayout',
        'D. Trong PhaseNav',
      ],

      correctOption:
        2,
    },

    {
      id:
        'q3',

      prompt:
        'Vì sao runtime WebGL nặng được đặt ngoài Outlet trong SessionLayout?',

      options: [
        'A. Để Canvas có thể giữ mount khi URL phase thay đổi',
        'B. Để Router không cần hoạt động',
        'C. Để mọi phase đều trở thành Canvas',
        'D. Để thay thế hoàn toàn Controller',
      ],

      correctOption:
        0,
    },
  ]

export interface TemplatePreparationTool {
  id:
    TemplatePreparationToolId

  name:
    string

  description:
    string

  icon:
    'gauge' |
    'flask' |
    'flame' |
    'activity'

  correct:
    boolean
}


export const templatePreparationTools:
  readonly TemplatePreparationTool[] =
  [
    {
      id:
        'sensor',

      name:
        'Bộ cảm biến',

      description:
        'Thiết bị thu nhận đại lượng cần theo dõi trong phiên thí nghiệm.',

      icon:
        'gauge',

      correct:
        true,
    },

    {
      id:
        'container',

      name:
        'Bộ thí nghiệm',

      description:
        'Cụm thiết bị chính được sử dụng để tiến hành phép đo.',

      icon:
        'flask',

      correct:
        true,
    },

    {
      id:
        'heater',

      name:
        'Nguồn gia nhiệt',

      description:
        'Dụng cụ gây nhiễu, không cần thiết cho module kiểm thử này.',

      icon:
        'flame',

      correct:
        false,
    },

    {
      id:
        'balance',

      name:
        'Thiết bị đo phụ',

      description:
        'Dụng cụ không thuộc bộ thiết bị cần lựa chọn trong bước chuẩn bị.',

      icon:
        'activity',

      correct:
        false,
    },
  ]

export const templateObservationPrompts:
  readonly {
    id:
      TemplateObservationId

    prompt:
      string
  }[] =
  [
    {
      id:
        'evidence',

      prompt:
        'Từ số liệu đã thu thập, bạn nhận xét gì về quá trình thực hành vừa thực hiện?',
    },

    {
      id:
        'runtime',

      prompt:
        'Sau khi chuyển giữa các phase rồi quay lại, trạng thái phiên và runtime cho thấy điều gì?',
    },
  ]


export const templateRuntimeConfig =
  {
    targetMeasurementCount:
      3,
  } as const