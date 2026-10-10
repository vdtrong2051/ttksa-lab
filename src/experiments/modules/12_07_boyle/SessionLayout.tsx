import {
  useEffect,
  useState,
} from 'react'

import {
  Outlet,
} from 'react-router'

import ExperimentRuntimeHost from '../../core/ExperimentRuntimeHost'
import ExperimentShell from '../../core/ExperimentShell'
import ExperimentViewShell from '../../core/ExperimentViewShell'
import SimulationErrorBoundary from '../../core/SimulationErrorBoundary'

import {
  useExperimentSessionRoute,
} from '../../core/navigation'

import {
  BoyleSessionContext,
} from './context'

import {
  useBoyleController,
} from './controller/useBoyleController'

import {
  boyleMeta,
  boylePhases,
} from './model/data'

import {
  boylePhysicsConfig,
} from './model/constants'

import BoyleRuntime from './simulation/BoyleRuntime'

import './styles.css'


export default function BoyleSessionLayout() {
  const {
    activePhase,
    isPractice,
    navigation,
  } = useExperimentSessionRoute(boyleMeta.slug)

  const controller = useBoyleController()

  const [runtimeMounted, setRuntimeMounted] =
    useState(
      () =>
        activePhase ===
        'practice',
    )

  const [runtimeReady, setRuntimeReady] =
    useState(false)

  const [temperatureC, setTemperatureC] =
    useState<number>(
      boylePhysicsConfig
        .ambientTemperatureC,
    )

  const [showParticles, setShowParticles] =
    useState(false)

  const [orbitEnabled, setOrbitEnabled] =
    useState(true)

  const [firePulse, setFirePulse] =
    useState(0)

  const [workspaceExpanded, setWorkspaceExpanded] =
    useState(false)


  useEffect(() => {
    if (runtimeMounted) {
      return
    }

    if (
      activePhase !==
        'preparation' &&
      activePhase !==
        'practice'
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
          setRuntimeMounted(true)
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


  useEffect(() => {
    if (!workspaceExpanded) {
      return
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === 'Escape') {
        setWorkspaceExpanded(false)
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [workspaceExpanded])


  function resetUi() {
    setTemperatureC(
      boylePhysicsConfig
        .ambientTemperatureC,
    )
    setShowParticles(false)
    setOrbitEnabled(true)
    setFirePulse(0)
    setWorkspaceExpanded(false)
  }


  function resetSession() {
    controller.resetSession()
    resetUi()
  }


  return (
    <BoyleSessionContext.Provider
      value={{
        controller,
        navigation,
        runtimeUi: {
          mounted:
            runtimeMounted,
          ready:
            runtimeReady,
          temperatureC,
          showParticles,
          orbitEnabled,
          firePulse,
          workspaceExpanded,

          setReady:
            setRuntimeReady,
          setTemperatureC,

          toggleParticles:
            () =>
              setShowParticles(
                (value) =>
                  !value,
              ),

          toggleOrbit:
            () =>
              setOrbitEnabled(
                (value) =>
                  !value,
              ),

          triggerFirePulse:
            () =>
              setFirePulse(
                (value) =>
                  value + 1,
              ),

          toggleWorkspaceExpanded:
            () =>
              setWorkspaceExpanded(
                (value) =>
                  !value,
              ),

          resetUi,
        },
      }}
    >
      <ExperimentShell
        meta={boyleMeta}
      >
        <ExperimentViewShell
          experimentSlug={
            boyleMeta.slug
          }
          phases={boylePhases}
          activePhase={
            activePhase
          }
          ariaLabel="Điều hướng thí nghiệm Boyle-Mariotte"
          isPractice={
            isPractice
          }
          workspaceExpanded={
            workspaceExpanded
          }
          utilityActions={
            <button
              type="button"
              className="experiment-lab-button"
              onClick={
                resetSession
              }
            >
              Đặt lại
            </button>
          }
          persistentRuntime={
            <ExperimentRuntimeHost
              mounted={
                runtimeMounted
              }
              active={
                isPractice
              }
            >
              <SimulationErrorBoundary>
                <BoyleRuntime />
              </SimulationErrorBoundary>
            </ExperimentRuntimeHost>
          }
        >
          <Outlet />
        </ExperimentViewShell>
      </ExperimentShell>
    </BoyleSessionContext.Provider>
  )
}
