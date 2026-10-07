import type {
  ReactNode,
} from 'react'


interface TemplatePanelProps {
  /**
   * Nhãn nhỏ đầu phase.
   *
   * Ví dụ:
   * Phần 1 · Lý thuyết
   * Phần 2 · Chuẩn bị
   */
  eyebrow:
    string


  /**
   * Tiêu đề chính của phase.
   */
  title:
    string


  /**
   * Mô tả ngắn cho phase.
   */
  description:
    string


  /**
   * Nội dung riêng của từng phase.
   *
   * TemplatePanel KHÔNG áp card visual
   * lên vùng này.
   */
  children?:
    ReactNode


  /**
   * Navigation/action cuối phase.
   *
   * Ví dụ:
   * Bước trước
   * Sang Chuẩn bị
   * Sang Kết luận
   */
  actions?:
    ReactNode
}


export default function TemplatePanel({
  eyebrow,
  title,
  description,
  children,
  actions,
}: TemplatePanelProps) {
  return (
    <section className="template-content-phase">
      <div className="template-content-phase__inner">
        {/* ===============================================
            PHASE BADGE

            Bám pattern Intro / Preparation của lab-new.
            =============================================== */}

        <span className="template-content-phase__badge">
          {eyebrow}
        </span>


        {/* ===============================================
            PHASE HEADING

            Không nằm trong giant card.
            Đây chỉ là heading tự nhiên của page.
            =============================================== */}

        <header className="template-content-phase__heading">
          <h2>
            {title}
          </h2>

          <p>
            {description}
          </p>
        </header>


        {/* ===============================================
            PHASE CONTENT

            Mỗi page tự quyết định:
            - info card
            - tool card
            - formula card
            - quiz
            - measurement
            - report
            - simulation overlay

            Wrapper này không áp background/border.
            =============================================== */}

        {children && (
          <div className="template-content-phase__content">
            {children}
          </div>
        )}


        {/* ===============================================
            PHASE ACTIONS

            Navigation cuối phase giống lab-new.

            Border-top nhẹ để tách hành động khỏi content.
            =============================================== */}

        {actions && (
          <footer className="template-content-phase__actions">
            {actions}
          </footer>
        )}
      </div>
    </section>
  )
}