import ExperimentQuiz from '../../../core/ExperimentQuiz'

import {
  useTemplateSession,
} from '../context'

import {
  templateQuestions,
} from '../model/data'


export default function QuizPage() {
  const {
    controller,
    navigation,
  } =
    useTemplateSession()


  const totalQuestions =
    templateQuestions.length


  const answeredCount =
    templateQuestions.filter(
      (question) =>
        controller.assessment.answers[
          question.id
        ] !== undefined,
    ).length


  const isPerfectScore =
    controller.assessmentScore ===
    totalQuestions


  function handleSubmit() {
    controller.submitAssessment()
  }


  return (
    <div className="template-quiz">
      <div className="template-quiz__inner">
        {/* ===============================================
            PHASE BADGE
            =============================================== */}

        <span className="template-quiz__badge">
          Phần 5 · Luyện tập
        </span>


        {/* ===============================================
            HEADING + PROGRESS
            =============================================== */}

        <header className="template-quiz__heading">
          <div>
            <h2>
              Kiểm tra kiến thức
            </h2>

            <p>
              Trả lời các câu hỏi để kiểm tra
              những nguyên tắc vừa được thể hiện
              trong phiên thí nghiệm mẫu.
              Sau khi nộp bài, các đáp án sẽ được khóa.
            </p>
          </div>


          <div className="template-quiz__progress">
            <span>
              Đã trả lời
            </span>

            <strong>
              {
                answeredCount
              }
              {' / '}
              {
                totalQuestions
              }
            </strong>
          </div>
        </header>


        {/* ===============================================
            QUIZ QUESTIONS

            Logic chọn/khóa/correct/wrong thuộc
            ExperimentQuiz shared.
            =============================================== */}

        <ExperimentQuiz
          className="template-quiz__questions"
          questions={
            templateQuestions
          }
          assessment={
            controller.assessment
          }
          onAnswer={
            controller.setAssessmentAnswer
          }
          keepSelectedAfterSubmit
          muteUnselectedAfterSubmit
          renderQuestionHeader={({
            question,
            questionIndex,
            submitted,
            isQuestionCorrect,
          }) => (
            <>
              <div className="template-quiz-card__header">
                <span>
                  Câu{' '}
                  {
                    questionIndex +
                    1
                  }
                </span>


                {submitted && (
                  <strong
                    className={[
                      'template-quiz-card__result',

                      isQuestionCorrect
                        ? 'template-quiz-card__result--correct'
                        : 'template-quiz-card__result--wrong',
                    ].join(
                      ' ',
                    )}
                  >
                    {isQuestionCorrect
                      ? 'Đúng'
                      : 'Sai'}
                  </strong>
                )}
              </div>


              <h3 className="template-quiz-card__prompt">
                {
                  question.prompt
                }
              </h3>
            </>
          )}
          renderOptionContent={({
            option,
            optionIndex,
            submitted,
            isCorrect,
            isWrongSelected,
          }) => (
            <>
              <span className="template-quiz-option__marker">
                {
                  String.fromCharCode(
                    65 +
                    optionIndex,
                  )
                }
              </span>


              <span className="template-quiz-option__text">
                {option.replace(
                  /^[A-D]\.\s*/,
                  '',
                )}
              </span>


              {submitted &&
                isCorrect && (
                <span className="template-quiz-option__result template-quiz-option__result--correct">
                  Đúng
                </span>
              )}


              {submitted &&
                isWrongSelected && (
                <span className="template-quiz-option__result template-quiz-option__result--wrong">
                  Đã chọn
                </span>
              )}
            </>
          )}
        />


        {/* ===============================================
            SUBMIT STATE
            =============================================== */}

        {!controller.assessment.submitted && (
          <div className="template-quiz__submit">
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              disabled={
                !controller.canSubmitAssessment
              }
              onClick={
                handleSubmit
              }
            >
              Nộp bài
            </button>


            {!controller.canSubmitAssessment && (
              <span>
                Hãy trả lời đủ
                {' '}
                {
                  totalQuestions
                }
                {' '}
                câu trước khi nộp.
              </span>
            )}
          </div>
        )}


        {/* ===============================================
            RESULT
            =============================================== */}

        {controller.assessment.submitted && (
          <section
            className={[
              'template-quiz-result',

              isPerfectScore
                ? 'template-quiz-result--perfect'
                : '',
            ]
              .filter(
                Boolean,
              )
              .join(
                ' ',
              )}
            aria-live="polite"
          >
            <div className="template-quiz-result__score">
              <span>
                Kết quả đánh giá
              </span>

              <strong>
                {
                  controller.assessmentScore
                }
                {' / '}
                {
                  totalQuestions
                }
              </strong>
            </div>


            <p>
              {isPerfectScore
                ? 'Bạn đã trả lời đúng toàn bộ câu hỏi.'
                : 'Có câu trả lời chưa chính xác. Các đáp án đúng đã được đánh dấu để bạn đối chiếu.'}
            </p>
          </section>
        )}


        {/* ===============================================
            PHASE ACTIONS
            =============================================== */}

        <div className="template-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={
              navigation.previous
            }
          >
            Quay lại kết luận
          </button>


          {!controller.assessment.submitted ? (
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              disabled={
                !controller.canSubmitAssessment
              }
              onClick={
                handleSubmit
              }
            >
              Nộp bài
            </button>
          ) : (
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={
                navigation.next
              }
            >
              Chuyển sang báo cáo
            </button>
          )}
        </div>
      </div>
    </div>
  )
}