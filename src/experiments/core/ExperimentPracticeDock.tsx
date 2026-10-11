
import type { ReactNode } from 'react'

export interface ExperimentPracticeDockMetric {
  id: string
  label: string
  value: ReactNode
  emphasis?: boolean
}

export interface ExperimentPracticeDockAction {
  id: string
  label: string
  onClick: () => void
  disabled?: boolean
  primary?: boolean
  icon?: ReactNode
}

interface ExperimentPracticeDockProps {
  status: string
  statusTone?: 'neutral' | 'success' | 'warning' | 'error'
  metrics?: readonly ExperimentPracticeDockMetric[]
  actions?: readonly ExperimentPracticeDockAction[]
  className?: string
  ariaLabel?: string
}

/**
 * Thanh trạng thái dùng chung cho Practice.
 *
 * - Không giữ state nghiệp vụ.
 * - Không tính toán số liệu vật lý.
 * - Không tự điều hướng.
 * - Module cung cấp metrics và callbacks.
 */
export default function ExperimentPracticeDock({
  status,
  statusTone = 'neutral',
  metrics = [],
  actions = [],
  className = '',
  ariaLabel = 'Trạng thái và thao tác thực hành',
}: ExperimentPracticeDockProps) {
  return (
    <div
      className={[
        'experiment-practice-dock',
        className,
      ].filter(Boolean).join(' ')}
      role="group"
      aria-label={ariaLabel}
    >
      <div
        className={[
          'experiment-practice-dock__status',
          `experiment-practice-dock__status--${statusTone}`,
        ].join(' ')}
        title={status}
      >
        <span
          className="experiment-practice-dock__status-dot"
          aria-hidden="true"
        />
        <span className="experiment-practice-dock__status-label">
          {status}
        </span>
      </div>

      {metrics.length > 0 && (
        <dl className="experiment-practice-dock__metrics">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={[
                'experiment-practice-dock__metric',
                metric.emphasis
                  ? 'experiment-practice-dock__metric--emphasis'
                  : '',
              ].filter(Boolean).join(' ')}
            >
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {actions.length > 0 && (
        <div className="experiment-practice-dock__actions">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={[
                'experiment-practice-dock__button',
                action.primary
                  ? 'experiment-practice-dock__button--primary'
                  : '',
              ].filter(Boolean).join(' ')}
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.icon && (
                <span
                  className="experiment-practice-dock__button-icon"
                  aria-hidden="true"
                >
                  {action.icon}
                </span>
              )}

              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
