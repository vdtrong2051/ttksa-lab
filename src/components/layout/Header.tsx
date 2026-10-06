import {
  useState,
} from 'react'

import {
  Link,
  NavLink,
} from 'react-router'

function getNavLinkClass(
  isActive: boolean,
) {
  const base =
    'rounded-full px-4 py-2 text-sm font-bold transition'

  if (isActive) {
    return `${base} bg-brand-100 text-brand-700`
  }

  return `${base} text-slate-600 hover:bg-white/70 hover:text-brand-700`
}

export default function Header() {
  const [menuOpen, setMenuOpen] =
    useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* BRAND */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl shadow-md">
            🔬
          </div>

          <div className="hidden sm:block">
            <strong className="block text-base font-black tracking-tight text-ink">
              TTKSA LAB
            </strong>

            <span className="block text-xs text-muted">
              Virtual Physics Lab
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav
          className="hidden items-center gap-2 md:flex"
          aria-label="Điều hướng chính"
        >
          <NavLink
            to="/"
            end
            className={({
              isActive,
            }) =>
              getNavLinkClass(
                isActive,
              )
            }
          >
            Trang chủ
          </NavLink>

          <NavLink
            to="/experiments"
            className={({
              isActive,
            }) =>
              getNavLinkClass(
                isActive,
              )
            }
          >
            Thí nghiệm theo học phần
          </NavLink>
        </nav>

        {/* DESKTOP AUTH */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-100"
          >
            Đăng nhập
          </Link>

          <Link
            to="/register"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-brand-700"
          >
            Đăng ký
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-xl text-ink shadow-sm md:hidden"
          onClick={() =>
            setMenuOpen(
              (current) =>
                !current,
            )
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={
            menuOpen
              ? 'Đóng menu'
              : 'Mở menu'
          }
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/70 bg-white/90 px-6 py-5 backdrop-blur-xl md:hidden"
        >
          <nav
            className="flex flex-col gap-2"
            aria-label="Điều hướng di động"
          >
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({
                isActive,
              }) =>
                getNavLinkClass(
                  isActive,
                )
              }
            >
              Trang chủ
            </NavLink>

            <NavLink
              to="/experiments"
              onClick={closeMenu}
              className={({
                isActive,
              }) =>
                getNavLinkClass(
                  isActive,
                )
              }
            >
              Thí nghiệm theo học phần
            </NavLink>
          </nav>

          <div className="my-4 h-px bg-slate-200" />

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-full border border-brand-200 bg-white px-4 py-2.5 text-center text-sm font-bold text-brand-700"
            >
              Đăng nhập
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="rounded-full bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}