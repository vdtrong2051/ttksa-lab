import {
  useState,
} from 'react'

import {
  useBoyleSession,
} from '../context'

import {
  boyleObservationPrompts,
} from '../model/data'

import {
  boylePhysicsConfig,
} from '../model/constants'

import {
  calculateMaxPressureVolumeDeviationPercent,
  calculateMeanPressureVolume,
} from '../model/physics'

import BoyleGraph from '../components/BoyleGraph'


export default function ConclusionPage() {
  const {
    controller,
    navigation,
  } = useBoyleSession()

  const [showTheory, setShowTheory] =
    useState(false)

  const enoughMeasurements =
    controller.measurements.length >=
    boylePhysicsConfig
      .targetMeasurementCount

  const meanPV =
    calculateMeanPressureVolume(
      controller.measurements,
    )

  const maxDeviation =
    calculateMaxPressureVolumeDeviationPercent(
      controller.measurements,
      boylePhysicsConfig.boyleConstant,
    )


  function getObservation(
    id:
      (typeof boyleObservationPrompts)[number]['id'],
  ) {
    return controller.observations.find(
      (observation) =>
        observation.id === id,
    )?.response ?? ''
  }


  return (
    <section className="boyle-content-phase boyle-conclusion">
      <div className="boyle-content-phase__inner">
        <span className="boyle-content-phase__badge">
          Phần 4 · Phân tích kết quả
        </span>

        <header className="boyle-content-phase__heading">
          <h2>
            Từ số liệu đến định luật
          </h2>
          <p>
            Đọc lại dữ liệu đã thu, viết nhận xét của bạn rồi mới mở kết luận vật lý chuẩn.
          </p>
        </header>

        {!enoughMeasurements && (
          <div className="boyle-conclusion__warning">
            Phiên hiện có {controller.measurements.length}/{boylePhysicsConfig.targetMeasurementCount} lần đo. Bạn vẫn có thể xem trang này, nhưng nên quay lại Thực hành để thu đủ dữ liệu.
          </div>
        )}

        <section className="boyle-conclusion__section">
          <div className="boyle-section-heading">
            <span>01</span>
            <div>
              <h3>
                Bằng chứng thực nghiệm
              </h3>
              <p>
                Nếu quá trình gần đẳng nhiệt, pV phải xấp xỉ không đổi và p phải tuyến tính theo 1/V.
              </p>
            </div>
          </div>

          <div className="boyle-conclusion__metrics">
            <div>
              <span>Số điểm đo</span>
              <strong>
                {controller.measurements.length}
              </strong>
            </div>
            <div>
              <span>pV trung bình</span>
              <strong>
                {meanPV === null
                  ? '—'
                  : meanPV.toFixed(3)}
              </strong>
            </div>
            <div>
              <span>Độ lệch lớn nhất</span>
              <strong>
                {maxDeviation === null
                  ? '—'
                  : `${maxDeviation.toFixed(2)}%`}
              </strong>
            </div>
          </div>

          <BoyleGraph
            measurements={
              controller.measurements
            }
          />
        </section>

        <section className="boyle-conclusion__section">
          <div className="boyle-section-heading">
            <span>02</span>
            <div>
              <h3>
                Nhận xét của bạn
              </h3>
              <p>
                Trả lời bằng những gì bạn vừa đo và quan sát trong mô phỏng.
              </p>
            </div>
          </div>

          <div className="boyle-observation-list">
            {boyleObservationPrompts.map(
              (item, index) => (
                <label
                  key={item.id}
                  className="boyle-observation"
                >
                  <span>
                    Câu {index + 1}
                  </span>
                  <strong>
                    {item.prompt}
                  </strong>
                  <textarea
                    rows={4}
                    value={
                      getObservation(
                        item.id,
                      )
                    }
                    placeholder="Nhập nhận xét của bạn..."
                    onChange={(event) =>
                      controller.setObservationResponse(
                        item.id,
                        event.target.value,
                      )
                    }
                  />
                </label>
              ),
            )}
          </div>
        </section>

        <section className="boyle-conclusion__section">
          <div className="boyle-section-heading">
            <span>03</span>
            <div>
              <h3>
                Đối chiếu với định luật
              </h3>
              <p>
                Hoàn thành hai nhận xét trước khi mở phần đối chiếu.
              </p>
            </div>
          </div>

          {!showTheory ? (
            <div className="boyle-conclusion__reveal">
              <button
                type="button"
                className="experiment-lab-button experiment-lab-button--primary"
                disabled={
                  !controller.hasAllObservations
                }
                onClick={() =>
                  setShowTheory(true)
                }
              >
                Đối chiếu kết luận
              </button>

              {!controller.hasAllObservations && (
                <span>
                  Hãy trả lời đủ 2 câu nhận xét phía trên.
                </span>
              )}
            </div>
          ) : (
            <div className="boyle-theory-result">
              <span className="boyle-eyebrow">
                Kết luận vật lý
              </span>
              <p>
                Với một lượng khí xác định ở nhiệt độ không đổi, áp suất tỉ lệ nghịch với thể tích. Khi thể tích giảm thì mật độ phân tử và tần suất va chạm với thành bình tăng, vì vậy áp suất tăng.
              </p>
              <div className="boyle-theory-result__formula">
                p₁V₁ = p₂V₂
              </div>
              <p>
                Nén quá nhanh làm nhiệt độ khí thay đổi tạm thời nên trạng thái đó không còn phù hợp để ghi số liệu đẳng nhiệt. Cần chờ hệ trao đổi nhiệt với môi trường và trở lại cân bằng.
              </p>
            </div>
          )}
        </section>

        <div className="boyle-phase-actions">
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
    </section>
  )
}
