import { useEffect, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'

import AppIcon from '../../../../components/ui/AppIcon'

import ExperimentFloatingPanel from '../../../core/ExperimentFloatingPanel'
import type { FloatingPanelPosition } from '../../../core/ExperimentFloatingPanel'
import ExperimentPracticeDock from '../../../core/ExperimentPracticeDock'
import ExperimentPracticeToolbar from '../../../core/ExperimentPracticeToolbar'
import type { ExperimentPracticeToolbarItem } from '../../../core/ExperimentPracticeToolbar'
import ExperimentPracticeWorkspace from '../../../core/ExperimentPracticeWorkspace'
import ExperimentToast from '../../../core/ExperimentToast'

import { useTemplateSession } from '../context'
import { templateRuntimeConfig } from '../model/data'

const TARGET_MEASUREMENT_COUNT =
  templateRuntimeConfig.targetMeasurementCount

type PracticeFeedback =
  | {
      tone: 'success' | 'error' | 'info'
      message: string
    }
  | null

export default function PracticePage() {
  const { controller, navigation } = useTemplateSession()

  // UI state belongs to PracticePage, not the physics controller.
  const [activePanelId, setActivePanelId] = useState<string | null>(null)
  const [panelPosition, setPanelPosition] =
    useState<FloatingPanelPosition | null>(null)
  const [toolbarExpanded, setToolbarExpanded] = useState(false)
  const [workspaceExpanded, setWorkspaceExpanded] = useState(false)
  const [feedback, setFeedback] = useState<PracticeFeedback>(null)

  // Escape ưu tiên đóng Floating Panel; khi không có panel sẽ thu nhỏ Workspace.
  useEffect(() => {
    if (!workspaceExpanded || activePanelId !== null) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setWorkspaceExpanded(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [workspaceExpanded, activePanelId])

  const measurementComplete =
    controller.measurementCount >= TARGET_MEASUREMENT_COUNT

  const measurementProgress = Math.min(
    controller.measurementCount / TARGET_MEASUREMENT_COUNT,
    1,
  )

  function handleRecordMeasurement() {
    if (measurementComplete) {
      setFeedback({
        tone: 'info',
        message: 'Đã thu thập đủ số lần đo cho phiên thực hành mẫu.',
      })
      return
    }

    controller.recordMeasurement()
    setFeedback({
      tone: 'success',
      message: `Đã ghi số liệu lần ${controller.measurementCount + 1}/${TARGET_MEASUREMENT_COUNT}.`,
    })
  }

  function handleClearMeasurements() {
    if (controller.measurementCount === 0) {
      setFeedback({
        tone: 'info',
        message: 'Chưa có số liệu để xóa.',
      })
      return
    }

    controller.clearMeasurements()
    setFeedback({
      tone: 'success',
      message: 'Đã xóa toàn bộ số liệu của phiên thực hành.',
    })
  }

  function handleContinue() {
    if (!measurementComplete) {
      setFeedback({
        tone: 'error',
        message: `Hãy hoàn thành đủ ${TARGET_MEASUREMENT_COUNT} lần đo trước khi chuyển sang Kết luận.`,
      })
      return
    }

    setWorkspaceExpanded(false)
    navigation.next()
  }

  function handlePrevious() {
    setWorkspaceExpanded(false)
    navigation.previous()
  }

  const tools: ExperimentPracticeToolbarItem[] = [
    {
      kind: 'panel',
      id: 'instructions',
      label: 'Hướng dẫn',
      icon: <AppIcon name="book-open" size={18} strokeWidth={1.8} />,
    },
    {
      kind: 'panel',
      id: 'measurements',
      label: 'Số liệu',
      icon: <AppIcon name="gauge" size={18} strokeWidth={1.8} />,
    },
    { kind: 'separator', id: 'fullscreen-separator' },
    {
      kind: 'action',
      id: 'fullscreen',
      label: workspaceExpanded ? 'Thu nhỏ' : 'Toàn màn hình',
      icon: workspaceExpanded
        ? <Minimize2 size={18} strokeWidth={1.8} />
        : <Maximize2 size={18} strokeWidth={1.8} />,
      onClick: () => setWorkspaceExpanded(current => !current),
    },
  ]

  const panelTitle =
    activePanelId === 'instructions'
      ? 'Hướng dẫn thực hành'
      : 'Bảng đo'

  return (
    <div
      className={[
        'template-practice',
        workspaceExpanded ? 'template-practice--expanded' : '',
      ].filter(Boolean).join(' ')}
    >
      <ExperimentPracticeWorkspace
        toolbar={
          <ExperimentPracticeToolbar
            items={tools}
            activePanelId={activePanelId}
            onPanelChange={setActivePanelId}
            expanded={toolbarExpanded}
            onExpandedChange={setToolbarExpanded}
          />
        }
        panel={
          <ExperimentFloatingPanel
            open={activePanelId !== null}
            title={panelTitle}
            position={panelPosition}
            onPositionChange={setPanelPosition}
            onClose={() => setActivePanelId(null)}
          >
            {activePanelId === 'instructions' && (
              <ol className="template-practice__instructions">
                <li>
                  <strong>1.</strong>
                  <span>Quan sát runtime mô phỏng ở vùng trung tâm.</span>
                </li>
                <li>
                  <strong>2.</strong>
                  <span>Thực hiện tương tác cần thiết với mô hình.</span>
                </li>
                <li>
                  <strong>3.</strong>
                  <span>Ghi lại dữ liệu khi hệ đạt trạng thái phù hợp.</span>
                </li>
                <li>
                  <strong>4.</strong>
                  <span>
                    Hoàn thành đủ {TARGET_MEASUREMENT_COUNT} lần đo trước khi
                    rút ra kết luận.
                  </span>
                </li>
              </ol>
            )}

            {activePanelId === 'measurements' && (
              <>
                <div
                  className="template-practice-measurement__progress"
                  role="progressbar"
                  aria-label="Tiến độ thu thập số liệu"
                  aria-valuemin={0}
                  aria-valuemax={TARGET_MEASUREMENT_COUNT}
                  aria-valuenow={controller.measurementCount}
                >
                  <span
                    style={{ transform: `scaleX(${measurementProgress})` }}
                  />
                </div>

                <div className="template-practice-live-data">
                  <div className="template-practice-live-data__item">
                    <span>Runtime</span>
                    <strong>Hoạt động</strong>
                  </div>
                  <div className="template-practice-live-data__item">
                    <span>Session state</span>
                    <strong>Trong phiên</strong>
                  </div>
                  <div className="template-practice-live-data__item">
                    <span>Trạng thái đo</span>
                    <strong
                      className={
                        measurementComplete
                          ? 'template-practice-live-data__complete'
                          : 'template-practice-live-data__ready'
                      }
                    >
                      {measurementComplete ? 'Hoàn tất' : 'Sẵn sàng'}
                    </strong>
                  </div>
                </div>

                <div className="template-practice-measurement__actions">
                  <button
                    type="button"
                    className="experiment-lab-button experiment-lab-button--primary"
                    disabled={measurementComplete}
                    onClick={handleRecordMeasurement}
                  >
                    Ghi số liệu
                  </button>
                  <button
                    type="button"
                    className="experiment-lab-button"
                    onClick={handleClearMeasurements}
                  >
                    Xóa số liệu
                  </button>
                </div>

                <div className="template-practice-measurement__table-wrap">
                  <table className="template-practice-measurement-table">
                    <thead>
                      <tr>
                        <th scope="col">Lần</th>
                        <th scope="col">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: TARGET_MEASUREMENT_COUNT }).map(
                        (_, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {index < controller.measurementCount
                                ? 'Đã ghi'
                                : '—'}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                {measurementComplete && (
                  <div className="template-practice-complete">
                    <div className="template-practice-complete__status">
                      <span
                        className="template-practice-complete__icon"
                        aria-hidden="true"
                      >
                        <AppIcon name="activity" size={18} strokeWidth={2} />
                      </span>
                      <div>
                        <strong>Đã hoàn thành thu thập</strong>
                        <span>
                          Dữ liệu của phiên đã sẵn sàng cho bước phân tích.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </ExperimentFloatingPanel>
        }
        dock={
          <ExperimentPracticeDock
            status={measurementComplete ? 'Đã đủ dữ liệu' : 'Sẵn sàng đo'}
            statusTone={measurementComplete ? 'success' : 'neutral'}
            metrics={[
              {
                id: 'measurement-count',
                label: 'Số lần đo',
                value: `${controller.measurementCount}/${TARGET_MEASUREMENT_COUNT}`,
                emphasis: true,
              },
            ]}
            actions={[
              {
                id: 'previous',
                label: 'Chuẩn bị',
                onClick: handlePrevious,
              },
              {
                id: 'next',
                label: 'Kết luận',
                primary: true,
                disabled: !measurementComplete,
                onClick: handleContinue,
              },
            ]}
          />
        }
      >
        {workspaceExpanded && (
          <div className="experiment-workspace__escape-hint">
            Esc để thoát toàn màn hình
          </div>
        )}
        {feedback && (
          <ExperimentToast
            className="template-practice__feedback"
            tone={feedback.tone}
            message={feedback.message}
          />
        )}
      </ExperimentPracticeWorkspace>
    </div>
  )
}
