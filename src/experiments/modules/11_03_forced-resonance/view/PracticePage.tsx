
import { useState } from 'react'

import {
  LockKeyhole,
  UnlockKeyhole,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useForcedResonanceSession,
} from '../context'

import {
  PENDULUM_COLORS,
} from '../simulation/types'

import type {
  PendulumId,
  ResonanceController,
} from '../simulation/types'

import './practice.css'


type ActivePanel = 'controls' | 'observation' | null

type OpenPanel = Exclude<ActivePanel, null>

const pendulumItems: {
  id: PendulumId
  name: string
  role: string
}[] = [
  {
    id: 'driver',
    name: 'Đ',
    role: 'Nguồn kích thích',
  },
  {
    id: 'l1',
    name: 'L1',
    role: 'Con lắc thử 1',
  },
  {
    id: 'l2',
    name: 'L2',
    role: 'Con lắc thử 2',
  },
  {
    id: 'l3',
    name: 'L3',
    role: 'Con lắc thử 3',
  },
]


interface PendulumSettingsProps {
  id: PendulumId
  name: string
  role: string
  controller: ResonanceController
}


function PendulumSettings({
  id,
  name,
  role,
  controller,
}: PendulumSettingsProps) {
  const config = controller.pendulums[id]

  return (
    <section className="forced-practice-pendulum">
      <header className="forced-practice-pendulum__header">
        <span
          className="forced-practice-pendulum__color"
          style={{
            backgroundColor: PENDULUM_COLORS[id],
          }}
        />

        <div>
          <strong>{name}</strong>
          <small>{role}</small>
        </div>
      </header>

      <label className="forced-practice-setting">
        <span className="forced-practice-setting__label">
          <span>Chiều dài</span>
          <strong>
            {config.length.toFixed(1)} m
          </strong>
        </span>

        <input
          type="range"
          aria-label={`Chiều dài con lắc ${name}`}
          min={2}
          max={8}
          step={0.5}
          value={config.length}
          disabled={controller.isPlaying}
          onChange={(event) =>
            controller.setLength(
              id,
              Number(event.target.value),
            )
          }
        />
      </label>

      <label className="forced-practice-setting">
        <span className="forced-practice-setting__label">
          <span>Vị trí ngang</span>
          <strong>
            {config.posX.toFixed(1)} m
          </strong>
        </span>

        <input
          type="range"
          aria-label={`Vị trí ngang con lắc ${name}`}
          min={-6.5}
          max={6.5}
          step={0.5}
          value={config.posX}
          disabled={controller.isPlaying}
          onChange={(event) =>
            controller.setPosition(
              id,
              Number(event.target.value),
            )
          }
        />
      </label>
    </section>
  )
}


interface ToolButtonProps {
  label: string
  active?: boolean
  pressed?: boolean
  onClick: () => void
  children: React.ReactNode
}


function ToolButton({
  label,
  active = false,
  pressed,
  onClick,
  children,
}: ToolButtonProps) {
  return (
    <button
      type="button"
      className={[
        'forced-practice-tool',
        active ? 'forced-practice-tool--active' : '',
      ].filter(Boolean).join(' ')}
      aria-label={label}
      title={label}
      aria-pressed={pressed ?? active}
      onClick={onClick}
    >
      {children}
    </button>
  )
}


interface DockMetricProps {
  label: string
  value: string
  emphasis?: boolean
  optional?: boolean
}


function DockMetric({
  label,
  value,
  emphasis = false,
  optional = false,
}: DockMetricProps) {
  return (
    <div
      className={[
        'forced-practice-dock__metric',
        optional
          ? 'forced-practice-dock__metric--optional'
          : '',
      ].filter(Boolean).join(' ')}
    >
      <span>{label}</span>

      <strong
        className={
          emphasis
            ? 'forced-practice-dock__value--active'
            : ''
        }
      >
        {value}
      </strong>
    </div>
  )
}


export default function PracticePage() {
  const {
    navigation,
    controller,
  } = useForcedResonanceSession()

  // Đồng bộ hành vi với TN1/TN2:
  // Mỗi lần chỉ có tối đa một panel mở.
  const [
    activePanel,
    setActivePanel,
  ] = useState<ActivePanel>('controls')

  function togglePanel(panel: OpenPanel) {
    setActivePanel((current) =>
      current === panel ? null : panel,
    )
  }

  const resonanceNames =
    controller.resonantIds
      .map((id) => id.toUpperCase())
      .join(', ') || 'Chưa có'

  const status =
    controller.isRunning
      ? 'Đang chạy'
      : controller.isPlaying
        ? 'Chờ tiếp tục'
        : controller.timeRef.current > 0
          ? 'Tạm dừng'
          : 'Sẵn sàng'

  return (
    <div
      className={[
        'forced-practice',
        activePanel
          ? 'forced-practice--panel-open'
          : '',
      ].filter(Boolean).join(' ')}
    >
      {/* TOP HINT */}

      <div className="forced-practice__hint">
        <span>
          Quan sát biên độ khi chiều dài con lắc thử
          bằng chiều dài con lắc Đ.
        </span>
      </div>

      {/* CONTROL PANEL */}

      {activePanel === 'controls' && (
        <aside
          id="forced-practice-controls"
          className="forced-practice__panel"
          aria-label="Bảng điều khiển mô phỏng"
        >
          <header className="forced-practice__panel-header">
            <div>
              <span>Điều khiển</span>
              <h3>Cộng hưởng cơ</h3>
            </div>

            <button
              type="button"
              className="forced-practice__close"
              aria-label="Đóng bảng điều khiển"
              onClick={() => setActivePanel(null)}
            >
              <AppIcon name="close" size={17} />
            </button>
          </header>

          <div className="forced-practice__run-actions">
            <button
              type="button"
              className="forced-practice__run-button"
              onClick={
                controller.isPlaying
                  ? controller.pause
                  : controller.play
              }
            >
              {controller.isPlaying ? (
                <Pause size={17} />
              ) : (
                <Play size={17} />
              )}

              <span>
                {controller.isPlaying
                  ? 'Tạm dừng'
                  : controller.timeRef.current > 0
                    ? 'Tiếp tục'
                    : 'Bắt đầu'}
              </span>
            </button>

            <button
              type="button"
              className="forced-practice__reset-button"
              onClick={controller.resetRun}
              title="Đặt lại lượt chạy"
            >
              <RotateCcw size={16} />
              <span>Đặt lại</span>
            </button>
          </div>

          <div className="forced-practice__section-title">
            <strong>Thông số con lắc</strong>
            <small>Chiều dài: 2–8 m</small>
          </div>

          {controller.isPlaying && (
            <p className="forced-practice__notice">
              Tạm dừng mô phỏng để chỉnh
              chiều dài hoặc vị trí.
            </p>
          )}

          <div className="forced-practice__pendulum-list">
            {pendulumItems.map((item) => (
              <PendulumSettings
                key={item.id}
                id={item.id}
                name={item.name}
                role={item.role}
                controller={controller}
              />
            ))}
          </div>
        </aside>
      )}

      {/* OBSERVATION PANEL */}

      {activePanel === 'observation' && (
        <aside
          id="forced-practice-observation"
          className="forced-practice__panel"
          aria-label="Hướng dẫn quan sát cộng hưởng"
        >
          <header className="forced-practice__panel-header">
            <div>
              <span>Quan sát</span>
              <h3>Hiện tượng cộng hưởng</h3>
            </div>

            <button
              type="button"
              className="forced-practice__close"
              aria-label="Đóng bảng quan sát"
              onClick={() => setActivePanel(null)}
            >
              <AppIcon name="close" size={17} />
            </button>
          </header>

          <div className="forced-practice__observation">
            <div className="forced-practice__observation-card">
              <span>Chiều dài con lắc Đ</span>

              <strong>
                {controller.pendulums.driver.length.toFixed(1)} m
              </strong>
            </div>

            <div className="forced-practice__observation-card">
              <span>Con lắc cùng chiều dài</span>

              <strong className="forced-practice__accent">
                {resonanceNames}
              </strong>
            </div>

            <h4>Nhận diện con lắc</h4>

            <div className="forced-practice__legend">
              {pendulumItems.map((item) => (
                <div key={item.id}>
                  <span
                    className="forced-practice-pendulum__color"
                    style={{
                      backgroundColor:
                        PENDULUM_COLORS[item.id],
                    }}
                  />

                  <strong>{item.name}</strong>

                  <small>
                    {controller.pendulums[
                      item.id
                    ].length.toFixed(1)} m
                  </small>
                </div>
              ))}
            </div>

            <h4>Cách khảo sát</h4>

            <ol className="forced-practice__steps">
              <li>
                Giữ Đ dài 5 m, chạy mô phỏng và
                quan sát ba con lắc thử.
              </li>

              <li>
                Tạm dừng, đổi chiều dài Đ thành
                3 m.
              </li>

              <li>
                Tiếp tục và so sánh con lắc
                dao động mạnh nhất.
              </li>
            </ol>

            <p className="forced-practice__note">
              Điều kiện cộng hưởng:
              tần số ngoại lực bằng tần số
              riêng của con lắc thử.
            </p>
          </div>
        </aside>
      )}

      {/* RIGHT VERTICAL TOOLBAR */}

      <aside
        className="forced-practice__toolbar"
        aria-label="Công cụ thực hành"
      >
        <ToolButton
          label="Điều khiển"
          active={activePanel === 'controls'}
          onClick={() => togglePanel('controls')}
        >
          <AppIcon name="gauge" size={19} />
        </ToolButton>

        <ToolButton
          label="Quan sát"
          active={activePanel === 'observation'}
          onClick={() => togglePanel('observation')}
        >
          <AppIcon name="book-open" size={19} />
        </ToolButton>

        <div className="forced-practice__toolbar-divider" />

        <ToolButton
          label={
            controller.isCameraLocked
              ? 'Mở khóa camera'
              : 'Khóa camera'
          }
          pressed={controller.isCameraLocked}
          active={controller.isCameraLocked}
          onClick={controller.toggleCameraLock}
        >
          {controller.isCameraLocked ? (
            <LockKeyhole size={19} />
          ) : (
            <UnlockKeyhole size={19} />
          )}
        </ToolButton>
      </aside>

      {/* BOTTOM LAB DOCK */}

      <nav
        className="forced-practice__dock"
        aria-label="Điều hướng và trạng thái thực hành"
      >
        <button
          type="button"
          className="forced-practice-dock__back"
          onClick={navigation.previous}
        >
          <AppIcon
            name="chevron-right"
            size={16}
            className="rotate-180"
          />
          <span>Chuẩn bị</span>
        </button>

        <DockMetric
          label="Trạng thái"
          value={status}
          emphasis={controller.isRunning}
        />

        <DockMetric
          label="Con lắc Đ"
          value={`${controller.pendulums.driver.length.toFixed(1)} m`}
          optional
        />

        <DockMetric
          label="Cộng hưởng"
          value={resonanceNames}
        />

        <button
          type="button"
          className="forced-practice-dock__next"
          onClick={navigation.next}
        >
          <span>Kết luận</span>

          <AppIcon
            name="chevron-right"
            size={16}
          />
        </button>
      </nav>
    </div>
  )
}
