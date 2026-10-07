import {
  InlineMath,
} from 'react-katex'

import PrintableReportShell from '../../../core/PrintableReportShell'

import {
  useHarmonicMotionSession,
} from '../context'


export default function ReportPage() {
  const {
    navigation,
  } =
    useHarmonicMotionSession()


  function handlePrint() {
    window.print()
  }


  return (
    <section className="harmonic-motion-content-phase harmonic-motion-report">
      <div className="harmonic-motion-content-phase__inner harmonic-motion-report__inner">
        <span className="harmonic-motion-section-badge">
          Phần 6 · Báo cáo
        </span>

        <div className="harmonic-motion-report__heading">
          <div>
            <span className="harmonic-motion-content-phase__eyebrow">
              Tổng hợp sau thực hành
            </span>

            <h2>
              Báo cáo thực hành
            </h2>

            <p>
              Phiếu A4 giữ nguyên mục tiêu và nội dung xử lí số liệu
              của pack gốc, nhưng để học sinh tự ghi kết quả quan sát.
            </p>
          </div>

          <div className="harmonic-motion-report__actions">
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

        <section className="harmonic-motion-report__reference">
          <span>
            Đại lượng cần đối chiếu
          </span>

          <div>
            <article>
              <small>
                Không gian
              </small>

              <strong>
                <InlineMath math="A = R" />
              </strong>
            </article>

            <article>
              <small>
                Thời gian
              </small>

              <strong>
                <InlineMath math="T = \frac{2\pi}{\omega}" />
              </strong>
            </article>

            <article>
              <small>
                Phương trình
              </small>

              <strong>
                <InlineMath math="x = A\cos(\omega t + \varphi)" />
              </strong>
            </article>
          </div>
        </section>

        <section className="harmonic-motion-report__preview">
          <span className="harmonic-motion-report__preview-label">
            Phiếu thực hành A4
          </span>

          <PrintableHarmonicReport />
        </section>
      </div>
    </section>
  )
}


function PrintableHarmonicReport() {
  return (
    <PrintableReportShell
      id="harmonic-motion-printable-report"
      className="harmonic-motion-report-sheet"
      experimentTitle="MỐI LIÊN HỆ GIỮA DAO ĐỘNG ĐIỀU HÒA VÀ CHUYỂN ĐỘNG TRÒN ĐỀU"
      description="Trực quan hóa hình chiếu của chuyển động tròn đều dưới dạng dao động điều hòa"
    >
      <section>
        <h3>
          1. Mục đích thí nghiệm
        </h3>

        <p>
          Trực quan hóa và kiểm chứng bằng thực nghiệm:
          hình chiếu của một vật chuyển động tròn đều xuống một trục tọa độ
          nằm trong mặt phẳng quỹ đạo là một dao động điều hòa.
        </p>
      </section>

      <section className="harmonic-motion-report-sheet__avoid-break">
        <h3>
          2. Kết quả quan sát
        </h3>

        <p>
          Mô tả sự đồng bộ giữa bóng của vật hình trụ và bóng của con lắc lò xo
          khi mô-tơ hoạt động:
        </p>

        <BlankLines
          count={
            4
          }
        />
      </section>

      <section className="harmonic-motion-report-sheet__avoid-break">
        <h3>
          3. Xử lí số liệu & lập phương trình dao động
        </h3>

        <div className="harmonic-motion-report-sheet__question">
          <strong>
            a. Sự tương đương về không gian
          </strong>

          <p>
            Bán kính quỹ đạo tròn của mô-tơ:
            {' '}
            <InlineMath math="R = \dots\dots\dots\dots" />
            {' '}
            (m)
          </p>

          <p>
            Suy ra biên độ dao động:
            {' '}
            <InlineMath math="A = \dots\dots\dots\dots" />
            {' '}
            (m)
          </p>
        </div>

        <div className="harmonic-motion-report-sheet__question">
          <strong>
            b. Sự tương đương về thời gian
          </strong>

          <p>
            Tốc độ góc của mô-tơ:
            {' '}
            <InlineMath math="\omega = \dots\dots\dots\dots" />
            {' '}
            (rad/s)
          </p>

          <p>
            Tần số góc của dao động:
            {' '}
            <InlineMath math="\omega = \dots\dots\dots\dots" />
            {' '}
            (rad/s)
          </p>

          <p>
            Chu kì:
            {' '}
            <InlineMath math="T = \frac{2\pi}{\omega} = \dots\dots\dots" />
            {' '}
            (s)
          </p>
        </div>

        <div className="harmonic-motion-report-sheet__question">
          <strong>
            c. Pha ban đầu và phương trình
          </strong>

          <p>
            Giả sử tại
            {' '}
            <InlineMath math="t = 0" />
            , vật hình trụ ở vị trí cao nhất.
          </p>

          <p>
            Pha ban đầu:
            {' '}
            <InlineMath math="\varphi = \dots\dots\dots" />
            {' '}
            (rad)
          </p>

          <p>
            Viết phương trình:
          </p>

          <div className="harmonic-motion-report-sheet__formula-box">
            <InlineMath math="x = A\cos(\omega t + \varphi)" />
          </div>
        </div>
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
    <div className="harmonic-motion-report-sheet__blank-lines">
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
