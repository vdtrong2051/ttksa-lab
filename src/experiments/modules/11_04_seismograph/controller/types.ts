import type { RefObject } from 'react'
import type { SeismographConfig, SeismographSnapshot } from '../model/types'

export interface SeismographController {
  config: SeismographConfig
  snapshots: readonly SeismographSnapshot[]

  isPlaying: boolean
  isRunning: boolean
  isPracticeActive: boolean
  isCameraLocked: boolean

  elapsedTimeRef: RefObject<number>
  graphDataRef: RefObject<number[]>
  amplitudeRef: RefObject<number>

  resetVersion: number
  clearGraphVersion: number

  setEarthquakeFrequency: (value: number) => void
  setNaturalFrequency: (value: number) => void

  play: () => void
  pause: () => void
  resetRun: () => void
  toggleCameraLock: () => void

  captureSnapshot: (
    data: readonly number[],
  ) => boolean

  captureCurrentSnapshot: () => boolean

  removeSnapshot: (id: number) => void
  clearSnapshots: () => void
}
