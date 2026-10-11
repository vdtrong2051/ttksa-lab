
import type { ReactNode } from 'react'

interface ExperimentPracticeWorkspaceProps {
  toolbar: ReactNode
  panel?: ReactNode
  dock: ReactNode
  children?: ReactNode
  className?: string
}

/**
 * Lớp giao diện nằm phía trên simulation.
 *
 * Không sở hữu:
 * - Canvas / WebGL
 * - Controller
 * - Navigation
 * - Trạng thái mở panel
 *
 * Chỉ bố trí các thành phần giao diện.
 */
export default function ExperimentPracticeWorkspace({
  toolbar,
  panel,
  dock,
  children,
  className = '',
}: ExperimentPracticeWorkspaceProps) {
  return (
    <div
      className={[
        'experiment-practice-workspace',
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
