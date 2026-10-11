import type { RefObject } from 'react'
import type { PendulumConfigMap, PendulumId, TestPendulumId } from '../model/types'

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
