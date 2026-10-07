import type {
  ExperimentPhaseDefinition,
  ExperimentPhaseId,
} from './types'


export const experimentPhases =
  [
    {
      id:
        'intro',

      label:
        '1. Giới thiệu',

      title:
        'Giới thiệu',

      description:
        'Tìm hiểu mục tiêu, hiện tượng vật lý và kiến thức nền của thí nghiệm.',
    },

    {
      id:
        'preparation',

      label:
        '2. Chuẩn bị',

      title:
        'Chuẩn bị',

      description:
        'Lựa chọn, kiểm tra hoặc lắp ráp các dụng cụ cần thiết trước khi thực hành.',
    },

    {
      id:
        'practice',

      label:
        '3. Thực hành',

      title:
        'Thực hành',

      description:
        'Tương tác với mô phỏng, quan sát hiện tượng và thu thập dữ liệu.',
    },

    {
      id:
        'conclusion',

      label:
        '4. Kết luận',

      title:
        'Kết luận',

      description:
        'Phân tích kết quả, ghi nhận quan sát và rút ra kết luận vật lý.',
    },

    {
      id:
        'quiz',

      label:
        '5. Luyện tập',

      title:
        'Luyện tập',

      description:
        'Củng cố kiến thức bằng câu hỏi hoặc hoạt động sau thí nghiệm.',
    },

    {
      id:
        'report',

      label:
        '6. Báo cáo',

      title:
        'Báo cáo',

      description:
        'Đối chiếu dữ liệu và hoàn thành phiếu báo cáo thực hành.',
    },
  ] as const satisfies
    readonly ExperimentPhaseDefinition[]


export const experimentPhaseOrder:
  readonly ExperimentPhaseId[] =
    experimentPhases.map(
      (phase) =>
        phase.id,
    )


export const initialExperimentPhase:
  ExperimentPhaseId =
    'intro'


export function isExperimentPhaseId(
  value: string,
): value is ExperimentPhaseId {
  return experimentPhaseOrder.includes(
    value as ExperimentPhaseId,
  )
}


export function getExperimentPhase(
  phaseId:
    ExperimentPhaseId,
) {
  return experimentPhases.find(
    (phase) =>
      phase.id ===
      phaseId,
  )
}


export function getExperimentBasePath(
  experimentSlug:
    string,
) {
  return `/lab/${experimentSlug}`
}


export function getExperimentPhasePath(
  experimentSlug:
    string,

  phaseId:
    ExperimentPhaseId,
) {
  return `${getExperimentBasePath(
    experimentSlug,
  )}/${phaseId}`
}


export function getExperimentEntryPath(
  experimentSlug:
    string,
) {
  return getExperimentPhasePath(
    experimentSlug,
    initialExperimentPhase,
  )
}


export function getExperimentCatalogPath(
  grade:
    number,

  chapterSlug:
    string,
) {
  return `/experiments/${grade}/${chapterSlug}`
}


export function getAdjacentExperimentPhase(
  activePhase:
    ExperimentPhaseId,

  direction:
    -1 | 1,
):
  ExperimentPhaseId | null {
  const currentIndex =
    experimentPhaseOrder.indexOf(
      activePhase,
    )

  if (
    currentIndex < 0
  ) {
    return null
  }

  return (
    experimentPhaseOrder[
      currentIndex +
        direction
    ] ??
    null
  )
}

export function getExperimentPhaseFromPathname(
  pathname: string,
): ExperimentPhaseId | null {
  const segments =
    pathname
      .split('/')
      .filter(Boolean)

  const lastSegment =
    segments.at(-1)

  if (
    !lastSegment ||
    !isExperimentPhaseId(
      lastSegment,
    )
  ) {
    return null
  }

  return lastSegment
}