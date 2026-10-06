import {
  Link,
  useParams,
} from 'react-router'

import {
  getChapter,
} from '../catalog/registry'

import ChapterAccordion from '../components/curriculum/ChapterAccordion'
import ExperimentCard from '../components/curriculum/ExperimentCard'

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
          className="mt-6 inline-block font-bold text-brand-600"
        >
          ← Thí nghiệm
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
          className="mt-6 inline-block font-bold text-brand-600"
        >
          ← Vật lý {gradeNumber}
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to={`/experiments/${gradeNumber}`}
        className="text-sm font-bold text-brand-600"
      >
        ← Vật lý {gradeNumber}
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
            (experiment) => (
              <ExperimentCard
                key={
                  experiment.slug
                }
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
              />
            ),
          )}
        </div>
      </ChapterAccordion>
    </main>
  )
}