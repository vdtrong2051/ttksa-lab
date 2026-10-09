
import { useState } from 'react'

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


const pendulumItems: {
  id: PendulumId
  label: string
  role: string
}[] = [
  {
    id: 'driver',
    label: 'Đ',
    role: 'Con lắc phát động',
  },
  {
    id: 'l1',
    label: 'L1',
    role: 'Con lắc thử',
  },
  {
    id: 'l2',
    label: 'L2',
    role: 'Con lắc thử',
  },
  {
    id: 'l3',
    label: 'L3',
    role: 'Con lắc thử',
  },
]


interface PendulumSettingProps {
  id: PendulumId
  label: string
  role: string
  controller: ResonanceController
}


function PendulumSetting({
  id,
  label,
  role,
  controller,
}: PendulumSettingProps) {
  const config = controller.pendulums[id]

  return (
    <section className="forced-v2-pendulum">
      <div className="forced-v2-pendulum__heading">
        <span
          className="forced-v2-pendulum__dot"
          style={{
            backgroundColor:
              PENDULUM_COLORS[id],
          }}
        />

        <div>
          <strong>{label}</strong>
          <small>{role}</small>
        </div>
      </div>

      <label
        className="forced-v2-setting"
        htmlFor={`forced-length-${id}`}
      >
        <span>
          Chiều dài
          <strong>
            {config.length.toFixed(1)} m
          </strong>
        </span>

        <input
          id={`forced-length-${id}`}
          type="range"
          min={2}
          max={8}
          step={0.5}
          value={config.length}
          disabled={controller.isPlaying}
          onChange={(event) => {
            controller.setLength(
              id,
              Number(event.target.value),
            )
          }}
        />
      </label>

      <label
        className="forced-v2-setting"
        htmlFor={`forced-position-${id}`}
      >
        <span>
          Vị trí ngang
          <strong>
            {config.posX.toFixed(1)}
          </strong>
        </span>

        <input
          id={`forced-position-${id}`}
          type="range"
          min={-6.5}
          max={6.5}
          step={0.5}
          value={config.posX}
          disabled={controller.isPlaying}
          onChange={(event) => {
            controller.setPosition(
              id,
              Number(event.target.value),
            )
          }}
        />
      </label>
    </section>
  )
}


export default function PracticePage() {
  const {
    navigation,
    controller,
  } = useForcedResonanceSession()

  const [
    panelOpen,
    setPanelOpen,
  ] = useState(false)

  const resonanceNames =
    controller.resonantIds.map((id) =>
      id.toUpperCase(),
    )

  const status =
    controller.isRunning
      ? 'Đang chạy'
      : controller.isPlaying
        ? 'Tạm ngừng do rời vùng chạy'
        : 'Sẵn sàng'

  return (
    <div className="forced-v2-workspace">
      <div className="forced-v2-workspace__top">
        <div
          className="forced-v2-status"
          aria-live="polite"
        >
          <span className="forced-v2-status__label">
            Thí nghiệm cộng hưởng cơ
          </span>

          <strong>{status}</strong>

          <span className="forced-v2-status__detail">
            Cộng hưởng dự kiến:{' '}
            {resonanceNames.length
              ? resonanceNames.join(', ')
              : 'Chưa có'}
          </span>
        </div>

        <aside
          className="forced-v2-panel"
          aria-label="Bảng điều khiển con lắc"
        >
          <div className="forced-v2-panel__header">
            <div>
              <small>Thao tác mô phỏng</small>
              <strong>Điều khiển</strong>
            </div>

            <button
              type="button"
              className="forced-v2-panel__toggle"
              aria-expanded={panelOpen}
              aria-controls="forced-v2-settings"
              onClick={() => {
                setPanelOpen((value) => !value)
              }}
            >
              {panelOpen
                ? 'Thu gọn'
                : 'Tùy chỉnh'}
            </button>
          </div>

          <div className="forced-v2-panel__primary">
            <button
              type="button"
              className="forced-v2-btn forced-v2-btn--primary"
              onClick={
                controller.isPlaying
                  ? controller.pause
                  : controller.play
              }
            >
              {controller.isPlaying
                ? 'Tạm dừng'
                : 'Bắt đầu / Tiếp tục'}
            </button>

            <button
              type="button"
              className="forced-v2-btn forced-v2-btn--secondary"
              onClick={controller.resetRun}
            >
              Đặt lại
            </button>
          </div>

          {panelOpen && (
            <div
              id="forced-v2-settings"
              className="forced-v2-panel__settings"
            >
              <div className="forced-v2-panel__section">
                <div className="forced-v2-panel__section-title">
                  <strong>Cấu hình con lắc</strong>
                  <small>Đơn vị chiều dài: m</small>
                </div>

                {controller.isPlaying && (
                  <p className="forced-v2-panel__notice">
                    Tạm dừng để thay đổi chiều dài
                    hoặc vị trí con lắc.
                  </p>
                )}

                {pendulumItems.map((item) => (
                  <PendulumSetting
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    role={item.role}
                    controller={controller}
                  />
                ))}
              </div>

              <div className="forced-v2-panel__section">
                <div className="forced-v2-panel__section-title">
                  <strong>Góc nhìn</strong>
                </div>

                <p className="forced-v2-help">
                  Kéo để xoay, dùng thao tác chụm
                  để phóng to hoặc thu nhỏ.
                </p>

                <button
                  type="button"
                  className="forced-v2-btn forced-v2-btn--secondary forced-v2-btn--wide"
                  aria-pressed={
                    controller.isCameraLocked
                  }
                  onClick={
                    controller.toggleCameraLock
                  }
                >
                  {controller.isCameraLocked
                    ? 'Mở khóa camera'
                    : 'Khóa camera'}
                </button>
              </div>

              <div className="forced-v2-panel__section">
                <div className="forced-v2-panel__section-title">
                  <strong>Hướng dẫn khảo sát</strong>
                </div>

                <p className="forced-v2-help">
                  Giữ con lắc Đ dài 5 m,
                  quan sát L1, L2, L3.
                  Sau đó tạm dừng,
                  thay đổi chiều dài Đ thành 3 m
                  và tiếp tục mô phỏng.
                </p>

                <p className="forced-v2-help">
                  So sánh con lắc dao động mạnh
                  nhất trong hai lần khảo sát.
                </p>
              </div>

              <div className="forced-v2-panel__navigation">
                <button
                  type="button"
                  className="forced-v2-btn forced-v2-btn--secondary"
                  onClick={navigation.previous}
                >
                  Chuẩn bị
                </button>

                <button
                  type="button"
                  className="forced-v2-btn forced-v2-btn--primary"
                  onClick={navigation.next}
                >
                  Kết luận
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>

      <div className="forced-v2-workspace__hint">
        <span>
          Đỏ: Đ
        </span>
        <span>
          Xanh dương: L1
        </span>
        <span>
          Xanh lá: L2
        </span>
        <span>
          Tím: L3
        </span>
      </div>
    </div>
  )
}
