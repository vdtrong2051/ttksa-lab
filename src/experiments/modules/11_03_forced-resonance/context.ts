
import {
  createExperimentSessionContext,
  useExperimentSession,
} from '../../core/session'

import type {
  ExperimentNavigation,
} from '../../core/types'

import type {
  ResonanceController,
} from './simulation/types'


export interface ForcedResonanceSession {
  navigation: ExperimentNavigation
  controller: ResonanceController
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
