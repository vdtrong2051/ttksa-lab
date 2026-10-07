import type {
  ExperimentNavigation,
} from './types'


export interface LegacyIntroProps {
  onComplete:
    () => void
}


export interface LegacyPreparationProps {
  onBack:
    () => void

  onComplete:
    () => void
}


export interface LegacyPracticeProps {
  onBack:
    () => void

  onComplete:
    () => void
}


export interface LegacyConclusionProps {
  onBack:
    () => void

  onComplete:
    () => void
}


export interface LegacyQuizProps {
  onBack:
    () => void

  onComplete:
    () => void
}


export interface LegacyReportProps {
  onBack:
    () => void
}


export function createLegacyExperimentNavigation(
  navigation:
    ExperimentNavigation,
) {
  return {
    intro: {
      onComplete:
        navigation.next,
    } satisfies LegacyIntroProps,


    preparation: {
      onBack:
        navigation.previous,

      onComplete:
        navigation.next,
    } satisfies LegacyPreparationProps,


    practice: {
      onBack:
        navigation.previous,

      onComplete:
        navigation.next,
    } satisfies LegacyPracticeProps,


    conclusion: {
      onBack:
        navigation.previous,

      onComplete:
        navigation.next,
    } satisfies LegacyConclusionProps,


    quiz: {
      onBack:
        navigation.previous,

      onComplete:
        navigation.next,
    } satisfies LegacyQuizProps,


    report: {
      onBack:
        navigation.previous,
    } satisfies LegacyReportProps,
  }
}