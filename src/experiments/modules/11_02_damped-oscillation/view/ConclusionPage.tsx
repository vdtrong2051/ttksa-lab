import {
  InlineMath,
} from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useDampedOscillationSession,
} from '../context'


export default function ConclusionPage() {
  const {
    navigation,
  } =
    useDampedOscillationSession()


  return (
    <section className="damped-content-phase damped-conclusion">
      <div className="damped-content-phase__inner damped-conclusion__inner">
        <span className="damped-section-badge">
          Phần 4 · Kết luận
        </span>

        <header className="damped-content-phase__heading">
          <span className="damped-content-phase__eyebrow">
            Từ vệt mực đến hiện tượng vật lí
          </span>

          <h2>
            Kết luận thí nghiệm
          </h2>

          <p>
            Từ vết mực trên băng giấy, có thể rút ra ba đặc điểm cốt lõi của dao động tắt dần.
          </p>
        </header>

        <section className="damped-conclusion__statement">
          <span className="damped-conclusion__statement-icon">
            <AppIcon
              name="activity"
              size={24}
              strokeWidth={1.8}
            />
          </span>

          <p>
            Dao động tắt dần là dao động có
            {' '}
            <strong>
              biên độ giảm dần theo thời gian
            </strong>
            {' '}
            do cơ năng của hệ bị tiêu hao bởi lực ma sát và lực cản môi trường.
          </p>
        </section>

        <div className="damped-conclusion__relations">
          <article>
            <span>
              01
            </span>

            <div>
              <small>
                Biên độ
              </small>

              <strong>
                Giảm dần
              </strong>

              <p>
                Lực cản của môi trường, ma sát tại điểm treo và ma sát của mũi bút sinh công âm,
                làm năng lượng của hệ giảm dần.
              </p>
            </div>
          </article>

          <article>
            <span>
              02
            </span>

            <div>
              <small>
                Chuyển hóa năng lượng
              </small>

              <strong>
                <InlineMath math="W" />
                {' → nhiệt năng'}
              </strong>

              <p>
                Cơ năng không biến mất mà chuyển hóa dần thành nhiệt năng làm nóng môi trường xung quanh.
              </p>
            </div>
          </article>

          <article>
            <span>
              03
            </span>

            <div>
              <small>
                Chu kì gần đúng
              </small>

              <strong>
                <InlineMath math="T \approx \text{không đổi}" />
              </strong>

              <p>
                Khi lực cản nhỏ, khoảng cách giữa hai đỉnh sóng mực liên tiếp gần như bằng nhau,
                nên chu kì dao động hầu như không đổi.
              </p>
            </div>
          </article>
        </div>

        <section className="damped-conclusion__formula">
          <span>
            Đường bao biên độ
          </span>

          <strong>
            <InlineMath math="A(t) = A_0e^{-\beta t}" />
          </strong>
        </section>

        <div className="damped-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={
              navigation.previous
            }
          >
            Thực hành lại
          </button>

          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={
              navigation.next
            }
          >
            Làm bài luyện tập
          </button>
        </div>
      </div>
    </section>
  )
}
