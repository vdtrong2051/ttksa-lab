import type {
  AppIconName,
} from '../types/icon'

export type GradeLevel =
  | 10
  | 11
  | 12

export type ExperimentStatus =
  | 'ready'
  | 'planned'

export type ChapterTheme =
  | 'rose'
  | 'sky'
  | 'violet'
  | 'teal'
  | 'amber'

export interface Experiment {
  slug: string
  title: string
  icon: AppIconName
  tag: string
  description: string
  status: ExperimentStatus
}

export interface Chapter {
  id: string
  slug: string
  title: string
  icon: AppIconName
  theme: ChapterTheme
  experiments: Experiment[]
}

export interface GradeCurriculum {
  grade: GradeLevel
  title: string
  description: string
  chapters: Chapter[]
}