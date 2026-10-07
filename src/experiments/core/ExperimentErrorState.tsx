import {
  Link,
} from 'react-router'

import AppIcon from '../../components/ui/AppIcon'


interface ExperimentErrorStateProps {
  title?: string

  message?: string

  backTo?: string
}


export default function ExperimentErrorState({
  title =
    'Không thể tải thí nghiệm',

  message =
    'Đã xảy ra lỗi khi khởi tạo nội dung thí nghiệm.',

  backTo =
    '/',
}: ExperimentErrorStateProps) {
  return (
    <main
      className="experiment-error"
      role="alert"
    >
      <div className="experiment-error__card">
        <div className="experiment-error__icon">
          <AppIcon
            name="flask"
            size={28}
            strokeWidth={1.8}
          />
        </div>

        <h1>
          {title}
        </h1>

        <p>
          {message}
        </p>

        <Link
          to={backTo}
          className="experiment-error__back"
        >
          <AppIcon
            name="chevron-right"
            size={16}
            strokeWidth={2}
            className="rotate-180"
          />

          Quay lại
        </Link>
      </div>
    </main>
  )
}