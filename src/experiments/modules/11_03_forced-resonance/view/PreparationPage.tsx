import AppIcon from '../../../../components/ui/AppIcon'

import {
  useForcedResonanceSession,
} from '../context'


const equipment = [
  {
    icon:
      'cog' as const,

    name:
      'Giá đỡ & thanh ngang',

    description:
      'Thanh cứng hình trụ liên kết hệ con lắc và truyền dao động từ con lắc Đ sang các con lắc thử.',
  },

  {
    icon:
      'activity' as const,

    name:
      'Con lắc điều khiển Đ',

    description:
      'Con lắc có khối lượng lớn hơn, đóng vai trò tạo ra ngoại lực tuần hoàn cho hệ.',
  },

  {
    icon:
      'waves' as const,

    name:
      'Các con lắc thử L1, L2, L3',

    description:
      'Ba con lắc có thể thay đổi chiều dài và vị trí để khảo sát phản ứng cưỡng bức và cộng hưởng.',
  },
]


export default function PreparationPage() {
  const {
    navigation,
  } =
    useForcedResonanceSession()


  return (
    <section className="forced-content-phase forced-preparation">
      <div className="forced-content-phase__inner">
        <span className="forced-section-badge">
          Phần 2 · Chuẩn bị
        </span>

        <header className="forced-content-phase__heading">
          <span className="forced-content-phase__eyebrow">
            Dụng cụ thực hành
          </span>

          <h2>
            Chuẩn bị hệ nhiều con lắc
          </h2>

          <p>
            Bố trí một con lắc điều khiển và ba con lắc thử trên cùng thanh ngang
            để quan sát sự truyền dao động cưỡng bức và tìm trạng thái cộng hưởng.
          </p>
        </header>

        <div className="forced-preparation__grid">
          {equipment.map(
            (
              item,
              index,
            ) => (
              <article
                key={
                  item.name
                }
                className="forced-equipment-card"
              >
                <span className="forced-equipment-card__index">
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

                <span className="forced-equipment-card__icon">
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

        <section className="forced-preparation__setup">
          <div className="forced-preparation__setup-icon">
            <AppIcon
              name="flask"
              size={22}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <span>
              Cách tiến hành
            </span>

            <strong>
              Thả con lắc Đ và so sánh biên độ của L1, L2, L3
            </strong>

            <p>
              Con lắc Đ truyền một ngoại lực tuần hoàn qua thanh ngang.
              Hãy quan sát xem các con lắc thử có dao động hay không,
              con lắc nào dao động mạnh nhất và mối liên hệ giữa chiều dài của nó với con lắc Đ.
            </p>
          </div>
        </section>

        <div className="forced-phase-actions">
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
