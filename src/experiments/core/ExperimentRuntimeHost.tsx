import type {
  ReactNode,
} from 'react'


interface ExperimentRuntimeHostProps {
  /**
   * Có mount runtime hay không.
   *
   * Cho phép module nặng như Boyle
   * quyết định thời điểm warm-up.
   */
  mounted?: boolean

  /**
   * Runtime hiện có đang là phase
   * được hiển thị hay không.
   */
  active: boolean

  children:
    ReactNode
}


export default function ExperimentRuntimeHost({
  mounted = true,
  active,
  children,
}: ExperimentRuntimeHostProps) {
  if (!mounted) {
    return null
  }

  return (
    <div
      className={[
        'experiment-runtime-host',

        active
          ? 'experiment-runtime-host--active'
          : 'experiment-runtime-host--inactive',
      ].join(' ')}
      aria-hidden={
        active
          ? undefined
          : true
      }
    >
      {children}
    </div>
  )
}