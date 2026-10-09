import {
  Navigate,
} from 'react-router'

import type {
  RouteObject,
} from 'react-router'

import templateRoutes from './modules/_template/routes'
import boyleRoutes from './modules/12_07_boyle/routes'
// import brownianRoutes from './modules/12_01_brownian/routes'
// import internalEnergyRoutes from './modules/12_02_internal-energy/routes'
import harmonicMotionRoutes from './modules/11_01_harmonic-motion/routes'
import dampedOscillationRoutes from './modules/11_02_damped-oscillation/routes'
import forcedResonanceRoutes from './modules/11_03_forced-resonance/routes'
import seismographRoutes from './modules/11_04_seismograph/routes'

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
    ...boyleRoutes,
    // ...brownianRoutes,
    // ...internalEnergyRoutes,
    ...harmonicMotionRoutes,
    ...dampedOscillationRoutes,
    ...forcedResonanceRoutes,
    ...seismographRoutes,
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