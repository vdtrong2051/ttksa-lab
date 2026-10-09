
import {
  useEffect,
  useRef,
} from 'react'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  SEISMOGRAPH_GRAPH_COLORS,
} from '../model/types'

import type {
  SeismographSnapshot,
} from '../model/types'

import SeismogramGraph from '../simulation/SeismogramGraph'


interface AnalysisPanelProps {
  snapshots: readonly SeismographSnapshot[]
  onClose: () => void
}


export default function AnalysisPanel({
  snapshots,
  onClose,
}: AnalysisPanelProps) {
  const closeRef =
    useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener(
      'keydown',
      onKeyDown,
    )

    return () => {
      document.removeEventListener(
        'keydown',
        onKeyDown,
      )
    }
  }, [onClose])

  return (
    <div
      className="seismo-analysis-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seismo-analysis-title"
    >
      <section className="seismo-analysis">
        <header className="seismo-analysis__header">
          <div>
            <span>Thu thập dữ liệu</span>

            <h2 id="seismo-analysis-title">
              Phân tích đồ thị 2D
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
          >
            <AppIcon
              name="close"
              size={16}
            />
            Đóng bảng đo
          </button>
        </header>

        <div className="seismo-analysis__body">
          <div className="seismo-analysis__graphs">
            <div className="seismo-analysis__scale">
              <strong>Tỉ lệ đo đạc chung</strong>

              <span>
                ↔ 1 ô lớn ngang = 0,5 giây
              </span>

              <span>
                ↕ 1 ô lớn dọc = 1,0 mét
              </span>
            </div>

            {snapshots.map((snapshot, index) => (
              <article
                key={snapshot.id}
                className="seismo-analysis__sample"
              >
                <h3
                  style={{
                    color:
                      SEISMOGRAPH_GRAPH_COLORS[index],
                  }}
                >
                  Đồ thị mẫu số {index + 1}
                </h3>

                <div className="seismo-analysis__graph">
                  <SeismogramGraph
                    data={snapshot.graphData}
                    color={
                      SEISMOGRAPH_GRAPH_COLORS[index]
                    }
                    label={
                      `Đồ thị địa chấn mẫu ${index + 1}`
                    }
                  />
                </div>

                <small>
                  {snapshot.graphData.length / 100}
                  {' '}giây dữ liệu · Tần số không
                  hiển thị — hãy tính từ đồ thị
                </small>
              </article>
            ))}
          </div>

          <aside className="seismo-analysis__guide">
            <h3>Hướng dẫn đếm ô</h3>

            <p>
              Trục xanh lá là mốc{' '}
              <strong>0 mét</strong>.
            </p>

            <ol>
              <li>
                <strong>Đo chu kì T:</strong>{' '}
                Đếm ô lớn theo chiều ngang
                giữa hai đỉnh sóng liên tiếp.
                T = số ô × 0,5 s.
              </li>

              <li>
                <strong>Tính tần số f:</strong>{' '}
                Lấy f = 1/T (Hz).
              </li>

              <li>
                <strong>Đo biên độ:</strong>{' '}
                Đếm ô lớn từ đường 0 m
                lên đỉnh sóng. Biên độ =
                số ô × 1,0 m.
              </li>
            </ol>

            <h3>Mẫu tham chiếu</h3>

            {snapshots.map((snapshot, index) => (
              <div
                key={snapshot.id}
                className="seismo-analysis__thumbnail"
              >
                <span
                  style={{
                    color:
                      SEISMOGRAPH_GRAPH_COLORS[index],
                  }}
                >
                  Mẫu {index + 1}
                </span>

                <SeismogramGraph
                  data={snapshot.graphData}
                  color={
                    SEISMOGRAPH_GRAPH_COLORS[index]
                  }
                  label={
                    `Bản xem nhanh mẫu ${index + 1}`
                  }
                />
              </div>
            ))}

            <p>
              Đường ghi trên giấy 3D chỉ hiển thị
              đoạn mới nhất; bảng này hiển thị
              tối đa 10 giây dữ liệu/mẫu.
            </p>
          </aside>
        </div>
      </section>
    </div>
  )
}
