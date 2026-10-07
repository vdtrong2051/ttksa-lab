import {
  InlineMath,
} from 'react-katex'

import PrintableReportShell from '../../../core/PrintableReportShell'

import {
  useDampedOscillationSession,
} from '../context'


export default function ReportPage() {
  const {
    navigation,
  } =
    useDampedOscillationSession()


  function handlePrint() {
    window.print()
  }


  return (
    <section className="damped-content-phase damped-report">
      <div className="damped-content-phase__inner damped-report__inner">
        <span className="damped-section-badge">
          Phần 6 · Báo cáo
        </span>

        <div className="damped-report__heading">
          <div>
            <span className="damped-content-phase__eyebrow">
              Tổng hợp sau thực hành
            </span>

            <h2>
              Báo cáo thực hành
            </h2>

            <p>
              Phiếu báo cáo giữ nguyên mục tiêu, câu hỏi phân tích và bài toán mất mát cơ năng của pack gốc,
              nhưng trình bày theo mẫu A4 hiện tại của hệ thống.
            </p>
          </div>

          <div className="damped-report__actions">
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

        <section className="damped-report__reference">
          <span>
            Đại lượng cần đối chiếu
          </span>

          <div>
            <article>
              <small>
                Li độ
              </small>

              <strong>
                <InlineMath math="x = A_0e^{-\beta t}\cos(\omega t + \varphi)" />
              </strong>
            </article>

            <article>
              <small>
                Đường bao
              </small>

              <strong>
                <InlineMath math="A(t) = A_0e^{-\beta t}" />
              </strong>
            </article>

            <article>
              <small>
                Cơ năng
              </small>

              <strong>
                <InlineMath math="W \sim A^2" />
              </strong>
            </article>
          </div>
        </section>

        <section className="damped-report__preview">
          <span className="damped-report__preview-label">
            Phiếu thực hành A4
          </span>

          <PrintableDampedReport />
        </section>
      </div>
    </section>
  )
}


function PrintableDampedReport() {
  return (
    <PrintableReportShell
      id="damped-oscillation-printable-report"
      className="damped-report-sheet"
      experimentTitle="NGHIÊN CỨU DAO ĐỘNG TẮT DẦN"
      description="Khảo sát ảnh hưởng của lực cản môi trường lên biên độ và cơ năng của hệ dao động"
    >
      <section>
        <h3>
          1. Mục đích thí nghiệm
        </h3>

        <p>
          Khảo sát ảnh hưởng của lực ma sát và lực cản môi trường lên biên độ và cơ năng
          của một hệ dao động cơ học thông qua việc vẽ và phân tích đồ thị li độ - thời gian.
        </p>
      </section>


      <section className="damped-report-sheet__avoid-break">
        <h3>
          2. Kết quả quan sát và vẽ đồ thị
        </h3>

        <div className="damped-report-sheet__question">
          <strong>
            a. Kết quả vệt mực
          </strong>

          <p>
            Mô tả hình dạng của đồ thị do mũi bút dạ vẽ lại trên tấm giấy cuộn
            (nhận xét về khoảng cách giữa
            {' '}
            <InlineMath math="2" />
            {' '}
            đỉnh liên tiếp và sự thay đổi độ cao của đỉnh sóng):
          </p>

          <BlankLines
            count={3}
          />
        </div>


        <div className="damped-report-sheet__question">
          <strong>
            b. Phác họa đồ thị dao động
            {' '}
            <InlineMath math="x-t" />
            {' '}
            của con lắc trong
            {' '}
            <InlineMath math="2" />
            {' '}
            môi trường
          </strong>

          <div className="damped-report-sheet__graph-grid">
            <GraphFrame
              title="Không khí (Lực cản nhỏ)"
            />

            <GraphFrame
              title="Nước (Lực cản lớn)"
            />
          </div>
        </div>


        <div className="damped-report-sheet__question">
          <strong>
            c. Nhận xét
          </strong>

          <p>
            So sánh tốc độ giảm biên độ và số chu kì thực hiện được của con lắc
            trong
            {' '}
            <InlineMath math="2" />
            {' '}
            môi trường trên:
          </p>

          <BlankLines
            count={3}
          />
        </div>
      </section>


      <section className="damped-report-sheet__avoid-break">
        <h3>
          3. Phân tích nguyên lý Vật lý
        </h3>

        <p>
          - Cơ năng của hệ bị tiêu hao và chuyển hóa dần thành:
        </p>

        <BlankLines
          count={1}
        />

        <p>
          - Nguyên nhân là do công của lực:
        </p>

        <BlankLines
          count={1}
        />
      </section>


      <section className="damped-report-sheet__avoid-break">
        <h3>
          4. Tìm hiểu thế giới tự nhiên dưới góc độ Vật lý
        </h3>

        <div className="damped-report-sheet__question">
          <strong>
            a. Ứng dụng có lợi (Hệ thống giảm xóc ô tô/xe máy)
          </strong>

          <p>
            Các kĩ sư chế tạo phuộc nhún chứa dầu nhớt bên trong xi-lanh để làm gì?
            Hiện tượng vật lý nào đã được áp dụng triệt để ở đây để xe không bị xóc nảy liên tục khi qua ổ gà?
          </p>

          <BlankLines
            count={4}
          />
        </div>


        <div className="damped-report-sheet__question">
          <strong>
            b. Ảnh hưởng có hại (Đồng hồ quả lắc)
          </strong>

          <p>
            Dao động tắt dần khiến quả lắc đồng hồ sẽ dừng lại sau một thời gian.
            Người thợ đồng hồ đã cung cấp năng lượng bù đắp lại phần cơ năng bị mất mát bằng cơ cấu nào?
          </p>

          <BlankLines
            count={4}
          />
        </div>
      </section>


      <section className="damped-report-sheet__avoid-break">
        <h3>
          5. Bài toán: Tính toán sự mất mát cơ năng
        </h3>

        <p className="damped-report-sheet__problem">
          Một con lắc lò xo dao động tắt dần chậm. Khảo sát bằng cảm biến cho thấy:
          {' '}
          <strong>
            Sau mỗi một chu kì, biên độ của con lắc giảm
            {' '}
            <InlineMath math="5\%" />
          </strong>
          {' '}
          so với biên độ của chu kì ngay trước đó.
        </p>


        <div className="damped-report-sheet__question">
          <strong>
            a. Sau
            {' '}
            <InlineMath math="2" />
            {' '}
            chu kì, biên độ của con lắc
            {' '}
            <InlineMath math="A_2" />
            {' '}
            còn lại bao nhiêu phần trăm so với biên độ ban đầu
            {' '}
            <InlineMath math="A_0" />
            ?
          </strong>

          <BlankLines
            count={5}
          />
        </div>


        <div className="damped-report-sheet__question">
          <strong>
            b. Tính phần trăm cơ năng của hệ đã bị mất đi sau
            {' '}
            <InlineMath math="2" />
            {' '}
            chu kì dao động.
          </strong>

          <p className="damped-report-sheet__hint">
            Gợi ý: Biết cơ năng của dao động điều hòa tỉ lệ thuận với bình phương biên độ
            {' '}
            <InlineMath math="W \sim A^2" />
            . Độ giảm phần trăm cơ năng được tính bằng
            {' '}
            <InlineMath math="\frac{\Delta W}{W_0} = \frac{W_0-W_2}{W_0}\cdot100\%" />
            .
          </p>

          <BlankLines
            count={6}
          />
        </div>
      </section>
    </PrintableReportShell>
  )
}


function GraphFrame({
  title,
}: {
  title:
    string
}) {
  return (
    <div className="damped-report-sheet__graph-frame">
      <strong>
        {
          title
        }
      </strong>

      <span className="damped-report-sheet__graph-y">
        x
      </span>

      <span className="damped-report-sheet__graph-x">
        t
      </span>

      <div className="damped-report-sheet__axis-y" />
      <div className="damped-report-sheet__axis-x" />

      <em>
        Học sinh vẽ đồ thị vào đây
      </em>
    </div>
  )
}


function BlankLines({
  count,
}: {
  count:
    number
}) {
  return (
    <div className="damped-report-sheet__blank-lines">
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
