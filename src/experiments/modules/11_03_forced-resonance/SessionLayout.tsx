
import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react'

import {
  Outlet,
} from 'react-router'

import 'katex/dist/katex.min.css'

import ExperimentRuntimeHost from '../../core/ExperimentRuntimeHost'
import ExperimentShell from '../../core/ExperimentShell'
import ExperimentViewShell from '../../core/ExperimentViewShell'
import SimulationErrorBoundary from '../../core/SimulationErrorBoundary'

import {
  useExperimentSessionRoute,
} from '../../core/navigation'

import {
  ForcedResonanceSessionContext,
} from './context'

import {
  forcedResonanceMeta,
  forcedResonancePhases,
} from './model/data'

import {
  useResonanceController,
} from './simulation/useResonanceController'

import './styles.css'


// Không tải module WebGL cho tới lúc runtime
// thực sự được React mount.
const ForcedResonanceRuntime = lazy(
  () =>
    import(
      './simulation/ForcedResonanceRuntime'
    ),
)


export default function ForcedResonanceSessionLayout() {
  const {
    activePhase,
    isPractice,
    navigation,
  } = useExperimentSessionRoute(
    forcedResonanceMeta.slug,
  )

  /*
   * Controller sống trong SessionLayout.
   * Đổi phase không tạo lại controller.
   */
  const controller =
    useResonanceController(isPractice)

  /*
   * LAZY MOUNT
   *
   * Intro: không khởi tạo runtime.
   * Preparation: warm-up sau 180ms.
   * Practice: mount ngay nếu mở trực tiếp.
   *
   * KEEP-ALIVE
   *
   * Khi đã mount, không trả lại false.
   */
  const [
    runtimeMounted,
    setRuntimeMounted,
  ] = useState(
    () => activePhase === 'practice',
  )

  useEffect(() => {
    if (runtimeMounted) {
      return
    }

    if (
      activePhase !== 'preparation' &&
      activePhase !== 'practice'
    ) {
      return
    }

    const delay =
      activePhase === 'preparation'
        ? 180
        : 0

    const timer = window.setTimeout(
      () => {
        setRuntimeMounted(true)
      },
      delay,
    )

    return () => {
      window.clearTimeout(timer)
    }
  }, [activePhase, runtimeMounted])

  return (
    <ForcedResonanceSessionContext.Provider
      value={{
        navigation,
        controller,
      }}
    >
      <ExperimentShell
        meta={forcedResonanceMeta}
      >
        <ExperimentViewShell
          experimentSlug={
            forcedResonanceMeta.slug
          }
          phases={forcedResonancePhases}
          activePhase={activePhase}
          ariaLabel="Điều hướng thí nghiệm dao động cưỡng bức và cộng hưởng"
          isPractice={isPractice}
          persistentRuntime={
            <ExperimentRuntimeHost
              mounted={runtimeMounted}
              active={isPractice}
            >
              <SimulationErrorBoundary>
                <div className="forced-resonance-runtime">
                  <Suspense
                    fallback={
                      <div
                        className="experiment-loading"
                        role="status"
                      >
                        Đang chuẩn bị mô phỏng 3D...
                      </div>
                    }
                  >
                    <ForcedResonanceRuntime
                      controller={controller}
                    />
                  </Suspense>
                </div>
              </SimulationErrorBoundary>
            </ExperimentRuntimeHost>
          }
        >
          <Outlet />
        </ExperimentViewShell>
      </ExperimentShell>
    </ForcedResonanceSessionContext.Provider>
  )
}
