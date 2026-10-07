import type {
  ReactNode,
} from 'react'

import ExperimentPhaseNav from './ExperimentPhaseNav'

import type {
  ExperimentPhaseDefinition,
  ExperimentPhaseId,
} from './types'


interface ExperimentViewShellProps {
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
   * Danh sách phase mà module sử dụng.
   *
   * Hiện contract chuẩn:
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
   * Phase hiện tại lấy từ URL.
   *
   * Đây KHÔNG phải local state.
   */
  activePhase:
    ExperimentPhaseId


  /**
   * Accessibility label riêng nếu
   * experiment muốn mô tả navigation.
   */
  ariaLabel?:
    string


  /**
   * Runtime workspace đang mở rộng
   * thành overlay toàn màn hình.
   *
   * Đây là UI state, không phải routing state.
   */
  workspaceExpanded?:
    boolean


  /**
   * Tạm giữ prop này để không phá
   * SessionLayout hiện tại.
   *
   * Giá trị phải được suy ra từ URL:
   *
   * activePhase === 'practice'
   */
  isPractice?:
    boolean


  /**
   * Action nhỏ nằm bên phải utility bar.
   *
   * Ví dụ:
   * - Reset
   * - Expand
   * - trạng thái phiên
   *
   * Không dùng vùng này cho action chính
   * của từng phase.
   */
  utilityActions?:
    ReactNode


  /**
   * Runtime sống ở cấp SessionLayout.
   *
   * Ví dụ:
   * Canvas/WebGL của Boyle.
   *
   * Runtime nằm NGOÀI Outlet để route
   * thay đổi mà simulation không unmount.
   */
  persistentRuntime?:
    ReactNode


  /**
   * Active child route.
   *
   * Thực tế thường là:
   *
   * <Outlet />
   */
  children:
    ReactNode
}


export default function ExperimentViewShell({
  experimentSlug,
  phases,
  activePhase,
  ariaLabel,
  workspaceExpanded =
    false,
  isPractice =
    false,
  utilityActions,
  persistentRuntime,
  children,
}: ExperimentViewShellProps) {
  const currentPhaseIndex =
    phases.findIndex(
      (phase) =>
        phase.id ===
        activePhase,
    )


  /*
   * Route contract đảm bảo activePhase
   * phải tồn tại trong phases.
   *
   * Fallback chỉ để UI không vỡ nếu
   * module khai báo sai cấu hình.
   */
  const resolvedPhaseIndex =
    currentPhaseIndex >= 0
      ? currentPhaseIndex
      : 0


  const currentPhase =
    phases[
      resolvedPhaseIndex
    ]


  return (
    <div
      className={[
        'experiment-template',

        isPractice
          ? 'experiment-template--practice'
          : 'experiment-template--content',

        workspaceExpanded
          ? 'experiment-template--expanded'
          : '',
      ]
        .filter(
          Boolean,
        )
        .join(
          ' ',
        )}
    >
      {/* ===================================================
          PHASE NAVIGATION

          URL-driven navigation.

          Đây là navigation cấp experiment,
          không phải local tab state.

          Scroll/sticky behavior thuộc CSS.
          =================================================== */}

      <ExperimentPhaseNav
        experimentSlug={
          experimentSlug
        }
        phases={
          phases
        }
        activePhase={
          activePhase
        }
        ariaLabel={
          ariaLabel
        }
      />


      {/* ===================================================
          VIEW BODY

          Không:
          - background card
          - border
          - radius
          - shadow

          Body chỉ quản lý flow.

          Scroll ownership sẽ được CSS 2.1E
          chỉnh theo lab-new.
          =================================================== */}

      <div className="experiment-template__body">
        {/* ===============================================
            COMPACT UTILITY BAR

            Lab-new pattern:

            BƯỚC 2 / 6   Chuẩn bị                 Reset

            Đây là structural bar.
            Không phải card.
            =============================================== */}

        <div className="experiment-template__utility">
          <div className="experiment-template__phase-info">
            <span>
              Bước{' '}
              {
                resolvedPhaseIndex +
                1
              }
              {' / '}
              {
                phases.length
              }
            </span>

            <strong>
              {
                currentPhase
                  ?.title
              }
            </strong>
          </div>


          {utilityActions && (
            <div className="experiment-template__utility-actions">
              {
                utilityActions
              }
            </div>
          )}
        </div>


        {/* ===============================================
            PHASE STAGE

            Stage chỉ xác định ownership của vùng hiển thị.

            CONTENT:
            - natural document flow
            - phase tự sở hữu layout/card
            - không có giant outer card

            PRACTICE:
            - full workspace
            - padding 0
            - runtime/canvas chiếm toàn vùng
            =============================================== */}

        <div
          className={[
            'experiment-template__stage',

            isPractice
              ? 'experiment-template__stage--practice'
              : 'experiment-template__stage--content',
          ].join(
            ' ',
          )}
        >
          {/* =============================================
              PERSISTENT RUNTIME

              Luôn nằm cùng cấp với routed view.

              ExperimentRuntimeHost tự quyết định:
              - active
              - inactive
              - mounted

              Khi URL đổi:
              runtime KHÔNG bị Outlet unmount.
              ============================================= */}

          {persistentRuntime}


          {/* =============================================
              ROUTED VIEW

              Đây là nơi <Outlet /> xuất hiện.

              Không áp card/background/radius ở đây.
              Từng View tự quyết định presentation.

              Ví dụ:
              IntroPage
              PreparationPage
              PracticePage
              ConclusionPage
              QuizPage
              ReportPage
              ============================================= */}

          <div
            className={[
              'experiment-template__route',

              isPractice
                ? 'experiment-template__route--practice'
                : 'experiment-template__route--content',
            ].join(
              ' ',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}