import {
  Link,
  useParams,
} from 'react-router'

import type {
  GradeLevel,
} from '../catalog/types'

import {
  getGradeCurriculum,
} from '../catalog/registry'

import ChapterAccordion from '../components/curriculum/ChapterAccordion'
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

export default function GradePage() {
  const { grade } =
    useParams()

  const gradeNumber =
    Number(grade)

  if (
    !isGradeLevel(
      gradeNumber,
    )
  ) {
    return (
      <main className="py-12 md:py-16">
        <PageContainer>
          <section className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center bg-brand-100 text-brand-600 rounded-(--radius-control)">
              <AppIcon
                name="book-open"
                size={28}
                strokeWidth={1.8}
              />
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink">
              Không tìm thấy khối lớp
            </h1>

            <p className="mt-3 text-sm leading-6 text-soft">
              Khối lớp trong đường
              dẫn không tồn tại.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
            >
              <AppIcon
                name="chevron-right"
                size={16}
                strokeWidth={2}
                className="rotate-180"
              />

              Trang chủ
            </Link>
          </section>
        </PageContainer>
      </main>
    )
  }

  const gradeCurriculum =
    getGradeCurriculum(
      gradeNumber,
    )

  if (!gradeCurriculum) {
    return null
  }

  const hasChapters =
    gradeCurriculum.chapters.length >
    0

  return (
    <main className="py-10 md:py-14">
      <PageContainer>
        {/* ===============================================
            BACK
            =============================================== */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-soft transition hover:text-brand-700"
        >
          <AppIcon
            name="chevron-right"
            size={16}
            strokeWidth={2}
            className="rotate-180"
          />

          Trang chủ
        </Link>

        {/* ===============================================
            PAGE HEADER
            =============================================== */}

        <header className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold tracking-wider text-brand-600">
            CHƯƠNG TRÌNH THÍ NGHIỆM
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Vật lý{' '}
            {gradeCurriculum.grade}
          </h1>

          <p className="mt-3 text-base leading-7 text-soft">
            Chọn một chuyên đề để
            xem các bài thí nghiệm.
          </p>
        </header>

        {/* ===============================================
            CHAPTER LIST
            =============================================== */}

        {hasChapters ? (
          <section
            className="mt-10 space-y-4"
            aria-label={`Các chuyên đề Vật lý ${gradeCurriculum.grade}`}
          >
            {gradeCurriculum.chapters.map(
              (chapter) => (
                <ChapterAccordion
                  key={chapter.id}
                  grade={
                    gradeCurriculum.grade
                  }
                  chapter={
                    chapter
                  }
                />
              ),
            )}
          </section>
        ) : (
          <section className="mt-10 border border-(--color-border) bg-(--surface-soft) px-6 py-12 text-center shadow-(--shadow-xs) rounded-(--radius-panel)">
            <div className="mx-auto flex h-14 w-14 items-center justify-center bg-brand-100 text-brand-600 rounded-(--radius-control)">
              <AppIcon
                name="book-open"
                size={27}
                strokeWidth={1.8}
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-ink">
              Nội dung đang được
              cập nhật
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-soft">
              Các thí nghiệm Vật lý{' '}
              {gradeCurriculum.grade}{' '}
              sẽ được bổ sung sau.
            </p>
          </section>
        )}
      </PageContainer>
    </main>
  )
}