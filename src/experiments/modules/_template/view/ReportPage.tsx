import PrintableReportShell from '../../../core/PrintableReportShell'

import {
  useTemplateSession,
} from '../context'

import {
  templateObservationPrompts,
  templateQuestions,
  templateRuntimeConfig,
} from '../model/data'


export default function ReportPage() {
  const {
    controller,
    navigation,
  } =
    useTemplateSession()


  function handlePrint() {
    window.print()
  }


  function getObservationResponse(
    id:
      (typeof templateObservationPrompts)[number]['id'],
  ) {
    return (
      controller.observations
        .find(
          (observation) =>
            observation.id ===
            id,
        )
        ?.response
        .trim() ??
      ''
    )
  }


  const assessmentComplete =
    controller.assessment
      .submitted


  return (
    <div className="template-report">
      <div className="template-report__screen">
        {/* ===============================================
            PHASE BADGE
            =============================================== */}

        <span className="template-report__badge">
          Phần 6 · Báo cáo
        </span>


        {/* ===============================================
            HEADING + SCREEN ACTIONS
            =============================================== */}

        <header className="template-report__heading">
          <div>
            <h2>
              Báo cáo thực hành
            </h2>

            <p>
              Đối chiếu dữ liệu điện tử của
              phiên thí nghiệm và in phiếu A4
              để tự hoàn thành báo cáo.
            </p>
          </div>


          <div className="template-report__actions">
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
              onClick={
                handlePrint
              }
            >
              In / Lưu PDF
            </button>
          </div>
        </header>


        {/* ===============================================
            01 — SESSION REFERENCE DATA

            Dữ liệu này là dữ liệu THẬT của phiên.

            Nhưng KHÔNG tự copy vào PrintableReport.
            =============================================== */}

        <section className="template-report-reference">
          <div className="template-report-section-heading">
            <span>
              01
            </span>

            <div>
              <h3>
                Dữ liệu tham chiếu
              </h3>

              <p>
                Đây là dữ liệu được lưu trong
                phiên thí nghiệm. Phần này chỉ
                dùng để đối chiếu, không phải
                nội dung được điền sẵn vào
                phiếu báo cáo.
              </p>
            </div>
          </div>


          {/* =============================================
              SESSION SUMMARY
              ============================================= */}

          <div className="template-report-reference__summary">
            <article>
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


            <article>
              <span>
                Chuẩn bị
              </span>

              <strong>
                {controller.preparationReady
                  ? 'Hoàn tất'
                  : 'Chưa hoàn tất'}
              </strong>
            </article>


            <article>
              <span>
                Nhận xét
              </span>

              <strong>
                {controller.hasAllObservations
                  ? 'Đã hoàn thành'
                  : 'Chưa đầy đủ'}
              </strong>
            </article>


            <article>
              <span>
                Luyện tập
              </span>

              <strong>
                {assessmentComplete
                  ? `${controller.assessmentScore} / ${templateQuestions.length}`
                  : 'Chưa nộp'}
              </strong>
            </article>
          </div>


          {/* =============================================
              MEASUREMENT REFERENCE TABLE

              Template chưa có số liệu vật lý thật,
              nên chỉ thể hiện các lần đo đã tồn tại.
              ============================================= */}

          <div className="template-report-reference__table-wrap">
            <table className="template-report-reference__table">
              <thead>
                <tr>
                  <th scope="col">
                    Lần
                  </th>

                  <th scope="col">
                    Trạng thái
                  </th>

                  <th scope="col">
                    Nguồn dữ liệu
                  </th>
                </tr>
              </thead>

              <tbody>
                {controller.measurementCount ===
                0 ? (
                  <tr>
                    <td
                      colSpan={
                        3
                      }
                      className="template-report-reference__empty"
                    >
                      Chưa có số liệu thực nghiệm
                    </td>
                  </tr>
                ) : (
                  Array.from({
                    length:
                      controller.measurementCount,
                  }).map(
                    (
                      _,
                      index,
                    ) => (
                      <tr
                        key={
                          index
                        }
                      >
                        <th scope="row">
                          {
                            index +
                            1
                          }
                        </th>

                        <td>
                          Đã ghi
                        </td>

                        <td>
                          Practice session
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>
          </div>


          {/* =============================================
              SAVED OBSERVATIONS
              ============================================= */}

          <div className="template-report-observations">
            <h4>
              Nhận xét đã lưu trong phiên
            </h4>


            {templateObservationPrompts.map(
              (
                prompt,
                index,
              ) => {
                const response =
                  getObservationResponse(
                    prompt.id,
                  )


                return (
                  <article
                    key={
                      prompt.id
                    }
                    className="template-report-observation"
                  >
                    <span>
                      {
                        index +
                        1
                      }
                    </span>

                    <div>
                      <strong>
                        {
                          prompt.prompt
                        }
                      </strong>

                      <p>
                        {response ||
                          'Chưa có nhận xét'}
                      </p>
                    </div>
                  </article>
                )
              },
            )}
          </div>


          {/* =============================================
              QUIZ REFERENCE
              ============================================= */}

          <div className="template-report-assessment">
            <div>
              <span>
                Kết quả luyện tập
              </span>

              <strong>
                {assessmentComplete
                  ? `${controller.assessmentScore} / ${templateQuestions.length}`
                  : 'Chưa nộp bài'}
              </strong>
            </div>

            <p>
              Kết quả này thuộc session điện tử
              và không được tự động ghi vào
              phiếu thực hành A4.
            </p>
          </div>
        </section>


        {/* ===============================================
            02 — PRINTABLE A4

            LUÔN để phần học sinh phải làm ở trạng thái trống.
            =============================================== */}

        <section className="template-report-preview">
          <div className="template-report-section-heading">
            <span>
              02
            </span>

            <div>
              <h3>
                Phiếu thực hành A4
              </h3>

              <p>
                Phiếu dưới đây được thiết kế
                để học sinh tự ghi số liệu,
                nhận xét và kết luận.
              </p>
            </div>
          </div>


          <PrintableTemplateReport />
        </section>
      </div>
    </div>
  )
}


/* =========================================================
   PRINTABLE REPORT
   ========================================================= */

function PrintableTemplateReport() {
  return (
    <PrintableReportShell
      id="template-printable-report"
      className="template-report-sheet"
      experimentTitle="MODULE THÍ NGHIỆM MẪU"
      description="Phiếu kiểm thử quy trình thực hành sáu giai đoạn"
    >
      {/* ===============================================
          1. PURPOSE
          =============================================== */}

      <section>
        <h3>
          1. Mục đích thí nghiệm
        </h3>

        <ul>
          <li>
            Thực hiện đầy đủ quy trình
            chuẩn bị, thực hành và phân tích
            một phiên thí nghiệm.
          </li>

          <li>
            Ghi nhận dữ liệu thực nghiệm
            trong quá trình thực hành.
          </li>

          <li>
            Sử dụng dữ liệu đã thu được
            để đưa ra nhận xét và kết luận.
          </li>
        </ul>
      </section>


      {/* ===============================================
          2. PREPARATION
          =============================================== */}

      <section>
        <h3>
          2. Chuẩn bị
        </h3>

        <p>
          <strong>
            Liệt kê các dụng cụ đã sử dụng:
          </strong>
        </p>

        <BlankLines
          count={
            3
          }
        />
      </section>


      {/* ===============================================
          3. PROCEDURE
          =============================================== */}

      <section>
        <h3>
          3. Tiến hành thí nghiệm
        </h3>

        <p>
          Mô tả ngắn gọn trình tự thao tác
          đã thực hiện trong bước Thực hành.
        </p>

        <BlankLines
          count={
            4
          }
        />
      </section>


      {/* ===============================================
          4. DATA TABLE

          QUAN TRỌNG:
          Không đổ session data vào đây.
          =============================================== */}

      <section>
        <h3>
          4. Kết quả thí nghiệm
        </h3>

        <p className="template-report-sheet__caption">
          Bảng 1. Dữ liệu thực nghiệm
        </p>


        <table className="template-report-sheet__table">
          <thead>
            <tr>
              <th>
                Lần đo
              </th>

              <th>
                Đại lượng 1
              </th>

              <th>
                Đại lượng 2
              </th>

              <th>
                Nhận xét
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({
              length:
                templateRuntimeConfig
                  .targetMeasurementCount,
            }).map(
              (
                _,
                index,
              ) => (
                <tr
                  key={
                    index
                  }
                >
                  <th scope="row">
                    {
                      index +
                      1
                    }
                  </th>

                  <td />
                  <td />
                  <td />
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>


      {/* ===============================================
          5. ANALYSIS
          =============================================== */}

      <section className="template-report-sheet__avoid-break">
        <h3>
          5. Phân tích kết quả
        </h3>

        <p>
          <strong>
            5.1. Từ dữ liệu thu được,
            hãy nhận xét kết quả của
            thí nghiệm.
          </strong>
        </p>

        <BlankLines
          count={
            3
          }
        />


        <p>
          <strong>
            5.2. Có yếu tố nào có thể
            làm kết quả bị sai lệch?
          </strong>
        </p>

        <BlankLines
          count={
            3
          }
        />
      </section>


      {/* ===============================================
          6. CONCLUSION
          =============================================== */}

      <section className="template-report-sheet__avoid-break">
        <h3>
          6. Kết luận
        </h3>

        <p>
          Viết kết luận cuối cùng dựa trên
          dữ liệu và nhận xét của bạn.
        </p>

        <BlankLines
          count={
            4
          }
        />
      </section>
    </PrintableReportShell>
  )
}


/* =========================================================
   BLANK LINES
   ========================================================= */

function BlankLines({
  count,
}: {
  count:
    number
}) {
  return (
    <div className="template-report-sheet__blank-lines">
      {Array.from({
        length:
          count,
      }).map(
        (
          _,
          index,
        ) => (
          <span
            key={
              index
            }
          />
        ),
      )}
    </div>
  )
}