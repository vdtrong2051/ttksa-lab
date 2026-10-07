import type {
  ExperimentModuleMeta,
  ExperimentPhaseDefinition,
} from '../../../core/types'


export const dampedOscillationMeta:
  ExperimentModuleMeta = {
  sourceCode:
    '11_02',

  slug:
    'damped-oscillation',

  grade:
    11,

  chapterSlug:
    'dao-dong-co',

  topic:
    'Dao động cơ',

  title:
    'Dao động Tắt dần',

  description:
    'Khảo sát sự suy giảm biên độ của con lắc theo thời gian dưới tác dụng của lực cản môi trường.',

  accent:
    'rose',
}


export const dampedOscillationPhases:
  readonly ExperimentPhaseDefinition[] = [
    {
      id:
        'intro',

      label:
        '1. Giới thiệu',

      title:
        'Dao động tắt dần',
    },

    {
      id:
        'preparation',

      label:
        '2. Chuẩn bị',

      title:
        'Dụng cụ & bố trí',
    },

    {
      id:
        'practice',

      label:
        '3. Thực hành',

      title:
        'Ghi đồ thị dao động',
    },

    {
      id:
        'conclusion',

      label:
        '4. Kết luận',

      title:
        'Phân tích hiện tượng',
    },

    {
      id:
        'quiz',

      label:
        '5. Luyện tập',

      title:
        'Kiểm tra kiến thức',
    },

    {
      id:
        'report',

      label:
        '6. Báo cáo',

      title:
        'Báo cáo thực hành',
    },
  ]
