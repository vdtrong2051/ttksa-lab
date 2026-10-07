import type {
  ExperimentModuleMeta,
  ExperimentPhaseDefinition,
} from '../../../core/types'


export const harmonicMotionMeta:
  ExperimentModuleMeta = {
  sourceCode:
    '11_01',

  slug:
    'harmonic-motion',

  grade:
    11,

  chapterSlug:
    'dao-dong-co',

  topic:
    'Dao động cơ',

  title:
    'Dao động điều hòa & chuyển động tròn đều',

  description:
    'Trực quan hóa mối liên hệ giữa dao động điều hòa của con lắc lò xo và hình chiếu của chuyển động tròn đều.',

  accent:
    'amber',
}


export const harmonicMotionPhases:
  readonly ExperimentPhaseDefinition[] = [
    {
      id:
        'intro',

      label:
        '1. Giới thiệu',

      title:
        'Giới thiệu',
    },

    {
      id:
        'preparation',

      label:
        '2. Chuẩn bị',

      title:
        'Chuẩn bị',
    },

    {
      id:
        'practice',

      label:
        '3. Thực hành',

      title:
        'Thực hành',
    },

    {
      id:
        'conclusion',

      label:
        '4. Kết luận',

      title:
        'Kết luận',
    },

    {
      id:
        'quiz',

      label:
        '5. Luyện tập',

      title:
        'Luyện tập',
    },

    {
      id:
        'report',

      label:
        '6. Báo cáo',

      title:
        'Báo cáo',
    },
  ]
