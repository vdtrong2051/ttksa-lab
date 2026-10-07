import AppIcon from '../../../../components/ui/AppIcon'

import {
  useTemplateSession,
} from '../context'


export default function IntroPage() {
  const {
    navigation,
  } =
    useTemplateSession()


  return (
    <div className="template-intro">
      <div className="template-intro__inner">
        {/* ===============================================
            PHASE BADGE
            =============================================== */}

        <span className="template-intro__badge">
          Phần 1 · Lý thuyết cơ bản
        </span>


        {/* ===============================================
            KNOWLEDGE CARDS

            Pattern tương đương Boyle/Joule Intro:
            2 card kiến thức đặt song song.
            =============================================== */}

        <div className="template-intro__grid">
          <article className="template-intro-card">
            <span
              className="template-intro-card__icon"
              aria-hidden="true"
            >
              <AppIcon
                name="book-open"
                size={22}
                strokeWidth={1.8}
              />
            </span>


            <div className="template-intro-card__body">
              <h3>
                Mô hình MVC của thí nghiệm
              </h3>

              <p>
                Mỗi thí nghiệm sở hữu Model,
                Controller và View riêng. Model
                chứa dữ liệu và quy luật vật lý,
                Controller quản lý trạng thái phiên,
                còn View chịu trách nhiệm hiển thị
                và tương tác.
              </p>
            </div>
          </article>


          <article className="template-intro-card">
            <span
              className="template-intro-card__icon"
              aria-hidden="true"
            >
              <AppIcon
                name="activity"
                size={22}
                strokeWidth={1.8}
              />
            </span>


            <div className="template-intro-card__body">
              <h3>
                Điều hướng theo URL
              </h3>

              <p>
                Phase hiện tại được xác định bởi
                Router thay vì local state. Nhờ đó
                mỗi bước có URL riêng, hỗ trợ
                tải lại trang, liên kết trực tiếp
                và nút Back/Forward của trình duyệt.
              </p>
            </div>
          </article>
        </div>


        {/* ===============================================
            PRINCIPLE CARD

            Tương đương formula card trong Boyle/Joule.
            Nội dung template dùng để thể hiện
            nguyên tắc kiến trúc thay vì công thức vật lý.
            =============================================== */}

        <section
          className="template-principle-card"
          aria-labelledby="template-principle-title"
        >
          <span
            id="template-principle-title"
            className="template-principle-card__label"
          >
            Nguyên tắc vận hành
          </span>


          <div className="template-principle">
            Router → Session → Controller → View
          </div>


          <p>
            <strong>
              Router
            </strong>
            {' '}
            xác định phase hiện tại,
            {' '}
            <strong>
              Session
            </strong>
            {' '}
            giữ vòng đời của thí nghiệm,
            {' '}
            <strong>
              Controller
            </strong>
            {' '}
            giữ trạng thái và hành vi,
            còn
            {' '}
            <strong>
              View
            </strong>
            {' '}
            chỉ hiển thị dữ liệu và nhận tương tác.
          </p>
        </section>


        {/* ===============================================
            PHASE ACTION
            =============================================== */}

        <div className="template-phase-actions template-phase-actions--end">
          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={
              navigation.next
            }
          >
            Tiến hành chuẩn bị
          </button>
        </div>
      </div>
    </div>
  )
}