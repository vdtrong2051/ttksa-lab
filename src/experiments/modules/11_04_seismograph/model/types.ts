

export interface SeismographConfig {
  eqFreq: number
  eqAmp: number
  naturalFreq: number
  damping: number
}

export interface SeismographSnapshot {
  id: number
  graphData: number[]
  eqFreq: number
  naturalFreq: number
}


export const DEFAULT_SEISMOGRAPH_CONFIG:
  Readonly<SeismographConfig> = {
    eqFreq: 5,
    eqAmp: 0.8,
    naturalFreq: 1,
    damping: 0.15,
  }

export const MAX_SEISMOGRAPH_SNAPSHOTS = 3

export const MAX_GRAPH_POINTS = 1000

export const GRAPH_SAMPLE_RATE = 100

export const PAPER_LIMIT = 3

export const DANGER_THRESHOLD = 1.8

export const SEISMOGRAPH_GRAPH_COLORS = [
  '#ef4444',
  '#3b82f6',
  '#a855f7',
] as const
