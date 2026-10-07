import {
  useMemo,
  useState,
} from 'react'

import {
  useHarmonicMotionSession,
} from '../context'


const questions = [
  {
    prompt:
      'Biên độ của dao động điều hòa có độ lớn bằng đại lượng nào của chuyển động tròn đều tương ứng?',

    options: [
      'A. Đường kính quỹ đạo',
      'B. Bán kính quỹ đạo',
      'C. Chu kì quay',
      'D. Tốc độ dài',
    ],

    answer:
      1,

    explanation:
      'Hình chiếu của điểm M quét qua một đoạn thẳng có độ dài 2R. Dao động điều hòa quét qua đoạn thẳng dài 2A. Do đó Biên độ A = Bán kính R.',
  },

  {
    prompt:
      'Khi vật chuyển động tròn đều đi qua vị trí xa nguồn sáng nhất hoặc gần nguồn sáng nhất (song song với trục chiếu), bóng của nó trên màn ảnh có vận tốc bằng bao nhiêu?',

    options: [
      'A. Cực đại',
      'B. Bằng 0',
      'C. Bằng tốc độ dài của vật',
      'D. Không xác định được',
    ],

    answer:
      1,

    explanation:
      'Vị trí này tương ứng với hình chiếu đang ở Biên. Tại Biên, vật dao động điều hòa đổi chiều chuyển động nên vận tốc tức thời bằng 0.',
  },
]


export default function QuizPage() {
  const {
    navigation,
  } =
    useHarmonicMotionSession()

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
              ? total + 1
              : total,

          0,
        ),

      [
        answers,
      ],
    )


  return (
    <section className="harmonic-motion-content-phase harmonic-motion-quiz">
      <div className="harmonic-motion-content-phase__inner harmonic-motion-quiz__inner">
        <span className="harmonic-motion-section-badge">
          Phần 5 · Luyện tập
        </span>

        <header className="harmonic-motion-content-phase__heading">
          <span className="harmonic-motion-content-phase__eyebrow">
            Kiểm tra sau quan sát
          </span>

          <h2>
            Luyện tập
          </h2>

          <p>
            Giữ nguyên hai câu hỏi của pack gốc,
            nhưng trình bày theo cấu trúc bài tập hiện tại của hệ thống.
          </p>
        </header>

        <div className="harmonic-motion-quiz__list">
          {questions.map(
            (
              question,
              questionIndex,
            ) => (
              <article
                key={
                  question.prompt
                }
                className="harmonic-motion-quiz-card"
              >
                <div className="harmonic-motion-quiz-card__header">
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

                <div className="harmonic-motion-quiz-card__options">
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
                          onClick={() => {
                            setAnswers(
                              (
                                current,
                              ) => ({
                                ...current,

                                [questionIndex]:
                                  optionIndex,
                              }),
                            )
                          }}
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
                  <div className="harmonic-motion-quiz-card__explanation">
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
          <section className="harmonic-motion-quiz__result">
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

        <div className="harmonic-motion-phase-actions">
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
