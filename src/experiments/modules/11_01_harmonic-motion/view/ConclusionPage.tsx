import {
  InlineMath,
} from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useHarmonicMotionSession,
} from '../context'


export default function ConclusionPage() {
  const {
    navigation,
  } =
    useHarmonicMotionSession()


  return (
    <section className="harmonic-motion-content-phase harmonic-motion-conclusion">
      <div className="harmonic-motion-content-phase__inner harmonic-motion-conclusion__inner">
        <span className="harmonic-motion-section-badge">
          Phần 4 · Kết luận
        </span>

        <header className="harmonic-motion-content-phase__heading">
          <span className="harmonic-motion-content-phase__eyebrow">
            Từ quan sát đến mô hình
          </span>

          <h2>
            Kết luận thí nghiệm
          </h2>

          <p>
            Hai hình chiếu trên màn chuyển động trùng khớp,
            cho phép đối chiếu trực tiếp dao động điều hòa
            với chuyển động tròn đều.
          </p>
        </header>

        <section className="harmonic-motion-conclusion__statement">
          <span className="harmonic-motion-conclusion__statement-icon">
            <AppIcon
              name="orbit"
              size={24}
              strokeWidth={1.8}
            />
          </span>

          <p>
            Dao động điều hòa có thể được coi là
            {' '}
            <strong>
              hình chiếu của một chuyển động tròn đều
            </strong>
            {' '}
            xuống một đường thẳng nằm trong mặt phẳng quỹ đạo.
          </p>
        </section>

        <div className="harmonic-motion-conclusion__relations">
          <article>
            <span>
              01
            </span>

            <div>
              <small>
                Biên độ
              </small>

              <strong>
                <InlineMath math="A = R" />
              </strong>

              <p>
                Bán kính quỹ đạo tròn chính là biên độ dao động.
              </p>
            </div>
          </article>

          <article>
            <span>
              02
            </span>

            <div>
              <small>
                Tần số góc
              </small>

              <strong>
                <InlineMath math="\omega_{\mathrm{tròn}} = \omega_{\mathrm{DĐĐH}}" />
              </strong>

              <p>
                Tốc độ góc của chuyển động tròn bằng tần số góc của dao động.
              </p>
            </div>
          </article>

          <article>
            <span>
              03
            </span>

            <div>
              <small>
                Pha ban đầu
              </small>

              <strong>
                <InlineMath math="\varphi" />
              </strong>

              <p>
                Vị trí góc ban đầu trên đường tròn xác định pha ban đầu.
              </p>
            </div>
          </article>
        </div>

        <section className="harmonic-motion-conclusion__formula">
          <span>
            Phương trình tương ứng
          </span>

          <strong>
            <InlineMath math="x = A\cos(\omega t + \varphi)" />
          </strong>
        </section>

        <div className="harmonic-motion-phase-actions">
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
