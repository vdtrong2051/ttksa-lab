import {
  useMemo,
  useState,
} from 'react'

import {
  useDampedOscillationSession,
} from '../context'


const questions = [
  {
    prompt:
      'Nguyên nhân chủ yếu làm cho dao động của con lắc trong thí nghiệm bị tắt dần là gì?',

    options: [
      'A. Do lực cản của môi trường và lực ma sát.',
      'B. Do trọng lực tác dụng lên vật.',
      'C. Do lực căng của sợi dây đứt dần.',
      'D. Do động năng chuyển hóa thành thế năng.',
    ],

    answer:
      0,

    explanation:
      'Lực ma sát ở điểm treo và ma sát giữa bút dạ với giấy, cùng lực cản không khí thực hiện công âm làm cơ năng giảm dần.',
  },

  {
    prompt:
      'Trong quá trình dao động tắt dần, đại lượng nào sau đây giảm liên tục theo thời gian?',

    options: [
      'A. Chu kì dao động.',
      'B. Tần số dao động.',
      'C. Biên độ và Cơ năng.',
      'D. Động năng và Thế năng.',
    ],

    answer:
      2,

    explanation:
      'Biên độ giảm dần do cơ năng tiêu hao (chuyển hóa thành nhiệt năng). Động năng và thế năng thì tăng giảm tuần hoàn chứ không giảm liên tục.',
  },
]


export default function QuizPage() {
  const {
    navigation,
  } =
    useDampedOscillationSession()

  const [
    answers,
    setAnswers,
  ] =
    useState<
      Record<
        number,
        number
      >
    >(
      {},
    )

  const [
    submitted,
    setSubmitted,
  ] =
    useState(
      false,
    )


  const score =
    useMemo(
      () =>
        questions.reduce(
          (
            total,
            question,
            index,
          ) =>
            answers[
              index
            ] ===
            question.answer
              ? total +
                1
              : total,

          0,
        ),
      [
        answers,
      ],
    )


  return (
    <section className="damped-content-phase damped-quiz">
      <div className="damped-content-phase__inner damped-quiz__inner">
        <span className="damped-section-badge">
          Phần 5 · Luyện tập
        </span>

        <header className="damped-content-phase__heading">
          <span className="damped-content-phase__eyebrow">
            Kiểm tra sau quan sát
          </span>

          <h2>
            Luyện tập
          </h2>

          <p>
            Hai câu hỏi, đáp án và phần giải thích được giữ nguyên từ pack gốc.
          </p>
        </header>

        <div className="damped-quiz__list">
          {questions.map(
            (
              question,
              questionIndex,
            ) => (
              <article
                key={
                  question.prompt
                }
                className="damped-quiz-card"
              >
                <div className="damped-quiz-card__header">
                  <span>
                    Câu {
                      questionIndex +
                      1
                    }
                  </span>

                  {submitted && (
                    <strong
                      className={
                        answers[
                          questionIndex
                        ] ===
                        question.answer
                          ? 'is-correct'
                          : 'is-wrong'
                      }
                    >
                      {
                        answers[
                          questionIndex
                        ] ===
                        question.answer
                          ? 'Đúng'
                          : 'Sai'
                      }
                    </strong>
                  )}
                </div>

                <h3>
                  {
                    question.prompt
                  }
                </h3>

                <div className="damped-quiz-card__options">
                  {question.options.map(
                    (
                      option,
                      optionIndex,
                    ) => {
                      const selected =
                        answers[
                          questionIndex
                        ] ===
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
                          key={
                            option
                          }
                          type="button"
                          disabled={
                            submitted
                          }
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
                            .filter(
                              Boolean,
                            )
                            .join(
                              ' ',
                            )}
                          onClick={() =>
                            setAnswers(
                              (
                                current,
                              ) => ({
                                ...current,

                                [questionIndex]:
                                  optionIndex,
                              }),
                            )
                          }
                        >
                          <span>
                            {
                              String.fromCharCode(
                                65 +
                                optionIndex,
                              )
                            }
                          </span>

                          <strong>
                            {
                              option.replace(
                                /^[A-D]\.\s*/,
                                '',
                              )
                            }
                          </strong>
                        </button>
                      )
                    },
                  )}
                </div>

                {submitted && (
                  <div className="damped-quiz-card__explanation">
                    <span>
                      Giải thích
                    </span>

                    <p>
                      {
                        question.explanation
                      }
                    </p>
                  </div>
                )}
              </article>
            ),
          )}
        </div>

        {submitted && (
          <section className="damped-quiz__result">
            <div>
              <span>
                Kết quả
              </span>

              <strong>
                {
                  score
                }
                {' / '}
                {
                  questions.length
                }
              </strong>
            </div>

            <p>
              Đối chiếu lại phần giải thích nếu câu trả lời chưa chính xác.
            </p>
          </section>
        )}

        <div className="damped-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={
              navigation.previous
            }
          >
            Quay lại kết luận
          </button>

          {!submitted ? (
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={() =>
                setSubmitted(
                  true,
                )
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
              Sang báo cáo
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
