import {
  Navigate,
} from 'react-router'

import type {
  RouteObject,
} from 'react-router'

import templateRoutes from './modules/_template/routes'


/*
 * =========================================================
 * EXPERIMENT SUBSYSTEM
 * =========================================================
 *
 * Global app router chỉ mount subsystem /lab.
 *
 * Mỗi experiment sở hữu route tree riêng
 * trong folder module của chính nó.
 * =========================================================
 */

const moduleRoutes:
  RouteObject[] =
  [
    ...templateRoutes,
  ]


const experimentRoutes:
  RouteObject[] =
  [
    {
      path:
        'lab',

      children: [
        {
          index:
            true,

          element: (
            <Navigate
              to="/"
              replace
            />
          ),
        },

        ...moduleRoutes,
      ],
    },
  ]


export default experimentRoutes