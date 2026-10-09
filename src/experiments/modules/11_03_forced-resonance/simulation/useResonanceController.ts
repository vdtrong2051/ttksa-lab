
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  DEFAULT_PENDULUMS,
} from './types'

import type {
  PendulumConfigMap,
  PendulumId,
  ResonanceController,
  TestPendulumId,
} from './types'


function initialPendulums(): PendulumConfigMap {
  return {
    driver: { ...DEFAULT_PENDULUMS.driver },
    l1: { ...DEFAULT_PENDULUMS.l1 },
    l2: { ...DEFAULT_PENDULUMS.l2 },
    l3: { ...DEFAULT_PENDULUMS.l3 },
  }
}

function normalizeHalfStep(
  value: number,
  min: number,
  max: number,
) {
  if (!Number.isFinite(value)) {
    return min
  }

  const rounded =
    Math.round(value * 2) / 2

  return Math.min(
    max,
    Math.max(min, rounded),
  )
}


/**
 * Controller tồn tại ở cấp SessionLayout,
 * không nằm trong PracticePage.
 *
 * Do đó đổi phase không phá hủy:
 * - thông số 4 con lắc
 * - thời gian mô phỏng
 * - trạng thái Play/Pause
 * - trạng thái camera
 */
export function useResonanceController(
  isPracticeActive: boolean,
): ResonanceController {
  const [
    pendulums,
    setPendulums,
  ] = useState<PendulumConfigMap>(
    initialPendulums,
  )

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false)

  const [
    isCameraLocked,
    setIsCameraLocked,
  ] = useState(false)

  const [
    resetVersion,
    setResetVersion,
  ] = useState(0)

  const timeRef = useRef(0)

  const [
    pageVisible,
    setPageVisible,
  ] = useState(
    () =>
      typeof document === 'undefined' ||
      !document.hidden,
  )

  // Tạm ngừng mô phỏng khi tab bị ẩn.
  // Không thay đổi ý định Play/Pause của người học.
  useEffect(() => {
    function onVisibilityChange() {
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

  const play = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const resetRun = useCallback(() => {
    setIsPlaying(false)
    timeRef.current = 0

    setResetVersion(
      (current) => current + 1,
    )
  }, [])

  const setLength = useCallback(
    (id: PendulumId, value: number) => {
      if (isPlaying) return

      const length = normalizeHalfStep(
        value,
        2,
        8,
      )

      setPendulums((current) => ({
        ...current,
        [id]: {
          ...current[id],
          length,
        },
      }))
    },
    [isPlaying],
  )

  const setPosition = useCallback(
    (id: PendulumId, value: number) => {
      if (isPlaying) return

      const posX = normalizeHalfStep(
        value,
        -6.5,
        6.5,
      )

      setPendulums((current) => ({
        ...current,
        [id]: {
          ...current[id],
          posX,
        },
      }))
    },
    [isPlaying],
  )

  const toggleCameraLock = useCallback(
    () => {
      setIsCameraLocked(
        (current) => !current,
      )
    },
    [],
  )

  const resonantIds = useMemo(() => {
    const ids: TestPendulumId[] = []

    if (
      pendulums.l1.length ===
      pendulums.driver.length
    ) {
      ids.push('l1')
    }

    if (
      pendulums.l2.length ===
      pendulums.driver.length
    ) {
      ids.push('l2')
    }

    if (
      pendulums.l3.length ===
      pendulums.driver.length
    ) {
      ids.push('l3')
    }

    return ids
  }, [pendulums])

  return {
    pendulums,
    isPlaying,
    isRunning,
    isPracticeActive,
    isCameraLocked,
    timeRef,
    resetVersion,
    resonantIds,
    play,
    pause,
    resetRun,
    setLength,
    setPosition,
    toggleCameraLock,
  }
}
