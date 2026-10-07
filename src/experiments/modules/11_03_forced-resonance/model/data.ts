import type {
  ExperimentModuleMeta,
  ExperimentPhaseDefinition,
} from '../../../core/types'


export const forcedResonanceMeta:
  ExperimentModuleMeta = {
  sourceCode:
    '11_03',

  slug:
    'forced-resonance',

  grade:
    11,

  chapterSlug:
    'dao-dong-co',

  topic:
    'Dao động cơ',

  title:
    'Cộng hưởng Cơ',

  description:
    'Khảo sát dao động cưỡng bức của hệ nhiều con lắc và điều kiện xảy ra hiện tượng cộng hưởng.',

  accent:
    'orange',
}


export const forcedResonancePhases:
  readonly ExperimentPhaseDefinition[] = [
    {
      id:
        'intro',

      label:
        '1. Giới thiệu',

      title:
        'Dao động cưỡng bức & cộng hưởng',
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
        'Khảo sát hệ con lắc',
    },

    {
      id:
        'conclusion',

      label:
        '4. Kết luận',

      title:
        'Điều kiện cộng hưởng',
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
