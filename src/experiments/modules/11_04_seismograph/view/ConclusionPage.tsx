
import { InlineMath } from 'react-katex'

import { useSeismographSession } from '../context'

import './content.css'

export default function ConclusionPage() {
  const { navigation } = useSeismographSession()

  return (
    <section className="seismo-content seismo-conclusion">
      <div className="seismo-content__inner seismo-conclusion__inner">
        <span className="seismo-content__badge">
          Phần 4 · Kết luận
        </span>

        <header className="seismo-content__heading">
          <span className="seismo-content__eyebrow">
            Từ đường ghi đến bản chất vật lý
          </span>

          <h2>Bản chất vật lý</h2>

          <p>
            Rút ra nguyên lý làm việc của máy đo địa chấn
            và điều kiện tránh cộng hưởng.
          </p>
        </header>

        <div className="seismo-conclusion__statement">
          <p>
            Để máy ghi lại đúng dao động địa chấn,
            quả nặng mang bút dạ phải{' '}
            <strong>đứng yên</strong> đóng vai trò
            làm hệ quy chiếu quán tính,
            trong khi cuộn giấy rung lắc theo mặt đất.
          </p>

          <hr />

          <p>
            Muốn quả nặng ít bị ảnh hưởng bởi rung lắc nhất
            (tránh cộng hưởng), tần số riêng của hệ phải{' '}
            <strong>nhỏ hơn rất nhiều</strong> so với
            tần số của sóng địa chấn:{' '}
            <strong>
              <InlineMath math={String.raw`f_0 \ll f`} />
            </strong>.
          </p>
        </div>

        <div className="seismo-content__actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={navigation.previous}
          >
            Quay lại thực hành
          </button>

          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={navigation.next}
          >
            Luyện tập tính toán
          </button>
        </div>
      </div>
    </section>
  )
}
