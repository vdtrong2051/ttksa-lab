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
    border:
      'border-(--topic-thermal-accent)/40',

    title:
      'text-(--topic-thermal)',

    icon:
      'bg-(--topic-thermal-soft) text-(--topic-thermal)',

    tag:
      'bg-(--topic-thermal-soft) text-(--topic-thermal)',

    action:
      'bg-(--topic-thermal-soft) text-(--topic-thermal) hover:brightness-95',
  },

  sky: {
    border:
      'border-(--topic-gas-accent)/40',

    title:
      'text-(--topic-gas)',

    icon:
      'bg-(--topic-gas-soft) text-(--topic-gas)',

    tag:
      'bg-(--topic-gas-soft) text-(--topic-gas)',

    action:
      'bg-(--topic-gas-soft) text-(--topic-gas) hover:brightness-95',
  },

  violet: {
    border:
      'border-(--topic-magnetic-accent)/40',

    title:
      'text-(--topic-magnetic)',

    icon:
      'bg-(--topic-magnetic-soft) text-(--topic-magnetic)',

    tag:
      'bg-(--topic-magnetic-soft) text-(--topic-magnetic)',

    action:
      'bg-(--topic-magnetic-soft) text-(--topic-magnetic) hover:brightness-95',
  },

  teal: {
    border:
      'border-(--topic-nuclear-accent)/40',

    title:
      'text-(--topic-nuclear)',

    icon:
      'bg-(--topic-nuclear-soft) text-(--topic-nuclear)',

    tag:
      'bg-(--topic-nuclear-soft) text-(--topic-nuclear)',

    action:
      'bg-(--topic-nuclear-soft) text-(--topic-nuclear) hover:brightness-95',
  },

  amber: {
    border:
      'border-(--topic-oscillation-accent)/40',

    title:
      'text-(--topic-oscillation)',

    icon:
      'bg-(--topic-oscillation-soft) text-(--topic-oscillation)',

    tag:
      'bg-(--topic-oscillation-soft) text-(--topic-oscillation)',

    action:
      'bg-(--topic-oscillation-soft) text-(--topic-oscillation) hover:brightness-95',
  },
}