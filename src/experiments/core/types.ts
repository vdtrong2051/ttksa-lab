import type { RouteObject } from 'react-router'

import type {
  ExperimentAccent,
  GradeLevel,
} from '../../catalog/types'


export type ExperimentPhaseId =
  | 'intro'
  | 'preparation'
  | 'practice'
  | 'conclusion'
  | 'quiz'
  | 'report'


export interface ExperimentPhaseDefinition {
  id: ExperimentPhaseId
  label: string
  title: string
  description?: string
  disabled?: boolean
}


export interface ExperimentModuleMeta {
  /**
   * Chỉ dùng quản lý source.
   *
   * Ví dụ:
   * 11_01
   * 12_07
   *
   * Không xuất hiện trên URL.
   */
  sourceCode: string

  /**
   * Public slug.
   *
   * Ví dụ:
   * boyle
   * joule
   */
  slug: string

  grade: GradeLevel

  chapterSlug: string

  topic: string

  title: string

  description?: string

  accent: ExperimentAccent
}


export interface ExperimentNavigationOptions {
  replace?: boolean
}


export interface LegacyExperimentNavigationCallbacks {
  onBack: () => void
  onComplete: () => void
}


export interface ExperimentNavigation {
  activePhase:
    ExperimentPhaseId

  canGoPrevious:
    boolean

  canGoNext:
    boolean

  goToPhase: (
    phase:
      ExperimentPhaseId,
    options?:
      ExperimentNavigationOptions,
  ) => void

  toIntro: () => void

  toPreparation: () => void

  toPractice: () => void

  toConclusion: () => void

  toQuiz: () => void

  toReport: () => void

  previous: () => void

  next: () => void

  /**
   * Compatibility layer cho lab-old.
   *
   * Component cũ chỉ cần:
   *
   * onBack={navigation.legacy.onBack}
   * onComplete={navigation.legacy.onComplete}
   */
  legacy:
    LegacyExperimentNavigationCallbacks
}


/**
 * Cách module được triển khai.
 *
 * native: module viết theo kiến trúc hiện tại
 * legacy: module tích hợp từ code cũ
 */
export type ExperimentImplementation =
  | 'native'
  | 'legacy'

/**
 * Chuẩn đăng ký module thí nghiệm.
 *
 * Mỗi module phải cung cấp metadata,
 * danh sách phase, routes và loại triển khai.
 */
export interface ExperimentModuleRegistration {
  readonly meta: ExperimentModuleMeta

  readonly phases:
    readonly ExperimentPhaseDefinition[]

  readonly routes:
    readonly RouteObject[]

  readonly implementation:
    ExperimentImplementation
}
