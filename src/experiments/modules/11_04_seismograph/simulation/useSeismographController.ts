
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  DEFAULT_SEISMOGRAPH_CONFIG,
  MAX_GRAPH_POINTS,
  MAX_SEISMOGRAPH_SNAPSHOTS,
} from '../model/types'

import type {
  SeismographConfig,
  SeismographController,
  SeismographSnapshot,
} from '../model/types'


function normalizeHalfStep(
  value: number,
  min: number,
  max: number,
) {
  if (!Number.isFinite(value)) return min

  return Math.min(
    max,
    Math.max(min, Math.round(value * 2) / 2),
  )
}


export function useSeismographController(
  isPracticeActive: boolean,
): SeismographController {
  const [config, setConfig] =
    useState<SeismographConfig>(
      () => ({
        ...DEFAULT_SEISMOGRAPH_CONFIG,
      }),
    )

  const [isPlaying, setIsPlaying] =
    useState(false)

  const [pageVisible, setPageVisible] =
    useState(
      () =>
        typeof document === 'undefined' ||
        !document.hidden,
    )

  const [isCameraLocked, setIsCameraLocked] =
    useState(false)

  const [snapshots, setSnapshots] =
    useState<SeismographSnapshot[]>([])

  const [resetVersion, setResetVersion] =
    useState(0)

  const [clearGraphVersion, setClearGraphVersion] =
    useState(0)

  const elapsedTimeRef = useRef(0)
  const graphDataRef = useRef<number[]>([])
  const amplitudeRef = useRef(0)

  const nextSnapshotIdRef = useRef(1)

  // Mirror dữ liệu để chống ghi quá 3 mẫu
  // khi người dùng bấm liên tục.
  const snapshotsRef =
    useRef<SeismographSnapshot[]>([])

  useEffect(() => {
    const onVisibilityChange = () => {
      setPageVisible(!document.hidden)
    }

    document.addEventListener(
      'visibilitychange',
      onVisibilityChange,
    )

    return () => {
      document.removeEventListener(
        'visibilitychange',
        onVisibilityChange,
      )
    }
  }, [])

  const isRunning =
    isPlaying &&
    isPracticeActive &&
    pageVisible

  const play = useCallback(
    () => setIsPlaying(true),
    [],
  )

  const pause = useCallback(
    () => setIsPlaying(false),
    [],
  )

  const resetRun = useCallback(() => {
    setIsPlaying(false)

    elapsedTimeRef.current = 0
    graphDataRef.current = []
    amplitudeRef.current = 0

    setResetVersion(
      (version) => version + 1,
    )
  }, [])

  const setEarthquakeFrequency = useCallback(
    (value: number) => {
      if (isPlaying) return

      setConfig((current) => ({
        ...current,
        eqFreq: normalizeHalfStep(
          value,
          1,
          10,
        ),
      }))
    },
    [isPlaying],
  )

  const setNaturalFrequency = useCallback(
    (value: number) => {
      if (isPlaying) return

      setConfig((current) => ({
        ...current,
        naturalFreq: normalizeHalfStep(
          value,
          0.5,
          10,
        ),
      }))
    },
    [isPlaying],
  )

  const toggleCameraLock = useCallback(() => {
    setIsCameraLocked(
      (value) => !value,
    )
  }, [])

  const captureSnapshot = useCallback(
    (data: readonly number[]): boolean => {
      // Tối thiểu 0,5 giây tín hiệu.
      if (data.length < 50) return false

      if (
        snapshotsRef.current.length >=
        MAX_SEISMOGRAPH_SNAPSHOTS
      ) {
        return false
      }

      const snapshot: SeismographSnapshot = {
        id: nextSnapshotIdRef.current++,
        graphData: data.slice(-MAX_GRAPH_POINTS),
        eqFreq: config.eqFreq,
        naturalFreq: config.naturalFreq,
      }

      const nextSnapshots = [
        ...snapshotsRef.current,
        snapshot,
      ]

      snapshotsRef.current = nextSnapshots
      setSnapshots(nextSnapshots)

      // Chụp xong bắt đầu một đoạn ghi mới.
      // Không reset chuyển động vật lý.
      graphDataRef.current = []

      setClearGraphVersion(
        (version) => version + 1,
      )

      return true
    },
    [config],
  )

  const captureCurrentSnapshot = useCallback(
    () => captureSnapshot(graphDataRef.current),
    [captureSnapshot],
  )

  const removeSnapshot = useCallback(
    (id: number) => {
      const nextSnapshots =
        snapshotsRef.current.filter(
          (snapshot) => snapshot.id !== id,
        )

      snapshotsRef.current = nextSnapshots
      setSnapshots(nextSnapshots)
    },
    [],
  )

  const clearSnapshots = useCallback(() => {
    snapshotsRef.current = []
    setSnapshots([])
  }, [])

  return {
    config,
    snapshots,
    isPlaying,
    isRunning,
    isPracticeActive,
    isCameraLocked,
    elapsedTimeRef,
    graphDataRef,
    amplitudeRef,
    resetVersion,
    clearGraphVersion,
    setEarthquakeFrequency,
    setNaturalFrequency,
    play,
    pause,
    resetRun,
    toggleCameraLock,
    captureSnapshot,
    captureCurrentSnapshot,
    removeSnapshot,
    clearSnapshots,
  }
}
