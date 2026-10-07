import {
  useEffect,
  useRef,
  useState,
} from 'react'

import type {
  ReactNode,
} from 'react'

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Lock,
  Maximize2,
  Microscope,
  Minimize2,
  Table2,
  Trash2,
  Unlock,
  Zap,
} from 'lucide-react'

import ExperimentToast from '../../../core/ExperimentToast'

import {
  useBoyleSession,
} from '../context'

import {
  boylePhysicsConfig,
  boyleUnits,
} from '../model/constants'

import {
  boylePracticeInstructions,
} from '../model/data'

import {
  calculatePressure,
} from '../model/physics'

import BoyleGraph from '../components/BoyleGraph'


type FeedbackTone =
  | 'success'
  | 'error'
  | 'info'


interface ToolbarButtonProps {
  label: string
  expanded: boolean
  active?: boolean
  onClick: () => void
  icon: ReactNode
}


function ToolbarButton({
  label,
  expanded,
  active = false,
  onClick,
  icon,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      className={[
        'boyle-practice-toolbar__button',
        active
          ? 'boyle-practice-toolbar__button--active'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <span
        className="boyle-practice-toolbar__icon"
        aria-hidden="true"
      >
        {icon}
      </span>

      {expanded && (
        <span className="boyle-practice-toolbar__label">
          {label}
        </span>
      )}
    </button>
  )
}


export default function PracticePage() {
  const {
    controller,
    navigation,
    runtimeUi,
  } = useBoyleSession()

  const [showInstructions, setShowInstructions] =
    useState(true)

  const [showMeasurements, setShowMeasurements] =
    useState(true)

  const [toolbarExpanded, setToolbarExpanded] =
    useState(false)

  const [feedback, setFeedback] =
    useState('')

  const [feedbackTone, setFeedbackTone] =
    useState<FeedbackTone>('info')

  const feedbackTimerRef =
    useRef<number | null>(null)


  useEffect(() => {
    return () => {
      if (
        feedbackTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          feedbackTimerRef.current,
        )
      }
    }
  }, [])


  const equilibriumPressure =
    calculatePressure(
      controller.runtime.volume,
      boylePhysicsConfig.boyleConstant,
    )

  const hasEnoughMeasurements =
    controller.measurements.length >=
    boylePhysicsConfig.targetMeasurementCount


  function showFeedback(
    message: string,
    tone: FeedbackTone,
  ) {
    setFeedback(message)
    setFeedbackTone(tone)

    if (
      feedbackTimerRef.current !==
      null
    ) {
      window.clearTimeout(
        feedbackTimerRef.current,
      )
    }

    feedbackTimerRef.current =
      window.setTimeout(
        () => {
          setFeedback('')
          feedbackTimerRef.current =
            null
        },
        2800,
      )
  }


  function handleRecord() {
    const nextMeasurementNumber =
      controller.measurements.length + 1

    const result =
      controller.recordMeasurement()

    if (result === 'recorded') {
      showFeedback(
        `Đã ghi số liệu lần ${nextMeasurementNumber}/${boylePhysicsConfig.targetMeasurementCount}.`,
        'success',
      )
      return
    }

    if (
      result ===
      'thermal-transient'
    ) {
      showFeedback(
        'Khối khí chưa cân bằng nhiệt. Hãy chờ nhiệt độ trở về gần 27°C trước khi ghi.',
        'error',
      )
      return
    }

    if (
      result ===
      'duplicate-volume'
    ) {
      showFeedback(
        'Mức thể tích này đã được ghi. Hãy thay đổi vị trí pít-tông.',
        'error',
      )
      return
    }

    showFeedback(
      'Đã đủ 5 lần đo cho thí nghiệm.',
      'success',
    )
  }


  function handleClearMeasurements() {
    controller.clearMeasurements()

    showFeedback(
      'Đã xóa toàn bộ số liệu đã ghi.',
      'info',
    )
  }


  function handleFastCompression() {
    const accepted =
      controller.applyFastCompression()

    if (!accepted) {
      showFeedback(
        'Hệ đang ở trạng thái nhiệt chưa cân bằng.',
        'error',
      )
      return
    }

    runtimeUi.triggerFirePulse()

    showFeedback(
      'Nén nhanh làm nhiệt độ và áp suất tăng tạm thời. Đây không phải trạng thái đẳng nhiệt để ghi số liệu.',
      'info',
    )
  }


  if (!runtimeUi.ready) {
    return (
      <div className="boyle-practice-loading">
        <div className="boyle-practice-loading__spinner" />

        <strong>
          Đang khởi tạo mô phỏng 3D...
        </strong>

        <span>
          Chuẩn bị WebGL và mô hình Boyle-Mariotte.
        </span>
      </div>
    )
  }


  return (
    <div className="boyle-practice">
      {feedback && (
        <ExperimentToast
          tone={feedbackTone}
          message={feedback}
          className="boyle-practice__toast"
        />
      )}


      {/* ===================================================
          HƯỚNG DẪN
          =================================================== */}

      {showInstructions && (
        <aside className="boyle-practice-panel boyle-practice-panel--instructions">
          <div className="boyle-practice-panel__header">
            <div>
              <span className="boyle-eyebrow">
                Hướng dẫn
              </span>

              <h3>
                Tiến hành thí nghiệm
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowInstructions(false)
              }
              aria-label="Ẩn hướng dẫn"
            >
              ×
            </button>
          </div>

          <ol className="boyle-practice-instructions">
            {boylePracticeInstructions.map(
              (instruction) => (
                <li key={instruction}>
                  {instruction}
                </li>
              ),
            )}
          </ol>
        </aside>
      )}


      {/* ===================================================
          PANEL SỐ LIỆU

          Ghi / Xóa số liệu thuộc panel này,
          không nằm trong toolbar runtime.
          =================================================== */}

      {showMeasurements && (
        <aside className="boyle-practice-panel boyle-practice-panel--measurements">
          <div className="boyle-practice-panel__header">
            <div>
              <span className="boyle-eyebrow">
                Số liệu
              </span>

              <h3>
                {controller.measurements.length}
                {' / '}
                {boylePhysicsConfig.targetMeasurementCount}
                {' lần đo'}
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowMeasurements(false)
              }
              aria-label="Ẩn số liệu"
            >
              ×
            </button>
          </div>

          <div className="boyle-measurement-table-wrap">
            <table className="boyle-measurement-table">
              <thead>
                <tr>
                  <th>Lần</th>
                  <th>V</th>
                  <th>p</th>
                  <th>pV</th>
                </tr>
              </thead>

              <tbody>
                {controller.measurements.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      Chưa có số liệu
                    </td>
                  </tr>
                ) : (
                  controller.measurements.map(
                    (
                      measurement,
                      index,
                    ) => (
                      <tr
                        key={`${measurement.volume}-${index}`}
                      >
                        <th scope="row">
                          {index + 1}
                        </th>

                        <td>
                          {measurement.volume.toFixed(2)}
                        </td>

                        <td>
                          {measurement.pressure.toFixed(3)}
                        </td>

                        <td>
                          {measurement.pressureVolume.toFixed(3)}
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="boyle-practice-measurement__actions">
            <button
              type="button"
              className="experiment-lab-button"
              onClick={
                handleClearMeasurements
              }
              disabled={
                controller.measurements.length ===
                0
              }
            >
              <Trash2
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span>
                Xóa số liệu
              </span>
            </button>

            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={handleRecord}
              disabled={
                hasEnoughMeasurements
              }
            >
              <Gauge
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span>
                Ghi số liệu
              </span>
            </button>
          </div>

          <BoyleGraph
            measurements={
              controller.measurements
            }
          />
        </aside>
      )}


      {/* ===================================================
          TOOLBAR DỌC BÊN PHẢI

          Chỉ chứa controls của workspace/runtime.
          Có 2 trạng thái:
          - collapsed: icon
          - expanded: icon + chữ
          =================================================== */}

      <aside
        className={[
          'boyle-practice-toolbar',
          toolbarExpanded
            ? 'boyle-practice-toolbar--expanded'
            : 'boyle-practice-toolbar--collapsed',
        ].join(' ')}
        aria-label="Công cụ mô phỏng"
      >
        <button
          type="button"
          className="boyle-practice-toolbar__toggle"
          onClick={() =>
            setToolbarExpanded(
              (value) => !value,
            )
          }
          aria-label={
            toolbarExpanded
              ? 'Thu gọn thanh công cụ'
              : 'Mở rộng thanh công cụ'
          }
          title={
            toolbarExpanded
              ? 'Thu gọn'
              : 'Mở rộng công cụ'
          }
        >
          {toolbarExpanded ? (
            <ChevronRight
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />
          ) : (
            <ChevronLeft
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}

          {toolbarExpanded && (
            <span>
              Thu gọn
            </span>
          )}
        </button>

        <div className="boyle-practice-toolbar__items">
          <ToolbarButton
            label="Hướng dẫn"
            expanded={toolbarExpanded}
            active={showInstructions}
            onClick={() =>
              setShowInstructions(
                (value) => !value,
              )
            }
            icon={
              <BookOpen
                size={19}
                strokeWidth={2}
              />
            }
          />

          <ToolbarButton
            label="Số liệu"
            expanded={toolbarExpanded}
            active={showMeasurements}
            onClick={() =>
              setShowMeasurements(
                (value) => !value,
              )
            }
            icon={
              <Table2
                size={19}
                strokeWidth={2}
              />
            }
          />

          <ToolbarButton
            label={
              runtimeUi.showParticles
                ? 'Ẩn vi mô'
                : 'Hiện vi mô'
            }
            expanded={toolbarExpanded}
            active={
              runtimeUi.showParticles
            }
            onClick={
              runtimeUi.toggleParticles
            }
            icon={
              <Microscope
                size={19}
                strokeWidth={2}
              />
            }
          />

          <ToolbarButton
            label={
              runtimeUi.orbitEnabled
                ? 'Khóa góc nhìn'
                : 'Mở góc nhìn'
            }
            expanded={toolbarExpanded}
            active={
              !runtimeUi.orbitEnabled
            }
            onClick={
              runtimeUi.toggleOrbit
            }
            icon={
              runtimeUi.orbitEnabled ? (
                <Lock
                  size={19}
                  strokeWidth={2}
                />
              ) : (
                <Unlock
                  size={19}
                  strokeWidth={2}
                />
              )
            }
          />

          <ToolbarButton
            label="Nén nhanh"
            expanded={toolbarExpanded}
            onClick={
              handleFastCompression
            }
            icon={
              <Zap
                size={19}
                strokeWidth={2}
              />
            }
          />

          <ToolbarButton
            label={
              runtimeUi.workspaceExpanded
                ? 'Thu nhỏ'
                : 'Toàn màn hình'
            }
            expanded={toolbarExpanded}
            active={
              runtimeUi.workspaceExpanded
            }
            onClick={
              runtimeUi.toggleWorkspaceExpanded
            }
            icon={
              runtimeUi.workspaceExpanded ? (
                <Minimize2
                  size={19}
                  strokeWidth={2}
                />
              ) : (
                <Maximize2
                  size={19}
                  strokeWidth={2}
                />
              )
            }
          />
        </div>
      </aside>


      {/* ===================================================
          CTA KẾT LUẬN

          Tách hoàn toàn khỏi toolbar.
          Chỉ xuất hiện khi đã đủ số liệu.
          =================================================== */}

      {hasEnoughMeasurements && (
        <button
          type="button"
          className="boyle-practice-conclusion"
          onClick={
            navigation.next
          }
        >
          <span>
            Kết luận
          </span>

          <ChevronRight
            size={18}
            strokeWidth={2.2}
            aria-hidden="true"
          />
        </button>
      )}


      {/* ===================================================
          PANEL TRẠNG THÁI

          Đặt cuối DOM để CSS bước B dock xuống đáy.
          =================================================== */}

      <div className="boyle-practice-status">
        <div>
          <span>V</span>

          <strong>
            {controller.runtime.volume.toFixed(2)}{' '}
            {boyleUnits.volume}
          </strong>
        </div>

        <div>
          <span>p cân bằng</span>

          <strong>
            {equilibriumPressure.toFixed(3)}{' '}
            {boyleUnits.pressure}
          </strong>
        </div>

        <div>
          <span>T</span>

          <strong>
            {runtimeUi.temperatureC.toFixed(1)}{' '}
            {boyleUnits.temperature}
          </strong>
        </div>

        <div>
          <span>Trạng thái</span>

          <strong
            className={
              controller.runtime.thermalCondition ===
              'equilibrium'
                ? 'is-stable'
                : 'is-transient'
            }
          >
            {controller.runtime.thermalCondition ===
            'equilibrium'
              ? 'Cân bằng nhiệt'
              : 'Đang trao đổi nhiệt'}
          </strong>
        </div>
      </div>


      {runtimeUi.workspaceExpanded && (
        <div className="experiment-workspace__escape-hint">
          Esc để thoát toàn màn hình
        </div>
      )}
    </div>
  )
}
