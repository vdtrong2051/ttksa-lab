
import {
  useMemo,
  useState,
} from 'react'

import {
  useForcedResonanceSession,
} from '../context'

import {
  forcedResonanceQuestions,
} from '../model/questions'


export default function QuizPage() {
  const { navigation } =
    useForcedResonanceSession()

  const questions =
    forcedResonanceQuestions

  const [
    answers,
    setAnswers,
  ] = useState<Record<number, number>>({})

  const [
    submitted,
    setSubmitted,
  ] = useState(false)

  const score = useMemo(
    () =>
      questions.reduce(
        (total, question, index) =>
          answers[index] === question.answer
            ? total + 1
            : total,
        0,
      ),
    [answers, questions],
  )

  return (
    <section className="forced-content-phase forced-quiz">
      <div className="forced-content-phase__inner forced-quiz__inner">
        <span className="forced-section-badge">
          Phần 5 · Luyện tập
        </span>

        <header className="forced-content-phase__heading">
          <span className="forced-content-phase__eyebrow">
            Kiểm tra sau quan sát
          </span>

          <h2>Luyện tập</h2>

          <p>
            Giữ nguyên hai câu hỏi, đáp án và
            phần giải thích của pack nguồn.
          </p>
        </header>

        <div className="forced-quiz__list">
          {questions.map((question, questionIndex) => (
            <article
              key={question.prompt}
              className="forced-quiz-card"
            >
              <div className="forced-quiz-card__header">
                <span>
                  Câu {questionIndex + 1}
                </span>

                {submitted && (
                  <strong
                    className={
                      answers[questionIndex] ===
                      question.answer
                        ? 'is-correct'
                        : 'is-wrong'
                    }
                  >
                    {answers[questionIndex] ===
                    question.answer
                      ? 'Đúng'
                      : 'Sai'}
                  </strong>
                )}
              </div>

              <h3>
                {question.prompt}
              </h3>

              <div className="forced-quiz-card__options">
                {question.options.map(
                  (option, optionIndex) => {
                    const selected =
                      answers[questionIndex] ===
                      optionIndex

                    const correct =
                      submitted &&
                      optionIndex ===
                        question.answer

                    const wrong =
                      submitted &&
                      selected &&
                      !correct

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={submitted}
                        className={[
                          selected
                            ? 'is-selected'
                            : '',
                          correct
                            ? 'is-correct'
                            : '',
                          wrong
                            ? 'is-wrong'
                            : '',
                          submitted &&
                          !correct &&
                          !wrong
                            ? 'is-muted'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => {
                          setAnswers((current) => ({
                            ...current,
                            [questionIndex]:
                              optionIndex,
                          }))
                        }}
                      >
                        <span>
                          {String.fromCharCode(
                            65 + optionIndex,
                          )}
                        </span>

                        <strong>
                          {option.replace(
                            /^[A-D]\.\s*/,
                            '',
                          )}
                        </strong>
                      </button>
                    )
                  },
                )}
              </div>

              {submitted && (
                <div className="forced-quiz-card__explanation">
                  <span>Giải thích</span>

                  <p>
                    {question.explanation}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        {submitted && (
          <section className="forced-quiz__result">
            <div>
              <span>Kết quả</span>

              <strong>
                {score} / {questions.length}
              </strong>
            </div>

            <p>
              Đối chiếu lại điều kiện cộng hưởng
              và chu kì riêng của con lắc đơn
              nếu câu trả lời chưa chính xác.
            </p>
          </section>
        )}

        <div className="forced-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={navigation.previous}
          >
            Quay lại kết luận
          </button>

          {!submitted ? (
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={() => {
                setSubmitted(true)
              }}
            >
              Nộp bài
            </button>
          ) : (
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={navigation.next}
            >
              Sang báo cáo
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
