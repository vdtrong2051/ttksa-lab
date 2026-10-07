import PrintableReportShell from '../../../core/PrintableReportShell'

import {
  useBoyleSession,
} from '../context'

import {
  boyleAssessmentQuestions,
  boyleObservationPrompts,
} from '../model/data'

import {
  boylePhysicsConfig,
  boyleUnits,
} from '../model/constants'

import {
  calculateInverseVolume,
} from '../model/physics'

import BoyleGraph from '../components/BoyleGraph'


export default function ReportPage() {
  const {
    controller,
    navigation,
  } = useBoyleSession()


  function getObservation(
    id:
      (typeof boyleObservationPrompts)[number]['id'],
  ) {
    return controller.observations.find(
      (observation) =>
        observation.id === id,
    )?.response.trim() ?? ''
  }


  return (
    <section className="boyle-content-phase boyle-report">
      <div className="boyle-report__screen">
        <span className="boyle-content-phase__badge">
          Phần 6 · Báo cáo
        </span>

        <div className="boyle-report__heading">
          <div>
            <h2>
              Báo cáo thực hành
            </h2>
            <p>
              Phần trên là dữ liệu thật của phiên thí nghiệm. Phiếu A4 phía dưới luôn để trống để học sinh tự hoàn thành.
            </p>
          </div>

          <div className="boyle-report__actions">
            <button
              type="button"
              className="experiment-lab-button"
              onClick={
                navigation.previous
              }
            >
              Quay lại luyện tập
            </button>

            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={() =>
                window.print()
              }
            >
              In / Lưu PDF
            </button>
          </div>
        </div>

        <section className="boyle-report-reference">
          <div className="boyle-section-heading">
            <span>01</span>
            <div>
              <h3>
                Dữ liệu tham chiếu
              </h3>
              <p>
                Dữ liệu này chỉ dùng đối chiếu và không được tự động chép sang phiếu thực hành.
              </p>
            </div>
          </div>

          <div className="boyle-report-reference__summary">
            <div>
              <span>Chuẩn bị</span>
              <strong>
                {controller.isPreparationComplete
                  ? 'Đã xác nhận'
                  : 'Chưa hoàn tất'}
              </strong>
            </div>
            <div>
              <span>Số lần đo</span>
              <strong>
                {controller.measurements.length}
                {' / '}
                {boylePhysicsConfig.targetMeasurementCount}
              </strong>
            </div>
            <div>
              <span>Nhận xét</span>
              <strong>
                {controller.observations.filter(
                  (item) =>
                    item.response.trim(),
                ).length}
                {' / 2'}
              </strong>
            </div>
            <div>
              <span>Luyện tập</span>
              <strong>
                {controller.assessment.submitted
                  ? `${controller.assessmentScore}/${boyleAssessmentQuestions.length}`
                  : 'Chưa nộp'}
              </strong>
            </div>
          </div>

          <div className="boyle-report-reference__table-wrap">
            <table className="boyle-report-reference__table">
              <thead>
                <tr>
                  <th>Lần</th>
                  <th>V</th>
                  <th>1/V</th>
                  <th>p</th>
                  <th>pV</th>
                </tr>
              </thead>
              <tbody>
                {controller.measurements.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      Chưa có số liệu
                    </td>
                  </tr>
                ) : (
                  controller.measurements.map(
                    (measurement, index) => (
                      <tr key={`${measurement.volume}-${index}`}>
                        <th scope="row">
                          {index + 1}
                        </th>
                        <td>
                          {measurement.volume.toFixed(2)}
                        </td>
                        <td>
                          {calculateInverseVolume(
                            measurement.volume,
                          ).toFixed(3)}
                        </td>
                        <td>
                          {measurement.pressure.toFixed(3)}
                        </td>
                        <td>
                          {measurement.pressureVolume.toFixed(3)}
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="boyle-report-reference__units">
            <span>V: {boyleUnits.volume}</span>
            <span>1/V: {boyleUnits.inverseVolume}</span>
            <span>p: {boyleUnits.pressure}</span>
            <span>pV: {boyleUnits.pressureVolume}</span>
          </div>

          <BoyleGraph
            measurements={
              controller.measurements
            }
          />

          <div className="boyle-report-observations">
            <h4>
              Nhận xét đã ghi
            </h4>

            {boyleObservationPrompts.map(
              (prompt, index) => (
                <div
                  key={prompt.id}
                  className="boyle-report-observation"
                >
                  <span>
                    {index + 1}.
                  </span>
                  <div>
                    <strong>
                      {prompt.prompt}
                    </strong>
                    <p>
                      {getObservation(
                        prompt.id,
                      ) || 'Chưa có nhận xét'}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        <section className="boyle-report-preview">
          <div className="boyle-section-heading">
            <span>02</span>
            <div>
              <h3>
                Phiếu thực hành A4
              </h3>
              <p>
                Bảng số liệu, phần tính toán và kết luận được để trống theo đúng nguyên tắc báo cáo thực hành.
              </p>
            </div>
          </div>

          <PrintableBoyleReport />
        </section>
      </div>
    </section>
  )
}


function PrintableBoyleReport() {
  return (
    <PrintableReportShell
      id="boyle-printable-report"
      className="boyle-report-sheet"
      experimentTitle="KHẢO SÁT ĐỊNH LUẬT BOYLE-MARIOTTE"
      description="Khảo sát quá trình biến đổi trạng thái của một lượng khí khi nhiệt độ không đổi"
    >
      <section>
        <h3>
          1. Mục đích thí nghiệm
        </h3>
        <ul>
          <li>
            Thực hành thao tác trên mô hình thiết bị thí nghiệm ảo 3D.
          </li>
          <li>
            Xác định mối liên hệ giữa áp suất p và thể tích V khi T = const.
          </li>
          <li>
            Quan sát sự khác nhau giữa nén chậm và nén nhanh.
          </li>
          <li>
            Vẽ đồ thị p theo 1/V và xử lí kết quả đo.
          </li>
        </ul>
      </section>

      <section>
        <h3>
          2. Cơ sở lí thuyết
        </h3>
        <p>
          <strong>
            2.1. Quá trình đẳng nhiệt là gì?
          </strong>
        </p>
        <BlankLines count={2} />

        <p>
          <strong>
            2.2. Viết biểu thức toán học của định luật Boyle-Mariotte:
          </strong>
        </p>
        <BlankLines count={1} />
      </section>

      <section>
        <h3>
          3. Tiến hành thí nghiệm
        </h3>
        <p>
          <strong>
            Câu hỏi tư duy:
          </strong>
        </p>
        <p>
          Vì sao hệ thống khóa thao tác ghi số liệu sau khi pít-tông bị nén quá nhanh? Trạng thái khối khí lúc đó khác gì so với quá trình đẳng nhiệt?
        </p>
        <BlankLines count={3} />
      </section>

      <section>
        <h3>
          4. Kết quả thí nghiệm
        </h3>
        <p className="boyle-report-sheet__caption">
          Bảng 1. Kết quả khảo sát sự phụ thuộc của p vào V
        </p>

        <table className="boyle-report-sheet__table">
          <thead>
            <tr>
              <th>Lần đo</th>
              <th>V<br />(cm³)</th>
              <th>1/V<br />(cm⁻³)</th>
              <th>p<br />(10⁵ Pa)</th>
              <th>pV</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({
              length:
                boylePhysicsConfig.targetMeasurementCount,
            }).map(
              (_, index) => (
                <tr key={index}>
                  <th scope="row">
                    {index + 1}
                  </th>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>

      <section className="boyle-report-sheet__avoid-break">
        <h3>
          5. Xử lí kết quả và đánh giá
        </h3>
        <p>
          <strong>
            5.1. Vẽ đồ thị sự phụ thuộc của p vào 1/V dựa trên số liệu Bảng 1.
          </strong>
        </p>
        <div className="boyle-report-sheet__graph-frame">
          <span>
            Học sinh tự vẽ đồ thị vào khung này
          </span>
        </div>

        <p>
          <strong>
            5.2. Nhận xét hình dạng đồ thị:
          </strong>
        </p>
        <BlankLines count={2} />

        <p>
          <strong>
            5.3. Giải thích bằng góc nhìn vi mô:
          </strong>
        </p>
        <p>
          Khi giảm thể tích khối khí, chuyển động và va chạm của các phân tử thay đổi như thế nào?
        </p>
        <BlankLines count={2} />
      </section>

      <section className="boyle-report-sheet__avoid-break">
        <h3>
          6. Tính toán sai số và ghi kết quả đo
        </h3>
        <p>
          Δp = ........................................ (10⁵ Pa)
        </p>
        <p>
          ΔV = ........................................ (cm³)
        </p>
        <div className="boyle-report-sheet__formula">
          δk = δp + δV
        </div>
        <p>
          Δk = δk × k̄ = ........................................................
        </p>
        <div className="boyle-report-sheet__formula">
          k = k̄ ± Δk = ........................................................
        </div>
      </section>
    </PrintableReportShell>
  )
}


function BlankLines({
  count,
}: {
  count: number
}) {
  return (
    <div className="boyle-report-sheet__blank-lines">
      {Array.from({
        length: count,
      }).map(
        (_, index) => (
          <span key={index} />
        ),
      )}
    </div>
  )
}
