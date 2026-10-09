
import Experiment from '../legacy/Experiment'

interface LegacyExperimentBridgeProps {
  onPrev: () => void
  onNext: () => void
}

/**
 * Cầu nối tạm thời giữa SessionLayout mới
 * và mô phỏng cũ.
 *
 * Chặng 1: giữ nguyên mô hình và hành vi cũ.
 * Chặng 2: thay bằng runtime tách scene/controller.
 */
export default function LegacyExperimentBridge({
  onPrev,
  onNext,
}: LegacyExperimentBridgeProps) {
  return (
    <Experiment
      onPrev={onPrev}
      onNext={onNext}
    />
  )
}
