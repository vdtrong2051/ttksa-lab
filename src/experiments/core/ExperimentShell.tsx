import type {
  ReactNode,
} from 'react'

import {
  Link,
} from 'react-router'

import AppIcon from '../../components/ui/AppIcon'

import {
  getExperimentCatalogPath,
} from './routing'

import type {
  ExperimentModuleMeta,
} from './types'


interface ExperimentShellProps {
  /**
   * Metadata của experiment.
   */
  meta:
    ExperimentModuleMeta


  /**
   * Route quay về.
   *
   * Nếu không truyền:
   * tự quay về chapter trong curriculum.
   */
  backTo?:
    string


  /**
   * Action phụ ở góc phải Header.
   *
   * Ví dụ sau này:
   * - Help
   * - Session status
   * - Settings
   *
   * Không đặt CTA chính của phase tại đây.
   */
  headerActions?:
    ReactNode


  /**
   * Experiment runtime/view.
   */
  children:
    ReactNode
}


export default function ExperimentShell({
  meta,
  backTo,
  headerActions,
  children,
}: ExperimentShellProps) {
  const resolvedBackTo =
    backTo ??
    getExperimentCatalogPath(
      meta.grade,
      meta.chapterSlug,
    )


  return (
    <div
      className="experiment-page"
      data-accent={
        meta.accent
      }
    >
      {/* ===================================================
          LAB HEADER
          =================================================== */}

      <header className="experiment-header">
        {/* ===============================================
            BACK TO CURRICULUM
            =============================================== */}

        <Link
          to={
            resolvedBackTo
          }
          className="experiment-header__back"
          aria-label="Quay lại danh sách thí nghiệm"
        >
          <AppIcon
            name="chevron-right"
            size={16}
            strokeWidth={2}
            className="rotate-180"
          />

          <span>
            Quay lại
          </span>
        </Link>


        {/* ===============================================
            EXPERIMENT IDENTITY

            Header chỉ thể hiện:
            - Grade / Topic
            - Lab identity
            - Experiment title
            - Description ngắn

            Không chứa phase state.
            =============================================== */}

        <div className="experiment-header__identity">
          <div className="experiment-header__meta">
            <span className="experiment-header__subject">
              Vật lý{' '}
              {meta.grade}
              {' · '}
              {meta.topic}
            </span>

            <span
              className="experiment-header__indicator"
              aria-hidden="true"
            />

            <span className="experiment-header__lab-label">
              Phòng thí nghiệm ảo
            </span>
          </div>


          <h1>
            {meta.title}
          </h1>


          {meta.description && (
            <p className="experiment-header__description">
              {
                meta.description
              }
            </p>
          )}
        </div>


        {/* ===============================================
            OPTIONAL HEADER ACTIONS
            =============================================== */}

        {headerActions && (
          <div className="experiment-header__actions">
            {
              headerActions
            }
          </div>
        )}
      </header>


      {/* ===================================================
          EXPERIMENT WORKSPACE

          PhaseNav / Utility / Stage nằm bên trong đây.
          =================================================== */}

      <main className="experiment-main">
        <section className="experiment-workspace">
          {children}
        </section>
      </main>
    </div>
  )
}