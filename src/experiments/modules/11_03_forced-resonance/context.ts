import {
  createExperimentSessionContext,
  useExperimentSession,
} from '../../core/session'

import type {
  ExperimentNavigation,
} from '../../core/types'


export interface ForcedResonanceSession {
  navigation:
    ExperimentNavigation
}


export const ForcedResonanceSessionContext =
  createExperimentSessionContext<
    ForcedResonanceSession
  >()


export function useForcedResonanceSession() {
  return useExperimentSession(
    ForcedResonanceSessionContext,
    'Forced resonance experiment',
  )
}
