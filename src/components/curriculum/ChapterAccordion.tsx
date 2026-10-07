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

  const target =
    expanded
      ? `/experiments/${grade}`
      : `/experiments/${grade}/${chapter.slug}`


  return (
    <section
      className={[
        'overflow-hidden',

        'border',
        theme.border,

        'bg-(--surface)',

        'rounded-(--radius-panel)',

        'shadow-(--shadow-sm)',

        'backdrop-blur-md',

        'transition',
        'duration-200',

        'hover:shadow-(--shadow-md)',
      ].join(' ')}
    >
      {/* =====================================================
          CHAPTER HEADER
          ===================================================== */}

      <Link
        to={target}
        aria-expanded={expanded}
        className={[
          'group',

          'flex',
          'w-full',
          'items-center',
          'justify-between',

          'gap-4',

          'px-5',
          'py-5',

          'md:px-7',
          'md:py-6',

          'transition',
          'duration-150',

          'hover:bg-white/35',

          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-inset',
          'focus-visible:ring-slate-400/25',
        ].join(' ')}
      >
        {/* ===================================================
            LEFT
            =================================================== */}

        <div className="flex min-w-0 items-center gap-4">
          {/* ICON */}

          <div
            className={[
              'flex',
              'h-12',
              'w-12',
              'shrink-0',
              'items-center',
              'justify-center',

              'rounded-(--radius-control)',

              theme.icon,
            ].join(' ')}
          >
            <AppIcon
              name={
                chapter.icon
              }
              size={24}
              strokeWidth={1.9}
            />
          </div>


          {/* TEXT */}

          <div className="min-w-0">
            <h2
              className={[
                'm-0',

                'text-left',
                'text-xl',
                'font-bold',
                'tracking-tight',

                'md:text-2xl',

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


        {/* ===================================================
            CHEVRON

            Không còn dùng brand purple.
            Closed  -> neutral
            Expanded -> màu đúng chuyên đề
            =================================================== */}

        <div
          className={[
            'flex',
            'h-10',
            'w-10',
            'shrink-0',
            'items-center',
            'justify-center',

            'rounded-(--radius-control)',

            'transition',
            'duration-200',

            expanded
              ? theme.icon
              : [
                  'bg-transparent',
                  'text-muted',

                  'group-hover:bg-(--nav-hover-background)',
                  'group-hover:text-ink',
                ].join(
                  ' ',
                ),
          ].join(' ')}
          aria-hidden="true"
        >
          <AppIcon
            name="chevron-down"
            size={19}
            strokeWidth={2}
            className={[
              'transition-transform',
              'duration-200',

              expanded
                ? 'rotate-180'
                : '',
            ].join(' ')}
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

            'bg-white/28',

            'p-5',

            'md:p-7',
          ].join(' ')}
        >
          {children}
        </div>
      )}
    </section>
  )
}