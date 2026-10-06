import { Link } from 'react-router'

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <section className="rounded-3xl bg-white/70 p-10 text-center shadow-xl">
        <h1 className="text-3xl font-black text-ink">
          Đăng ký
        </h1>

        <p className="mt-3 text-muted">
          Chức năng đăng ký sẽ được xây dựng
          ở GĐ3.
        </p>

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