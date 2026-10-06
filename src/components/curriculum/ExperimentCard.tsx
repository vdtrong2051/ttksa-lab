import {
  Link,
} from 'react-router'

import type {
  ChapterTheme,
  Experiment,
  GradeLevel,
} from '../../catalog/types'

import AppIcon from '../ui/AppIcon'

import {
  chapterThemeClasses,
} from './theme'

interface ExperimentCardProps {
  grade: GradeLevel
  chapterSlug: string
  experiment: Experiment
  theme: ChapterTheme

  /**
   * Số thứ tự hiển thị trong chương.
   * Ví dụ:
   * 1. Chuyển động Brown
   * 2. Sự biến đổi nội năng
   */
  order: number
}

export default function ExperimentCard({
  grade,
  chapterSlug,
  experiment,
  theme,
  order,
}: ExperimentCardProps) {
  const classes =
    chapterThemeClasses[theme]

  const isReady =
    experiment.status === 'ready'

  const experimentUrl =
    `/experiments/${grade}/${chapterSlug}/${experiment.slug}`

  return (
    <article
      className={[
        'group',

        'flex h-full flex-col',

        'border',
        'border-white/85',

        'bg-[var(--surface)]',

        'p-5',
        'md:p-6',

        '[border-radius:var(--radius-card)]',
        '[box-shadow:var(--shadow-xs)]',

        'backdrop-blur-md',

        'transition',
        'duration-200',

        'hover:-translate-y-0.5',
        'hover:border-white',
        'hover:bg-[var(--surface-strong)]',
        'hover:[box-shadow:var(--shadow-md)]',
      ].join(' ')}
    >
      {/* =====================================================
          ICON
          ===================================================== */}

      <div
        className={[
          'flex h-12 w-12',
          'shrink-0',
          'items-center',
          'justify-center',

          '[border-radius:var(--radius-control)]',

          classes.icon,
        ].join(' ')}
      >
        <AppIcon
          name={experiment.icon}
          size={25}
          strokeWidth={1.8}
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="mt-5 flex flex-1 flex-col">
        {/* TITLE */}

        <h3 className="m-0 text-lg font-bold leading-snug tracking-[-0.015em] text-ink">
          {order}.{' '}
          {experiment.title}
        </h3>

        {/* DESCRIPTION */}

        <p className="mt-3 flex-1 text-sm font-normal leading-6 text-soft">
          {experiment.description}
        </p>

        {/* ===================================================
            FOOTER
            =================================================== */}

        <div className="mt-6 flex min-h-9 flex-wrap items-center justify-between gap-3">
          {/* TAG */}

          <span
            className={[
              'inline-flex',
              'items-center',

              'px-3 py-1.5',

              'text-xs',
              'font-semibold',

              '[border-radius:var(--radius-pill)]',

              classes.tag,
            ].join(' ')}
          >
            {experiment.tag}
          </span>

          {/* ACTION */}

          {isReady ? (
            <Link
              to={experimentUrl}
              aria-label={`Bắt đầu ${experiment.title}`}
              className={[
                'inline-flex',
                'items-center',
                'gap-1.5',

                'px-3 py-2',

                'text-sm',
                'font-semibold',

                '[border-radius:var(--radius-button)]',

                'transition',
                'duration-150',

                classes.action,

                /*
                 * Mobile:
                 * luôn hiện vì không có hover.
                 *
                 * Desktop:
                 * giống lab-old — action chỉ nổi lên
                 * khi hover/focus card.
                 */
                'md:translate-x-1',
                'md:opacity-0',

                'md:group-hover:translate-x-0',
                'md:group-hover:opacity-100',

                'md:group-focus-within:translate-x-0',
                'md:group-focus-within:opacity-100',
              ].join(' ')}
            >
              <span>
                Bắt đầu
              </span>

              <AppIcon
                name="chevron-right"
                size={15}
                strokeWidth={2.2}
              />
            </Link>
          ) : (
            <Link
              to={experimentUrl}
              aria-label={`Xem thông tin ${experiment.title}`}
              className={[
                'inline-flex',
                'items-center',
                'gap-1.5',

                'px-2 py-1',

                'text-xs',
                'font-medium',

                'text-muted',

                'transition',

                'hover:text-soft',
              ].join(' ')}
            >
              <span>
                Sắp ra mắt
              </span>

              <AppIcon
                name="chevron-right"
                size={14}
                strokeWidth={2}
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}