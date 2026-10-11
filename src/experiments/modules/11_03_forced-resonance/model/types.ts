export type PendulumId =
  | 'driver'
  | 'l1'
  | 'l2'
  | 'l3'

export type TestPendulumId =
  Exclude<PendulumId, 'driver'>

export interface PendulumConfig {
  length: number
  posX: number
}

export type PendulumConfigMap =
  Record<PendulumId, PendulumConfig>
