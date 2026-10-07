import {
  InlineMath,
} from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useHarmonicMotionSession,
} from '../context'


export default function IntroPage() {
  const {
    navigation,
  } =
    useHarmonicMotionSession()


  return (
    <section className="harmonic-motion-content-phase harmonic-motion-intro">
      <div className="harmonic-motion-content-phase__inner">
        <span className="harmonic-motion-section-badge">
          Phần 1 · Giới thiệu
        </span>

        <div className="harmonic-motion-intro__hero">
          <div>
            <header className="harmonic-motion-content-phase__heading">
              <span className="harmonic-motion-content-phase__eyebrow">
                Dao động cơ · Vật lí 11
              </span>

              <h2>
                Dao động điều hòa và chuyển động tròn đều
              </h2>

              <p>
                Thí nghiệm trực quan hóa mối liên hệ:
                hình chiếu của một vật chuyển động tròn đều lên một trục
                nằm trong mặt phẳng quỹ đạo là một dao động điều hòa.
              </p>
            </header>

            <div className="harmonic-motion-intro__goal">
              <span className="harmonic-motion-intro__goal-icon">
                <AppIcon
                  name="orbit"
                  size={22}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <span>
                  Mục tiêu quan sát
                </span>

                <strong>
                  So sánh hai bóng chuyển động trên cùng một màn chắn
                </strong>

                <p>
                  Bóng của vật hình trụ gắn với mô-tơ và bóng của quả nặng
                  con lắc lò xo sẽ chuyển động đồng bộ, qua đó cho thấy
                  mối liên hệ giữa hai dạng chuyển động.
                </p>
              </div>
            </div>
          </div>

          <aside className="harmonic-motion-intro__formula">
            <span>
              Phương trình hình chiếu
            </span>

            <strong>
              <InlineMath math="x = A\cos(\omega t + \varphi)" />
            </strong>

            <p>
              Ba đại lượng của dao động được đối chiếu trực tiếp
              với chuyển động tròn đều trong thí nghiệm.
            </p>
          </aside>
        </div>

        <div className="harmonic-motion-intro__relations">
          <article>
            <span className="harmonic-motion-intro__relation-icon">
              <AppIcon
                name="orbit"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Không gian
              </span>

              <strong>
                <InlineMath math="A = R" />
              </strong>

              <p>
                Bán kính quỹ đạo tròn
                {' '}
                <InlineMath math="R" />
                {' '}
                tương ứng với biên độ dao động
                {' '}
                <InlineMath math="A" />
                .
              </p>
            </div>
          </article>

          <article>
            <span className="harmonic-motion-intro__relation-icon">
              <AppIcon
                name="gauge"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Thời gian
              </span>

              <strong>
                <InlineMath math="\omega_{\mathrm{tròn}} = \omega_{\mathrm{DĐĐH}}" />
              </strong>

              <p>
                Tốc độ góc của chuyển động tròn chính là tần số góc
                của dao động điều hòa tương ứng.
              </p>
            </div>
          </article>

          <article>
            <span className="harmonic-motion-intro__relation-icon">
              <AppIcon
                name="activity"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Trạng thái ban đầu
              </span>

              <strong>
                <InlineMath math="\varphi" />
              </strong>

              <p>
                Vị trí góc ban đầu trên đường tròn tương ứng
                với pha ban đầu của dao động.
              </p>
            </div>
          </article>
        </div>

        <section className="harmonic-motion-intro__observation">
          <div>
            <span>
              Dấu hiệu cần nhìn thấy
            </span>

            <strong>
              Hai hình chiếu chuyển động trùng khớp trên cùng một trục
            </strong>
          </div>

          <p>
            Khi thí nghiệm chạy, hãy xoay góc nhìn để quan sát rõ màn chắn,
            sau đó thay đổi biên độ và tốc độ góc để kiểm tra sự đồng bộ.
          </p>
        </section>

        <div className="harmonic-motion-phase-actions harmonic-motion-phase-actions--end">
          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={
              navigation.next
            }
          >
            Sang bước chuẩn bị
          </button>
        </div>
      </div>
    </section>
  )
}
