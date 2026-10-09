
import type {
  ExperimentPhaseId,
} from '../../../core/types'

import {
  useSeismographSession,
} from '../context'

import {
  seismographPhases,
} from '../model/data'


interface PhaseScaffoldProps {
  phase: ExperimentPhaseId
}


export default function PhaseScaffold({
  phase,
}: PhaseScaffoldProps) {
  const { navigation } =
    useSeismographSession()

  const definition =
    seismographPhases.find(
      (item) => item.id === phase,
    )

  if (!definition) return null

  const isPractice = phase === 'practice'

  return (
    <section
      className={[
        'seismograph-phase',
        isPractice
          ? 'seismograph-phase--practice'
          : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="seismograph-phase__card">
        <span className="seismograph-phase__badge">
          {definition.label}
        </span>

        <h2>{definition.title}</h2>

        <p>{definition.description}</p>

        <div className="seismograph-phase__notice">
          {isPractice
            ? 'Khung Thực hành đã sẵn sàng. Mô phỏng 3D và đồ thị sẽ được tích hợp ở Đợt 2.'
            : 'Điều hướng đã sẵn sàng. Nội dung từ ZIP sẽ được chuyển vào trang này ở Đợt 3.'}
        </div>

        <div className="seismograph-phase__actions">
          {navigation.canGoPrevious && (
            <button
              type="button"
              className="experiment-lab-button"
              onClick={navigation.previous}
            >
              Quay lại
            </button>
          )}

          {navigation.canGoNext && (
            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={navigation.next}
            >
              Sang bước tiếp theo
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
