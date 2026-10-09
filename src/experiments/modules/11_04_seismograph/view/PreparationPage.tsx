
import { useSeismographSession } from '../context'

import './content.css'

const components = [
  {
    title: '1. Khung máy & Đế (Base)',
    description:
      'Cắm chặt vào mặt đất (hoặc đá nền). Bắt buộc phải rung lắc đồng pha hoàn toàn với mặt đất.',
  },
  {
    title: '2. Lò xo / Dây treo',
    description:
      'Đóng vai trò cách ly dao động, giúp quả nặng treo lơ lửng mà không bị tác động mạnh bởi khung máy.',
  },
  {
    title: '3. Quả nặng (Heavy Mass)',
    description:
      'Bộ phận quan trọng nhất, khối lượng cực lớn để tạo ra “quán tính” giữ cho nó luôn đứng im trong không gian.',
  },
  {
    title: '4. Trục xoay & Bút vẽ',
    description:
      'Trục giấy quay đều đặn bằng motor. Bút vẽ gắn vào quả nặng tì lên giấy để ghi lại biên độ.',
  },
]

function SeismographDiagram() {
  return (
    <svg
      viewBox="0 0 600 550"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sơ đồ máy đo địa chấn: khung máy, dây treo, quả nặng, bút và giấy ghi"
    >
      {/* Mặt đất */}
      <rect
        x="20" y="480"
        width="560" height="25"
        fill="#475569" rx="4"
      />

      <path
        d="M 20 480 L 580 480"
        stroke="#334155"
        strokeWidth="4"
      />

      <text
        x="300" y="530"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#64748b"
      >
        MẶT ĐẤT (Rung lắc khi có động đất)
      </text>

      <path
        d="M 150 515 L 120 515 M 125 510 L 120 515 L 125 520"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />

      <path
        d="M 450 515 L 480 515 M 475 510 L 480 515 L 475 520"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />

      {/* Khung máy */}
      <rect
        x="80" y="80"
        width="30" height="400"
        fill="#94a3b8" rx="6"
      />

      <rect
        x="80" y="80"
        width="220" height="25"
        fill="#94a3b8" rx="6"
      />

      {/* Cuộn giấy và vệt địa chấn */}
      <rect
        x="420" y="280"
        width="80" height="150"
        fill="#cbd5e1" rx="8"
        stroke="#94a3b8"
        strokeWidth="3"
      />

      <rect
        x="390" y="300"
        width="110" height="110"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="2"
      />

      <polyline
        points="390,360 410,360 415,340 425,380 435,320 445,400 455,340 465,370 475,355 490,360 500,360"
        fill="none"
        stroke="#dc2626"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Dây treo và quả nặng */}
      <line
        x1="260" y1="105"
        x2="260" y2="310"
        stroke="#64748b"
        strokeWidth="3"
        strokeDasharray="6 4"
      />

      <circle
        cx="260" cy="360" r="45"
        fill="#4f46e5"
        stroke="#312e81"
        strokeWidth="5"
      />

      <text
        x="260" y="365"
        textAnchor="middle"
        fontWeight="700"
        fontSize="14"
        fill="#ffffff"
      >
        QUÁN TÍNH
      </text>

      {/* Bút */}
      <line
        x1="305" y1="360"
        x2="390" y2="360"
        stroke="#334155"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <polygon
        points="390,356 400,360 390,364"
        fill="#1e293b"
      />

      {/* Nhãn chú thích */}
      <path
        d="M 60 250 L 80 250"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="3"
      />

      <text
        x="55" y="255"
        textAnchor="end"
        fontSize="14"
        fontWeight="700"
        fill="#475569"
      >
        1. Khung máy
      </text>

      <path
        d="M 330 180 L 260 180"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="3"
      />

      <text
        x="340" y="185"
        fontSize="14"
        fontWeight="700"
        fill="#475569"
      >
        2. Dây treo
      </text>

      <path
        d="M 330 450 L 260 410"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="3"
      />

      <text
        x="340" y="460"
        fontSize="14"
        fontWeight="700"
        fill="#4f46e5"
      >
        3. Quả nặng
      </text>

      <path
        d="M 460 240 L 460 280"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="3"
      />

      <text
        x="460" y="230"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#475569"
      >
        4. Trục xoay &amp; Giấy
      </text>
    </svg>
  )
}

export default function PreparationPage() {
  const { navigation } = useSeismographSession()

  return (
    <section className="seismo-content seismo-preparation">
      <div className="seismo-content__inner">
        <span className="seismo-content__badge">
          Phần 2 · Chuẩn bị
        </span>

        <header className="seismo-content__heading">
          <span className="seismo-content__eyebrow">
            Cấu tạo và nguyên lý cơ học
          </span>

          <h2>Cấu tạo &amp; nguyên lý cơ học</h2>

          <p>
            Hệ thống tưởng chừng phức tạp này
            lại hoạt động dựa trên một trong những
            định luật vật lý cơ bản nhất của Isaac Newton.
          </p>
        </header>

        <div className="seismo-preparation__grid">
          <section className="seismo-preparation__diagram">
            <span className="seismo-preparation__diagram-label">
              Sơ đồ máy đo ngang
            </span>

            <SeismographDiagram />
          </section>

          <div className="seismo-preparation__theory">
            <section>
              <h3 className="seismo-content__section-title">
                Cấu tạo chính
              </h3>

              <div className="seismo-preparation__components">
                {components.map((item) => (
                  <article
                    key={item.title}
                    className="seismo-preparation__component"
                  >
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h3 className="seismo-content__section-title">
                Nguyên lý hoạt động
              </h3>

              <p className="seismo-preparation__principle">
                Bí mật của máy đo địa chấn nằm ở{' '}
                <strong>
                  Định luật 1 Newton (Định luật Quán tính)
                </strong>.
                Mọi vật có xu hướng bảo toàn vận tốc
                và vị trí của mình. Vật có khối lượng
                càng lớn, quán tính càng cao.
              </p>

              <ol className="seismo-preparation__steps">
                <li>
                  Khi có động đất, lớp vỏ Trái Đất rung lắc
                  kéo theo <strong>Khung máy</strong> và{' '}
                  <strong>Trục giấy</strong> rung lắc theo.
                </li>

                <li>
                  Tuy nhiên, do <strong>Quả nặng</strong>
                  {' '}có khối lượng rất lớn và được treo
                  tự do bằng lò xo/dây treo, tính ỳ
                  (quán tính) khiến nó{' '}
                  <strong>gần như đứng yên</strong>
                  {' '}trong không gian.
                </li>

                <li>
                  Hậu quả là sự chuyển động tương đối
                  giữa <em>“Tờ giấy đang rung lắc”</em>
                  {' '}và <em>“Chiếc bút đang đứng im”</em>
                  {' '}đã vẽ ra hình dạng của sóng địa chấn
                  trên mặt giấy.
                </li>
              </ol>

              <p className="seismo-preparation__reminder">
                Lưu ý thực hành: Hãy giữ cho quả nặng
                đứng im nhất có thể!
              </p>
            </section>
          </div>
        </div>

        <div className="seismo-content__actions">
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
            Vào phòng thực hành
          </button>
        </div>
      </div>
    </section>
  )
}
