import {
  Link,
  useParams,
} from 'react-router'

import {
  getChapter,
} from '../catalog/registry'

import ChapterAccordion from '../components/curriculum/ChapterAccordion'
import ExperimentCard from '../components/curriculum/ExperimentCard'
import AppIcon from '../components/ui/AppIcon'

export default function ChapterPage() {
  const {
    grade,
    chapterSlug,
  } = useParams()

  const gradeNumber =
    Number(grade)

  if (
    (
      gradeNumber !== 10 &&
      gradeNumber !== 11 &&
      gradeNumber !== 12
    ) ||
    !chapterSlug
  ) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-black text-ink">
          Không tìm thấy chương
        </h1>

        <Link
          to="/experiments"
          className="mt-6 inline-flex items-center gap-2 font-bold text-brand-600 transition hover:text-brand-700"
        >
          <AppIcon
            name="chevron-right"
            size={17}
            strokeWidth={2}
            className="rotate-180"
          />

          <span>
            Thí nghiệm
          </span>
        </Link>
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
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-black text-ink">
          Không tìm thấy chương
        </h1>

        <Link
          to={`/experiments/${gradeNumber}`}
          className="mt-6 inline-flex items-center gap-2 font-bold text-brand-600 transition hover:text-brand-700"
        >
          <AppIcon
            name="chevron-right"
            size={17}
            strokeWidth={2}
            className="rotate-180"
          />

          <span>
            Vật lý {gradeNumber}
          </span>
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to={`/experiments/${gradeNumber}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition hover:text-brand-700"
      >
        <AppIcon
          name="chevron-right"
          size={16}
          strokeWidth={2}
          className="rotate-180"
        />

        <span>
          Vật lý {gradeNumber}
        </span>
      </Link>

      <header className="mt-6 mb-10">
        <span className="text-sm font-black tracking-wider text-brand-600">
          VẬT LÝ {gradeNumber}
        </span>

        <h1 className="mt-2 text-4xl font-black text-ink">
          Chương trình thí nghiệm
        </h1>
      </header>

      <ChapterAccordion
        grade={gradeNumber}
        chapter={chapter}
        expanded
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chapter.experiments.map(
            (
              experiment,
              index,
            ) => (
              <ExperimentCard
                key={experiment.slug}
                grade={gradeNumber}
                chapterSlug={
                  chapter.slug
                }
                experiment={
                  experiment
                }
                theme={
                  chapter.theme
                }
                order={
                  index + 1
                }
              />
            ),
          )}
        </div>
      </ChapterAccordion>
    </main>
  )
}