import type {
  ButtonHTMLAttributes,
  CSSProperties,
} from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'gradient'

type ButtonSize =
  | 'sm'
  | 'md'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<
  ButtonVariant,
  string
> = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700',

  secondary:
    'border border-(--color-border) bg-white/80 text-ink hover:border-brand-200 hover:bg-white',

  ghost:
    'bg-transparent text-soft hover:bg-white/70 hover:text-brand-700',

  gradient:
    'text-white shadow-sm hover:-translate-y-px hover:shadow-md',
}

const sizeClasses: Record<
  ButtonSize,
  string
> = {
  sm:
    'min-h-9 px-3.5 text-sm',

  md:
    'min-h-10 px-4 text-sm',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  type = 'button',
  ...props
}: ButtonProps) {
  const gradientStyle:
    CSSProperties | undefined =
    variant === 'gradient'
      ? {
          background:
            'var(--portal-gradient)',
          ...style,
        }
      : style

  return (
    <button
      {...props}
      type={type}
      style={gradientStyle}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold',
        'transition duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'rounded-(--radius-button)',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    />
  )
}