export default function PageLoading() {
  return (
    <main
      className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center px-6 py-16"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div
          className="mx-auto size-7 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm font-medium text-soft">
          Đang tải nội dung...
        </p>
      </div>
    </main>
  )
}