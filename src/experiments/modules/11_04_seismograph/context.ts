
import {
  createExperimentSessionContext,
  useExperimentSession,
} from '../../core/session'

import type {
  ExperimentNavigation,
} from '../../core/types'

import type {
  SeismographController,
} from './model/types'


export interface SeismographSession {
  navigation: ExperimentNavigation
  controller: SeismographController
}


export const SeismographSessionContext =
  createExperimentSessionContext<
    SeismographSession
  >()


export function useSeismographSession() {
  return useExperimentSession(
    SeismographSessionContext,
    'Seismograph experiment',
  )
}
