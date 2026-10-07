import {
  useNavigate,
} from 'react-router'

import {
  getAdjacentExperimentPhase,
  getExperimentPhasePath,
} from './routing'

import type {
  ExperimentNavigation,
  ExperimentNavigationOptions,
  ExperimentPhaseId,
} from './types'


export function useExperimentNavigation(
  experimentSlug:
    string,

  activePhase:
    ExperimentPhaseId,
): ExperimentNavigation {
  const navigate =
    useNavigate()


  const previousPhase =
    getAdjacentExperimentPhase(
      activePhase,
      -1,
    )


  const nextPhase =
    getAdjacentExperimentPhase(
      activePhase,
      1,
    )


  function goToPhase(
    phase:
      ExperimentPhaseId,

    options?:
      ExperimentNavigationOptions,
  ) {
    navigate(
      getExperimentPhasePath(
        experimentSlug,
        phase,
      ),

      {
        replace:
          options?.replace ??
          false,
      },
    )
  }


  function toIntro() {
    goToPhase(
      'intro',
    )
  }


  function toPreparation() {
    goToPhase(
      'preparation',
    )
  }


  function toPractice() {
    goToPhase(
      'practice',
    )
  }


  function toConclusion() {
    goToPhase(
      'conclusion',
    )
  }


  function toQuiz() {
    goToPhase(
      'quiz',
    )
  }


  function toReport() {
    goToPhase(
      'report',
    )
  }


  function previous() {
    if (
      !previousPhase
    ) {
      return
    }

    goToPhase(
      previousPhase,
    )
  }


  function next() {
    if (
      !nextPhase
    ) {
      return
    }

    goToPhase(
      nextPhase,
    )
  }


  return {
    activePhase,

    canGoPrevious:
      previousPhase !==
      null,

    canGoNext:
      nextPhase !==
      null,

    goToPhase,

    toIntro,

    toPreparation,

    toPractice,

    toConclusion,

    toQuiz,

    toReport,

    previous,

    next,

    legacy: {
      onBack:
        previous,

      onComplete:
        next,
    },
  }
}