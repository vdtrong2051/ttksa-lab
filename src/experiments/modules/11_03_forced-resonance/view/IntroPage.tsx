import {
  InlineMath,
} from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useForcedResonanceSession,
} from '../context'


export default function IntroPage() {
  const {
    navigation,
  } =
    useForcedResonanceSession()


  return (
    <section className="forced-content-phase forced-intro">
      <div className="forced-content-phase__inner">
        <span className="forced-section-badge">
          Phần 1 · Giới thiệu
        </span>

        <div className="forced-intro__hero">
          <div>
            <header className="forced-content-phase__heading">
              <span className="forced-content-phase__eyebrow">
                Dao động cơ · Vật lí 11
              </span>

              <h2>
                Dao động cưỡng bức & cộng hưởng
              </h2>

              <p>
                Khi một hệ dao động chịu tác dụng của ngoại lực biến thiên tuần hoàn,
                hệ bị ép dao động theo. Biên độ dao động phụ thuộc vào độ chênh lệch
                giữa tần số ngoại lực và tần số riêng của hệ.
              </p>
            </header>

            <div className="forced-intro__goal">
              <span className="forced-intro__goal-icon">
                <AppIcon
                  name="waves"
                  size={22}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <span>
                  Dấu hiệu cần quan sát
                </span>

                <strong>
                  Con lắc có tần số riêng trùng với tần số ngoại lực dao động mạnh nhất
                </strong>

                <p>
                  Trong mô hình nhiều con lắc, con lắc Đ đóng vai trò nguồn phát động.
                  Các con lắc thử nhận dao động cưỡng bức thông qua thanh ngang.
                </p>
              </div>
            </div>
          </div>

          <aside className="forced-intro__formula">
            <span>
              Điều kiện cộng hưởng
            </span>

            <strong className="forced-intro__formula-value">
              <InlineMath math="f = f_0 \Rightarrow A = A_{\max}" />
            </strong>

            <p>
              Khi tần số ngoại lực bằng tần số riêng của hệ,
              biên độ dao động cưỡng bức đạt cực đại.
            </p>
          </aside>
        </div>

        <div className="forced-intro__relations">
          <article>
            <span className="forced-intro__relation-icon">
              <AppIcon
                name="activity"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Ngoại lực tuần hoàn
              </span>

              <strong>
                Dao động cưỡng bức
              </strong>

              <p>
                Hệ dao động dưới tác dụng của một lực biến thiên tuần hoàn theo thời gian.
              </p>
            </div>
          </article>

          <article>
            <span className="forced-intro__relation-icon">
              <AppIcon
                name="gauge"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Tần số riêng
              </span>

              <strong>
                <InlineMath math="f_0" />
              </strong>

              <p>
                Với con lắc đơn, tần số riêng phụ thuộc vào chiều dài con lắc.
              </p>
            </div>
          </article>

          <article>
            <span className="forced-intro__relation-icon">
              <AppIcon
                name="waves"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Cộng hưởng
              </span>

              <strong>
                <InlineMath math="f = f_0" />
              </strong>

              <p>
                Độ lệch tần số càng nhỏ thì biên độ cưỡng bức càng lớn;
                khi hai tần số bằng nhau, biên độ đạt cực đại.
              </p>
            </div>
          </article>
        </div>

        <section className="forced-intro__observation">
          <div>
            <span>
              Mục tiêu thí nghiệm
            </span>

            <strong>
              Thay đổi chiều dài các con lắc để kiểm tra điều kiện cộng hưởng
            </strong>
          </div>

          <p>
            Theo dõi con lắc Đ và ba con lắc thử L1, L2, L3.
            Khi một con lắc thử có chiều dài bằng con lắc Đ,
            nó có cùng tần số riêng với tần số kích thích và dao động mạnh nhất.
          </p>
        </section>

        <div className="forced-phase-actions forced-phase-actions--end">
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
