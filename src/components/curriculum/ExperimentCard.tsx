import {
  Link,
} from 'react-router'

import type {
  Experiment,
  GradeLevel,
} from '../../catalog/types'

import AppIcon from '../ui/AppIcon'

import {
  experimentThemeClasses,
} from './experimentThemes'


interface ExperimentCardProps {
  grade: GradeLevel
  chapterSlug: string
  experiment: Experiment
  order: number
}


export default function ExperimentCard({
  grade,
  chapterSlug,
  experiment,
  order,
}: ExperimentCardProps) {
  const theme =
    experimentThemeClasses[
      experiment.accent
    ]

  const isReady =
    experiment.status ===
    'ready'

  const experimentUrl =
    experiment.runtimePath ??
    `/experiments/${grade}/${chapterSlug}/${experiment.slug}`


  return (
    <article
      className={[
        'group',

        'relative',
        'isolate',

        'flex',
        'h-full',
        'flex-col',

        'overflow-hidden',

        'border',
        'border-white/90',

        'bg-white/72',

        'p-6',

        'md:p-7',

        'rounded-(--radius-card)',

        'shadow-(--shadow-card)',

        'backdrop-blur-xl',

        'transition',
        'duration-200',

        'hover:-translate-y-0.5',
        'hover:bg-white/92',

        theme.hoverBorder,
        theme.hoverShadow,
      ].join(' ')}
    >
      {/* =====================================================
          CORNER DECORATION
          Phục hồi visual anchor của lab-old.
          ===================================================== */}

      <div
        className={[
          'pointer-events-none',

          'absolute',
          'top-0',
          'right-0',

          '-z-10',

          'h-28',
          'w-28',

          'rounded-bl-[88px]',

          'opacity-70',

          'transition-transform',
          'duration-500',

          'group-hover:scale-110',

          theme.blob,
        ].join(' ')}
        aria-hidden="true"
      />


      {/* =====================================================
          ICON
          ===================================================== */}

      <div
        className={[
          'flex',

          'h-14',
          'w-14',

          'shrink-0',

          'items-center',
          'justify-center',

          'border',
          'border-white/80',

          'rounded-(--radius-card)',

          'shadow-(--shadow-xs)',

          theme.icon,
        ].join(' ')}
      >
        <AppIcon
          name={
            experiment.icon
          }
          size={27}
          strokeWidth={1.8}
        />
      </div>


      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="m-0 text-xl font-bold leading-snug tracking-tight text-ink">
          {order}.{' '}
          {experiment.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 font-medium text-soft">
          {
            experiment.description
          }
        </p>


        {/* ===================================================
            FOOTER
            =================================================== */}

        <div className="mt-7 flex min-h-9 flex-wrap items-center justify-between gap-3">
          {/* TAG */}

          <span
            className={[
              'inline-flex',
              'items-center',

              'border',
              'border-white/70',

              'px-3',
              'py-1.5',

              'text-xs',
              'font-semibold',
              'tracking-wide',

              'rounded-(--radius-pill)',

              'shadow-(--shadow-xs)',

              theme.tag,
            ].join(' ')}
          >
            {experiment.tag}
          </span>


          {/* =================================================
              READY ACTION
              ================================================= */}

          {isReady ? (
            <Link
              to={
                experimentUrl
              }
              aria-label={`Bắt đầu ${experiment.title}`}
              className={[
                'inline-flex',
                'items-center',
                'gap-1.5',

                'px-3',
                'py-2',

                'text-sm',
                'font-semibold',

                'rounded-(--radius-button)',

                'shadow-(--shadow-xs)',

                'transition',
                'duration-200',

                theme.action,

                /*
                 * Desktop:
                 * phục hồi interaction của lab-old:
                 * action xuất hiện khi hover card.
                 *
                 * Mobile:
                 * luôn hiển thị.
                 */
                'md:translate-x-2',
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
            /* ===============================================
               PLANNED

               Không làm nút nổi bật.
               =============================================== */

            <Link
              to={
                experimentUrl
              }
              aria-label={`Xem thông tin ${experiment.title}`}
              className={[
                'inline-flex',
                'items-center',
                'gap-1.5',

                'px-2',
                'py-1',

                'text-xs',
                'font-medium',

                'text-muted',

                'transition',
                'duration-150',

                'hover:text-ink',
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