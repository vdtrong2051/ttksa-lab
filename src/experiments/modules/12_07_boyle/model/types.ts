import type {
  ExperimentAnswerIndex,
  ExperimentAssessmentQuestion,
  ExperimentAssessmentState,
} from '../../../core/assessment'

import type {
  ExperimentPhaseDefinition,
} from '../../../core/types'

import type {
  AppIconName,
} from '../../../../types/icon'


export type BoyleThermalCondition =
  | 'equilibrium'
  | 'transient'


export interface BoyleRuntimeState {
  volume: number
  thermalCondition: BoyleThermalCondition
}


export type BoylePreparationToolId =
  | 'set_boyle'
  | 'stand'
  | 'clamp'
  | 'calorimeter'
  | 'balance'
  | 'flask'


export interface BoylePreparationToolDefinition {
  id: BoylePreparationToolId
  name: string
  description: string
  icon: AppIconName
  correct: boolean
}


export interface BoylePreparationState {
  selectedToolIds: BoylePreparationToolId[]
}


export interface BoyleMeasurement {
  volume: number
  pressure: number
  pressureVolume: number
}


export type BoyleRecordMeasurementResult =
  | 'recorded'
  | 'thermal-transient'
  | 'duplicate-volume'
  | 'limit-reached'


export type BoyleObservationId =
  | 'pressure-volume-relationship'
  | 'microscopic-explanation'


export interface BoyleObservation {
  id: BoyleObservationId
  response: string
}


export type BoyleQuestionId =
  | 'q1'
  | 'q2'
  | 'q3'
  | 'q4'


export type BoyleAnswerIndex =
  ExperimentAnswerIndex


export type BoyleAssessmentQuestion =
  ExperimentAssessmentQuestion<
    BoyleQuestionId
  >


export type BoyleAssessmentState =
  ExperimentAssessmentState<
    BoyleQuestionId
  >


export type BoylePhaseDefinition =
  ExperimentPhaseDefinition
