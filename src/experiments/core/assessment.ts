export type ExperimentAnswerIndex =
  | 0
  | 1
  | 2
  | 3


export interface ExperimentAssessmentQuestion<
  TQuestionId extends string,
> {
  id:
    TQuestionId

  prompt:
    string

  options:
    readonly [
      string,
      string,
      string,
      string,
    ]

  correctOption:
    ExperimentAnswerIndex
}


export interface ExperimentAssessmentState<
  TQuestionId extends string,
> {
  answers:
    Partial<
      Record<
        TQuestionId,
        ExperimentAnswerIndex
      >
    >

  submitted:
    boolean
}