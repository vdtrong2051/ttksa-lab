import {
  Link,
} from 'react-router'

import type {
  GradeCurriculum,
  GradeLevel,
} from '../../catalog/types'

import {
  getExperimentCount,
} from '../../catalog/registry'

import type {
  AppIconName,
} from '../../types/icon'

import AppIcon from '../ui/AppIcon'

interface GradeCardProps {
  curriculum: GradeCurriculum
}

interface GradeStyle {
  icon: AppIconName

  iconSurface: string
  iconColor: string

  accent: string
  hoverBorder: string
}

/**
 * Màu theo lớp chỉ đóng vai trò accent.
 *
 * Không gradient riêng từng card.
 * Không shadow màu riêng.
 * Không nhuộm toàn bộ background.
 */
const gradeStyle: Record<
  GradeLevel,
  GradeStyle
> = {
  10: {
    icon: 'rocket',

    iconSurface:
      'bg-sky-50',

    iconColor:
      'text-sky-600',

    accent:
      'text-sky-700',

    hoverBorder:
      'hover:border-sky-200',
  },

  11: {
    icon: 'zap',

    iconSurface:
      'bg-amber-50',

    iconColor:
      'text-amber-600',

    accent:
      'text-amber-700',

    hoverBorder:
      'hover:border-amber-200',
  },

  12: {
    icon:
      'graduation-cap',

    iconSurface:
      'bg-violet-50',

    iconColor:
      'text-violet-600',

    accent:
      'text-violet-700',

    hoverBorder:
      'hover:border-violet-200',
  },
}

export default function GradeCard({
  curriculum,
}: GradeCardProps) {
  const style =
    gradeStyle[
      curriculum.grade
    ]

  const experimentCount =
    getExperimentCount(
      curriculum.grade,
    )

  const hasContent =
    experimentCount > 0

  return (
    <Link
      to={`/experiments/${curriculum.grade}`}
      aria-label={`Mở chương trình Vật lý ${curriculum.grade}`}
      className={[
        'group',

        'flex h-full flex-col',

        'border',
        'border-white/90',

        'bg-(--surface)',

        'p-6',

        'rounded-(--radius-card)',
        '[box-shadow:var(--shadow-sm)]',

        'backdrop-blur-md',

        'transition',
        'duration-200',

        'hover:-translate-y-0.5',
        'hover:bg-(--surface-strong)',
        'hover:[box-shadow:var(--shadow-md)]',

        style.hoverBorder,
      ].join(' ')}
    >
      {/* =====================================================
          TOP
          ===================================================== */}

      <div className="flex items-start justify-between gap-4">
        {/* ICON */}

        <div
          className={[
            'flex h-11 w-11',
            'shrink-0',
            'items-center',
            'justify-center',

            'rounded-(--radius-control)',

            style.iconSurface,
            style.iconColor,
          ].join(' ')}
        >
          <AppIcon
            name={style.icon}
            size={24}
            strokeWidth={1.8}
          />
        </div>

        {/* GRADE LABEL */}

        <span
          className={[
            'pt-1',

            'text-xs',
            'font-semibold',

            'tracking-[0.08em]',

            style.accent,
          ].join(' ')}
        >
          LỚP {curriculum.grade}
        </span>
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="mt-6 flex flex-1 flex-col">
        <h2 className="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">
          Vật lý{' '}
          {curriculum.grade}
        </h2>

        <p className="mt-3 flex-1 text-sm leading-6 text-soft">
          {curriculum.description}
        </p>

        {/* ===================================================
            FOOTER
            =================================================== */}

        <div className="mt-7 flex items-center justify-between gap-4 border-t border-(--color-border-soft) pt-4">
          <span
            className={[
              'text-sm',
              'font-medium',

              hasContent
                ? 'text-soft'
                : 'text-muted',
            ].join(' ')}
          >
            {hasContent
              ? `${experimentCount} thí nghiệm`
              : 'Nội dung đang cập nhật'}
          </span>

          <span
            className={[
              'flex h-8 w-8',
              'items-center',
              'justify-center',

              'rounded-(--radius-control)',

              'text-brand-600',

              'transition',
              'duration-150',

              'group-hover:translate-x-0.5',
              'group-hover:bg-brand-100',
            ].join(' ')}
            aria-hidden="true"
          >
            <AppIcon
              name="chevron-right"
              size={17}
              strokeWidth={2}
            />
          </span>
        </div>
      </div>
    </Link>
  )
}