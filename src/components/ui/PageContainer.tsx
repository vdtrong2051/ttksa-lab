import type {
  HTMLAttributes,
} from 'react'

interface PageContainerProps
  extends HTMLAttributes<HTMLDivElement> {}

export default function PageContainer({
  className = '',
  ...props
}: PageContainerProps) {
  return (
    <div
      {...props}
      className={[
        'page-container',
        className,
      ].join(' ')}
    />
  )
}