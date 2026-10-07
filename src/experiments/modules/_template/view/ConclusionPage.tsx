import {
  useMemo,
  useState,
} from 'react'

import {
  useTemplateSession,
} from '../context'

import {
  templateObservationPrompts,
  templateRuntimeConfig,
} from '../model/data'


export default function ConclusionPage() {
  const {
    controller,
    navigation,
  } =
    useTemplateSession()


  const [
    showConclusion,
    setShowConclusion,
  ] =
    useState(
      false,
    )


  const observationById =
    useMemo(
      () =>
        new Map(
          controller.observations.map(
            (observation) => [
              observation.id,
              observation.response,
            ],
          ),
        ),

      [
        controller.observations,
      ],
    )


  const measurementComplete =
    controller.measurementCount >=
    templateRuntimeConfig
      .targetMeasurementCount


  function handleObservationChange(
    id:
      (typeof templateObservationPrompts)[number]['id'],

    response:
      string,
  ) {
    controller.setObservationResponse(
      id,
      response,
    )


    /*
     * Nếu học sinh thay đổi nhận xét,
     * phần đối chiếu phải đóng lại.
     */
    if (
      showConclusion
    ) {
      setShowConclusion(
        false,
      )
    }
  }


  return (
    <div className="template-conclusion">
      <div className="template-conclusion__inner">
        {/* ===============================================
            PHASE BADGE
            =============================================== */}

        <span className="template-conclusion__badge">
          Phần 4 · Kết luận thí nghiệm
        </span>


        {/* ===============================================
            01 — EVIDENCE
            =============================================== */}

        <section className="template-conclusion__section">
          <div className="template-conclusion__section-heading">
            <span>
              01
            </span>

            <div>
              <h2>
                Kiểm tra bằng chứng thực nghiệm
              </h2>

              <p>
                Quan sát lại dữ liệu của phiên
                trước khi đưa ra nhận xét.
              </p>
            </div>
          </div>


          {!measurementComplete && (
            <div
              className="template-conclusion__warning"
              role="status"
            >
              Phiên hiện mới có
              {' '}
              {
                controller.measurementCount
              }
              {' / '}
              {
                templateRuntimeConfig
                  .targetMeasurementCount
              }
              {' '}
              lần đo. Kết quả bên dưới
              chỉ nên được xem là tạm thời.
            </div>
          )}


          <div className="template-conclusion__evidence">
            <article className="template-conclusion__metric">
              <span>
                Số lần đo
              </span>

              <strong>
                {
                  controller.measurementCount
                }
                {' / '}
                {
                  templateRuntimeConfig
                    .targetMeasurementCount
                }
              </strong>
            </article>


            <article className="template-conclusion__metric">
              <span>
                Session state
              </span>

              <strong>
                Được bảo toàn
              </strong>
            </article>


            <article className="template-conclusion__metric">
              <span>
                Runtime
              </span>

              <strong>
                Persistent
              </strong>
            </article>
          </div>


          <div className="template-conclusion__process">
            <div className="template-conclusion__process-step">
              <span>
                1
              </span>

              <strong>
                Thu thập
              </strong>

              <small>
                Practice tạo dữ liệu
              </small>
            </div>


            <span
              className="template-conclusion__process-arrow"
              aria-hidden="true"
            >
              →
            </span>


            <div className="template-conclusion__process-step">
              <span>
                2
              </span>

              <strong>
                Giữ trạng thái
              </strong>

              <small>
                Controller giữ dữ liệu
              </small>
            </div>


            <span
              className="template-conclusion__process-arrow"
              aria-hidden="true"
            >
              →
            </span>


            <div className="template-conclusion__process-step">
              <span>
                3
              </span>

              <strong>
                Phân tích
              </strong>

              <small>
                Conclusion sử dụng lại
              </small>
            </div>
          </div>
        </section>


        {/* ===============================================
            02 — STUDENT OBSERVATIONS
            =============================================== */}

        <section className="template-conclusion__section">
          <div className="template-conclusion__section-heading">
            <span>
              02
            </span>

            <div>
              <h2>
                Nhận xét của bạn
              </h2>

              <p>
                Viết nhận xét dựa trên những gì
                vừa thực hiện và quan sát được.
              </p>
            </div>
          </div>


          <div className="template-observation-list">
            {templateObservationPrompts.map(
              (
                observation,
                index,
              ) => (
                <label
                  key={
                    observation.id
                  }
                  className="template-observation"
                >
                  <span className="template-observation__number">
                    Câu{' '}
                    {
                      index +
                      1
                    }
                  </span>


                  <strong>
                    {
                      observation.prompt
                    }
                  </strong>


                  <textarea
                    value={
                      observationById.get(
                        observation.id,
                      ) ??
                      ''
                    }
                    rows={
                      4
                    }
                    placeholder="Nhập nhận xét của bạn..."
                    onChange={(
                      event,
                    ) =>
                      handleObservationChange(
                        observation.id,
                        event.target.value,
                      )
                    }
                  />
                </label>
              ),
            )}
          </div>
        </section>


        {/* ===============================================
            03 — THEORY / CONCLUSION REVEAL
            =============================================== */}

        <section className="template-conclusion__section">
          <div className="template-conclusion__section-heading">
            <span>
              03
            </span>

            <div>
              <h2>
                Đối chiếu kết luận
              </h2>

              <p>
                Hoàn thành phần nhận xét trước
                khi mở kết luận chuẩn.
              </p>
            </div>
          </div>


          {!showConclusion ? (
            <div className="template-conclusion__reveal">
              <button
                type="button"
                className="experiment-lab-button experiment-lab-button--primary"
                disabled={
                  !controller.hasAllObservations
                }
                onClick={() =>
                  setShowConclusion(
                    true,
                  )
                }
              >
                Đối chiếu kết luận
              </button>


              {!controller.hasAllObservations && (
                <span>
                  Hãy trả lời đầy đủ
                  {' '}
                  {
                    templateObservationPrompts.length
                  }
                  {' '}
                  câu nhận xét phía trên.
                </span>
              )}
            </div>
          ) : (
            <div className="template-conclusion-result">
              <span className="template-conclusion-result__label">
                Kết luận của module mẫu
              </span>


              <p>
                Dữ liệu của thí nghiệm phải thuộc
                phiên làm việc của experiment thay vì
                thuộc riêng từng màn hình. Khi URL
                phase thay đổi, View có thể thay đổi
                nhưng Controller vẫn duy trì trạng thái
                của phiên.
              </p>


              <div className="template-conclusion-result__principle">
                Router
                <span>
                  ≠
                </span>
                Controller
              </div>


              <p className="template-conclusion-result__note">
                Với những mô phỏng nặng như WebGL,
                runtime cũng có thể được giữ mount ở
                SessionLayout. Vì vậy chuyển từ
                Thực hành sang Kết luận không bắt buộc
                phải hủy và khởi tạo lại Canvas.
              </p>
            </div>
          )}
        </section>


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
            Quay lại thực hành
          </button>


          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={
              navigation.next
            }
          >
            Chuyển sang luyện tập
          </button>
        </div>
      </div>
    </div>
  )
}