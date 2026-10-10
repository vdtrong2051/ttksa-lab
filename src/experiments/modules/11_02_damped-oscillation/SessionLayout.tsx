import {
  Outlet,
} from 'react-router'

import ExperimentRuntimeHost from '../../core/ExperimentRuntimeHost'
import ExperimentShell from '../../core/ExperimentShell'
import ExperimentViewShell from '../../core/ExperimentViewShell'

import {
  useExperimentSessionRoute,
} from '../../core/navigation'

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
  const {
    activePhase,
    isPractice,
    navigation,
  } = useExperimentSessionRoute(
    dampedOscillationMeta.slug,
  )

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