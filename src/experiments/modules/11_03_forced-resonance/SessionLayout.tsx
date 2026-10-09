
import {
  Outlet,
  useLocation,
} from 'react-router'

import 'katex/dist/katex.min.css'

import ExperimentRuntimeHost from '../../core/ExperimentRuntimeHost'
import ExperimentShell from '../../core/ExperimentShell'
import ExperimentViewShell from '../../core/ExperimentViewShell'
import SimulationErrorBoundary from '../../core/SimulationErrorBoundary'

import {
  useExperimentNavigation,
} from '../../core/navigation'

import {
  getExperimentPhaseFromPathname,
  initialExperimentPhase,
} from '../../core/routing'

import {
  ForcedResonanceSessionContext,
} from './context'

import {
  forcedResonanceMeta,
  forcedResonancePhases,
} from './model/data'

import LegacyExperimentBridge from './simulation/LegacyExperimentBridge'

import './styles.css'


export default function ForcedResonanceSessionLayout() {
  const location = useLocation()

  // URL là nguồn xác định phase hiện tại.
  const activePhase =
    getExperimentPhaseFromPathname(
      location.pathname,
    ) ?? initialExperimentPhase

  const navigation =
    useExperimentNavigation(
      forcedResonanceMeta.slug,
      activePhase,
    )

  const isPractice =
    activePhase === 'practice'

  return (
    <ForcedResonanceSessionContext.Provider
      value={{
        navigation,
      }}
    >
      <ExperimentShell
        meta={forcedResonanceMeta}
      >
        <ExperimentViewShell
          experimentSlug={
            forcedResonanceMeta.slug
          }
          phases={
            forcedResonancePhases
          }
          activePhase={activePhase}
          ariaLabel="Điều hướng thí nghiệm dao động cưỡng bức và cộng hưởng"
          isPractice={isPractice}
          persistentRuntime={
            <SimulationErrorBoundary>
              <ExperimentRuntimeHost
                active={isPractice}
              >
                <div className="forced-resonance-runtime">
                  <LegacyExperimentBridge
                    onPrev={
                      navigation.previous
                    }
                    onNext={
                      navigation.next
                    }
                  />
                </div>
              </ExperimentRuntimeHost>
            </SimulationErrorBoundary>
          }
        >
          <Outlet />
        </ExperimentViewShell>
      </ExperimentShell>
    </ForcedResonanceSessionContext.Provider>
  )
}
