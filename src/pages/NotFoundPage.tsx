import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <section className="text-center">
        <span className="text-7xl font-black text-brand-600">
          404
        </span>

        <h1 className="mt-4 text-3xl font-black text-ink">
          Không tìm thấy trang
        </h1>

        <Link
          to="/"
          className="mt-6 inline-block font-bold text-brand-600"
        >
          ← Trang chủ
        </Link>
      </section>
    </main>
  )
}