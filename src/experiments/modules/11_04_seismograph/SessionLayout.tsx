
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

import ExperimentShell from '../../core/ExperimentShell'
import ExperimentViewShell from '../../core/ExperimentViewShell'
import ExperimentRuntimeHost from '../../core/ExperimentRuntimeHost'
import SimulationErrorBoundary from '../../core/SimulationErrorBoundary'

import {
  useExperimentSessionRoute,
} from '../../core/navigation'

import {
  SeismographSessionContext,
} from './context'

import {
  seismographMeta,
  seismographPhases,
} from './model/data'

import {
  useSeismographController,
} from './simulation/useSeismographController'

import './styles.css'


const SeismographRuntime = lazy(
  () => import('./simulation/SeismographRuntime'),
)


export default function SeismographSessionLayout() {
  const {
    activePhase,
    isPractice,
    navigation,
  } = useExperimentSessionRoute(
    seismographMeta.slug,
  )

  const controller =
    useSeismographController(isPractice)

  // Intro: chưa khởi tạo WebGL.
  // Preparation: warm-up sau 180ms.
  // Khi đã mount: luôn giữ Canvas.
  const [runtimeMounted, setRuntimeMounted] =
    useState(() => isPractice)

  useEffect(() => {
    if (runtimeMounted) return

    if (
      activePhase !== 'preparation' &&
      activePhase !== 'practice'
    ) {
      return
    }

    const timer = window.setTimeout(
      () => setRuntimeMounted(true),
      activePhase === 'preparation' ? 180 : 0,
    )

    return () => window.clearTimeout(timer)
  }, [activePhase, runtimeMounted])

  return (
    <SeismographSessionContext.Provider
      value={{
        navigation,
        controller,
      }}
    >
      <ExperimentShell meta={seismographMeta}>
        <ExperimentViewShell
          experimentSlug={seismographMeta.slug}
          phases={seismographPhases}
          activePhase={activePhase}
          ariaLabel="Điều hướng thí nghiệm máy đo địa chấn"
          isPractice={isPractice}
          persistentRuntime={
            <ExperimentRuntimeHost
              mounted={runtimeMounted}
              active={isPractice}
            >
              <SimulationErrorBoundary>
                <Suspense
                  fallback={
                    <div
                      className="experiment-loading"
                      role="status"
                    >
                      Đang chuẩn bị máy đo địa chấn 3D...
                    </div>
                  }
                >
                  <SeismographRuntime
                    controller={controller}
                  />
                </Suspense>
              </SimulationErrorBoundary>
            </ExperimentRuntimeHost>
          }
        >
          <Outlet />
        </ExperimentViewShell>
      </ExperimentShell>
    </SeismographSessionContext.Provider>
  )
}
