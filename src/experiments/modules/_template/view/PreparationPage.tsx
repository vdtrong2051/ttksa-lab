import {
  useState,
} from 'react'

import AppIcon from '../../../../components/ui/AppIcon'

import ExperimentToast from '../../../core/ExperimentToast'

import {
  useTemplateSession,
} from '../context'

import {
  templatePreparationTools,
} from '../model/data'


type PreparationFeedback =
  | 'error'
  | 'success'
  | null


export default function PreparationPage() {
  const {
    controller,
    navigation,
  } =
    useTemplateSession()


  const [
    feedback,
    setFeedback,
  ] =
    useState<
      PreparationFeedback
    >(
      null,
    )


  function handleToggleTool(
    toolId:
      (typeof templatePreparationTools)[number]['id'],
  ) {
    /*
     * Khi thay đổi lựa chọn,
     * feedback verify trước đó không còn đúng.
     */
    if (
      feedback
    ) {
      setFeedback(
        null,
      )
    }


    controller.togglePreparationTool(
      toolId,
    )
  }


  function handleVerify() {
    const success =
      controller.verifyPreparation()


    if (
      success
    ) {
      setFeedback(
        'success',
      )

      return
    }


    setFeedback(
      'error',
    )
  }


  function handleContinue() {
    if (
      !controller.preparationReady
    ) {
      return
    }


    navigation.next()
  }


  return (
    <div className="template-preparation">
      <div className="template-preparation__inner">
        {/* ===============================================
            PHASE BADGE
            =============================================== */}

        <span className="template-preparation__badge">
          Phần 2 · Chuẩn bị dụng cụ
        </span>


        {/* ===============================================
            HEADING
            =============================================== */}

        <header className="template-preparation__heading">
          <h2>
            Lựa chọn thiết bị thí nghiệm
          </h2>

          <p>
            Chọn đúng các thiết bị cần thiết
            để chuẩn bị phiên thực hành.
            Một số dụng cụ bên dưới được đưa
            vào để kiểm tra khả năng nhận biết.
          </p>
        </header>


        {/* ===============================================
            PROGRESS
            =============================================== */}

        <div className="template-preparation-progress">
          <div className="template-preparation-progress__label">
            <span>
              Dụng cụ đã chọn
            </span>

            <strong>
              {
                controller
                  .selectedPreparationToolIds
                  .length
              }
              {' / '}
              {
                controller
                  .requiredPreparationToolCount
              }
            </strong>
          </div>


          <div
            className="template-preparation-progress__track"
            aria-label={
              `Đã chọn ${
                controller
                  .selectedPreparationToolIds
                  .length
              } dụng cụ`
            }
          >
            <span
              style={{
                width:
                  `${Math.min(
                    controller
                      .selectedPreparationToolIds
                      .length /
                    controller
                      .requiredPreparationToolCount,
                    1,
                  ) * 100}%`,
              }}
            />
          </div>
        </div>


        {/* ===============================================
            FEEDBACK

            Giống pattern validation của Boyle,
            nhưng dùng ExperimentToast chung.
            =============================================== */}

        {feedback ===
          'error' && (
          <ExperimentToast
            tone="error"
            message="Lựa chọn chưa chính xác. Hãy kiểm tra lại và chỉ giữ các thiết bị thực sự cần thiết cho thí nghiệm."
          />
        )}


        {feedback ===
          'success' && (
          <ExperimentToast
            tone="success"
            message="Chuẩn bị hoàn tất. Bộ thiết bị đã sẵn sàng cho bước thực hành."
          />
        )}


        {/* ===============================================
            TOOL GRID
            =============================================== */}

        <div className="template-tool-grid">
          {templatePreparationTools.map(
            (tool) => {
              const isSelected =
                controller
                  .selectedPreparationToolIds
                  .includes(
                    tool.id,
                  )


              return (
                <button
                  key={
                    tool.id
                  }
                  type="button"
                  className={[
                    'template-tool-card',

                    isSelected
                      ? 'template-tool-card--selected'
                      : '',
                  ]
                    .filter(
                      Boolean,
                    )
                    .join(
                      ' ',
                    )}
                  aria-pressed={
                    isSelected
                  }
                  onClick={() =>
                    handleToggleTool(
                      tool.id,
                    )
                  }
                >
                  <span
                    className="template-tool-card__icon"
                    aria-hidden="true"
                  >
                    <AppIcon
                      name={
                        tool.icon
                      }
                      size={
                        22
                      }
                      strokeWidth={
                        1.8
                      }
                    />
                  </span>


                  <span className="template-tool-card__content">
                    <strong>
                      {
                        tool.name
                      }
                    </strong>

                    <small>
                      {
                        tool.description
                      }
                    </small>
                  </span>


                  <span
                    className="template-tool-card__check"
                    aria-hidden="true"
                  >
                    {isSelected
                      ? '✓'
                      : ''}
                  </span>
                </button>
              )
            },
          )}
        </div>


        {/* ===============================================
            COMPLETE STATE
            =============================================== */}

        {controller.preparationReady && (
          <section className="template-preparation-ready">
            <span className="template-preparation-ready__icon">
              <AppIcon
                name="flask"
                size={20}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <strong>
                Thiết bị đã sẵn sàng
              </strong>

              <p>
                Bạn có thể chuyển sang bước
                Thực hành. Các lựa chọn này
                vẫn được giữ trong phiên thí nghiệm.
              </p>
            </div>
          </section>
        )}


        {/* ===============================================
            PHASE ACTIONS
            =============================================== */}

        <div className="template-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={
              navigation.previous
            }
          >
            Bước trước
          </button>


          {!controller.preparationReady ? (
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={
                handleVerify
              }
            >
              Xác nhận thiết bị
            </button>
          ) : (
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={
                handleContinue
              }
            >
              Sẵn sàng thực hành
            </button>
          )}
        </div>
      </div>
    </div>
  )
}