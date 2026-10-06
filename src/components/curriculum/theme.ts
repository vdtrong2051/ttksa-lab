import type {
  ChapterTheme,
} from '../../catalog/types'

interface ChapterThemeClasses {
  border: string
  title: string
  icon: string
  tag: string
  action: string
}

export const chapterThemeClasses: Record<
  ChapterTheme,
  ChapterThemeClasses
> = {
  rose: {
    border: 'border-rose-200/80',
    title: 'text-rose-600',
    icon: 'bg-rose-100 text-rose-600',
    tag: 'bg-rose-50 text-rose-600',
    action:
      'bg-rose-100 text-rose-700 hover:bg-rose-200',
  },

  sky: {
    border: 'border-sky-200/80',
    title: 'text-sky-600',
    icon: 'bg-sky-100 text-sky-600',
    tag: 'bg-sky-50 text-sky-600',
    action:
      'bg-sky-100 text-sky-700 hover:bg-sky-200',
  },

  violet: {
    border: 'border-violet-200/80',
    title: 'text-violet-600',
    icon: 'bg-violet-100 text-violet-600',
    tag: 'bg-violet-50 text-violet-600',
    action:
      'bg-violet-100 text-violet-700 hover:bg-violet-200',
  },

  teal: {
    border: 'border-teal-200/80',
    title: 'text-teal-600',
    icon: 'bg-teal-100 text-teal-600',
    tag: 'bg-teal-50 text-teal-600',
    action:
      'bg-teal-100 text-teal-700 hover:bg-teal-200',
  },

  amber: {
    border: 'border-amber-200/80',
    title: 'text-amber-600',
    icon: 'bg-amber-100 text-amber-700',
    tag: 'bg-amber-50 text-amber-700',
    action:
      'bg-amber-100 text-amber-800 hover:bg-amber-200',
  },
}