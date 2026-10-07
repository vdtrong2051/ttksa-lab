import AppIcon from '../../../../components/ui/AppIcon'

import {
  useBoyleSession,
} from '../context'

import {
  boyleIntroContent,
} from '../model/data'


export default function IntroPage() {
  const {
    navigation,
  } = useBoyleSession()

  return (
    <section className="boyle-content-phase boyle-intro">
      <div className="boyle-content-phase__inner">
        <span className="boyle-content-phase__badge">
          Phần 1 · Khám phá định luật
        </span>

        <header className="boyle-content-phase__heading">
          <h2>
            Định luật Boyle-Mariotte
          </h2>
          <p>
            Quan sát mối liên hệ giữa áp suất và thể tích của một lượng khí xác định khi nhiệt độ không đổi.
          </p>
        </header>

        <div className="boyle-intro__grid">
          <article className="boyle-info-card">
            <span className="boyle-info-card__icon">
              <AppIcon
                name="thermometer"
                size={28}
                strokeWidth={1.8}
              />
            </span>
            <div>
              <h3>
                {boyleIntroContent.isothermalProcess.title}
              </h3>
              <p>
                {boyleIntroContent.isothermalProcess.description}
              </p>
            </div>
          </article>

          <article className="boyle-info-card">
            <span className="boyle-info-card__icon">
              <AppIcon
                name="activity"
                size={28}
                strokeWidth={1.8}
              />
            </span>
            <div>
              <h3>
                {boyleIntroContent.graph.title}
              </h3>
              <p>
                {boyleIntroContent.graph.description}
              </p>
            </div>
          </article>
        </div>

        <section className="boyle-formula-card">
          <span className="boyle-eyebrow">
            Biểu thức toán học
          </span>

          <div className="boyle-formula-card__formula">
            {boyleIntroContent.formula}
          </div>

          <div className="boyle-formula-card__secondary">
            {boyleIntroContent.equivalentFormula}
          </div>

          <p>
            Với một lượng khí xác định ở nhiệt độ không đổi, tích pV không đổi. Thực hành phải tiến hành đủ chậm để hệ kịp trở lại cân bằng nhiệt.
          </p>
        </section>

        <div className="boyle-phase-actions boyle-phase-actions--end">
          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={
              navigation.next
            }
          >
            Vào phòng chuẩn bị
          </button>
        </div>
      </div>
    </section>
  )
}
