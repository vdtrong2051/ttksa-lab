import type { PendulumConfigMap, PendulumId } from './types'

export const DEFAULT_PENDULUMS:
  Readonly<PendulumConfigMap> = {
    driver: { length: 5, posX: -1 },
    l1: { length: 3, posX: -3 },
    l2: { length: 5, posX: 2 },
    l3: { length: 7, posX: 5 },
  }

export const PENDULUM_COLORS:
  Record<PendulumId, string> = {
    driver: '#ef4444',
    l1: '#3b82f6',
    l2: '#10b981',
    l3: '#8b5cf6',
  }
