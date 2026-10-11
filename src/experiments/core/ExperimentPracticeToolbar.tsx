
import type { ReactNode } from 'react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

export type ExperimentPracticeToolbarItem =
  | {
      kind: 'panel'
      id: string
      label: string
      icon: ReactNode
      disabled?: boolean
    }
  | {
      kind: 'action'
      id: string
      label: string
      icon: ReactNode
      onClick: () => void
      disabled?: boolean
    }
  | {
      kind: 'separator'
      id: string
    }

interface ExperimentPracticeToolbarProps {
  items: readonly ExperimentPracticeToolbarItem[]
  activePanelId: string | null
  onPanelChange: (panelId: string | null) => void

  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void

  ariaLabel?: string
  className?: string
}

/**
 * UI thuần:
 * - Không giữ state của panel.
 * - Không biết controller hoặc physics.
 * - Không trực tiếp mở floating window.
 * - Chỉ thông báo lựa chọn qua callback.
 */
export default function ExperimentPracticeToolbar({
  items,
  activePanelId,
  onPanelChange,
  expanded = false,
  onExpandedChange,
  ariaLabel = 'Công cụ thực hành',
  className = '',
}: ExperimentPracticeToolbarProps) {
  return (
    <nav
      className={[
        'experiment-practice-toolbar',
        expanded
          ? 'experiment-practice-toolbar--expanded'
          : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        if (item.kind === 'separator') {
          return (
            <span
              key={item.id}
              className="experiment-practice-toolbar__separator"
              role="separator"
              aria-orientation="horizontal"
            />
          )
        }

        const isActive =
          item.kind === 'panel' &&
          activePanelId === item.id

        
        function handleClick() {
            if (item.kind === 'panel') {
                onPanelChange(
                isActive ? null : item.id,
                )
                return
            }

            if (item.kind === 'action') {
                item.onClick()
            }
        }

        return (
          <button
            key={item.id}
            type="button"
            className={[
              'experiment-practice-toolbar__button',
              isActive
                ? 'experiment-practice-toolbar__button--active'
                : '',
            ].filter(Boolean).join(' ')}
            aria-label={item.label}
            title={item.label}
            aria-pressed={
              item.kind === 'panel'
                ? isActive
                : undefined
            }
            disabled={item.disabled}
            onClick={handleClick}
          >
            <span
              className="experiment-practice-toolbar__icon"
              aria-hidden="true"
            >
              {item.icon}
            </span>

            <span className="experiment-practice-toolbar__label">
              {item.label}
            </span>
          </button>
        )
      })}

      {onExpandedChange && (
        <>
          <span
            className="experiment-practice-toolbar__separator"
            role="separator"
            aria-orientation="horizontal"
          />

          <button
            type="button"
            className="experiment-practice-toolbar__button experiment-practice-toolbar__expand-toggle"
            aria-label={
              expanded
                ? 'Thu gọn thanh công cụ'
                : 'Mở rộng thanh công cụ'
            }
            title={
              expanded
                ? 'Thu gọn thanh công cụ'
                : 'Mở rộng thanh công cụ'
            }
            aria-pressed={expanded}
            onClick={() =>
              onExpandedChange(!expanded)
            }
          >
            <span
              className="experiment-practice-toolbar__icon"
              aria-hidden="true"
            >
              {expanded
                ? <ChevronsRight size={18} />
                : <ChevronsLeft size={18} />}
            </span>

            <span className="experiment-practice-toolbar__label">
              {expanded ? 'Thu gọn' : 'Mở rộng'}
            </span>
          </button>
        </>
      )}
    </nav>
  )
}
