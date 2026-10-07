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
  DampedOscillationSessionContext,
} from './context'

import Experiment from './legacy/Experiment'

import {
  dampedOscillationMeta,
  dampedOscillationPhases,
} from './model/data'

import 'katex/dist/katex.min.css'
import './styles.css'


export default function DampedOscillationSessionLayout() {
  const location =
    useLocation()

  const activePhase =
    getExperimentPhaseFromPathname(
      location.pathname,
    ) ??
    initialExperimentPhase

  const navigation =
    useExperimentNavigation(
      dampedOscillationMeta.slug,
      activePhase,
    )

  const isPractice =
    activePhase ===
    'practice'


  return (
    <DampedOscillationSessionContext.Provider
      value={{
        navigation,
      }}
    >
      <ExperimentShell
        meta={
          dampedOscillationMeta
        }
      >
        <ExperimentViewShell
          experimentSlug={
            dampedOscillationMeta.slug
          }
          phases={
            dampedOscillationPhases
          }
          activePhase={
            activePhase
          }
          ariaLabel="Điều hướng thí nghiệm dao động tắt dần"
          isPractice={
            isPractice
          }
          persistentRuntime={
            <ExperimentRuntimeHost
              active={
                isPractice
              }
            >
              <div className="damped-oscillation-runtime">
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
    </DampedOscillationSessionContext.Provider>
  )
}