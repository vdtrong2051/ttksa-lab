import {
  createExperimentSessionContext,
  useExperimentSession,
} from '../../core/session'

import type {
  ExperimentNavigation,
} from '../../core/types'

import type {
  HarmonicMotionController,
} from './controller/useHarmonicMotionController'


export interface HarmonicMotionSession {
  navigation:
    ExperimentNavigation

  controller:
    HarmonicMotionController
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
