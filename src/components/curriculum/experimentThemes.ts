import type {
  ExperimentAccent,
} from '../../catalog/types'


interface ExperimentThemeClasses {
  icon: string
  tag: string
  action: string

  blob: string

  hoverBorder: string
  hoverShadow: string

  accentText: string
}


export const experimentThemeClasses: Record<
  ExperimentAccent,
  ExperimentThemeClasses
> = {
  rose: {
    icon:
      'bg-(--exp-rose-soft) text-(--exp-rose)',

    tag:
      'bg-(--exp-rose-soft) text-(--exp-rose)',

    action:
      'bg-(--exp-rose-soft) text-(--exp-rose) hover:brightness-95',

    blob:
      'bg-(--exp-rose-blob)',

    hoverBorder:
      'hover:border-(--exp-rose-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-rose-shadow)]',

    accentText:
      'text-(--exp-rose)',
  },


  orange: {
    icon:
      'bg-(--exp-orange-soft) text-(--exp-orange)',

    tag:
      'bg-(--exp-orange-soft) text-(--exp-orange)',

    action:
      'bg-(--exp-orange-soft) text-(--exp-orange) hover:brightness-95',

    blob:
      'bg-(--exp-orange-blob)',

    hoverBorder:
      'hover:border-(--exp-orange-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-orange-shadow)]',

    accentText:
      'text-(--exp-orange)',
  },


  amber: {
    icon:
      'bg-(--exp-amber-soft) text-(--exp-amber)',

    tag:
      'bg-(--exp-amber-soft) text-(--exp-amber)',

    action:
      'bg-(--exp-amber-soft) text-(--exp-amber) hover:brightness-95',

    blob:
      'bg-(--exp-amber-blob)',

    hoverBorder:
      'hover:border-(--exp-amber-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-amber-shadow)]',

    accentText:
      'text-(--exp-amber)',
  },


  pink: {
    icon:
      'bg-(--exp-pink-soft) text-(--exp-pink)',

    tag:
      'bg-(--exp-pink-soft) text-(--exp-pink)',

    action:
      'bg-(--exp-pink-soft) text-(--exp-pink) hover:brightness-95',

    blob:
      'bg-(--exp-pink-blob)',

    hoverBorder:
      'hover:border-(--exp-pink-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-pink-shadow)]',

    accentText:
      'text-(--exp-pink)',
  },


  fuchsia: {
    icon:
      'bg-(--exp-fuchsia-soft) text-(--exp-fuchsia)',

    tag:
      'bg-(--exp-fuchsia-soft) text-(--exp-fuchsia)',

    action:
      'bg-(--exp-fuchsia-soft) text-(--exp-fuchsia) hover:brightness-95',

    blob:
      'bg-(--exp-fuchsia-blob)',

    hoverBorder:
      'hover:border-(--exp-fuchsia-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-fuchsia-shadow)]',

    accentText:
      'text-(--exp-fuchsia)',
  },


  red: {
    icon:
      'bg-(--exp-red-soft) text-(--exp-red)',

    tag:
      'bg-(--exp-red-soft) text-(--exp-red)',

    action:
      'bg-(--exp-red-soft) text-(--exp-red) hover:brightness-95',

    blob:
      'bg-(--exp-red-blob)',

    hoverBorder:
      'hover:border-(--exp-red-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-red-shadow)]',

    accentText:
      'text-(--exp-red)',
  },


  sky: {
    icon:
      'bg-(--exp-sky-soft) text-(--exp-sky)',

    tag:
      'bg-(--exp-sky-soft) text-(--exp-sky)',

    action:
      'bg-(--exp-sky-soft) text-(--exp-sky) hover:brightness-95',

    blob:
      'bg-(--exp-sky-blob)',

    hoverBorder:
      'hover:border-(--exp-sky-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-sky-shadow)]',

    accentText:
      'text-(--exp-sky)',
  },


  cyan: {
    icon:
      'bg-(--exp-cyan-soft) text-(--exp-cyan)',

    tag:
      'bg-(--exp-cyan-soft) text-(--exp-cyan)',

    action:
      'bg-(--exp-cyan-soft) text-(--exp-cyan) hover:brightness-95',

    blob:
      'bg-(--exp-cyan-blob)',

    hoverBorder:
      'hover:border-(--exp-cyan-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-cyan-shadow)]',

    accentText:
      'text-(--exp-cyan)',
  },


  blue: {
    icon:
      'bg-(--exp-blue-soft) text-(--exp-blue)',

    tag:
      'bg-(--exp-blue-soft) text-(--exp-blue)',

    action:
      'bg-(--exp-blue-soft) text-(--exp-blue) hover:brightness-95',

    blob:
      'bg-(--exp-blue-blob)',

    hoverBorder:
      'hover:border-(--exp-blue-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-blue-shadow)]',

    accentText:
      'text-(--exp-blue)',
  },


  violet: {
    icon:
      'bg-(--exp-violet-soft) text-(--exp-violet)',

    tag:
      'bg-(--exp-violet-soft) text-(--exp-violet)',

    action:
      'bg-(--exp-violet-soft) text-(--exp-violet) hover:brightness-95',

    blob:
      'bg-(--exp-violet-blob)',

    hoverBorder:
      'hover:border-(--exp-violet-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-violet-shadow)]',

    accentText:
      'text-(--exp-violet)',
  },


  purple: {
    icon:
      'bg-(--exp-purple-soft) text-(--exp-purple)',

    tag:
      'bg-(--exp-purple-soft) text-(--exp-purple)',

    action:
      'bg-(--exp-purple-soft) text-(--exp-purple) hover:brightness-95',

    blob:
      'bg-(--exp-purple-blob)',

    hoverBorder:
      'hover:border-(--exp-purple-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-purple-shadow)]',

    accentText:
      'text-(--exp-purple)',
  },


  indigo: {
    icon:
      'bg-(--exp-indigo-soft) text-(--exp-indigo)',

    tag:
      'bg-(--exp-indigo-soft) text-(--exp-indigo)',

    action:
      'bg-(--exp-indigo-soft) text-(--exp-indigo) hover:brightness-95',

    blob:
      'bg-(--exp-indigo-blob)',

    hoverBorder:
      'hover:border-(--exp-indigo-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-indigo-shadow)]',

    accentText:
      'text-(--exp-indigo)',
  },


  teal: {
    icon:
      'bg-(--exp-teal-soft) text-(--exp-teal)',

    tag:
      'bg-(--exp-teal-soft) text-(--exp-teal)',

    action:
      'bg-(--exp-teal-soft) text-(--exp-teal) hover:brightness-95',

    blob:
      'bg-(--exp-teal-blob)',

    hoverBorder:
      'hover:border-(--exp-teal-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-teal-shadow)]',

    accentText:
      'text-(--exp-teal)',
  },


  emerald: {
    icon:
      'bg-(--exp-emerald-soft) text-(--exp-emerald)',

    tag:
      'bg-(--exp-emerald-soft) text-(--exp-emerald)',

    action:
      'bg-(--exp-emerald-soft) text-(--exp-emerald) hover:brightness-95',

    blob:
      'bg-(--exp-emerald-blob)',

    hoverBorder:
      'hover:border-(--exp-emerald-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-emerald-shadow)]',

    accentText:
      'text-(--exp-emerald)',
  },


  green: {
    icon:
      'bg-(--exp-green-soft) text-(--exp-green)',

    tag:
      'bg-(--exp-green-soft) text-(--exp-green)',

    action:
      'bg-(--exp-green-soft) text-(--exp-green) hover:brightness-95',

    blob:
      'bg-(--exp-green-blob)',

    hoverBorder:
      'hover:border-(--exp-green-border)',

    hoverShadow:
      'hover:[box-shadow:0_14px_34px_var(--exp-green-shadow)]',

    accentText:
      'text-(--exp-green)',
  },
}