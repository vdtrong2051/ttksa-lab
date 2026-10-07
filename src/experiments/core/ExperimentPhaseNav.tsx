import {
  useEffect,
  useRef,
} from 'react'

import {
  NavLink,
} from 'react-router'

import {
  getExperimentPhasePath,
} from './routing'

import type {
  ExperimentPhaseDefinition,
  ExperimentPhaseId,
} from './types'


interface ExperimentPhaseNavProps {
  /**
   * Public slug của experiment.
   *
   * Ví dụ:
   * boyle
   * joule
   * brownian
   */
  experimentSlug:
    string


  /**
   * Danh sách phase của experiment.
   *
   * Thông thường:
   * intro
   * preparation
   * practice
   * conclusion
   * quiz
   * report
   */
  phases:
    readonly ExperimentPhaseDefinition[]


  /**
   * Phase hiện tại.
   *
   * Giá trị này được suy ra từ URL,
   * không phải local state.
   */
  activePhase:
    ExperimentPhaseId


  ariaLabel?:
    string
}


export default function ExperimentPhaseNav({
  experimentSlug,
  phases,
  activePhase,
  ariaLabel =
    'Điều hướng các bước thí nghiệm',
}: ExperimentPhaseNavProps) {
  const navRef =
    useRef<HTMLElement>(
      null,
    )


  /*
   * =======================================================
   * ACTIVE TAB VISIBILITY
   * =======================================================
   *
   * Trên màn hình nhỏ, phase nav có thể dài hơn viewport.
   *
   * Khi:
   * - click phase
   * - browser Back
   * - browser Forward
   * - direct URL
   *
   * activePhase đổi theo Router.
   *
   * Sau render, tìm đúng NavLink đang active rồi đưa nó
   * vào vùng nhìn thấy.
   *
   * Không lưu active tab bằng React state.
   * =======================================================
   */

  useEffect(() => {
    const activeItem =
      navRef.current
        ?.querySelector<HTMLElement>(
          '[aria-current="page"]',
        )


    if (
      !activeItem
    ) {
      return
    }


    activeItem.scrollIntoView({
      behavior:
        'smooth',

      block:
        'nearest',

      inline:
        'center',
    })
  }, [
    activePhase,
  ])


  return (
    <nav
      ref={
        navRef
      }
      className="experiment-phase-nav"
      aria-label={
        ariaLabel
      }
    >
      <div className="experiment-phase-nav__track">
        {phases.map(
          (
            phase,
          ) => {
            /*
             * Disabled phase vẫn xuất hiện để
             * người học nhìn thấy đầy đủ flow,
             * nhưng không sinh navigation.
             */
            if (
              phase.disabled
            ) {
              return (
                <span
                  key={
                    phase.id
                  }
                  className={[
                    'experiment-phase-nav__item',
                    'experiment-phase-nav__item--disabled',
                  ].join(
                    ' ',
                  )}
                  aria-disabled="true"
                >
                  {
                    phase.label
                  }
                </span>
              )
            }


            /*
             * Mỗi tab là một URL THẬT.
             *
             * Ví dụ:
             *
             * /lab/boyle/intro
             * /lab/boyle/preparation
             * /lab/boyle/practice
             *
             * Vì dùng NavLink:
             *
             * - browser Back hoạt động
             * - browser Forward hoạt động
             * - refresh hoạt động
             * - direct URL hoạt động
             * - aria-current được React Router quản lý
             */
            return (
              <NavLink
                key={
                  phase.id
                }
                to={
                  getExperimentPhasePath(
                    experimentSlug,
                    phase.id,
                  )
                }
                end
                className={({
                  isActive,
                }) =>
                  [
                    'experiment-phase-nav__item',

                    isActive
                      ? 'experiment-phase-nav__item--active'
                      : '',
                  ]
                    .filter(
                      Boolean,
                    )
                    .join(
                      ' ',
                    )
                }
              >
                {
                  phase.label
                }
              </NavLink>
            )
          },
        )}
      </div>
    </nav>
  )
}