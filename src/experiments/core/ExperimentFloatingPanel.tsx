
import { useEffect, useRef } from 'react'
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react'
import { GripHorizontal, RotateCcw, X } from 'lucide-react'

export interface FloatingPanelPosition {
  x: number
  y: number
}

interface ExperimentFloatingPanelProps {
  open: boolean
  title: string
  children: ReactNode
  position: FloatingPanelPosition | null
  onPositionChange: (
    position: FloatingPanelPosition | null
  ) => void
  onClose: () => void
  className?: string
}

interface DragSession {
  pointerId: number
  startClientX: number
  startClientY: number
  startPosition: FloatingPanelPosition
  panelRect: DOMRect
  workspaceRect: DOMRect
}

const ZERO = { x: 0, y: 0 }
const EDGE_GAP = 12

const COMPACT_QUERY =
  '(max-width: 767px), (max-height: 520px)'

function isCompactLayout() {
  return window.matchMedia(COMPACT_QUERY).matches
}

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    Math.max(value, min),
    Math.max(min, max),
  )
}

function getWorkspaceElement(panel: HTMLElement) {
  return (
    panel.closest<HTMLElement>(
      '.experiment-template__route--practice',
    ) ??
    panel.parentElement ??
    panel
  )
}

function limitPosition(
  origin: FloatingPanelPosition,
  delta: FloatingPanelPosition,
  panel: DOMRect,
  workspace: DOMRect,
): FloatingPanelPosition {
  const minX =
    origin.x + workspace.left + EDGE_GAP - panel.left

  const maxX =
    origin.x + workspace.right - EDGE_GAP - panel.right

  const minY =
    origin.y + workspace.top + EDGE_GAP - panel.top

  const maxY =
    origin.y + workspace.bottom - EDGE_GAP - panel.bottom

  return {
    x: clamp(origin.x + delta.x, minX, maxX),
    y: clamp(origin.y + delta.y, minY, maxY),
  }
}

export default function ExperimentFloatingPanel({
  open,
  title,
  children,
  position,
  onPositionChange,
  onClose,
  className = '',
}: ExperimentFloatingPanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const dragRef = useRef<DragSession | null>(null)

  const positionRef = useRef(position)
  const onPositionChangeRef = useRef(onPositionChange)

  // Cung cấp giá trị mới nhất cho ResizeObserver.
  useEffect(() => {
    positionRef.current = position
    onPositionChangeRef.current = onPositionChange
  }, [position, onPositionChange])

  // Escape đóng panel kể cả khi focus ở Toolbar.
  useEffect(() => {
    if (!open) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape,
      )
    }
  }, [open, onClose])

  // Giữ panel trong Workspace khi kích thước thay đổi.
  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    if (!panel) return

    const workspace = getWorkspaceElement(panel)

    function keepInsideWorkspace() {
      if (!panel || isCompactLayout() || dragRef.current) {
        return
      }

      const adjustment = limitPosition(
        ZERO,
        ZERO,
        panel.getBoundingClientRect(),
        workspace.getBoundingClientRect(),
      )

      if (adjustment.x === 0 && adjustment.y === 0) {
        return
      }

      const current = positionRef.current ?? ZERO

      onPositionChangeRef.current({
        x: current.x + adjustment.x,
        y: current.y + adjustment.y,
      })
    }

    const observer = new ResizeObserver(
      keepInsideWorkspace,
    )

    observer.observe(workspace)
    observer.observe(panel)

    window.addEventListener(
      'resize',
      keepInsideWorkspace,
    )

    return () => {
      observer.disconnect()

      window.removeEventListener(
        'resize',
        keepInsideWorkspace,
      )
    }
  }, [open])

  function handlePointerDown(
    event: ReactPointerEvent<HTMLButtonElement>,
  ) {
    if (
      event.button !== 0 ||
      isCompactLayout() ||
      dragRef.current
    ) {
      return
    }

    const panel = panelRef.current
    if (!panel) return

    const workspace = getWorkspaceElement(panel)

    dragRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPosition: position ?? ZERO,
      panelRect: panel.getBoundingClientRect(),
      workspaceRect: workspace.getBoundingClientRect(),
    }

    event.currentTarget.setPointerCapture(
      event.pointerId,
    )

    event.preventDefault()
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLButtonElement>,
  ) {
    const drag = dragRef.current

    if (!drag || drag.pointerId !== event.pointerId) {
      return
    }

    onPositionChange(
      limitPosition(
        drag.startPosition,
        {
          x: event.clientX - drag.startClientX,
          y: event.clientY - drag.startClientY,
        },
        drag.panelRect,
        drag.workspaceRect,
      ),
    )
  }

  function handlePointerEnd(
    event: ReactPointerEvent<HTMLButtonElement>,
  ) {
    if (dragRef.current?.pointerId !== event.pointerId) {
      return
    }

    dragRef.current = null

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      )
    }
  }

  // Di chuyển bằng bàn phím để hỗ trợ accessibility.
  function handleKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) {
    if (isCompactLayout()) return

    const step = event.shiftKey ? 20 : 10
    let dx = 0
    let dy = 0

    switch (event.key) {
      case 'ArrowLeft':
        dx = -step
        break
      case 'ArrowRight':
        dx = step
        break
      case 'ArrowUp':
        dy = -step
        break
      case 'ArrowDown':
        dy = step
        break
      default:
        return
    }

    event.preventDefault()

    const panel = panelRef.current
    if (!panel) return

    const workspace = getWorkspaceElement(panel)

    onPositionChange(
      limitPosition(
        position ?? ZERO,
        { x: dx, y: dy },
        panel.getBoundingClientRect(),
        workspace.getBoundingClientRect(),
      ),
    )
  }

  if (!open) return null

  return (
    <section
      ref={panelRef}
      className={[
        'experiment-floating-panel',
        className,
      ].filter(Boolean).join(' ')}
      role="region"
      aria-label={title}
      style={{
        transform: `translate3d(${
          position?.x ?? 0
        }px, ${position?.y ?? 0}px, 0)`,
      }}
    >
      <header className="experiment-floating-panel__header">
        <button
          type="button"
          className="experiment-floating-panel__drag-handle"
          aria-label={`Di chuyển ${title} bằng cách kéo hoặc dùng phím mũi tên`}
          title="Kéo để di chuyển · Phím mũi tên để điều chỉnh"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onLostPointerCapture={() => {
            dragRef.current = null
          }}
          onKeyDown={handleKeyDown}
        >
          <GripHorizontal size={17} aria-hidden="true" />
          <span>{title}</span>
        </button>

        <div className="experiment-floating-panel__actions">
          <button
            type="button"
            className="experiment-floating-panel__reset"
            aria-label={`Đặt lại vị trí ${title}`}
            title="Đặt lại vị trí"
            onClick={() => onPositionChange(null)}
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={`Đóng ${title}`}
            title="Đóng"
            onClick={onClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="experiment-floating-panel__content">
        {children}
      </div>
    </section>
  )
}
