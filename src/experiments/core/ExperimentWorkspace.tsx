import type {
  ReactNode,
} from 'react'


interface ExperimentWorkspaceProps {
  className?: string

  expanded?: boolean

  simulation:
    ReactNode

  children?:
    ReactNode
}


export default function ExperimentWorkspace({
  className =
    '',

  expanded =
    false,

  simulation,

  children,
}: ExperimentWorkspaceProps) {
  return (
    <div
      className={[
        'experiment-runtime-workspace',

        expanded
          ? 'experiment-runtime-workspace--expanded'
          : '',

        className,
      ]
        .filter(
          Boolean,
        )
        .join(
          ' ',
        )}
    >
      <div className="experiment-runtime-workspace__simulation">
        {simulation}
      </div>

      {children}
    </div>
  )
}