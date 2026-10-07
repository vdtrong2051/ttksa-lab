import type {
  ReactNode,
} from 'react'

import type {
  ExperimentAnswerIndex,
  ExperimentAssessmentQuestion,
  ExperimentAssessmentState,
} from './assessment'


export interface ExperimentQuizQuestionContext<
  TQuestionId extends string,
> {
  question:
    ExperimentAssessmentQuestion<
      TQuestionId
    >

  questionIndex:
    number

  selectedAnswer:
    ExperimentAnswerIndex |
    undefined

  submitted:
    boolean

  isQuestionCorrect:
    boolean
}


export interface ExperimentQuizOptionContext<
  TQuestionId extends string,
> {
  question:
    ExperimentAssessmentQuestion<
      TQuestionId
    >

  questionIndex:
    number

  option:
    string

  optionIndex:
    ExperimentAnswerIndex

  selectedAnswer:
    ExperimentAnswerIndex |
    undefined

  submitted:
    boolean

  isSelected:
    boolean

  isCorrect:
    boolean

  isWrongSelected:
    boolean
}


interface ExperimentQuizProps<
  TQuestionId extends string,
> {
  className?:
    string

  questions:
    readonly ExperimentAssessmentQuestion<
      TQuestionId
    >[]

  assessment:
    ExperimentAssessmentState<
      TQuestionId
    >

  onAnswer: (
    questionId:
      TQuestionId,

    answer:
      ExperimentAnswerIndex,
  ) => void

  keepSelectedAfterSubmit?:
    boolean

  muteUnselectedAfterSubmit?:
    boolean

  renderQuestionHeader?: (
    context:
      ExperimentQuizQuestionContext<
        TQuestionId
      >,
  ) => ReactNode

  renderOptionContent?: (
    context:
      ExperimentQuizOptionContext<
        TQuestionId
      >,
  ) => ReactNode
}


export default function ExperimentQuiz<
  TQuestionId extends string,
>({
  className =
    '',

  questions,

  assessment,

  onAnswer,

  keepSelectedAfterSubmit =
    true,

  muteUnselectedAfterSubmit =
    true,

  renderQuestionHeader,

  renderOptionContent,
}: ExperimentQuizProps<TQuestionId>) {
  return (
    <div
      className={[
        'experiment-quiz',

        className,
      ]
        .filter(
          Boolean,
        )
        .join(
          ' ',
        )}
    >
      {questions.map(
        (
          question,
          questionIndex,
        ) => {
          const selectedAnswer =
            assessment.answers[
              question.id
            ]

          const isQuestionCorrect =
            assessment.submitted &&
            selectedAnswer ===
              question.correctOption


          return (
            <article
              key={
                question.id
              }
              className="experiment-quiz__question"
            >
              <header className="experiment-quiz__question-header">
                {renderQuestionHeader
                  ? renderQuestionHeader({
                      question,
                      questionIndex,
                      selectedAnswer,
                      submitted:
                        assessment.submitted,
                      isQuestionCorrect,
                    })
                  : (
                      <>
                        <span>
                          Câu{' '}
                          {
                            questionIndex +
                            1
                          }
                        </span>

                        <h3>
                          {
                            question.prompt
                          }
                        </h3>
                      </>
                    )}
              </header>


              <div className="experiment-quiz__options">
                {question.options.map(
                  (
                    option,
                    rawOptionIndex,
                  ) => {
                    const optionIndex =
                      rawOptionIndex as
                        ExperimentAnswerIndex


                    const isSelected =
                      selectedAnswer ===
                      optionIndex


                    const isCorrect =
                      assessment.submitted &&
                      optionIndex ===
                        question.correctOption


                    const isWrongSelected =
                      assessment.submitted &&
                      isSelected &&
                      !isCorrect


                    const showSelected =
                      isSelected &&
                      (
                        !assessment.submitted ||
                        keepSelectedAfterSubmit
                      )


                    const muted =
                      assessment.submitted &&
                      muteUnselectedAfterSubmit &&
                      !isCorrect &&
                      !isWrongSelected


                    return (
                      <button
                        key={
                          optionIndex
                        }
                        type="button"
                        disabled={
                          assessment.submitted
                        }
                        aria-pressed={
                          isSelected
                        }
                        className={[
                          'experiment-quiz__option',

                          showSelected
                            ? 'experiment-quiz__option--selected'
                            : '',

                          isCorrect
                            ? 'experiment-quiz__option--correct'
                            : '',

                          isWrongSelected
                            ? 'experiment-quiz__option--wrong'
                            : '',

                          muted
                            ? 'experiment-quiz__option--muted'
                            : '',
                        ]
                          .filter(
                            Boolean,
                          )
                          .join(
                            ' ',
                          )}
                        onClick={() =>
                          onAnswer(
                            question.id,
                            optionIndex,
                          )
                        }
                      >
                        {renderOptionContent
                          ? renderOptionContent({
                              question,
                              questionIndex,
                              option,
                              optionIndex,
                              selectedAnswer,
                              submitted:
                                assessment.submitted,
                              isSelected,
                              isCorrect,
                              isWrongSelected,
                            })
                          : option}
                      </button>
                    )
                  },
                )}
              </div>
            </article>
          )
        },
      )}
    </div>
  )
}