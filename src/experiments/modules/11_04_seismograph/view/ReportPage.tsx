
import { useState } from 'react'

import { useSeismographSession } from '../context'

import './content.css'

interface ReportRow {
  id: number
  type: string
  cells: string[]
}

type AnswerKey = 'q1' | 'q2' | 'q3'

const tableColumns = [
  'Số ô ngang (giữa 2 đỉnh)',
  'Chu kì T (giây)',
  'Tần số f (Hz)',
  'Số ô dọc (đỉnh sóng)',
  'Biên độ A (mét)',
]

const reportQuestions: {
  key: AnswerKey
  text: string
}[] = [
  {
    key: 'q1',
    text:
      '1. Dựa vào bảng số liệu, so sánh biên độ dao động giữa 3 trường hợp. Khi nào biên độ đạt cực đại?',
  },
  {
    key: 'q2',
    text:
      '2. Mô tả hiện tượng xảy ra đối với máy đo và đồ thị thu được khi hệ thống rơi vào trạng thái CỘNG HƯỞNG (Tần số máy đo ≈ Tần số ngoại lực).',
  },
  {
    key: 'q3',
    text:
      '3. Rút ra kết luận: Để thiết kế một máy đo địa chấn hoạt động chính xác (đồ thị không bị sai lệch do cộng hưởng), ta nên chọn lò xo có độ cứng như thế nào?',
  },
]

export default function ReportPage() {
  const { navigation, controller } = useSeismographSession()

  const [studentName, setStudentName] = useState('')
  const [className, setClassName] = useState('')

  const [tableData, setTableData] = useState<ReportRow[]>([
    {
      id: 1,
      type: 'Mềm (Quán tính cao)',
      cells: ['', '', '', '', ''],
    },
    {
      id: 2,
      type: 'Cứng',
      cells: ['', '', '', '', ''],
    },
    {
      id: 3,
      type: 'Cộng hưởng',
      cells: ['', '', '', '', ''],
    },
  ])

  const [answers, setAnswers] = useState<
    Record<AnswerKey, string>
  >({
    q1: '',
    q2: '',
    q3: '',
  })

  function updateCell(
    rowIndex: number,
    colIndex: number,
    value: string,
  ) {
    setTableData((current) =>
      current.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              cells: row.cells.map((cell, cellIndex) =>
                cellIndex === colIndex ? value : cell,
              ),
            }
          : row,
      ),
    )
  }

  return (
    <section className="seismo-content seismo-report">
      <div className="seismo-content__inner">
        <span className="seismo-content__badge seismo-report__screen-only">
          Phần 6 · Báo cáo
        </span>

        <div className="seismo-report__toolbar seismo-report__screen-only">
          <div>
            <h2>Báo cáo thực hành</h2>

            <p>
              Điền số liệu từ đồ thị đã đo và trả lời ba câu hỏi.
              Hiện có {controller.snapshots.length}/3 mẫu
              được lưu trong phiên thực hành.
            </p>
          </div>

          <div className="seismo-report__actions">
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

        <article
          id="seismo-printable-report"
          className="seismo-report__paper"
        >
          <header className="seismo-report__paper-header">
            <h2>BÁO CÁO THỰC HÀNH</h2>

            <p>
              TÌM HIỂU HIỆN TƯỢNG CỘNG HƯỞNG CƠ HỌC
              QUA MÁY ĐO ĐỊA CHẤN
            </p>
          </header>

          <div className="seismo-report__identity">
            <label>
              <strong>Họ và tên học sinh:</strong>

              <input
                type="text"
                value={studentName}
                onChange={(event) =>
                  setStudentName(event.target.value)
                }
                placeholder="Nhập tên..."
              />

              <span className="seismo-report__print-value">
                {studentName || ' '}
              </span>
            </label>

            <label>
              <strong>Lớp:</strong>

              <input
                type="text"
                value={className}
                onChange={(event) =>
                  setClassName(event.target.value)
                }
                placeholder="Nhập lớp..."
              />

              <span className="seismo-report__print-value">
                {className || ' '}
              </span>
            </label>
          </div>

          {/* I. MỤC TIÊU */}
          <section className="seismo-report__section">
            <h3>I. Mục tiêu</h3>

            <ul>
              <li>
                Hiểu rõ cấu tạo và nguyên lý hoạt động
                của máy đo địa chấn kiểu lò xo.
              </li>

              <li>
                Quan sát, ghi nhận và phân tích
                hiện tượng cộng hưởng cơ học.
              </li>

              <li>
                Rèn luyện kỹ năng đọc đồ thị:
                Xác định chu kỳ (T), tần số (f)
                và biên độ (A).
              </li>
            </ul>
          </section>

          {/* II. SỐ LIỆU */}
          <section className="seismo-report__section">
            <h3>II. Xử lý số liệu từ đồ thị</h3>

            <div className="seismo-report__scale">
              <p>
                <strong>Nhắc lại tỉ lệ đo đạc:</strong>
                {' '}Trục ngang (1 ô lớn = 0,5 s);
                trục dọc (1 ô lớn = 1,0 m).
              </p>

              <p>
                <strong>Công thức:</strong>
                {' '}Chu kì T = Số ô ngang × 0,5;
                tần số f = 1/T;
                biên độ A = Số ô dọc × 1,0.
              </p>
            </div>

            <div className="seismo-report__table-wrap">
              <table className="seismo-report__table">
                <thead>
                  <tr>
                    <th scope="col">
                      Trạng thái máy
                    </th>

                    {tableColumns.map((column) => (
                      <th scope="col" key={column}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={row.id}>
                      <th scope="row">
                        Mẫu {row.id}: {row.type}
                      </th>

                      {row.cells.map((cell, colIndex) => (
                        <td key={tableColumns[colIndex]}>
                          <input
                            type="text"
                            inputMode="decimal"
                            aria-label={
                              `Mẫu ${row.id}, ${
                                tableColumns[colIndex]
                              }`
                            }
                            value={cell}
                            onChange={(event) =>
                              updateCell(
                                rowIndex,
                                colIndex,
                                event.target.value,
                              )
                            }
                          />

                          <span className="seismo-report__print-value">
                            {cell || ' '}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* III. CÂU HỎI */}
          <section className="seismo-report__section">
            <h3>III. Trả lời câu hỏi &amp; Kết luận</h3>

            <div className="seismo-report__questions">
              {reportQuestions.map((item) => (
                <div
                  key={item.key}
                  className="seismo-report__question"
                >
                  <label
                    htmlFor={`seismo-answer-${item.key}`}
                  >
                    {item.text}
                  </label>

                  <textarea
                    id={`seismo-answer-${item.key}`}
                    rows={3}
                    value={answers[item.key]}
                    onChange={(event) =>
                      setAnswers((current) => ({
                        ...current,
                        [item.key]: event.target.value,
                      }))
                    }
                    placeholder="Nhập câu trả lời..."
                  />

                  <p className="seismo-report__print-answer">
                    {answers[item.key] ||
                      '...................................................................................................'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <footer className="seismo-report__signature">
            <p>Ngày ..... tháng ..... năm 202...</p>
            <strong>CHỮ KÝ HỌC SINH</strong>
          </footer>
        </article>
      </div>
    </section>
  )
}
