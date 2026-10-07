import {
  useEffect,
  useState,
} from 'react'

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
  HarmonicMotionSessionContext,
} from './context'

import Experiment from './legacy/Experiment'

import {
  harmonicMotionMeta,
  harmonicMotionPhases,
} from './model/data'

import './styles.css'


export default function HarmonicMotionSessionLayout() {
  const location =
    useLocation()

  const activePhase =
    getExperimentPhaseFromPathname(
      location.pathname,
    ) ??
    initialExperimentPhase

  const navigation =
    useExperimentNavigation(
      harmonicMotionMeta.slug,
      activePhase,
    )

  const isPractice =
    activePhase ===
    'practice'

  const [
    runtimeMounted,
    setRuntimeMounted,
  ] =
    useState(
      () =>
        activePhase ===
        'practice',
    )


  useEffect(() => {
    if (
      runtimeMounted ||
      (
        activePhase !==
          'preparation' &&
        activePhase !==
          'practice'
      )
    ) {
      return
    }

    const delay =
      activePhase ===
      'preparation'
        ? 180
        : 0

    const timer =
      window.setTimeout(
        () => {
          setRuntimeMounted(
            true,
          )
        },
        delay,
      )

    return () => {
      window.clearTimeout(
        timer,
      )
    }
  }, [
    activePhase,
    runtimeMounted,
  ])


  return (
    <HarmonicMotionSessionContext.Provider
      value={{
        navigation,
      }}
    >
      <ExperimentShell
        meta={
          harmonicMotionMeta
        }
      >
        <ExperimentViewShell
          experimentSlug={
            harmonicMotionMeta.slug
          }
          phases={
            harmonicMotionPhases
          }
          activePhase={
            activePhase
          }
          ariaLabel="Điều hướng thí nghiệm dao động điều hòa"
          isPractice={
            isPractice
          }
          persistentRuntime={
            <SimulationErrorBoundary>
              <ExperimentRuntimeHost
                mounted={
                  runtimeMounted
                }
                active={
                  isPractice
                }
              >
                <div className="harmonic-motion-runtime">
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
            </SimulationErrorBoundary>
          }
        >
          <Outlet />
        </ExperimentViewShell>
      </ExperimentShell>
    </HarmonicMotionSessionContext.Provider>
  )
}
