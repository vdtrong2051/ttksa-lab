interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignment =
    align === 'center'
      ? 'mx-auto items-center text-center'
      : 'items-start text-left'

  return (
    <header
      className={[
        'flex max-w-3xl flex-col',
        alignment,
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-bold tracking-[0.08em] text-brand-600">
          {eyebrow}
        </p>
      )}

      <h2 className="m-0 text-3xl font-bold tracking-[-0.025em] text-ink md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-soft">
          {description}
        </p>
      )}
    </header>
  )
}