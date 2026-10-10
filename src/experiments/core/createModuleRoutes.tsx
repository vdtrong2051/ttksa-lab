
import type { ComponentType } from 'react'

import { Navigate } from 'react-router'
import type { RouteObject } from 'react-router'

import {
  experimentPhaseOrder,
  getExperimentEntryPath,
} from './routing'

import type {
  ExperimentPhaseId,
} from './types'


type LazyComponentLoader =
  () => Promise<ComponentType>


interface ModuleRoutesConfig {
  slug: string

  sessionLayout: LazyComponentLoader

  pages: Record<
    ExperimentPhaseId,
    LazyComponentLoader
  >
}


export function createModuleRoutes({
  slug,
  sessionLayout,
  pages,
}: ModuleRoutesConfig): RouteObject[] {
  const entryPath =
    getExperimentEntryPath(slug)

  const phaseRoutes: RouteObject[] =
    experimentPhaseOrder.map(
      (phase) => ({
        path: phase,

        lazy: {
          Component: pages[phase],
        },
      }),
    )

  return [
    {
      path: slug,

      lazy: {
        Component: sessionLayout,
      },

      children: [
        {
          index: true,
          element: (
            <Navigate
              to={entryPath}
              replace
            />
          ),
        },

        ...phaseRoutes,

        {
          path: '*',
          element: (
            <Navigate
              to={entryPath}
              replace
            />
          ),
        },
      ],
    },
  ]
}
