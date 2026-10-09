
import { InlineMath } from 'react-katex'

import PrintableReportShell from '../../../core/PrintableReportShell'

import {
  useForcedResonanceSession,
} from '../context'


const trueFalseStatements = [
  {
    id: 'a',
    text:
      'Biên độ của dao động cưỡng bức chỉ phụ thuộc vào biên độ của ngoại lực cưỡng bức.',
  },
  {
    id: 'b',
    text:
      'Tần số của dao động cưỡng bức ở giai đoạn ổn định luôn bằng tần số của ngoại lực.',
  },
  {
    id: 'c',
    text:
      'Hiện tượng cộng hưởng xảy ra khi tần số góc của ngoại lực lớn hơn tần số góc riêng của hệ.',
  },
  {
    id: 'd',
    text:
      'Trong hiện tượng cộng hưởng, lực cản của môi trường càng nhỏ thì biên độ cực đại đạt được càng lớn.',
  },
]


function AnswerLines({
  rows,
}: {
  rows: number
}) {
  return (
    <div className="forced-report-sheet__blank-lines">
      {Array.from({ length: rows }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  )
}


function PrintableResonanceReport() {
  return (
    <PrintableReportShell
      id="forced-resonance-printable-report"
      className="forced-report-sheet"
      experimentTitle="CỘNG HƯỞNG & DAO ĐỘNG CƯỠNG BỨC"
      description="Báo cáo thực hành Vật lí 11"
    >
      {/* 1. MỤC ĐÍCH */}
      <section className="forced-report-sheet__avoid-break">
        <h3>1. Mục đích thí nghiệm</h3>

        <p>
          Khảo sát sự truyền năng lượng
          của dao động cưỡng bức và kiểm chứng
          điều kiện xảy ra hiện tượng cộng hưởng
          cơ học thông qua việc thay đổi
          chiều dài của con lắc điều khiển.
        </p>
      </section>

      {/* 2. HAI LẦN KHẢO SÁT */}
      <section>
        <h3>2. Kết quả quan sát thực nghiệm</h3>

        <div className="forced-report-sheet__question">
          <strong>a. Lần thử nghiệm 1</strong>

          <p>
            Thiết lập chiều dài con lắc
            điều khiển:{' '}
            <InlineMath
              math={String.raw`l_D = 5\,\mathrm{m}`}
            />
            .
          </p>

          <p>
            Con lắc thử dao động với biên độ
            cực đại là con lắc có chiều dài:
          </p>

          <div className="forced-report-sheet__answer-box">
            <InlineMath
              math={String.raw`l = \ldots\ldots\ldots\,\mathrm{m}`}
            />
          </div>

          <p>
            Giải thích nguyên nhân dựa vào
            công thức chu kì dao động
            của con lắc đơn:
          </p>

          <AnswerLines rows={4} />
        </div>

        <div className="forced-report-sheet__question">
          <strong>b. Lần thử nghiệm 2</strong>

          <p>
            Thiết lập chiều dài con lắc
            điều khiển:{' '}
            <InlineMath
              math={String.raw`l_D = 3\,\mathrm{m}`}
            />
            .
          </p>

          <p>
            Hiện tượng cộng hưởng lúc này
            chuyển sang xảy ra ở con lắc nào?
            Nhận xét về biên độ của các con lắc
            còn lại so với khi xảy ra cộng hưởng.
          </p>

          <AnswerLines rows={4} />
        </div>
      </section>

      {/* 3. ĐÚNG / SAI */}
      <section>
        <h3>3. Câu hỏi trắc nghiệm Đúng/Sai</h3>

        <p>
          Đánh dấu (X) vào ô Đ (Đúng)
          hoặc S (Sai) cho các phát biểu sau
          về dao động cưỡng bức và cộng hưởng:
        </p>

        <table className="forced-report-sheet__tf-table">
          <thead>
            <tr>
              <th scope="col">TT</th>
              <th scope="col">Phát biểu</th>
              <th scope="col">Đ</th>
              <th scope="col">S</th>
            </tr>
          </thead>

          <tbody>
            {trueFalseStatements.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>

                <td>{item.text}</td>

                <td>
                  <span className="forced-report-sheet__checkbox" />
                </td>

                <td>
                  <span className="forced-report-sheet__checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 4. ĐOÀN QUÂN QUA CẦU */}
      <section>
        <h3>
          4. Tìm hiểu thế giới tự nhiên
          dưới góc độ Vật lý
        </h3>

        <p>
          Tại sao một đoàn quân khi đi đều bước
          qua một cây cầu treo lại được lệnh phải{' '}
          <strong>đổi sang bước đi tự do</strong>{' '}
          (đi không đều nhịp)?
          Hãy giải thích bản chất vật lý
          của mệnh lệnh này.
        </p>

        <AnswerLines rows={5} />
      </section>

      {/* 5. HỆ THỐNG CHỐNG RUNG */}
      <section>
        <h3>
          5. Bài toán thực tiễn:
          Hệ thống chống rung
        </h3>

        <div className="forced-report-sheet__problem">
          Một chi tiết máy gắn trên một bệ đỡ cứng.
          Hệ thống này có tần số dao động riêng là{' '}
          <InlineMath
            math={String.raw`f_0 = 10\,\mathrm{Hz}`}
          />
          .
        </div>

        <div className="forced-report-sheet__question">
          <strong>
            a. Để hệ thống không bị rung lắc
            dữ dội, tốc độ quay của động cơ
            (tính bằng vòng/phút — rpm)
            phải tránh giá trị nào?
          </strong>

          <AnswerLines rows={5} />
        </div>

        <div className="forced-report-sheet__question">
          <strong>
            b. Viết biểu thức toán học thể hiện
            điều kiện cộng hưởng giữa chu kì
            của ngoại lực và chu kì riêng.
          </strong>

          <p>
            Kí hiệu chu kì ngoại lực là{' '}
            <InlineMath math="T" />{' '}
            và chu kì riêng là{' '}
            <InlineMath math="T_0" />.
          </p>

          <div className="forced-report-sheet__formula-answer">
            <span>Viết biểu thức vào khung này</span>
          </div>
        </div>
      </section>

      {/* 6. NƯỚC SÓNG SÁNH */}
      <section>
        <h3>
          6. Bài toán tính toán:
          Hiện tượng sóng sánh
        </h3>

        <div className="forced-report-sheet__problem">
          Một học sinh xách một xô nước đi trên
          đường ngang. Chu kì dao động riêng
          của nước trong xô là{' '}
          <InlineMath
            math={String.raw`T_0 = 0.8\,\mathrm{s}`}
          />
          . Mỗi bước đi của học sinh dài{' '}
          <InlineMath
            math={String.raw`L = 40\,\mathrm{cm}`}
          />
          .
        </div>

        <div className="forced-report-sheet__question">
          <strong>
            Học sinh đó phải đi với tốc độ{' '}
            <InlineMath math="v" />{' '}
            bằng bao nhiêu thì nước trong xô
            bị sóng sánh (dao động) mạnh nhất?
            Trình bày các bước giải:
          </strong>

          <AnswerLines rows={6} />
        </div>
      </section>
    </PrintableReportShell>
  )
}


export default function ReportPage() {
  const { navigation } =
    useForcedResonanceSession()

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

            <h2>Báo cáo thực hành</h2>

            <p>
              Hoàn thành phiếu báo cáo về
              dao động cưỡng bức, điều kiện
              cộng hưởng và các tình huống
              ứng dụng thực tế.
            </p>
          </div>

          <div className="forced-report__actions">
            <button
              type="button"
              className="experiment-lab-button"
              onClick={navigation.previous}
            >
              Quay lại luyện tập
            </button>

            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={() => window.print()}
            >
              In / Lưu PDF
            </button>
          </div>
        </div>

        <section className="forced-report__preview">
          <span className="forced-report__preview-label">
            Xem trước phiếu thực hành A4
          </span>

          <PrintableResonanceReport />
        </section>
      </div>
    </section>
  )
}
