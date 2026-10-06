import {
  curriculum,
} from '../catalog/registry'

import GradeCard from '../components/curriculum/GradeCard'

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      {/* BACKGROUND AURA */}
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
        {/* HERO */}
        <section className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-white/60 px-4 py-2 text-xs font-black tracking-widest text-brand-600 shadow-sm backdrop-blur">
            PHÒNG THÍ NGHIỆM VẬT LÝ TRỰC TUYẾN
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight text-ink md:text-6xl">
            Hệ thống thí nghiệm
            <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Vật lý ảo
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg">
            Quan sát hiện tượng, thao tác
            mô phỏng và thực hành các nội
            dung Vật lý THPT trong môi
            trường trực quan.
          </p>
        </section>

        {/* 3 GRADE CARDS */}
        <section className="mt-14">
          <div className="grid gap-6 md:grid-cols-3">
            {curriculum.map(
              (item) => (
                <GradeCard
                  key={item.grade}
                  curriculum={item}
                />
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  )
}