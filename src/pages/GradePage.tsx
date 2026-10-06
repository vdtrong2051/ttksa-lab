import {
  Link,
  useParams,
} from 'react-router'

import {
  getGradeCurriculum,
} from '../catalog/registry'

import ChapterAccordion from '../components/curriculum/ChapterAccordion'

export default function GradePage() {
  const { grade } = useParams()

  const gradeNumber =
    Number(grade)

  if (
    gradeNumber !== 10 &&
    gradeNumber !== 11 &&
    gradeNumber !== 12
  ) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-black text-ink">
          Không tìm thấy khối lớp
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

  const gradeCurriculum =
    getGradeCurriculum(
      gradeNumber,
    )

  if (!gradeCurriculum) {
    return null
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/experiments"
        className="text-sm font-bold text-brand-600"
      >
        ← Các khối lớp
      </Link>

      <header className="mt-6">
        <span className="text-sm font-black tracking-wider text-brand-600">
          CHƯƠNG TRÌNH
        </span>

        <h1 className="mt-2 text-4xl font-black text-ink">
          Vật lý{' '}
          {gradeCurriculum.grade}
        </h1>

        <p className="mt-3 text-muted">
          Chọn một chương để xem các
          bài thí nghiệm.
        </p>
      </header>

      {gradeCurriculum.chapters
        .length > 0 ? (
        <section className="mt-10 space-y-5">
          {gradeCurriculum.chapters.map(
            (chapter) => (
              <ChapterAccordion
                key={chapter.id}
                grade={
                  gradeCurriculum.grade
                }
                chapter={chapter}
              />
            ),
          )}
        </section>
      ) : (
        <section className="mt-10 rounded-3xl border border-white/80 bg-white/60 p-10 text-center shadow-lg backdrop-blur-xl">
          <span className="text-5xl">
            🚧
          </span>

          <h2 className="mt-5 text-2xl font-black text-ink">
            Nội dung đang được cập nhật
          </h2>

          <p className="mt-2 text-muted">
            Các thí nghiệm Vật lý{' '}
            {gradeCurriculum.grade}{' '}
            sẽ được bổ sung sau.
          </p>
        </section>
      )}
    </main>
  )
}