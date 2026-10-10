import {
  useState,
} from 'react'

import AppIcon from '../../../../components/ui/AppIcon'

import ExperimentToast from '../../../core/ExperimentToast'

import {
  useTemplateSession,
} from '../context'

import {
  templateRuntimeConfig,
} from '../model/data'

const TARGET_MEASUREMENT_COUNT =
  templateRuntimeConfig.targetMeasurementCount


type PracticeFeedback =
  | {
      tone:
        'success' |
        'error' |
        'info'

      message:
        string
    }
  | null


export default function PracticePage() {
  const {
    controller,
    navigation,
  } =
    useTemplateSession()


  const [
    showInstructions,
    setShowInstructions,
  ] =
    useState(
      true,
    )


  const [
    showMeasurements,
    setShowMeasurements,
  ] =
    useState(
      true,
    )


  const [
    feedback,
    setFeedback,
  ] =
    useState<
      PracticeFeedback
    >(
      null,
    )


  const measurementComplete =
    controller.measurementCount >=
    TARGET_MEASUREMENT_COUNT


  const measurementProgress =
    Math.min(
      controller.measurementCount /
        TARGET_MEASUREMENT_COUNT,
      1,
    )


  function handleRecordMeasurement() {
    if (
      measurementComplete
    ) {
      setFeedback({
        tone:
          'info',

        message:
          'Đã thu thập đủ số lần đo cho phiên thực hành mẫu.',
      })

      return
    }


    controller.recordMeasurement()


    const nextCount =
      controller.measurementCount +
      1


    setFeedback({
      tone:
        'success',

      message:
        `Đã ghi số liệu lần ${nextCount}/${TARGET_MEASUREMENT_COUNT}.`,
    })
  }


  function handleClearMeasurements() {
    if (
      controller.measurementCount ===
      0
    ) {
      setFeedback({
        tone:
          'info',

        message:
          'Chưa có số liệu để xóa.',
      })

      return
    }


    controller.clearMeasurements()


    setFeedback({
      tone:
        'success',

      message:
        'Đã xóa toàn bộ số liệu của phiên thực hành.',
    })
  }


  function handleContinue() {
    if (
      !measurementComplete
    ) {
      setFeedback({
        tone:
          'error',

        message:
          `Hãy hoàn thành đủ ${TARGET_MEASUREMENT_COUNT} lần đo trước khi chuyển sang Kết luận.`,
      })

      return
    }


    navigation.next()
  }


  return (
    <div className="template-practice">
      {/* ===================================================
          FEEDBACK TOAST
          =================================================== */}

      {feedback && (
        <ExperimentToast
          className="template-practice__feedback"
          tone={
            feedback.tone
          }
          message={
            feedback.message
          }
        />
      )}


      {/* ===================================================
          COMPACT STATUS BAR

          Giống status strip trong Joule:
          thông tin phiên luôn nhìn thấy nhưng
          không chiếm nhiều diện tích.
          =================================================== */}

      <div
        className="template-practice-status"
        aria-label="Trạng thái phiên thực hành"
      >
        <span>
          Phiên
          <strong>
            {' '}
            đang hoạt động
          </strong>
        </span>

        <span
          aria-hidden="true"
          className="template-practice-status__separator"
        >
          ·
        </span>

        <span>
          {
            controller.measurementCount
          }
          /
          {
            TARGET_MEASUREMENT_COUNT
          }
          {' '}
          lần đo
        </span>

        <span
          aria-hidden="true"
          className="template-practice-status__separator"
        >
          ·
        </span>

        <strong
          className={[
            'template-practice-status__state',

            measurementComplete
              ? 'template-practice-status__state--complete'
              : '',
          ]
            .filter(
              Boolean,
            )
            .join(
              ' ',
            )}
        >
          {measurementComplete
            ? 'Đã đủ dữ liệu'
            : 'Sẵn sàng đo'}
        </strong>
      </div>


      {/* ===================================================
          INSTRUCTION PANEL
          =================================================== */}

      {showInstructions && (
        <aside className="template-practice-panel template-practice-panel--instructions">
          <div className="template-practice-panel__header">
            <div>
              <span className="template-practice-panel__eyebrow">
                Hướng dẫn
              </span>

              <h3>
                Thực hiện phiên đo
              </h3>
            </div>


            <button
              type="button"
              className="template-practice-panel__close"
              aria-label="Đóng hướng dẫn"
              onClick={() =>
                setShowInstructions(
                  false,
                )
              }
            >
              <AppIcon
                name="close"
                size={17}
                strokeWidth={1.8}
              />
            </button>
          </div>


          <ol className="template-practice__instructions">
            <li>
              <strong>
                1.
              </strong>

              <span>
                Quan sát runtime mô phỏng ở vùng trung tâm.
              </span>
            </li>

            <li>
              <strong>
                2.
              </strong>

              <span>
                Thực hiện tương tác cần thiết với mô hình.
              </span>
            </li>

            <li>
              <strong>
                3.
              </strong>

              <span>
                Ghi lại dữ liệu khi hệ đạt trạng thái phù hợp.
              </span>
            </li>

            <li>
              <strong>
                4.
              </strong>

              <span>
                Hoàn thành đủ ba lần đo trước khi rút ra kết luận.
              </span>
            </li>
          </ol>
        </aside>
      )}


      {/* ===================================================
          MEASUREMENT PANEL
          =================================================== */}

      {showMeasurements && (
        <aside className="template-practice-panel template-practice-panel--measurements">
          <div className="template-practice-panel__header">
            <div>
              <span className="template-practice-panel__eyebrow">
                Thu thập số liệu
              </span>

              <h3>
                Bảng đo
              </h3>
            </div>


            <div className="template-practice-panel__header-actions">
              <strong className="template-practice-measurement__count">
                {
                  controller.measurementCount
                }
                {' / '}
                {
                  TARGET_MEASUREMENT_COUNT
                }
              </strong>


              <button
                type="button"
                className="template-practice-panel__close"
                aria-label="Đóng bảng đo"
                onClick={() =>
                  setShowMeasurements(
                    false,
                  )
                }
              >
                <AppIcon
                  name="close"
                  size={17}
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </div>


          {/* =============================================
              PROGRESS
              ============================================= */}

          <div
            className="template-practice-measurement__progress"
            aria-label={
              `Đã hoàn thành ${controller.measurementCount} trên ${TARGET_MEASUREMENT_COUNT} lần đo`
            }
          >
            <span
              style={{
                transform:
                  `scaleX(${measurementProgress})`,
              }}
            />
          </div>


          {/* =============================================
              LIVE TELEMETRY

              Template chưa có physics thật.
              Đây chỉ thể hiện đúng contract UI.
              ============================================= */}

          <div className="template-practice-live-data">
            <div className="template-practice-live-data__item">
              <span>
                Runtime
              </span>

              <strong>
                Hoạt động
              </strong>
            </div>


            <div className="template-practice-live-data__item">
              <span>
                Session state
              </span>

              <strong>
                Đang lưu
              </strong>
            </div>


            <div className="template-practice-live-data__item">
              <span>
                Trạng thái đo
              </span>

              <strong
                className={
                  measurementComplete
                    ? 'template-practice-live-data__complete'
                    : 'template-practice-live-data__ready'
                }
              >
                {measurementComplete
                  ? 'Hoàn tất'
                  : 'Sẵn sàng'}
              </strong>
            </div>
          </div>


          {/* =============================================
              ACTIONS
              ============================================= */}

          <div className="template-practice-measurement__actions">
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              disabled={
                measurementComplete
              }
              onClick={
                handleRecordMeasurement
              }
            >
              Ghi số liệu
            </button>


            <button
              type="button"
              className="experiment-lab-button"
              onClick={
                handleClearMeasurements
              }
            >
              Xóa số liệu
            </button>
          </div>


          {/* =============================================
              MEASUREMENT TABLE
              ============================================= */}

          <div className="template-practice-measurement__table-wrap">
            <table className="template-practice-measurement-table">
              <thead>
                <tr>
                  <th scope="col">
                    Lần
                  </th>

                  <th scope="col">
                    Trạng thái
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.from({
                  length:
                    TARGET_MEASUREMENT_COUNT,
                }).map(
                  (
                    _,
                    index,
                  ) => {
                    const recorded =
                      index <
                      controller.measurementCount


                    return (
                      <tr
                        key={
                          index
                        }
                      >
                        <th scope="row">
                          {
                            index +
                            1
                          }
                        </th>

                        <td>
                          {recorded
                            ? 'Đã ghi'
                            : '—'}
                        </td>
                      </tr>
                    )
                  },
                )}
              </tbody>
            </table>
          </div>


          {/* =============================================
              COMPLETE STATE
              ============================================= */}

          {measurementComplete && (
            <div className="template-practice-complete">
              <div className="template-practice-complete__status">
                <span
                  className="template-practice-complete__icon"
                  aria-hidden="true"
                >
                  <AppIcon
                    name="activity"
                    size={18}
                    strokeWidth={2}
                  />
                </span>

                <div>
                  <strong>
                    Đã hoàn thành thu thập
                  </strong>

                  <span>
                    Dữ liệu của phiên đã sẵn sàng
                    cho bước phân tích.
                  </span>
                </div>
              </div>


              <button
                type="button"
                className="experiment-lab-button experiment-lab-button--primary"
                onClick={
                  handleContinue
                }
              >
                Sang Kết luận
              </button>
            </div>
          )}
        </aside>
      )}


      {/* ===================================================
          TOOL RAIL

          Lab-new không buộc mọi panel phải luôn mở.

          Thanh này cho phép:
          - gọi lại hướng dẫn
          - gọi lại bảng đo
          - quay về Preparation
          - sang Conclusion
          =================================================== */}

      <div
        className="template-practice-toolbar"
        aria-label="Công cụ thực hành"
      >
        <button
          type="button"
          className={[
            'template-practice-tool',

            showInstructions
              ? 'template-practice-tool--active'
              : '',
          ]
            .filter(
              Boolean,
            )
            .join(
              ' ',
            )}
          aria-pressed={
            showInstructions
          }
          onClick={() =>
            setShowInstructions(
              (current) =>
                !current,
            )
          }
        >
          <AppIcon
            name="book-open"
            size={18}
            strokeWidth={1.8}
          />

          <span>
            Hướng dẫn
          </span>
        </button>


        <button
          type="button"
          className={[
            'template-practice-tool',

            showMeasurements
              ? 'template-practice-tool--active'
              : '',
          ]
            .filter(
              Boolean,
            )
            .join(
              ' ',
            )}
          aria-pressed={
            showMeasurements
          }
          onClick={() =>
            setShowMeasurements(
              (current) =>
                !current,
            )
          }
        >
          <AppIcon
            name="gauge"
            size={18}
            strokeWidth={1.8}
          />

          <span>
            Số liệu
          </span>
        </button>


        <span className="template-practice-toolbar__divider" />


        <button
          type="button"
          className="template-practice-tool"
          onClick={
            navigation.previous
          }
        >
          <AppIcon
            name="chevron-right"
            size={18}
            strokeWidth={1.8}
            className="rotate-180"
          />

          <span>
            Chuẩn bị
          </span>
        </button>


        <button
          type="button"
          className={[
            'template-practice-tool',
            'template-practice-tool--continue',

            measurementComplete
              ? 'template-practice-tool--ready'
              : '',
          ]
            .filter(
              Boolean,
            )
            .join(
              ' ',
            )}
          onClick={
            handleContinue
          }
        >
          <span>
            Kết luận
          </span>

          <AppIcon
            name="chevron-right"
            size={18}
            strokeWidth={1.8}
          />
        </button>
      </div>
    </div>
  )
}