import {
  createExperimentSessionContext,
  useExperimentSession,
} from '../../core/session'

import type {
  ExperimentNavigation,
} from '../../core/types'

import type {
  BoyleController,
} from './controller/useBoyleController'


export interface BoyleRuntimeUi {
  mounted: boolean
  ready: boolean
  temperatureC: number
  showParticles: boolean
  orbitEnabled: boolean
  firePulse: number
  workspaceExpanded: boolean

  setReady: (
    ready: boolean,
  ) => void

  setTemperatureC: (
    temperatureC: number,
  ) => void

  toggleParticles: () => void
  toggleOrbit: () => void
  triggerFirePulse: () => void
  toggleWorkspaceExpanded: () => void
  resetUi: () => void
}


export interface BoyleSession {
  controller: BoyleController
  navigation: ExperimentNavigation
  runtimeUi: BoyleRuntimeUi
}


export const BoyleSessionContext =
  createExperimentSessionContext<
    BoyleSession
  >()


export function useBoyleSession() {
  return useExperimentSession(
    BoyleSessionContext,
    'Boyle experiment',
  )
}
