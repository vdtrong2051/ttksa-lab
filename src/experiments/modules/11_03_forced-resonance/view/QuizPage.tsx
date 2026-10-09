
import { useState } from 'react'

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

  const answeredCount =
    Object.keys(answers).length

  const allAnswered =
    answeredCount === questions.length

  const score = questions.reduce(
    (total, question, index) =>
      answers[index] === question.answer
        ? total + 1
        : total,
    0,
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
            Hoàn thành hai câu hỏi về
            điều kiện cộng hưởng và chu kì
            của con lắc đơn.
          </p>
        </header>

        <div className="forced-v2-quiz-progress">
          <span>Tiến độ làm bài</span>

          <strong>
            {answeredCount} / {questions.length} câu
          </strong>

          <div
            role="progressbar"
            aria-label="Tiến độ trả lời"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={answeredCount}
          >
            <span
              style={{
                width: `${
                  (answeredCount / questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <div className="forced-quiz__list">
          {questions.map(
            (question, questionIndex) => {
              const answer =
                answers[questionIndex]

              const isCorrect =
                answer === question.answer

              return (
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
                          isCorrect
                            ? 'is-correct'
                            : 'is-wrong'
                        }
                      >
                        {isCorrect
                          ? 'Chính xác'
                          : 'Chưa chính xác'}
                      </strong>
                    )}
                  </div>

                  <h3>{question.prompt}</h3>

                  <div className="forced-quiz-card__options">
                    {question.options.map(
                      (option, optionIndex) => {
                        const selected =
                          answer === optionIndex

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
                            aria-pressed={selected}
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
                              setAnswers(
                                (current) => ({
                                  ...current,
                                  [questionIndex]:
                                    optionIndex,
                                }),
                              )
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
              )
            },
          )}
        </div>

        {submitted && (
          <section
            className="forced-quiz__result"
            aria-live="polite"
          >
            <div>
              <span>Kết quả</span>

              <strong>
                {score} / {questions.length}
              </strong>
            </div>

            <p>
              {score === questions.length
                ? 'Bạn đã trả lời chính xác cả hai câu hỏi.'
                : 'Hãy đối chiếu phần giải thích để củng cố kiến thức về cộng hưởng.'}
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
              disabled={!allAnswered}
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
