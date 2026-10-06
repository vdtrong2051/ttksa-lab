import {
  useRef,
  useState,
} from 'react'

import {
  Link,
  NavLink,
  useLocation,
} from 'react-router'

import type {
  GradeLevel,
} from '../../catalog/types'

import {
  getExperimentCount,
} from '../../catalog/registry'

import AppIcon from '../ui/AppIcon'

const gradeLevels: GradeLevel[] = [
  10,
  11,
  12,
]

function getNavLinkClass(
  isActive: boolean,
) {
  const base = [
    'inline-flex',
    'items-center',
    'min-h-10',
    'px-3',
    'text-sm',
    'font-semibold',
    'transition',
    'duration-150',
    'rounded-(--radius-control)',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-brand-500/30',
  ].join(' ')

  if (isActive) {
    return [
      base,
      'bg-brand-100',
      'text-brand-700',
    ].join(' ')
  }

  return [
    base,
    'text-soft',
    'hover:bg-white/70',
    'hover:text-brand-700',
  ].join(' ')
}

export default function Header() {
  const location =
    useLocation()

  const dropdownRef =
    useRef<HTMLDetailsElement>(
      null,
    )

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false)

  const experimentsActive =
    location.pathname.startsWith(
      '/experiments/',
    )

  function closeDropdown() {
    dropdownRef.current?.removeAttribute(
      'open',
    )
  }

  function closeMenus() {
    setMenuOpen(false)
    closeDropdown()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border-soft) bg-white/80 backdrop-blur-xl">
      <div className="page-container flex h-(--header-height) items-center justify-between">
        {/* ===============================================
            BRAND
            =============================================== */}

        <Link
          to="/"
          onClick={closeMenus}
          className="group inline-flex min-w-0 items-center gap-3 rounded-(--radius-control) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30"
          aria-label="TTKSA Lab - Trang chủ"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-control) bg-brand-100 text-brand-600 transition duration-150 group-hover:bg-brand-200">
            <AppIcon
              name="flask"
              size={20}
              strokeWidth={1.9}
            />
          </span>

          <span className="min-w-0">
            <strong className="brand-gradient-text block text-base font-bold tracking-tight">
              TTKSA LAB
            </strong>

            <span className="hidden text-xs text-muted sm:block">
              Virtual Physics Lab
            </span>
          </span>
        </Link>

        {/* ===============================================
            DESKTOP NAVIGATION
            =============================================== */}

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Điều hướng chính"
        >
          <NavLink
            to="/"
            end
            onClick={closeDropdown}
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

          {/* EXPERIMENT DROPDOWN */}

          <details
            ref={dropdownRef}
            className="group/dropdown relative"
          >
            <summary
              className={[
                'flex min-h-10 cursor-pointer',
                'list-none items-center gap-2',
                'px-3 text-sm font-semibold',
                'transition duration-150',
                'rounded-(--radius-control)',
                'focus-visible:outline-none',
                'focus-visible:ring-2',
                'focus-visible:ring-brand-500/30',
                '[&::-webkit-details-marker]:hidden',

                experimentsActive
                  ? 'bg-brand-100 text-brand-700'
                  : 'text-soft hover:bg-white/70 hover:text-brand-700',
              ].join(' ')}
            >
              <span>
                Thí nghiệm theo học phần
              </span>

              <AppIcon
                name="chevron-down"
                size={16}
                strokeWidth={2}
                className="transition-transform duration-150 group-open/dropdown:rotate-180"
              />
            </summary>

            <div className="absolute left-1/2 top-[calc(100%+0.5rem)] w-80 -translate-x-1/2">
              <div className="overflow-hidden border border-(--color-border) bg-(--surface-strong) p-2 shadow-(--shadow-md) backdrop-blur-xl rounded-(--radius-card)">
                <div className="px-3 pt-2 pb-1">
                  <p className="text-xs font-semibold tracking-wider text-muted">
                    CHỌN KHỐI LỚP
                  </p>
                </div>

                {gradeLevels.map(
                  (grade) => {
                    const count =
                      getExperimentCount(
                        grade,
                      )

                    const active =
                      location.pathname.startsWith(
                        `/experiments/${grade}`,
                      )

                    return (
                      <Link
                        key={grade}
                        to={`/experiments/${grade}`}
                        onClick={closeMenus}
                        className={[
                          'flex items-center',
                          'justify-between',
                          'gap-4',
                          'px-3 py-3',
                          'rounded-(--radius-control)',
                          'transition',
                          'duration-150',
                          'focus-visible:outline-none',
                          'focus-visible:ring-2',
                          'focus-visible:ring-brand-500/30',

                          active
                            ? 'bg-brand-100 text-brand-700'
                            : 'text-ink hover:bg-brand-50',
                        ].join(' ')}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">
                            Vật lý {grade}
                          </span>

                          <span className="mt-0.5 block text-xs text-muted">
                            {count > 0
                              ? `${count} thí nghiệm`
                              : 'Đang cập nhật'}
                          </span>
                        </span>

                        <AppIcon
                          name="chevron-right"
                          size={16}
                          strokeWidth={2}
                          className="shrink-0"
                        />
                      </Link>
                    )
                  },
                )}
              </div>
            </div>
          </details>
        </nav>

        {/* ===============================================
            DESKTOP AUTH
            =============================================== */}

        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/login"
            onClick={closeDropdown}
            className="inline-flex min-h-10 items-center justify-center px-3 text-sm font-semibold text-soft transition duration-150 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 rounded-(--radius-control)"
          >
            Đăng nhập
          </Link>

          <Link
            to="/register"
            onClick={closeDropdown}
            style={{
              background:
                'var(--portal-gradient)',
            }}
            className="ml-1 inline-flex min-h-10 items-center justify-center px-4 text-sm font-semibold text-white shadow-(--shadow-sm) transition duration-150 hover:-translate-y-px hover:shadow-(--shadow-md) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2 rounded-(--radius-button)"
          >
            Đăng ký
          </Link>
        </div>

        {/* ===============================================
            MOBILE MENU BUTTON
            =============================================== */}

        <button
          type="button"
          onClick={() =>
            setMenuOpen(
              (current) =>
                !current,
            )
          }
          className="flex h-10 w-10 items-center justify-center text-soft transition duration-150 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 rounded-(--radius-control) md:hidden"
          aria-expanded={
            menuOpen
          }
          aria-controls="mobile-menu"
          aria-label={
            menuOpen
              ? 'Đóng menu'
              : 'Mở menu'
          }
        >
          <AppIcon
            name={
              menuOpen
                ? 'close'
                : 'menu'
            }
            size={21}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* ===============================================
          MOBILE MENU
          =============================================== */}

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-(--color-border-soft) bg-(--surface-strong) backdrop-blur-xl md:hidden"
        >
          <div className="page-container py-4">
            <nav
              className="flex flex-col"
              aria-label="Điều hướng di động"
            >
              <NavLink
                to="/"
                end
                onClick={closeMenus}
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

              <div className="mt-2 border-t border-(--color-border-soft) pt-4">
                <p className="px-3 text-xs font-semibold tracking-wider text-muted">
                  THÍ NGHIỆM THEO HỌC PHẦN
                </p>

                <div className="mt-2 grid gap-1">
                  {gradeLevels.map(
                    (grade) => {
                      const count =
                        getExperimentCount(
                          grade,
                        )

                      const active =
                        location.pathname.startsWith(
                          `/experiments/${grade}`,
                        )

                      return (
                        <Link
                          key={
                            grade
                          }
                          to={`/experiments/${grade}`}
                          onClick={
                            closeMenus
                          }
                          className={[
                            'flex items-center',
                            'justify-between',
                            'gap-4',
                            'px-3 py-3',
                            'rounded-(--radius-control)',
                            'transition',
                            'duration-150',

                            active
                              ? 'bg-brand-100 text-brand-700'
                              : 'text-ink hover:bg-brand-50',
                          ].join(
                            ' ',
                          )}
                        >
                          <span>
                            <span className="block text-sm font-semibold">
                              Vật lý{' '}
                              {grade}
                            </span>

                            <span className="mt-0.5 block text-xs text-muted">
                              {count >
                              0
                                ? `${count} thí nghiệm`
                                : 'Đang cập nhật'}
                            </span>
                          </span>

                          <AppIcon
                            name="chevron-right"
                            size={
                              16
                            }
                            strokeWidth={
                              2
                            }
                          />
                        </Link>
                      )
                    },
                  )}
                </div>
              </div>
            </nav>

            {/* MOBILE AUTH */}

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-(--color-border-soft) pt-4">
              <Link
                to="/login"
                onClick={
                  closeMenus
                }
                className="inline-flex min-h-10 items-center justify-center border border-(--color-border) bg-white/80 px-4 text-sm font-semibold text-brand-700 transition hover:bg-white rounded-(--radius-button)"
              >
                Đăng nhập
              </Link>

              <Link
                to="/register"
                onClick={
                  closeMenus
                }
                style={{
                  background:
                    'var(--portal-gradient)',
                }}
                className="inline-flex min-h-10 items-center justify-center px-4 text-sm font-semibold text-white shadow-(--shadow-sm) transition hover:shadow-(--shadow-md) rounded-(--radius-button)"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}