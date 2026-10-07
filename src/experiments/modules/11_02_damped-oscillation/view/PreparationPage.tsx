import AppIcon from '../../../../components/ui/AppIcon'

import {
  useDampedOscillationSession,
} from '../context'


const equipment = [
  {
    icon:
      'activity' as const,

    name:
      'Con lắc lò xo / Con lắc đơn',

    description:
      'Có gắn một quả nặng để thực hiện dao động.',
  },

  {
    icon:
      'radio' as const,

    name:
      'Bút dạ (Marker)',

    description:
      'Gắn chặt vào phần dưới của quả nặng để ghi lại quỹ đạo.',
  },

  {
    icon:
      'book-open' as const,

    name:
      'Tấm nhựa / Băng giấy dài',

    description:
      'Nơi bút dạ tì lên để vẽ ra đồ thị li độ - thời gian.',
  },

  {
    icon:
      'cog' as const,

    name:
      'Bộ phận cuộn giấy',

    description:
      'Động cơ kéo tấm giấy chuyển động với vận tốc không đổi (v).',
  },
]


export default function PreparationPage() {
  const {
    navigation,
  } =
    useDampedOscillationSession()


  return (
    <section className="damped-content-phase damped-preparation">
      <div className="damped-content-phase__inner">
        <span className="damped-section-badge">
          Phần 2 · Chuẩn bị
        </span>

        <header className="damped-content-phase__heading">
          <span className="damped-content-phase__eyebrow">
            Dụng cụ thực hành
          </span>

          <h2>
            Chuẩn bị hệ ghi dao động
          </h2>

          <p>
            Bố trí con lắc, bút dạ và băng giấy để biến chuyển động của con lắc
            thành một vệt mực biểu diễn li độ theo thời gian.
          </p>
        </header>

        <div className="damped-preparation__grid">
          {equipment.map(
            (
              item,
              index,
            ) => (
              <article
                key={
                  item.name
                }
                className="damped-equipment-card"
              >
                <span className="damped-equipment-card__index">
                  {
                    String(
                      index +
                      1,
                    ).padStart(
                      2,
                      '0',
                    )
                  }
                </span>

                <span className="damped-equipment-card__icon">
                  <AppIcon
                    name={
                      item.icon
                    }
                    size={21}
                    strokeWidth={1.8}
                  />
                </span>

                <div>
                  <h3>
                    {
                      item.name
                    }
                  </h3>

                  <p>
                    {
                      item.description
                    }
                  </p>
                </div>
              </article>
            ),
          )}
        </div>

        <section className="damped-preparation__setup">
          <div className="damped-preparation__setup-icon">
            <AppIcon
              name="flask"
              size={22}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <span>
              Bố trí thí nghiệm
            </span>

            <strong>
              Cho con lắc dao động và kéo băng giấy với tốc độ đều
            </strong>

            <p>
              Cho con lắc dao động ổn định. Bật động cơ kéo tấm giấy chạy ngang với tốc độ đều.
              Đầu bút dạ gắn trên quả nặng liên tục tiếp xúc và quét lên mặt giấy,
              để lại một vệt mực chính là đồ thị dao động tắt dần thực tế.
            </p>
          </div>
        </section>

        <div className="damped-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={
              navigation.previous
            }
          >
            Quay lại
          </button>

          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={
              navigation.next
            }
          >
            Vào phòng thí nghiệm
          </button>
        </div>
      </div>
    </section>
  )
}
