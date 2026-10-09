
import type { RefObject } from 'react'

export type PendulumId =
  | 'driver'
  | 'l1'
  | 'l2'
  | 'l3'

export type TestPendulumId =
  Exclude<PendulumId, 'driver'>

export interface PendulumConfig {
  length: number
  posX: number
}

export type PendulumConfigMap =
  Record<PendulumId, PendulumConfig>

export const DEFAULT_PENDULUMS:
  Readonly<PendulumConfigMap> = {
    driver: { length: 5, posX: -1 },
    l1: { length: 3, posX: -3 },
    l2: { length: 5, posX: 2 },
    l3: { length: 7, posX: 5 },
  }

export const PENDULUM_COLORS:
  Record<PendulumId, string> = {
    driver: '#ef4444',
    l1: '#3b82f6',
    l2: '#10b981',
    l3: '#8b5cf6',
  }

export interface ResonanceController {
  pendulums: PendulumConfigMap

  // Ý định chạy do người học điều khiển.
  isPlaying: boolean

  // Chỉ chạy thật khi đang ở Practice
  // và tab trình duyệt đang hiển thị.
  isRunning: boolean

  isPracticeActive: boolean
  isCameraLocked: boolean

  // Không lưu thời gian bằng React state.
  timeRef: RefObject<number>

  // Dùng để làm mới vệt chuyển động khi reset.
  resetVersion: number

  resonantIds: readonly TestPendulumId[]

  play: () => void
  pause: () => void
  resetRun: () => void

  setLength: (
    id: PendulumId,
    value: number,
  ) => void

  setPosition: (
    id: PendulumId,
    value: number,
  ) => void

  toggleCameraLock: () => void
}
