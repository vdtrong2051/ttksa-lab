
import { useState } from 'react'

import { useSeismographSession } from '../context'
import { seismographQuestions } from '../model/questions'
import type { SeismographQuestion } from '../model/questions'

import './content.css'

type AnswerId = SeismographQuestion['answer']

export default function QuizPage() {
  const { navigation } = useSeismographSession()

  const [answers, setAnswers] =
    useState<Record<number, AnswerId>>({})

  const [submitted, setSubmitted] = useState(false)

  const answeredCount = seismographQuestions.filter(
    (question) => answers[question.id] !== undefined,
  ).length

  const allAnswered =
    answeredCount === seismographQuestions.length

  const score = seismographQuestions.reduce(
    (sum, question) =>
      sum + Number(
        answers[question.id] === question.answer,
      ),
    0,
  )

  function retry() {
    setAnswers({})
    setSubmitted(false)
  }

  const scoreMessage =
    score === seismographQuestions.length
      ? 'Xuất sắc! Bạn nắm vững mọi kiến thức!'
      : score >= seismographQuestions.length / 2
        ? 'Khá lắm! Hãy xem lại giải thích các câu sai nhé.'
        : 'Hãy đọc kỹ giải thích và thử lại.'

  return (
    <section className="seismo-content seismo-quiz">
      <div className="seismo-content__inner seismo-quiz__inner">
        <span className="seismo-content__badge">
          Phần 5 · Luyện tập
        </span>

        <header className="seismo-content__heading">
          <span className="seismo-content__eyebrow">
            Dao động và ứng dụng
          </span>

          <h2>Luyện tập tổng hợp</h2>

          <p>
            Kiểm tra kiến thức về dao động cơ học
            và các ứng dụng thực tế trong đời sống,
            kỹ thuật.
          </p>
        </header>

        <div className="seismo-quiz__progress">
          <span>Tiến độ làm bài</span>
          <strong>
            {answeredCount} / {seismographQuestions.length} câu
          </strong>

          <div
            role="progressbar"
            aria-label="Số câu đã trả lời"
            aria-valuemin={0}
            aria-valuemax={seismographQuestions.length}
            aria-valuenow={answeredCount}
          >
            <span
              style={{
                width: `${
                  100 * answeredCount /
                  seismographQuestions.length
                }%`,
              }}
            />
          </div>
        </div>

        {submitted && (
          <section
            className={[
              'seismo-quiz__result',
              score === seismographQuestions.length
                ? 'seismo-quiz__result--perfect'
                : '',
            ].filter(Boolean).join(' ')}
            aria-live="polite"
          >
            <div>
              <h3>{scoreMessage}</h3>

              <p>
                Bạn trả lời đúng{' '}
                <strong>
                  {score}/{seismographQuestions.length}
                </strong>
                {' '}câu hỏi.
              </p>
            </div>

            {score !== seismographQuestions.length && (
              <button
                type="button"
                className="experiment-lab-button"
                onClick={retry}
              >
                Làm lại
              </button>
            )}
          </section>
        )}

        <div className="seismo-quiz__questions">
          {seismographQuestions.map((question, index) => {
            const selected = answers[question.id]
            const isCorrect = selected === question.answer

            return (
              <article
                key={question.id}
                className="seismo-quiz__card"
              >
                <div className="seismo-quiz__card-head">
                  <span>Câu {index + 1}</span>

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

                <h3 id={`seismo-question-${question.id}`}>
                  {question.prompt}
                </h3>

                <div
                  className="seismo-quiz__options"
                  role="group"
                  aria-labelledby={`seismo-question-${question.id}`}
                >
                  {question.options.map((option) => {
                    const picked = selected === option.id

                    const correct =
                      submitted &&
                      option.id === question.answer

                    const wrong =
                      submitted &&
                      picked &&
                      !correct

                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={submitted}
                        aria-pressed={picked}
                        className={[
                          'seismo-quiz__option',
                          picked && !submitted
                            ? 'is-selected'
                            : '',
                          correct ? 'is-correct' : '',
                          wrong ? 'is-wrong' : '',
                          submitted && !correct && !wrong
                            ? 'is-muted'
                            : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => {
                          setAnswers((current) => ({
                            ...current,
                            [question.id]: option.id,
                          }))
                        }}
                      >
                        <span className="seismo-quiz__letter">
                          {option.id}
                        </span>

                        <span>{option.text}</span>

                        {correct && (
                          <strong aria-label="Đáp án đúng">
                            ✓
                          </strong>
                        )}

                        {wrong && (
                          <strong aria-label="Đáp án đã chọn sai">
                            ✕
                          </strong>
                        )}
                      </button>
                    )
                  })}
                </div>

                {submitted && (
                  <div className="seismo-quiz__explanation">
                    <strong>Giải thích</strong>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="seismo-content__actions">
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
              disabled={!allAnswered}
              onClick={() => setSubmitted(true)}
            >
              Nộp bài &amp; chấm điểm
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
