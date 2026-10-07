import {
  createExperimentSessionContext,
  useExperimentSession,
} from '../../core/session'

import type {
  ExperimentNavigation,
} from '../../core/types'


export interface DampedOscillationSession {
  navigation:
    ExperimentNavigation
}


export const DampedOscillationSessionContext =
  createExperimentSessionContext<
    DampedOscillationSession
  >()


export function useDampedOscillationSession() {
  return useExperimentSession(
    DampedOscillationSessionContext,
    'Damped oscillation experiment',
  )
}
