
import type { ReactNode } from 'react'

interface ExperimentPracticeWorkspaceProps {
  toolbar: ReactNode
  panel?: ReactNode
  dock: ReactNode
  children?: ReactNode
  className?: string
  expanded?: boolean
}

export default function ExperimentPracticeWorkspace({
  toolbar,
  panel,
  dock,
  children,
  className = '',
  expanded = false,
}: ExperimentPracticeWorkspaceProps) {
  return (
    <div
      className={[
        'experiment-practice-workspace',
        expanded
          ? 'experiment-practice-workspace--expanded'
          : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
      {toolbar}
      {panel}
      {dock}
    </div>
  )
}
