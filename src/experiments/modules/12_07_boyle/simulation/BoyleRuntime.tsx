import ExperimentWorkspace from '../../../core/ExperimentWorkspace'

import {
  useBoyleSession,
} from '../context'

import BoyleSimulation from './BoyleSimulation'


export default function BoyleRuntime() {
  const {
    controller,
    runtimeUi,
  } = useBoyleSession()

  return (
    <ExperimentWorkspace
      className="boyle-runtime"
      expanded={
        runtimeUi.workspaceExpanded
      }
      simulation={
        <BoyleSimulation
          volume={
            controller.runtime.volume
          }
          thermalCondition={
            controller.runtime
              .thermalCondition
          }
          showParticles={
            runtimeUi.showParticles
          }
          orbitEnabled={
            runtimeUi.orbitEnabled
          }
          firePulse={
            runtimeUi.firePulse
          }
          onVolumeChange={
            controller.setVolume
          }
          onThermalConditionChange={
            controller.setThermalCondition
          }
          onTemperatureChange={
            runtimeUi.setTemperatureC
          }
          onReady={() =>
            runtimeUi.setReady(
              true,
            )
          }
        />
      }
    />
  )
}
