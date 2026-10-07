import ExperimentQuiz from '../../../core/ExperimentQuiz'

import {
  useBoyleSession,
} from '../context'

import {
  boyleAssessmentQuestions,
} from '../model/data'


export default function QuizPage() {
  const {
    controller,
    navigation,
  } = useBoyleSession()

  const total =
    boyleAssessmentQuestions.length


  return (
    <section className="boyle-content-phase boyle-quiz-page">
      <div className="boyle-content-phase__inner boyle-quiz-page__inner">
        <span className="boyle-content-phase__badge">
          Phần 5 · Luyện tập
        </span>

        <header className="boyle-content-phase__heading">
          <h2>
            Kiểm tra kiến thức
          </h2>
          <p>
            Trả lời đủ bốn câu. Sau khi nộp bài, đáp án sẽ được khóa.
          </p>
        </header>

        <ExperimentQuiz
          className="boyle-quiz"
          questions={
            boyleAssessmentQuestions
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
              <div className="boyle-quiz-card__header">
                <span>
                  Câu {questionIndex + 1}
                </span>
                {submitted && (
                  <strong
                    className={
                      isQuestionCorrect
                        ? 'boyle-quiz-card__result boyle-quiz-card__result--correct'
                        : 'boyle-quiz-card__result boyle-quiz-card__result--wrong'
                    }
                  >
                    {isQuestionCorrect
                      ? 'Đúng'
                      : 'Sai'}
                  </strong>
                )}
              </div>
              <h3>
                {question.prompt}
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
              <span className="boyle-quiz-option__marker">
                {String.fromCharCode(
                  65 + optionIndex,
                )}
              </span>
              <span>
                {option.replace(
                  /^[A-D]\.\s*/,
                  '',
                )}
              </span>
              {submitted && isCorrect && (
                <span className="boyle-quiz-option__result boyle-quiz-option__result--correct">
                  Đúng
                </span>
              )}
              {submitted && isWrongSelected && (
                <span className="boyle-quiz-option__result boyle-quiz-option__result--wrong">
                  Đã chọn
                </span>
              )}
            </>
          )}
        />

        {!controller.assessment.submitted ? (
          <div className="boyle-quiz-page__submit">
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              disabled={
                !controller.canSubmitAssessment
              }
              onClick={
                controller.submitAssessment
              }
            >
              Nộp bài
            </button>
            {!controller.canSubmitAssessment && (
              <span>
                Hãy trả lời đủ {total} câu trước khi nộp.
              </span>
            )}
          </div>
        ) : (
          <div className="boyle-quiz-score">
            <span>Kết quả</span>
            <strong>
              {controller.assessmentScore}
              {' / '}
              {total}
            </strong>
            <p>
              Đáp án đã được khóa. Bạn có thể xem lại trước khi chuyển sang báo cáo.
            </p>
          </div>
        )}

        <div className="boyle-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={
              navigation.previous
            }
          >
            Quay lại kết luận
          </button>

          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            disabled={
              !controller.assessment.submitted
            }
            onClick={
              navigation.next
            }
          >
            Chuyển sang báo cáo
          </button>
        </div>
      </div>
    </section>
  )
}
