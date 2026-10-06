import {
  curriculum,
} from '../catalog/registry'

import GradeCard from '../components/curriculum/GradeCard'
import PageContainer from '../components/ui/PageContainer'

export default function LandingPage() {
  return (
    <main>
      <PageContainer>
        {/* ===============================================
            HERO

            Nội dung giữ theo lab-old.
            Tách hoàn toàn khỏi khu vực chọn khối lớp.
            =============================================== */}

        <section className="mx-auto max-w-5xl py-16 text-center md:py-24">
          <h1 className="brand-gradient-text m-0 py-1 text-4xl leading-tight font-bold tracking-tight uppercase md:text-6xl">
            Hệ thống thí nghiệm
            Vật lý ảo
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 font-medium text-brand-700/80 md:text-xl md:leading-8">
            Khám phá và Luyện tập
            các định luật Vật lý
            cực chill qua mô phỏng
            3D tương tác.
          </p>
        </section>

        {/* ===============================================
            GRADE SELECTION

            Landing chỉ có 3 lớp.
            Không hiển thị chapter/experiment tại đây.
            =============================================== */}

        <section className="border-t border-(--color-border-soft) py-12 md:py-16">
          <header className="mb-8 md:mb-10">
            <p className="mb-2 text-sm font-semibold tracking-wider text-brand-600">
              CHƯƠNG TRÌNH THPT
            </p>

            <h2 className="m-0 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Chọn khối lớp
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-soft md:text-base">
              Chọn khối lớp để xem
              các chuyên đề và thí
              nghiệm tương ứng.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
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
      </PageContainer>
    </main>
  )
}