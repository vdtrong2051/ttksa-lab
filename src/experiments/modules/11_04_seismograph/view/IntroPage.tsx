
import { useSeismographSession } from '../context'

import zhangHengImage from '../assets/seismograph-zhang-heng.webp'
import johnMilneImage from '../assets/seismograph-john-milne.webp'

import './content.css'

const applications = [
  {
    title: 'Ghi nhận và Phân tích',
    description:
      'Đo đạc chính xác cường độ, thời gian và vị trí tâm chấn của các trận động đất, núi lửa phun trào hay các vụ thử hạt nhân ngầm.',
  },
  {
    title: 'Nghiên cứu Cấu trúc Trái Đất',
    description:
      'Thông qua việc phân tích đường truyền của các sóng địa chấn (sóng P, sóng S), các nhà khoa học vẽ lại được bản đồ các lớp lõi bên trong Trái Đất.',
  },
  {
    title: 'Cảnh báo và Bảo vệ',
    description:
      'Hệ thống mạng lưới máy đo toàn cầu giúp đưa ra các cảnh báo sóng thần sớm, đồng thời cung cấp số liệu để kỹ sư thiết kế các tòa nhà kháng chấn an toàn.',
  },
]

export default function IntroPage() {
  const { navigation } = useSeismographSession()

  return (
    <section className="seismo-content seismo-intro">
      <div className="seismo-content__inner">
        <span className="seismo-content__badge">
          Phần 1 · Giới thiệu
        </span>

        <header className="seismo-content__heading">
          <span className="seismo-content__eyebrow">
            Dao động cơ · Vật lí 11
          </span>

          <h2>Máy đo địa chấn (Seismograph)</h2>

          <p>
            Khám phá lịch sử hình thành và sứ mệnh
            bảo vệ nhân loại của cỗ máy ghi lại
            nhịp đập từ sâu thẳm trong lòng Trái Đất.
          </p>
        </header>

        <div className="seismo-intro__grid">
          <section aria-labelledby="seismo-history-title">
            <h3
              id="seismo-history-title"
              className="seismo-content__section-title"
            >
              Dấu ấn lịch sử
            </h3>

            <div className="seismo-intro__timeline">
              <article className="seismo-intro__history-card">
                <span className="seismo-intro__year">
                  Năm 132 sau Công nguyên
                </span>

                <p>
                  Nhà bác học Trung Quốc{' '}
                  <strong>Trương Hành</strong>{' '}
                  (Zhang Heng) chế tạo ra{' '}
                  <strong>Hậu phong địa động nghi</strong>
                  {' '}– cỗ máy phát hiện động đất
                  đầu tiên với hình dáng một chiếc
                  chum đồng có tám con rồng ngậm ngọc.
                </p>

                <img
                  src={zhangHengImage}
                  alt="Mô hình Hậu phong địa động nghi của Trương Hành"
                  loading="lazy"
                />
              </article>

              <article className="seismo-intro__history-card">
                <span className="seismo-intro__year">
                  Năm 1875–1880
                </span>

                <p>
                  Nhà khoa học Ý{' '}
                  <strong>Filippo Cecchi</strong>
                  {' '}và nhà khoa học Anh{' '}
                  <strong>John Milne</strong>
                  {' '}phát minh ra máy đo địa chấn
                  hiện đại đầu tiên sử dụng con lắc
                  và bút vẽ trên giấy than để ghi lại
                  biên độ sóng.
                </p>

                <img
                  src={johnMilneImage}
                  alt="Máy đo địa chấn kiểu John Milne"
                  loading="lazy"
                />
              </article>
            </div>
          </section>

          <section aria-labelledby="seismo-mission-title">
            <h3
              id="seismo-mission-title"
              className="seismo-content__section-title"
            >
              Mục tiêu &amp; sứ mệnh
            </h3>

            <div className="seismo-intro__missions">
              {applications.map((item, index) => (
                <article
                  key={item.title}
                  className="seismo-intro__mission"
                >
                  <span className="seismo-intro__mission-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <blockquote className="seismo-intro__quote">
              Máy đo địa chấn là “tai mắt” giúp
              con người lắng nghe hơi thở
              của Mẹ Thiên Nhiên.
            </blockquote>
          </section>
        </div>

        <div className="seismo-content__actions seismo-content__actions--end">
          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={navigation.next}
          >
            Bắt đầu tìm hiểu cấu tạo
          </button>
        </div>
      </div>
    </section>
  )
}
