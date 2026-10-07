import {
  Outlet,
  useLocation,
} from 'react-router'

import ExperimentRuntimeHost from '../../core/ExperimentRuntimeHost'
import ExperimentShell from '../../core/ExperimentShell'
import ExperimentViewShell from '../../core/ExperimentViewShell'

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

import Experiment from './legacy/Experiment'

import {
  forcedResonanceMeta,
  forcedResonancePhases,
} from './model/data'

import 'katex/dist/katex.min.css'
import './styles.css'


export default function ForcedResonanceSessionLayout() {
  const location =
    useLocation()

  const activePhase =
    getExperimentPhaseFromPathname(
      location.pathname,
    ) ??
    initialExperimentPhase

  const navigation =
    useExperimentNavigation(
      forcedResonanceMeta.slug,
      activePhase,
    )

  const isPractice =
    activePhase ===
    'practice'


  return (
    <ForcedResonanceSessionContext.Provider
      value={{
        navigation,
      }}
    >
      <ExperimentShell
        meta={
          forcedResonanceMeta
        }
      >
        <ExperimentViewShell
          experimentSlug={
            forcedResonanceMeta.slug
          }
          phases={
            forcedResonancePhases
          }
          activePhase={
            activePhase
          }
          ariaLabel="Điều hướng thí nghiệm dao động cưỡng bức và cộng hưởng"
          isPractice={
            isPractice
          }
          persistentRuntime={
            <ExperimentRuntimeHost
              active={
                isPractice
              }
            >
              <div className="forced-resonance-runtime">
                <Experiment
                  onPrev={
                    navigation.previous
                  }
                  onNext={
                    navigation.next
                  }
                />
              </div>
            </ExperimentRuntimeHost>
          }
        >
          <Outlet />
        </ExperimentViewShell>
      </ExperimentShell>
    </ForcedResonanceSessionContext.Provider>
  )
}
