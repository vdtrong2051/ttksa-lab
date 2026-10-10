
import type {
  ExperimentModuleRegistration,
} from './core/types'

import {
  getExperimentEntryPath,
} from './core/routing'

// Template
import templateRoutes from './modules/_template/routes'
import {
  templateMeta,
  templatePhases,
} from './modules/_template/model/data'

// Grade 11
import harmonicMotionRoutes from './modules/11_01_harmonic-motion/routes'
import {
  harmonicMotionMeta,
  harmonicMotionPhases,
} from './modules/11_01_harmonic-motion/model/data'

import dampedOscillationRoutes from './modules/11_02_damped-oscillation/routes'
import {
  dampedOscillationMeta,
  dampedOscillationPhases,
} from './modules/11_02_damped-oscillation/model/data'

import forcedResonanceRoutes from './modules/11_03_forced-resonance/routes'
import {
  forcedResonanceMeta,
  forcedResonancePhases,
} from './modules/11_03_forced-resonance/model/data'

import seismographRoutes from './modules/11_04_seismograph/routes'
import {
  seismographMeta,
  seismographPhases,
} from './modules/11_04_seismograph/model/data'

// Grade 12
import boyleRoutes from './modules/12_07_boyle/routes'
import {
  boyleMeta,
  boylePhases,
} from './modules/12_07_boyle/model/data'


/**
 * Nguồn đăng ký duy nhất cho các module
 * có runtime đã được kết nối với ứng dụng.
 *
 * Template được giữ để phát triển nội bộ,
 * không xuất hiện trong curriculum.
 */
export const experimentModules = [
  {
    meta: templateMeta,
    phases: templatePhases,
    routes: templateRoutes,
    implementation: 'native',
  },

  {
    meta: boyleMeta,
    phases: boylePhases,
    routes: boyleRoutes,
    implementation: 'native',
  },

  {
    meta: harmonicMotionMeta,
    phases: harmonicMotionPhases,
    routes: harmonicMotionRoutes,
    implementation: 'legacy',
  },

  {
    meta: dampedOscillationMeta,
    phases: dampedOscillationPhases,
    routes: dampedOscillationRoutes,
    implementation: 'legacy',
  },

  {
    meta: forcedResonanceMeta,
    phases: forcedResonancePhases,
    routes: forcedResonanceRoutes,
    implementation: 'native',
  },

  {
    meta: seismographMeta,
    phases: seismographPhases,
    routes: seismographRoutes,
    implementation: 'native',
  },
] satisfies readonly ExperimentModuleRegistration[]


/**
 * Tìm module đã đăng ký bằng public slug.
 */
export function getRegisteredExperiment(
  slug: string,
): ExperimentModuleRegistration | undefined {
  return experimentModules.find(
    (module) => module.meta.slug === slug,
  )
}


/**
 * Lấy URL chạy thí nghiệm.
 *
 * null: chưa được tích hợp runtime.
 */
export function getExperimentRuntimePath(
  slug: string,
): string | null {
  const module = getRegisteredExperiment(slug)

  if (!module) {
    return null
  }

  return getExperimentEntryPath(module.meta.slug)
}
