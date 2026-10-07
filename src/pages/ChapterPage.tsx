import {
  Link,
  useParams,
} from 'react-router'

import type {
  GradeLevel,
} from '../catalog/types'

import {
  getChapter,
} from '../catalog/registry'

import ChapterAccordion from '../components/curriculum/ChapterAccordion'
import ExperimentCard from '../components/curriculum/ExperimentCard'
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

export default function ChapterPage() {
  const {
    grade,
    chapterSlug,
  } = useParams()

  const gradeNumber =
    Number(grade)

  if (
    !isGradeLevel(
      gradeNumber,
    ) ||
    !chapterSlug
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
              Không tìm thấy chuyên đề
            </h1>

            <p className="mt-3 text-sm leading-6 text-soft">
              Chuyên đề trong đường
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

  const chapter =
    getChapter(
      gradeNumber,
      chapterSlug,
    )

  if (!chapter) {
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
              Không tìm thấy chuyên đề
            </h1>

            <Link
              to={`/experiments/${gradeNumber}`}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
            >
              <AppIcon
                name="chevron-right"
                size={16}
                strokeWidth={2}
                className="rotate-180"
              />

              Vật lý {gradeNumber}
            </Link>
          </section>
        </PageContainer>
      </main>
    )
  }

  return (
    <main className="py-10 md:py-14">
      <PageContainer>
        {/* ===============================================
            BACK
            =============================================== */}

        <Link
          to={`/experiments/${gradeNumber}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-soft transition hover:text-brand-700"
        >
          <AppIcon
            name="chevron-right"
            size={16}
            strokeWidth={2}
            className="rotate-180"
          />

          Vật lý {gradeNumber}
        </Link>

        {/* ===============================================
            PAGE HEADER
            =============================================== */}

        <header className="mt-7 mb-9">
          <p className="text-sm font-semibold tracking-wider text-brand-600">
            VẬT LÝ {gradeNumber}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Chương trình thí nghiệm
          </h1>
        </header>

        {/* ===============================================
            EXPANDED CHAPTER

            Giữ hierarchy lab-old:
            Chuyên đề
              → danh sách card
              → số thứ tự
              → mô tả
              → tag / Bắt đầu
            =============================================== */}

        <ChapterAccordion
          grade={gradeNumber}
          chapter={chapter}
          expanded
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {chapter.experiments.map(
              (
                experiment,
                index,
              ) => (
                <ExperimentCard
                  key={experiment.slug}
                  grade={gradeNumber}
                  chapterSlug={chapter.slug}
                  experiment={experiment}
                  order={index + 1}
                />
              ),
            )}
          </div>
        </ChapterAccordion>
      </PageContainer>
    </main>
  )
}