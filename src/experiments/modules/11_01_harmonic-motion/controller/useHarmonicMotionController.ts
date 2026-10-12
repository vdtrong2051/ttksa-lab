import { useRef, useState } from 'react'

// Session state: the same state/phase behavior as the former legacy Experiment.
// Do not gate time progression on the active route in GĐ3.5.4.2.
export function useHarmonicMotionController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1.5)
  const [amplitude, setAmplitude] = useState(2.5)
  const [showRays, setShowRays] = useState(true)
  const timeRef = useRef(0)

  function togglePlaying() {
    setIsPlaying((current) => !current)
  }

  function toggleRays() {
    setShowRays((current) => !current)
  }

  return {
    isPlaying,
    speed,
    amplitude,
    showRays,
    timeRef,
    setSpeed,
    setAmplitude,
    togglePlaying,
    toggleRays,
  }
}

export type HarmonicMotionController =
  ReturnType<typeof useHarmonicMotionController>
