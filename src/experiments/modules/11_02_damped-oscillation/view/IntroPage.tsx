import {
  BlockMath,
  InlineMath,
} from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useDampedOscillationSession,
} from '../context'


export default function IntroPage() {
  const {
    navigation,
  } =
    useDampedOscillationSession()


  return (
    <section className="damped-content-phase damped-intro">
      <div className="damped-content-phase__inner">
        <span className="damped-section-badge">
          Phần 1 · Giới thiệu
        </span>

        <div className="damped-intro__hero">
          <div>
            <header className="damped-content-phase__heading">
              <span className="damped-content-phase__eyebrow">
                Dao động cơ · Vật lí 11
              </span>

              <h2>
                Dao động tắt dần
              </h2>

              <p>
                Khi một hệ dao động thực tế chịu lực ma sát và lực cản môi trường,
                biên độ giảm dần theo thời gian và cơ năng của hệ bị tiêu hao.
              </p>
            </header>

            <div className="damped-intro__goal">
              <span className="damped-intro__goal-icon">
                <AppIcon
                  name="activity"
                  size={22}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <span>
                  Dấu hiệu quan sát
                </span>

                <strong>
                  Biên độ giảm liên tục theo thời gian
                </strong>

                <p>
                  Kéo con lắc ra khỏi vị trí cân bằng rồi thả tự do.
                  Trong thực tế, dao động không duy trì mãi mà tắt dần do lực cản và ma sát.
                </p>
              </div>
            </div>
          </div>

          <aside className="damped-intro__formula">
            <span>
              Phương trình li độ
            </span>

            <strong>
              <BlockMath math="x = A_0 e^{-\beta t}\cos(\omega t + \varphi)" />
            </strong>

            <p>
              Phương trình mô tả một dao động hình sin có đường bao biên độ giảm theo hàm mũ.
            </p>
          </aside>
        </div>

        <div className="damped-intro__relations">
          <article>
            <span className="damped-intro__relation-icon">
              <AppIcon
                name="activity"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Biên độ ban đầu
              </span>

              <strong>
                <InlineMath math="A_0" />
              </strong>

              <p>
                Biên độ của hệ tại thời điểm
                {' '}
                <InlineMath math="t=0" />
                .
              </p>
            </div>
          </article>

          <article>
            <span className="damped-intro__relation-icon">
              <AppIcon
                name="gauge"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Nhân tử suy giảm
              </span>

              <strong>
                <InlineMath math="e^{-\beta t}" />
              </strong>

              <p>
                Hệ số
                {' '}
                <InlineMath math="\beta" />
                {' '}
                càng lớn thì lực cản càng mạnh và biên độ tắt càng nhanh.
              </p>
            </div>
          </article>

          <article>
            <span className="damped-intro__relation-icon">
              <AppIcon
                name="flame"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span>
                Cơ năng
              </span>

              <strong>
                Chuyển hóa thành nhiệt
              </strong>

              <p>
                Công âm của lực ma sát và lực cản làm cơ năng của hệ giảm dần,
                phần năng lượng đó chuyển hóa thành nhiệt năng.
              </p>
            </div>
          </article>
        </div>

        <section className="damped-intro__observation">
          <div>
            <span>
              Mục tiêu thí nghiệm
            </span>

            <strong>
              Ghi lại vệt mực li độ – thời gian và đối chiếu các mức lực cản
            </strong>
          </div>

          <p>
            Trong phần thực hành, bút dạ gắn với con lắc ghi vệt lên băng giấy đang chuyển động đều,
            giúp quan sát trực tiếp đường dao động tắt dần và so sánh hai trường hợp lực cản khác nhau.
          </p>
        </section>

        <div className="damped-phase-actions damped-phase-actions--end">
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
