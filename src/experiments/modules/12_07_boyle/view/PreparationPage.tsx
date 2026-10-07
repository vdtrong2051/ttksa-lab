import {
  useState,
} from 'react'

import AppIcon from '../../../../components/ui/AppIcon'

import {
  useBoyleSession,
} from '../context'

import {
  boylePreparationTools,
} from '../model/data'


const ERROR_MESSAGE =
  'Lựa chọn chưa chính xác. Chỉ chọn bộ thí nghiệm Boyle, giá đỡ kim loại và ngàm kẹp.'


export default function PreparationPage() {
  const {
    controller,
    navigation,
  } = useBoyleSession()

  const [errorMessage, setErrorMessage] =
    useState('')


  function handleToggle(
    toolId:
      (typeof boylePreparationTools)[number]['id'],
  ) {
    setErrorMessage('')
    controller.togglePreparationTool(
      toolId,
    )
  }


  function handleVerify() {
    if (
      !controller.isPreparationComplete
    ) {
      setErrorMessage(
        ERROR_MESSAGE,
      )
      return
    }

    setErrorMessage('')
    navigation.next()
  }


  return (
    <section className="boyle-content-phase boyle-preparation">
      <div className="boyle-content-phase__inner">
        <span className="boyle-content-phase__badge">
          Phần 2 · Chuẩn bị dụng cụ
        </span>

        <header className="boyle-content-phase__heading">
          <h2>
            Kho thiết bị vật lý
          </h2>
          <p>
            Chọn đúng ba dụng cụ cần thiết. Các thiết bị không liên quan được giữ lại như phương án gây nhiễu của bài gốc.
          </p>
        </header>

        {errorMessage && (
          <div
            className="boyle-preparation__feedback"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        <div className="boyle-tool-grid">
          {boylePreparationTools.map(
            (tool) => {
              const selected =
                controller.preparation.selectedToolIds.includes(
                  tool.id,
                )

              return (
                <button
                  key={tool.id}
                  type="button"
                  className={[
                    'boyle-tool-card',
                    selected
                      ? 'boyle-tool-card--selected'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() =>
                    handleToggle(
                      tool.id,
                    )
                  }
                >
                  <span className="boyle-tool-card__icon">
                    <AppIcon
                      name={tool.icon}
                      size={26}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="boyle-tool-card__copy">
                    <strong>
                      {tool.name}
                    </strong>
                    <small>
                      {tool.description}
                    </small>
                  </span>

                  <span
                    className="boyle-tool-card__check"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                </button>
              )
            },
          )}
        </div>

        <div className="boyle-preparation__status">
          <span>
            Đã chọn
          </span>
          <strong>
            {controller.preparation.selectedToolIds.length}
            {' / 3 dụng cụ đúng'}
          </strong>
        </div>

        <div className="boyle-phase-actions">
          <button
            type="button"
            className="experiment-lab-button"
            onClick={
              navigation.previous
            }
          >
            Bước trước
          </button>

          <button
            type="button"
            className="experiment-lab-button experiment-lab-button--primary"
            onClick={
              handleVerify
            }
          >
            Xác nhận thiết bị
          </button>
        </div>
      </div>
    </section>
  )
}
