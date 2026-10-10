import {
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
  HarmonicMotionSessionContext,
} from './context'

import Experiment from './legacy/Experiment'

import {
  harmonicMotionMeta,
  harmonicMotionPhases,
} from './model/data'

import './styles.css'


export default function HarmonicMotionSessionLayout() {
  const {
    activePhase,
    isPractice,
    navigation,
  } = useExperimentSessionRoute(
    harmonicMotionMeta.slug,
  )

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
