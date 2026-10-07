import {
  InlineMath,
} from 'react-katex'

import PrintableReportShell from '../../../core/PrintableReportShell'

import {
  useForcedResonanceSession,
} from '../context'


export default function ReportPage() {
  const {
    navigation,
  } =
    useForcedResonanceSession()


  function handlePrint() {
    window.print()
  }


  return (
    <section className="forced-content-phase forced-report">
      <div className="forced-content-phase__inner forced-report__inner">
        <span className="forced-section-badge">
          Phần 6 · Báo cáo
        </span>

        <div className="forced-report__heading">
          <div>
            <span className="forced-content-phase__eyebrow">
              Tổng hợp sau thực hành
            </span>

            <h2>
              Báo cáo thực hành
            </h2>

            <p>
              Phiếu báo cáo tổng hợp đúng nội dung của thí nghiệm:
              hệ nhiều con lắc, điều kiện cộng hưởng và công thức chu kì con lắc đơn.
            </p>
          </div>

          <div className="forced-report__actions">
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
        </div>

        <section className="forced-report__reference">
          <span>
            Quan hệ cần đối chiếu
          </span>

          <div>
            <article>
              <small>
                Chu kì riêng
              </small>

              <strong>
                <InlineMath math="T = 2\pi\sqrt{l/g}" />
              </strong>
            </article>

            <article>
              <small>
                Điều kiện cộng hưởng
              </small>

              <strong>
                <InlineMath math="f = f_0" />
              </strong>
            </article>

            <article>
              <small>
                Biên độ
              </small>

              <strong>
                <InlineMath math="A = A_{\max}" />
              </strong>
            </article>
          </div>
        </section>

        <section className="forced-report__preview">
          <span className="forced-report__preview-label">
            Phiếu thực hành A4
          </span>

          <PrintableForcedResonanceReport />
        </section>
      </div>
    </section>
  )
}


function PrintableForcedResonanceReport() {
  return (
    <PrintableReportShell
      id="forced-resonance-printable-report"
      className="forced-report-sheet"
      experimentTitle="DAO ĐỘNG CƯỠNG BỨC VÀ HIỆN TƯỢNG CỘNG HƯỞNG"
      description="Khảo sát hệ nhiều con lắc và điều kiện để biên độ dao động cưỡng bức đạt cực đại"
    >
      <section>
        <h3>
          1. Mục đích thí nghiệm
        </h3>

        <p>
          Quan sát dao động cưỡng bức của các con lắc thử L1, L2, L3 dưới tác dụng tuần hoàn
          của con lắc điều khiển Đ; xác định điều kiện để một con lắc dao động với biên độ lớn nhất.
        </p>
      </section>


      <section className="forced-report-sheet__avoid-break">
        <h3>
          2. Bố trí và thông số khảo sát
        </h3>

        <p>
          Ghi lại chiều dài các con lắc trong một lần khảo sát:
        </p>

        <div className="forced-report-sheet__table">
          <div className="forced-report-sheet__table-row forced-report-sheet__table-row--head">
            <span>
              Con lắc
            </span>

            <span>
              Chiều dài
            </span>

            <span>
              Mức dao động quan sát
            </span>
          </div>

          {[
            'Đ',
            'L1',
            'L2',
            'L3',
          ].map(
            (
              label,
            ) => (
              <div
                key={
                  label
                }
                className="forced-report-sheet__table-row"
              >
                <strong>
                  {
                    label
                  }
                </strong>

                <span className="forced-report-sheet__blank-cell" />

                <span className="forced-report-sheet__blank-cell" />
              </div>
            ),
          )}
        </div>
      </section>


      <section className="forced-report-sheet__avoid-break">
        <h3>
          3. Kết quả quan sát
        </h3>

        <div className="forced-report-sheet__question">
          <strong>
            a. Các con lắc L1, L2, L3 có dao động hay không? Giải thích vai trò của thanh ngang.
          </strong>

          <BlankLines
            count={3}
          />
        </div>

        <div className="forced-report-sheet__question">
          <strong>
            b. Con lắc nào dao động mạnh nhất? So sánh chiều dài của nó với con lắc Đ.
          </strong>

          <BlankLines
            count={3}
          />
        </div>
      </section>


      <section className="forced-report-sheet__avoid-break">
        <h3>
          4. Phân tích điều kiện cộng hưởng
        </h3>

        <p>
          Với con lắc đơn:
          {' '}
          <InlineMath math="T = 2\pi\sqrt{l/g}" />
          .
        </p>

        <p>
          Từ kết quả quan sát, hãy giải thích vì sao khi
          {' '}
          <InlineMath math="l = l_D" />
          {' '}
          thì tần số riêng của con lắc thử bằng tần số ngoại lực cưỡng bức.
        </p>

        <BlankLines
          count={4}
        />

        <p>
          Viết điều kiện cộng hưởng:
        </p>

        <div className="forced-report-sheet__formula-box">
          <InlineMath math="f = f_0 \Rightarrow A = A_{\max}" />
        </div>
      </section>


      <section className="forced-report-sheet__avoid-break">
        <h3>
          5. Kết luận
        </h3>

        <p>
          Hoàn thành nhận xét:
        </p>

        <p>
          - Dao động cưỡng bức là:
        </p>

        <BlankLines
          count={2}
        />

        <p>
          - Hiện tượng cộng hưởng xảy ra khi:
        </p>

        <BlankLines
          count={2}
        />

        <p>
          - Khi cộng hưởng, biên độ dao động cưỡng bức:
        </p>

        <BlankLines
          count={2}
        />
      </section>
    </PrintableReportShell>
  )
}


function BlankLines({
  count,
}: {
  count:
    number
}) {
  return (
    <div className="forced-report-sheet__blank-lines">
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
