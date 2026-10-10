
import { Navigate } from 'react-router'
import type { RouteObject } from 'react-router'

import { experimentModules } from './registry'


const moduleRoutes: RouteObject[] =
  experimentModules.flatMap(
    (module) => module.routes,
  )


const experimentRoutes: RouteObject[] = [
  {
    path: 'lab',

    children: [
      {
        index: true,
        element: <Navigate to="/" replace />,
      },

      ...moduleRoutes,
    ],
  },
]


export default experimentRoutes
