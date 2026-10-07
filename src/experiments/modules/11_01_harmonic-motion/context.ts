import {
  createExperimentSessionContext,
  useExperimentSession,
} from '../../core/session'

import type {
  ExperimentNavigation,
} from '../../core/types'


export interface HarmonicMotionSession {
  navigation:
    ExperimentNavigation
}


export const HarmonicMotionSessionContext =
  createExperimentSessionContext<
    HarmonicMotionSession
  >()


export function useHarmonicMotionSession() {
  return useExperimentSession(
    HarmonicMotionSessionContext,
    'Harmonic motion experiment',
  )
}
