
import {
  Link,
  Navigate,
  useParams,
} from 'react-router'

import type {
  GradeLevel,
} from '../catalog/types'

import {
  getChapter,
  getExperiment,
  getExperimentAvailability,
} from '../catalog/registry'

import {
  chapterThemeClasses,
} from '../components/curriculum/theme'

import AppIcon from '../components/ui/AppIcon'
import PageContainer from '../components/ui/PageContainer'


function isGradeLevel(
  value: number,
): value is GradeLevel {
  return (
    value === 10 ||
    value === 11 ||
    value === 12
  )
}


interface BackLinkProps {
  to: string
  children: string
}

function BackLink({
  to,
  children,
}: BackLinkProps) {
  return (
    <Link
      to={to}
      className={[
        'inline-flex',
        'items-center',
        'gap-2',

        'px-4 py-2.5',

        'border',
        'border-(--color-border)',

        'bg-white/75',

        'rounded-(--radius-button)',

        'text-sm',
        'font-semibold',
        'text-soft',

        'transition',
        'duration-150',

        'hover:border-brand-200',
        'hover:bg-white',
        'hover:text-brand-700',
      ].join(' ')}
    >
      <AppIcon
        name="chevron-right"
        size={16}
        strokeWidth={2}
        className="rotate-180"
      />

      <span>
        {children}
      </span>
    </Link>
  )
}


function NotFoundState() {
  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] items-center py-16">
      <PageContainer>
        <section className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-brand-100 text-brand-600 rounded-(--radius-control)">
            <AppIcon
              name="flask"
              size={28}
              strokeWidth={1.8}
            />
          </div>

          <p className="mt-6 text-sm font-bold tracking-[0.08em] text-brand-600">
            KHÔNG TÌM THẤY
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
            Không tìm thấy thí nghiệm
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-soft">
            Đường dẫn thí nghiệm không tồn
            tại hoặc nội dung đã được thay
            đổi.
          </p>

          <div className="mt-7 flex justify-center">
            <BackLink to="/">
              Về trang chủ
            </BackLink>
          </div>
        </section>
      </PageContainer>
    </main>
  )
}


export default function ExperimentPlaceholder() {
  const {
    grade,
    chapterSlug,
    experimentSlug,
  } = useParams()

  const gradeNumber =
    Number(grade)

  if (
    !isGradeLevel(
      gradeNumber,
    ) ||
    !chapterSlug ||
    !experimentSlug
  ) {
    return (
      <NotFoundState />
    )
  }


  const chapter =
    getChapter(
      gradeNumber,
      chapterSlug,
    )

  const experiment =
    getExperiment(
      gradeNumber,
      chapterSlug,
      experimentSlug,
    )


  if (
    !chapter ||
    !experiment
  ) {
    return (
      <NotFoundState />
    )
  }


  const availability =
    getExperimentAvailability(experiment)

  const isIntegrating =
    availability === 'integrating'


  if (
    experiment.runtimePath?.trim()
  ) {
    return (
      <Navigate
        to={experiment.runtimePath}
        replace
      />
    )
  }


  const theme =
    chapterThemeClasses[
      chapter.theme
    ]


  return (
    <main className="flex min-h-[calc(100vh-var(--header-height))] items-center py-12 md:py-16">
      <PageContainer>
        <section
          className={[
            'mx-auto',
            'w-full',
            'max-w-2xl',

            'border',
            theme.border,

            'bg-(--surface)',

            'p-6',
            'md:p-9',

            'rounded-(--radius-panel)',
            '[box-shadow:var(--shadow-md)]',

            'backdrop-blur-md',
          ].join(' ')}
        >
          {/* ===============================================
              TOP META
              =============================================== */}

          <div className="flex items-center justify-between gap-4">
            <p className="m-0 text-sm font-semibold text-muted">
              Vật lý {gradeNumber}
              <span
                className="mx-2 text-(--color-border)"
                aria-hidden="true"
              >
                /
              </span>
              Chuyên đề: {chapter.title}
            </p>

            <span
              className={[
                'shrink-0',

                'text-xs',
                'font-semibold',

                isIntegrating
                  ? 'text-brand-600'
                  : 'text-muted',
              ].join(' ')}
            >
              {isIntegrating
                ? 'Đang tích hợp'
                : 'Sắp ra mắt'}
            </span>
          </div>


          {/* ===============================================
              EXPERIMENT IDENTITY
              =============================================== */}

          <div className="mt-8">
            <div
              className={[
                'flex h-14 w-14',
                'items-center',
                'justify-center',

                'rounded-(--radius-control)',

                theme.icon,
              ].join(' ')}
            >
              <AppIcon
                name={
                  experiment.icon
                }
                size={29}
                strokeWidth={1.8}
              />
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {experiment.title}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-soft">
              {
                experiment.description
              }
            </p>
          </div>


          {/* ===============================================
              STATUS MESSAGE
              =============================================== */}

          <div className="mt-8 border-t border-(--color-border-soft) pt-6">
            {isIntegrating ? (
              <>
                <p className="m-0 font-semibold text-ink">
                  Thí nghiệm đang được tích hợp
                  vào phiên bản mới
                </p>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Nội dung mô phỏng đã có và
                  đang được chuyển sang hạ tầng
                  mới của TTKSA Lab.
                </p>
              </>
            ) : (
              <>
                <p className="m-0 font-semibold text-ink">
                  Thí nghiệm đang được phát
                  triển
                </p>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Nội dung thực hành này chưa
                  sẵn sàng trong chương trình
                  hiện tại.
                </p>
              </>
            )}
          </div>


          {/* ===============================================
              ACTION
              =============================================== */}

          <div className="mt-8">
            <BackLink
              to={`/experiments/${gradeNumber}/${chapterSlug}`}
            >
              Quay lại chuyên đề
            </BackLink>
          </div>
        </section>
      </PageContainer>
    </main>
  )
}
