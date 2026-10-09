import {
  useEffect,
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
  return [
    'relative',
    'inline-flex',
    'min-h-10',
    'items-center',

    'px-3',

    'text-sm',
    'font-semibold',

    'rounded-(--radius-control)',

    'transition',
    'duration-150',

    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-slate-400/30',

    isActive
      ? [
          'text-(--nav-text-active)',

          'after:absolute',
          'after:right-3',
          'after:bottom-0',
          'after:left-3',
          'after:h-0.5',
          'after:bg-(--nav-active-indicator)',
          'after:content-[""]',
        ].join(' ')
      : [
          'text-(--nav-text)',

          'hover:bg-(--nav-hover-background)',
          'hover:text-(--nav-text-hover)',
        ].join(' '),
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


  // =========================================================
  // CLICK OUTSIDE DROPDOWN
  // =========================================================

  useEffect(() => {
    function handlePointerDown(
      event: MouseEvent,
    ) {
      const dropdown =
        dropdownRef.current

      if (
        dropdown &&
        !dropdown.contains(
          event.target as Node,
        )
      ) {
        closeDropdown()
      }
    }

    document.addEventListener(
      'mousedown',
      handlePointerDown,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handlePointerDown,
      )
    }
  }, [])


  // =========================================================
  // ESCAPE
  // =========================================================

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key === 'Escape'
      ) {
        setMenuOpen(false)
        closeDropdown()
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [])


  return (
    <header
      className={[
        'sticky',
        'top-0',
        'z-50',

        'border-b',
        'border-(--nav-border)',

        'bg-(--nav-background)',

        'backdrop-blur-xl',
      ].join(' ')}
    >
      <div className="page-container flex h-(--header-height) items-center justify-between">
        {/* ===================================================
            BRAND
            =================================================== */}

        <Link
          to="/"
          onClick={
            closeMenus
          }
          aria-label="TTKSA Lab - Trang chủ"
          className={[
            'group',

            'inline-flex',
            'min-w-0',
            'items-center',
            'gap-3',

            'rounded-(--radius-control)',

            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-slate-400/30',
          ].join(' ')}
        >
          <span
            className={[
              'flex',
              'h-9',
              'w-9',
              'shrink-0',
              'items-center',
              'justify-center',

              'border',
              'border-(--nav-border)',

              'bg-(--surface-muted)',
              'text-(--nav-text-active)',

              'rounded-(--radius-control)',

              'transition',
              'duration-150',

              'group-hover:border-(--color-border-strong)',
              'group-hover:bg-white',
            ].join(' ')}
          >
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


        {/* ===================================================
            DESKTOP NAVIGATION
            =================================================== */}

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Điều hướng chính"
        >
          <NavLink
            to="/"
            end
            onClick={
              closeDropdown
            }
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


          {/* =================================================
              EXPERIMENT DROPDOWN
              ================================================= */}

          <details
            ref={
              dropdownRef
            }
            className="group/dropdown relative"
          >
            <summary
              className={[
                'relative',

                'flex',
                'min-h-10',
                'cursor-pointer',
                'list-none',
                'items-center',
                'gap-2',

                'px-3',

                'text-sm',
                'font-semibold',

                'rounded-(--radius-control)',

                'transition',
                'duration-150',

                'focus-visible:outline-none',
                'focus-visible:ring-2',
                'focus-visible:ring-slate-400/30',

                '[&::-webkit-details-marker]:hidden',

                experimentsActive
                  ? [
                      'text-(--nav-text-active)',

                      'after:absolute',
                      'after:right-3',
                      'after:bottom-0',
                      'after:left-3',
                      'after:h-0.5',
                      'after:bg-(--nav-active-indicator)',
                      'after:content-[""]',
                    ].join(
                      ' ',
                    )
                  : [
                      'text-(--nav-text)',

                      'hover:bg-(--nav-hover-background)',
                      'hover:text-(--nav-text-hover)',
                    ].join(
                      ' ',
                    ),
              ].join(' ')}
            >
              <span>
                Thí nghiệm theo học phần
              </span>

              <AppIcon
                name="chevron-down"
                size={16}
                strokeWidth={2}
                className={[
                  'text-(--nav-text)',

                  'transition-transform',
                  'duration-150',

                  'group-open/dropdown:rotate-180',
                ].join(' ')}
              />
            </summary>


            {/* ===============================================
                DROPDOWN PANEL
                =============================================== */}

            <div className="absolute left-1/2 top-[calc(100%+0.6rem)] w-80 -translate-x-1/2">
              <div
                className={[
                  'overflow-hidden',

                  'border',
                  'border-(--nav-border)',

                  'bg-(--nav-dropdown-background)',

                  'p-2',

                  'shadow-(--shadow-md)',

                  'backdrop-blur-xl',

                  'rounded-(--radius-card)',
                ].join(' ')}
              >
                <div className="px-3 pt-2 pb-1">
                  <p className="text-xs font-semibold tracking-wider text-muted">
                    CHỌN KHỐI LỚP
                  </p>
                </div>

                <div className="mt-1 grid gap-1">
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
                            'group/item',

                            'flex',
                            'items-center',
                            'justify-between',
                            'gap-4',

                            'px-3',
                            'py-3',

                            'rounded-(--radius-control)',

                            'transition',
                            'duration-150',

                            'focus-visible:outline-none',
                            'focus-visible:ring-2',
                            'focus-visible:ring-slate-400/30',

                            active
                              ? [
                                  'bg-(--nav-dropdown-active)',
                                  'text-(--nav-text-active)',
                                ].join(
                                  ' ',
                                )
                              : [
                                  'text-ink',

                                  'hover:bg-(--nav-dropdown-hover)',
                                ].join(
                                  ' ',
                                ),
                          ].join(
                            ' ',
                          )}
                        >
                          <span className="min-w-0">
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
                            size={16}
                            strokeWidth={2}
                            className={[
                              'shrink-0',

                              'text-muted',

                              'transition',
                              'duration-150',

                              'group-hover/item:translate-x-0.5',
                              'group-hover/item:text-ink',
                            ].join(
                              ' ',
                            )}
                          />
                        </Link>
                      )
                    },
                  )}
                </div>
              </div>
            </div>
          </details>
        </nav>


        {/* ===================================================
            DESKTOP AUTH
            =================================================== */}

        {/* <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            onClick={
              closeDropdown
            }
            className={[
              'inline-flex',
              'min-h-10',
              'items-center',
              'justify-center',

              'px-3',

              'text-sm',
              'font-semibold',
              'text-(--nav-text-active)',

              'rounded-(--radius-control)',

              'transition',
              'duration-150',

              'hover:bg-(--nav-hover-background)',

              'focus-visible:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-slate-400/30',
            ].join(' ')}
          >
            Đăng nhập
          </Link>

          <Link
            to="/register"
            onClick={
              closeDropdown
            }
            style={{
              background:
                'var(--portal-gradient)',
            }}
            className={[
              'inline-flex',
              'min-h-10',
              'items-center',
              'justify-center',

              'px-4',

              'text-sm',
              'font-semibold',
              'text-white',

              'rounded-(--radius-button)',

              'shadow-(--shadow-sm)',

              'transition',
              'duration-150',

              'hover:-translate-y-px',
              'hover:shadow-(--shadow-md)',

              'focus-visible:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-slate-400/30',
              'focus-visible:ring-offset-2',
            ].join(' ')}
          >
            Đăng ký
          </Link>
        </div> */}
        <div className="hidden items-center lg:flex">
          <Link
            to="/experiments/11"
            onClick={closeDropdown}
            style={{
              background:
                'var(--portal-gradient)',
            }}
            className={[
              'inline-flex',
              'min-h-10',
              'items-center',
              'justify-center',
              'gap-2',
              'px-4',
              'text-sm',
              'font-semibold',
              'text-white',
              'rounded-(--radius-button)',
              'shadow-(--shadow-sm)',
              'transition',
              'duration-150',
              'hover:-translate-y-px',
              'hover:shadow-(--shadow-md)',
              'focus-visible:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-slate-400/30',
              'focus-visible:ring-offset-2',
            ].join(' ')}
          >
            Khám phá thí nghiệm

            <AppIcon
              name="chevron-right"
              size={16}
              strokeWidth={2}
            />
          </Link>
        </div>

        {/* ===================================================
            MOBILE MENU BUTTON
            =================================================== */}

        <button
          type="button"
          onClick={() =>
            setMenuOpen(
              (
                current,
              ) =>
                !current,
            )
          }
          aria-expanded={
            menuOpen
          }
          aria-controls="mobile-menu"
          aria-label={
            menuOpen
              ? 'Đóng menu'
              : 'Mở menu'
          }
          className={[
            'flex',
            'h-10',
            'w-10',
            'items-center',
            'justify-center',

            'text-(--nav-text)',

            'rounded-(--radius-control)',

            'transition',
            'duration-150',

            'hover:bg-(--nav-hover-background)',
            'hover:text-(--nav-text-hover)',

            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-slate-400/30',

            'lg:hidden',
          ].join(' ')}
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


      {/* =====================================================
          MOBILE MENU
          ===================================================== */}

      {menuOpen && (
        <div
          id="mobile-menu"
          className={[
            'border-t',
            'border-(--nav-border)',

            'bg-(--nav-dropdown-background)',

            'backdrop-blur-xl',

            'lg:hidden',
          ].join(' ')}
        >
          <div className="page-container py-4">
            <nav
              className="flex flex-col"
              aria-label="Điều hướng di động"
            >
              <NavLink
                to="/"
                end
                onClick={
                  closeMenus
                }
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


              {/* =============================================
                  MOBILE EXPERIMENTS
                  ============================================= */}

              <div className="mt-3 border-t border-(--nav-border) pt-4">
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
                            'group/mobile-item',

                            'flex',
                            'items-center',
                            'justify-between',
                            'gap-4',

                            'px-3',
                            'py-3',

                            'rounded-(--radius-control)',

                            'transition',
                            'duration-150',

                            active
                              ? [
                                  'bg-(--nav-dropdown-active)',
                                  'text-(--nav-text-active)',
                                ].join(
                                  ' ',
                                )
                              : [
                                  'text-ink',

                                  'hover:bg-(--nav-dropdown-hover)',
                                ].join(
                                  ' ',
                                ),
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
                            size={16}
                            strokeWidth={2}
                            className={[
                              'text-muted',

                              'transition',

                              'group-hover/mobile-item:translate-x-0.5',
                              'group-hover/mobile-item:text-ink',
                            ].join(
                              ' ',
                            )}
                          />
                        </Link>
                      )
                    },
                  )}
                </div>
              </div>
            </nav>


            {/* ===============================================
                MOBILE AUTH
                =============================================== */}

            {/* <div className="mt-4 grid grid-cols-2 gap-3 border-t border-(--nav-border) pt-4">
              <Link
                to="/login"
                onClick={
                  closeMenus
                }
                className={[
                  'inline-flex',
                  'min-h-10',
                  'items-center',
                  'justify-center',

                  'border',
                  'border-(--nav-border)',

                  'bg-white',

                  'px-4',

                  'text-sm',
                  'font-semibold',
                  'text-(--nav-text-active)',

                  'rounded-(--radius-button)',

                  'transition',
                  'duration-150',

                  'hover:bg-(--nav-hover-background)',
                ].join(' ')}
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
                className={[
                  'inline-flex',
                  'min-h-10',
                  'items-center',
                  'justify-center',

                  'px-4',

                  'text-sm',
                  'font-semibold',
                  'text-white',

                  'rounded-(--radius-button)',

                  'shadow-(--shadow-sm)',

                  'transition',
                  'duration-150',

                  'hover:shadow-(--shadow-md)',
                ].join(' ')}
              >
                Đăng ký
              </Link>
            </div> */}

            <div className="mt-4 border-t border-(--nav-border) pt-4">
              <Link
                to="/experiments/11"
                onClick={closeMenus}
                style={{
                  background:
                    'var(--portal-gradient)',
                }}
                className={[
                  'inline-flex',
                  'min-h-11',
                  'w-full',
                  'items-center',
                  'justify-center',
                  'gap-2',
                  'px-4',
                  'text-sm',
                  'font-semibold',
                  'text-white',
                  'rounded-(--radius-button)',
                  'shadow-(--shadow-sm)',
                  'transition',
                  'duration-150',
                  'hover:shadow-(--shadow-md)',
                ].join(' ')}
              >
                Khám phá thí nghiệm

                <AppIcon
                  name="chevron-right"
                  size={16}
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}