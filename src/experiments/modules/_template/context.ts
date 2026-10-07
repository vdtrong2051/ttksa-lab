import {
  createExperimentSessionContext,
  useExperimentSession,
} from '../../core/session'

import type {
  ExperimentNavigation,
} from '../../core/types'

import type {
  TemplateController,
} from './controller/useTemplateController'


export interface TemplateSession {
  controller:
    TemplateController

  navigation:
    ExperimentNavigation
}


export const TemplateSessionContext =
  createExperimentSessionContext<
    TemplateSession
  >()


export function useTemplateSession() {
  return useExperimentSession(
    TemplateSessionContext,
    'Template experiment',
  )
}