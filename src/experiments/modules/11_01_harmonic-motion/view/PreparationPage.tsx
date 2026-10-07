import AppIcon from '../../../../components/ui/AppIcon'

import {
  useHarmonicMotionSession,
} from '../context'


const equipment = [
  {
    icon:
      'cog' as const,

    name:
      'Mô-tơ điện quay chậm',

    description:
      'Tạo chuyển động tròn đều cho vật hình trụ.',
  },

  {
    icon:
      'orbit' as const,

    name:
      'Thanh quay & vật hình trụ',

    description:
      'Đóng vai trò là điểm M chuyển động trên quỹ đạo tròn.',
  },

  {
    icon:
      'zap' as const,

    name:
      'Đèn chiếu sáng',

    description:
      'Tạo chùm tia sáng song song để hình chiếu xuất hiện trên màn.',
  },

  {
    icon:
      'activity' as const,

    name:
      'Con lắc lò xo',

    description:
      'Dao động điều hòa theo phương thẳng đứng.',
  },

  {
    icon:
      'radio' as const,

    name:
      'Màn chắn',

    description:
      'Hứng bóng của vật hình trụ và quả nặng con lắc.',
  },
]


export default function PreparationPage() {
  const {
    navigation,
  } =
    useHarmonicMotionSession()


  return (
    <section className="harmonic-motion-content-phase harmonic-motion-preparation">
      <div className="harmonic-motion-content-phase__inner">
        <span className="harmonic-motion-section-badge">
          Phần 2 · Chuẩn bị
        </span>

        <header className="harmonic-motion-content-phase__heading">
          <span className="harmonic-motion-content-phase__eyebrow">
            Thiết bị thí nghiệm
          </span>

          <h2>
            Chuẩn bị hệ quan sát
          </h2>

          <p>
            Bộ thí nghiệm gồm hệ quay tròn, con lắc lò xo,
            nguồn sáng song song và màn chắn để so sánh hai hình chiếu.
          </p>
        </header>

        <div className="harmonic-motion-preparation__grid">
          {equipment.map(
            (
              item,
              index,
            ) => (
              <article
                key={
                  item.name
                }
                className="harmonic-motion-equipment-card"
              >
                <span className="harmonic-motion-equipment-card__index">
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

                <span className="harmonic-motion-equipment-card__icon">
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

        <section className="harmonic-motion-preparation__setup">
          <div className="harmonic-motion-preparation__setup-icon">
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
              Căn hai hệ chuyển động theo cùng trục chiếu
            </strong>

            <p>
              Đặt con lắc lò xo và hệ thống mô-tơ quay song song với màn chắn.
              Chùm tia sáng song song chiếu vuông góc vào màn để tạo bóng của
              vật hình trụ và quả nặng con lắc trên cùng một trục dọc.
            </p>
          </div>
        </section>

        <div className="harmonic-motion-phase-actions">
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
