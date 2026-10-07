import type {
  ReactNode,
} from 'react'


export interface PrintableReportShellProps {
  id:
    string

  className:
    string

  experimentTitle:
    string

  description?:
    string

  datePlaceholder?:
    string

  children:
    ReactNode
}


export default function PrintableReportShell({
  id,
  className,
  experimentTitle,
  description,
  datePlaceholder =
    'Ngày ...... tháng ...... năm ........',
  children,
}: PrintableReportShellProps) {
  return (
    <article
      id={
        id
      }
      className={
        className
      }
    >
      {/* ===============================================
          REPORT HEADER
          =============================================== */}

      <header className={`${className}__header`}>
        <h1>
          BÁO CÁO THỰC HÀNH VẬT LÍ
        </h1>

        <h2>
          {
            experimentTitle
          }
        </h2>

        {description && (
          <p>
            {
              description
            }
          </p>
        )}
      </header>


      {/* ===============================================
          STUDENT IDENTITY
          =============================================== */}

      <section className={`${className}__identity`}>
        <div>
          <strong>
            Họ và tên học sinh:
          </strong>

          <span />
        </div>


        <div className={`${className}__identity-row`}>
          <div>
            <strong>
              Lớp:
            </strong>

            <span />
          </div>

          <div>
            <strong>
              Tổ/Nhóm:
            </strong>

            <span />
          </div>
        </div>
      </section>


      <hr />


      {/* ===============================================
          EXPERIMENT-SPECIFIC REPORT BODY
          =============================================== */}

      {children}


      {/* ===============================================
          SIGNATURE
          =============================================== */}

      <footer className={`${className}__signature`}>
        <div>
          <p>
            {
              datePlaceholder
            }
          </p>

          <strong>
            Học sinh thực hiện
          </strong>

          <p>
            (Ký và ghi rõ họ tên)
          </p>

          <div />
        </div>
      </footer>
    </article>
  )
}