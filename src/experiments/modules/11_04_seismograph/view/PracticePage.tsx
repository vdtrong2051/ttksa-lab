
import { useState } from 'react'

import type {
  ReactNode,
} from 'react'

import {
  LockKeyhole,
  UnlockKeyhole,
} from 'lucide-react'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useSeismographSession,
} from '../context'

import {
  MAX_SEISMOGRAPH_SNAPSHOTS,
  SEISMOGRAPH_GRAPH_COLORS,
} from '../model/types'

import SeismogramGraph from '../simulation/SeismogramGraph'

import AnalysisPanel from '../components/AnalysisPanel'

import './practice.css'


type ActivePanel =
  | 'controls'
  | 'data'
  | 'observation'
  | null


// ======================================================
// TOOLBAR BUTTON
// ======================================================

function Tool({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={[
        'seismo-tool',
        active ? 'seismo-tool--active' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  )
}


// ======================================================
// BOTTOM DOCK METRIC
// ======================================================

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="seismo-dock__metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}


// ======================================================
// PRACTICE PAGE
// ======================================================

export default function PracticePage() {
  const {
    controller,
    navigation,
  } = useSeismographSession()

  const [
    activePanel,
    setActivePanel,
  ] = useState<ActivePanel>('controls')

  const [
    showAnalysis,
    setShowAnalysis,
  ] = useState(false)

  const [
    feedback,
    setFeedback,
  ] = useState('')

  const snapshots = controller.snapshots

  // ====================================================
  // PANEL ACTIONS
  // ====================================================

  function togglePanel(
    panel: Exclude<ActivePanel, null>,
  ) {
    setActivePanel(
      (current) =>
        current === panel ? null : panel,
    )

    setFeedback('')
  }

  function handleCapture() {
    const success =
      controller.captureCurrentSnapshot()

    setFeedback(
      success
        ? `Đã lưu mẫu ${
            snapshots.length + 1
          }/${MAX_SEISMOGRAPH_SNAPSHOTS}. Đường ghi bắt đầu đoạn mới.`
        : snapshots.length >=
            MAX_SEISMOGRAPH_SNAPSHOTS
          ? 'Đã có đủ ba mẫu. Xóa bớt mẫu trước khi ghi tiếp.'
          : 'Cần chạy máy ít nhất 0,5 giây trước khi lưu mẫu.',
    )
  }

  // ====================================================
  // LIVE VALUES
  // ====================================================

  const earthquakeFrequency =
    controller.config.eqFreq

  const naturalFrequency =
    controller.config.naturalFreq

  const status =
    controller.isRunning
      ? 'Đang chạy'
      : controller.isPlaying
        ? 'Chờ tiếp tục'
        : 'Sẵn sàng / tạm dừng'

  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="seismo-practice">
      {/* ================================================
          TOP HINT
          ================================================ */}

      <div className="seismo-practice__hint">
        Thay đổi độ cứng lò xo, ghi ba mẫu,
        dùng đồ thị để suy ra tần số.
      </div>

      {/* ================================================
          FLOATING PANEL
          ================================================ */}

      {activePanel && (
        <aside
          className="seismo-practice__panel"
          aria-label="Bảng công cụ máy đo địa chấn"
        >
          {/* PANEL HEADER */}

          <header className="seismo-practice__panel-header">
            <div>
              <span>Máy đo địa chấn</span>

              <h3>
                {activePanel === 'controls'
                  ? 'Điều khiển'
                  : activePanel === 'data'
                    ? 'Dữ liệu đã ghi'
                    : 'Hướng dẫn quan sát'}
              </h3>
            </div>

            <button
              type="button"
              className="seismo-practice__close"
              aria-label="Đóng bảng công cụ"
              onClick={() =>
                setActivePanel(null)
              }
            >
              <AppIcon
                name="close"
                size={16}
              />
            </button>
          </header>

          {/* ============================================
              CONTROL PANEL
              ============================================ */}

          {activePanel === 'controls' && (
            <div className="seismo-practice__panel-body">
              {/* PLAY / PAUSE / RESET */}

              <div className="seismo-practice__actions">
                <button
                  type="button"
                  className="seismo-button seismo-button--primary"
                  onClick={
                    controller.isPlaying
                      ? controller.pause
                      : controller.play
                  }
                >
                  {controller.isPlaying
                    ? '⏸ Tạm dừng'
                    : '▶ Bắt đầu / Tiếp tục'}
                </button>

                <button
                  type="button"
                  className="seismo-button"
                  onClick={
                    controller.resetRun
                  }
                >
                  Làm mới
                </button>
              </div>

              {/* CAPTURE */}

              <button
                type="button"
                className="seismo-button seismo-button--capture"
                onClick={handleCapture}
                disabled={
                  snapshots.length >=
                  MAX_SEISMOGRAPH_SNAPSHOTS
                }
              >
                Lưu đồ thị hiện tại
                {' '}({snapshots.length}/
                {MAX_SEISMOGRAPH_SNAPSHOTS})
              </button>

              {/* ========================================
                  EARTHQUAKE FREQUENCY — FIXED
                  ======================================== */}

              <label className="seismo-practice__slider">
                <span>
                  <strong>
                    Động đất (ngoại lực)
                  </strong>

                  <small>
                    {earthquakeFrequency.toFixed(1)} Hz
                  </small>
                </span>

                <input
                  aria-label="Điều chỉnh tần số động đất"
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={earthquakeFrequency}
                  disabled={
                    controller.isPlaying
                  }
                  onChange={(event) => {
                    controller.setEarthquakeFrequency(
                      Number(event.target.value),
                    )
                  }}
                />
              </label>

              {/* ========================================
                  NATURAL FREQUENCY — FIXED
                  ======================================== */}

              <label className="seismo-practice__slider">
                <span>
                  <strong>
                    Độ cứng lò xo
                  </strong>

                  <small>
                    {naturalFrequency.toFixed(1)} Hz
                  </small>
                </span>

                <input
                  aria-label="Điều chỉnh tần số riêng của hệ lò xo"
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={naturalFrequency}
                  disabled={
                    controller.isPlaying
                  }
                  onChange={(event) => {
                    controller.setNaturalFrequency(
                      Number(event.target.value),
                    )
                  }}
                />
              </label>

              {/* PARAMETER GUIDANCE */}

              <p className="seismo-practice__muted">
                Điều chỉnh tần số động đất và
                tần số riêng của hệ lò xo.
                Tạm dừng mô phỏng trước khi
                thay đổi thông số.
              </p>

              {/* CAMERA CONTROL */}

              <button
                type="button"
                className="seismo-button"
                onClick={
                  controller.toggleCameraLock
                }
                aria-pressed={
                  controller.isCameraLocked
                }
              >
                {controller.isCameraLocked
                  ? 'Mở khóa góc nhìn'
                  : 'Khóa góc nhìn'}
              </button>
            </div>
          )}

          {/* ============================================
              DATA PANEL
              ============================================ */}

          {activePanel === 'data' && (
            <div className="seismo-practice__panel-body">
              <div className="seismo-practice__data-heading">
                <strong>
                  Đã lưu {snapshots.length}/
                  {MAX_SEISMOGRAPH_SNAPSHOTS} mẫu
                </strong>

                <button
                  type="button"
                  onClick={
                    controller.clearSnapshots
                  }
                  disabled={
                    snapshots.length === 0
                  }
                >
                  Xóa hết
                </button>
              </div>

              {snapshots.length === 0 ? (
                <p className="seismo-practice__muted">
                  Chưa có dữ liệu. Vào Điều khiển,
                  chạy mô phỏng rồi lưu đồ thị.
                </p>
              ) : (
                <div className="seismo-practice__samples">
                  {snapshots.map(
                    (snapshot, index) => (
                      <article
                        key={snapshot.id}
                        className="seismo-practice__sample"
                      >
                        <div>
                          <strong
                            style={{
                              color:
                                SEISMOGRAPH_GRAPH_COLORS[
                                  index
                                ],
                            }}
                          >
                            Mẫu {index + 1}
                          </strong>

                          <button
                            type="button"
                            aria-label={
                              `Xóa mẫu ${index + 1}`
                            }
                            onClick={() =>
                              controller.removeSnapshot(
                                snapshot.id,
                              )
                            }
                          >
                            Xóa
                          </button>
                        </div>

                        <div className="seismo-practice__sample-graph">
                          <SeismogramGraph
                            data={
                              snapshot.graphData
                            }
                            color={
                              SEISMOGRAPH_GRAPH_COLORS[
                                index
                              ]
                            }
                            label={
                              `Đồ thị mẫu ${index + 1}`
                            }
                          />
                        </div>
                      </article>
                    ),
                  )}
                </div>
              )}

              <button
                type="button"
                className="seismo-button seismo-button--primary"
                disabled={
                  snapshots.length === 0
                }
                onClick={() =>
                  setShowAnalysis(true)
                }
              >
                Mở bảng so sánh &amp; đo đạc
              </button>
            </div>
          )}

          {/* ============================================
              OBSERVATION PANEL
              ============================================ */}

          {activePanel === 'observation' && (
            <div className="seismo-practice__panel-body">
              <p>
                Quan sát chuyển động tương đối
                giữa quả nặng và khung máy,
                cũng như nét bút ghi trên giấy.
              </p>

              <ol className="seismo-practice__steps">
                <li>
                  Điều chỉnh độ cứng lò xo
                  trong lúc máy dừng.
                </li>

                <li>
                  Chạy thí nghiệm và quan sát
                  nét ghi địa chấn.
                </li>

                <li>
                  Lưu tối đa ba mẫu ở các
                  thiết lập khác nhau.
                </li>

                <li>
                  Mở bảng phân tích để đếm ô
                  và xác định T, f, biên độ.
                </li>
              </ol>

              <p className="seismo-practice__muted">
                Màu nét ghi chuyển dần sang đỏ
                khi độ lệch lớn. Vượt mép giấy
                tại độ lệch 3 m.
              </p>
            </div>
          )}

          {/* FEEDBACK */}

          {feedback && (
            <p
              className="seismo-practice__feedback"
              role="status"
            >
              {feedback}
            </p>
          )}
        </aside>
      )}

      {/* ================================================
          RIGHT VERTICAL TOOLBAR
          ================================================ */}

      <aside
        className="seismo-practice__tools"
        aria-label="Công cụ thực hành"
      >
        <Tool
          label="Điều khiển"
          active={
            activePanel === 'controls'
          }
          onClick={() =>
            togglePanel('controls')
          }
        >
          <AppIcon
            name="gauge"
            size={19}
          />
        </Tool>

        <Tool
          label="Dữ liệu"
          active={
            activePanel === 'data'
          }
          onClick={() =>
            togglePanel('data')
          }
        >
          <AppIcon
            name="activity"
            size={19}
          />
        </Tool>

        <Tool
          label="Quan sát"
          active={
            activePanel === 'observation'
          }
          onClick={() =>
            togglePanel('observation')
          }
        >
          <AppIcon
            name="book-open"
            size={19}
          />
        </Tool>

        <span className="seismo-practice__tool-divider" />

        <Tool
          label={
            controller.isCameraLocked
              ? 'Mở khóa camera'
              : 'Khóa camera'
          }
          active={
            controller.isCameraLocked
          }
          onClick={
            controller.toggleCameraLock
          }
        >
          {controller.isCameraLocked ? (
            <LockKeyhole size={19} />
          ) : (
            <UnlockKeyhole size={19} />
          )}
        </Tool>
      </aside>

      {/* ================================================
          BOTTOM LAB DOCK
          ================================================ */}

      <nav
        className="seismo-dock"
        aria-label="Trạng thái và điều hướng thực hành"
      >
        <button
          type="button"
          className="seismo-dock__back"
          onClick={
            navigation.previous
          }
        >
          <AppIcon
            name="chevron-right"
            className="rotate-180"
            size={16}
          />

          Chuẩn bị
        </button>

        <Metric
          label="Trạng thái"
          value={status}
        />

        <Metric
          label="Số mẫu"
          value={
            `${snapshots.length}/
            ${MAX_SEISMOGRAPH_SNAPSHOTS}`
          }
        />

        <button
          type="button"
          className="seismo-dock__next"
          onClick={
            navigation.next
          }
        >
          Kết luận

          <AppIcon
            name="chevron-right"
            size={16}
          />
        </button>
      </nav>

      {/* ================================================
          ANALYSIS OVERLAY
          ================================================ */}

      {showAnalysis && (
        <AnalysisPanel
          snapshots={snapshots}
          onClose={() =>
            setShowAnalysis(false)
          }
        />
      )}
    </div>
  )
}
