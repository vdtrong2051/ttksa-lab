import {
  curriculum,
} from '../catalog/registry'

import GradeCard from '../components/curriculum/GradeCard'

export default function ExperimentsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="max-w-3xl">
        <span className="text-sm font-black tracking-wider text-brand-600">
          CHƯƠNG TRÌNH THÍ NGHIỆM
        </span>

        <h1 className="mt-2 text-4xl font-black text-ink">
          Thí nghiệm theo học phần
        </h1>

        <p className="mt-3 leading-7 text-muted">
          Chọn khối lớp để xem các
          chương và bài thí nghiệm
          tương ứng.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {curriculum.map(
          (item) => (
            <GradeCard
              key={item.grade}
              curriculum={item}
            />
          ),
        )}
      </section>
    </main>
  )
}