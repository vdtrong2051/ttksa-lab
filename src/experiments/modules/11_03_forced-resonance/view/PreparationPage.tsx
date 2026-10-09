
import AppIcon from '../../../../components/ui/AppIcon'

import {
  useForcedResonanceSession,
} from '../context'


const equipment = [
  {
    icon: 'cog' as const,
    name: 'Giá đỡ và thanh ngang',
    description:
      'Hệ giá đỡ và thanh liên kết các con lắc, dùng để minh họa sự truyền tác động tuần hoàn từ con lắc Đ tới các con lắc thử.',
  },
  {
    icon: 'activity' as const,
    name: 'Con lắc điều khiển Đ',
    description:
      'Con lắc có khối lượng lớn hơn, đóng vai trò nguồn kích thích tuần hoàn của hệ.',
  },
  {
    icon: 'waves' as const,
    name: 'Các con lắc thử L1, L2, L3',
    description:
      'Ba con lắc có chiều dài và vị trí có thể điều chỉnh, dùng để khảo sát dao động cưỡng bức và cộng hưởng.',
  },
]


export default function PreparationPage() {
  const { navigation } =
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

          <h2>Chuẩn bị hệ nhiều con lắc</h2>

          <p>
            Sử dụng một con lắc phát động và
            ba con lắc thử để quan sát dao động
            cưỡng bức, so sánh biên độ và xác
            định điều kiện cộng hưởng.
          </p>
        </header>

        <div className="forced-preparation__grid">
          {equipment.map((item, index) => (
            <article
              key={item.name}
              className="forced-equipment-card"
            >
              <span className="forced-equipment-card__index">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="forced-equipment-card__icon">
                <AppIcon
                  name={item.icon}
                  size={21}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
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
            <span>Cách tiến hành và dự đoán</span>

            <strong>
              Kích thích con lắc Đ,
              quan sát L1, L2, L3
            </strong>

            <p>
              Vào bước Thực hành và nhấn
              Bắt đầu / Tiếp tục để mô phỏng
              nguồn kích thích tuần hoàn
              từ con lắc Đ.
            </p>

            <p>
              Hãy dự đoán: cả ba con lắc thử
              có dao động không? Con lắc nào
              có biên độ lớn nhất?
              Chiều dài của con lắc ấy
              có quan hệ gì với con lắc Đ?
            </p>
          </div>
        </section>

        <div className="forced-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={navigation.previous}
          >
            Quay lại
          </button>

          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={navigation.next}
          >
            Vào phòng thí nghiệm
          </button>
        </div>
      </div>
    </section>
  )
}
