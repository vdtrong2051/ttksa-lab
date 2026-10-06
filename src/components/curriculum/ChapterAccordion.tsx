import type {
  ReactNode,
} from 'react'

import {
  Link,
} from 'react-router'

import type {
  Chapter,
  GradeLevel,
} from '../../catalog/types'

import AppIcon from '../ui/AppIcon'

import {
  chapterThemeClasses,
} from './theme'

interface ChapterAccordionProps {
  grade: GradeLevel
  chapter: Chapter
  expanded?: boolean
  children?: ReactNode
}

export default function ChapterAccordion({
  grade,
  chapter,
  expanded = false,
  children,
}: ChapterAccordionProps) {
  const theme =
    chapterThemeClasses[
      chapter.theme
    ]

  const target = expanded
    ? `/experiments/${grade}`
    : `/experiments/${grade}/${chapter.slug}`

  const chevronState =
    expanded
      ? 'rotate-180 bg-brand-600 text-white'
      : 'bg-white/80 text-soft'

  return (
    <section
      className={[
        'overflow-hidden',
        'border',
        theme.border,

        'bg-[var(--surface)]',

        '[border-radius:var(--radius-panel)]',
        '[box-shadow:var(--shadow-sm)]',

        'backdrop-blur-md',

        'transition',
        'duration-200',

        'hover:[box-shadow:var(--shadow-md)]',
      ].join(' ')}
    >
      {/* =====================================================
          CHAPTER HEADER
          ===================================================== */}

      <Link
        to={target}
        className={[
          'flex w-full',
          'items-center',
          'justify-between',

          'gap-4',

          'px-5 py-4',
          'md:px-6 md:py-5',

          'transition',
          'duration-150',

          'hover:bg-white/40',
        ].join(' ')}
      >
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-4">
          {/* ICON */}
          <div
            className={[
              'flex h-11 w-11',
              'shrink-0',
              'items-center',
              'justify-center',

              '[border-radius:var(--radius-control)]',

              theme.icon,
            ].join(' ')}
          >
            <AppIcon
              name={chapter.icon}
              size={23}
              strokeWidth={1.9}
            />
          </div>

          {/* TITLE */}
          <div className="min-w-0">
            <h2
              className={[
                'm-0',

                'text-left',
                'text-lg',
                'font-bold',

                'tracking-[-0.015em]',

                'md:text-xl',

                theme.title,
              ].join(' ')}
            >
              Chuyên đề:{' '}
              {chapter.title}
            </h2>

            <p className="mt-1 text-left text-sm font-medium text-muted">
              {
                chapter
                  .experiments
                  .length
              }{' '}
              thí nghiệm
            </p>
          </div>
        </div>

        {/* CHEVRON */}
        <div
          className={[
            'flex h-9 w-9',
            'shrink-0',
            'items-center',
            'justify-center',

            '[border-radius:var(--radius-control)]',

            'transition',
            'duration-200',

            chevronState,
          ].join(' ')}
          aria-hidden="true"
        >
          <AppIcon
            name="chevron-down"
            size={18}
            strokeWidth={2}
          />
        </div>
      </Link>

      {/* =====================================================
          EXPANDED CONTENT
          ===================================================== */}

      {expanded && (
        <div
          className={[
            'border-t',
            theme.border,

            'bg-white/30',

            'p-5',
            'md:p-6',
          ].join(' ')}
        >
          {children}
        </div>
      )}
    </section>
  )
}