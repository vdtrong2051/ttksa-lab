import type {
  ExperimentAssessmentState,
} from '../../../core/assessment'


export type TemplateQuestionId =
  | 'q1'
  | 'q2'
  | 'q3'

export type TemplateAssessmentState =
  ExperimentAssessmentState<
    TemplateQuestionId
  >


export type TemplatePreparationToolId =
  | 'sensor'
  | 'container'
  | 'heater'
  | 'balance'


export type TemplateObservationId =
  | 'evidence'
  | 'runtime'


export interface TemplateObservation {
  id:
    TemplateObservationId

  response:
    string
}