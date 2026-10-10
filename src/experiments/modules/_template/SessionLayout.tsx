import {
  Outlet,
} from 'react-router'

import ExperimentRuntimeHost from '../../core/ExperimentRuntimeHost'
import ExperimentShell from '../../core/ExperimentShell'
import ExperimentViewShell from '../../core/ExperimentViewShell'

import {
  useExperimentSessionRoute,
} from '../../core/navigation'

import TemplateRuntimeDemo from './components/TemplateRuntimeDemo'

import {
  TemplateSessionContext,
} from './context'

import {
  useTemplateController,
} from './controller/useTemplateController'

import {
  templateMeta,
  templatePhases,
} from './model/data'

import './styles.css'

export default function TemplateSessionLayout() {
  /*
   * Controller được tạo tại SessionLayout.
   *
   * Child route đổi nhưng SessionLayout
   * vẫn mount => state controller còn nguyên.
   */
  const {
    activePhase,
    isPractice,
    navigation,
  } = useExperimentSessionRoute(templateMeta.slug)

  const controller = useTemplateController()

  return (
    <TemplateSessionContext.Provider
      value={{
        controller,
        navigation,
      }}
    >
      <ExperimentShell
        meta={
          templateMeta
        }
        backTo="/"
      >
        <ExperimentViewShell
          experimentSlug={
            templateMeta.slug
          }
          phases={
            templatePhases
          }
          activePhase={
            activePhase
          }
          ariaLabel="Điều hướng module mẫu"
          isPractice={
            isPractice
          }
          utilityActions={
            <button
              type="button"
              className="experiment-lab-button"
              onClick={
                controller.resetSession
              }
            >
              Đặt lại 
            </button>
          }
          persistentRuntime={
            <ExperimentRuntimeHost
              active={
                isPractice
              }
            >
              <TemplateRuntimeDemo />
            </ExperimentRuntimeHost>
          }
        >
          <Outlet />
        </ExperimentViewShell>
      </ExperimentShell>
    </TemplateSessionContext.Provider>
  )
}