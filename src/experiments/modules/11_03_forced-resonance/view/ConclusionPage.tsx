import {
  InlineMath,
} from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useForcedResonanceSession,
} from '../context'


export default function ConclusionPage() {
  const {
    navigation,
  } =
    useForcedResonanceSession()


  return (
    <section className="forced-content-phase forced-conclusion">
      <div className="forced-content-phase__inner forced-conclusion__inner">
        <span className="forced-section-badge">
          Phần 4 · Kết luận
        </span>

        <header className="forced-content-phase__heading">
          <span className="forced-content-phase__eyebrow">
            Từ quan sát đến điều kiện cộng hưởng
          </span>

          <h2>
            Kết luận thí nghiệm
          </h2>

          <p>
            Hệ nhiều con lắc cho thấy rõ sự khác nhau giữa dao động cưỡng bức thông thường
            và trạng thái cộng hưởng.
          </p>
        </header>

        <section className="forced-conclusion__statement">
          <span className="forced-conclusion__statement-icon">
            <AppIcon
              name="waves"
              size={24}
              strokeWidth={1.8}
            />
          </span>

          <p>
            Các con lắc thử đều có thể bị cưỡng bức dao động.
            Con lắc có chiều dài bằng con lắc điều khiển Đ sẽ dao động mạnh nhất
            vì tần số riêng của nó bằng tần số ngoại lực cưỡng bức.
          </p>
        </section>

        <div className="forced-conclusion__relations">
          <article>
            <span>
              01
            </span>

            <div>
              <small>
                Dao động cưỡng bức
              </small>

              <strong>
                L1, L2, L3 đều dao động
              </strong>

              <p>
                Thanh ngang truyền tác dụng tuần hoàn từ con lắc Đ tới các con lắc thử.
              </p>
            </div>
          </article>

          <article>
            <span>
              02
            </span>

            <div>
              <small>
                Con lắc mạnh nhất
              </small>

              <strong>
                <InlineMath math="l = l_D" />
              </strong>

              <p>
                Với con lắc đơn, chiều dài bằng nhau dẫn tới cùng tần số riêng.
              </p>
            </div>
          </article>

          <article>
            <span>
              03
            </span>

            <div>
              <small>
                Cộng hưởng
              </small>

              <strong>
                <InlineMath math="f = f_0" />
              </strong>

              <p>
                Khi tần số ngoại lực trùng tần số riêng, biên độ cưỡng bức đạt cực đại.
              </p>
            </div>
          </article>
        </div>

        <section className="forced-conclusion__formula">
          <span>
            Chu kì con lắc đơn
          </span>

          <strong>
            <InlineMath math="T = 2\pi\sqrt{l/g}" />
          </strong>
        </section>

        <div className="forced-phase-actions">
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
