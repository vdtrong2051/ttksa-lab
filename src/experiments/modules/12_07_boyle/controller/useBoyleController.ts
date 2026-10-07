import {
  useMemo,
  useState,
} from 'react'

import {
  boyleAssessmentQuestions,
  boyleObservationPrompts,
  boylePreparationTools,
} from '../model/data'

import {
  boylePhysicsConfig,
} from '../model/constants'

import {
  createBoyleMeasurement,
} from '../model/physics'

import type {
  BoyleAnswerIndex,
  BoyleAssessmentState,
  BoyleMeasurement,
  BoyleObservation,
  BoyleObservationId,
  BoylePreparationState,
  BoylePreparationToolId,
  BoyleQuestionId,
  BoyleRuntimeState,
  BoyleThermalCondition,
} from '../model/types'


export type BoyleRecordMeasurementResult =
  | 'recorded'
  | 'thermal-transient'
  | 'duplicate-volume'
  | 'limit-reached'


function createInitialPreparation():
  BoylePreparationState {
  return {
    selectedToolIds: [],
  }
}


function createInitialRuntime():
  BoyleRuntimeState {
  return {
    volume:
      boylePhysicsConfig.volumeMax,
    thermalCondition:
      'equilibrium',
  }
}


function createInitialAssessment():
  BoyleAssessmentState {
  return {
    answers: {},
    submitted: false,
  }
}


export function useBoyleController() {
  const [preparation, setPreparation] =
    useState<BoylePreparationState>(
      createInitialPreparation,
    )

  const [runtime, setRuntime] =
    useState<BoyleRuntimeState>(
      createInitialRuntime,
    )

  const [measurements, setMeasurements] =
    useState<BoyleMeasurement[]>([])

  const [observations, setObservations] =
    useState<BoyleObservation[]>([])

  const [assessment, setAssessment] =
    useState<BoyleAssessmentState>(
      createInitialAssessment,
    )


  const isPreparationComplete =
    useMemo(() => {
      const requiredToolIds =
        boylePreparationTools
          .filter(
            (tool) =>
              tool.correct,
          )
          .map(
            (tool) =>
              tool.id,
          )

      return (
        preparation.selectedToolIds.length ===
          requiredToolIds.length &&
        requiredToolIds.every(
          (toolId) =>
            preparation.selectedToolIds.includes(
              toolId,
            ),
        )
      )
    }, [preparation.selectedToolIds])


  function togglePreparationTool(
    toolId: BoylePreparationToolId,
  ) {
    setPreparation(
      (current) => {
        const selected =
          current.selectedToolIds.includes(
            toolId,
          )

        return {
          selectedToolIds:
            selected
              ? current.selectedToolIds.filter(
                  (id) =>
                    id !== toolId,
                )
              : [
                  ...current.selectedToolIds,
                  toolId,
                ],
        }
      },
    )
  }


  function setVolume(
    volume: number,
  ) {
    const clamped =
      Math.min(
        boylePhysicsConfig.volumeMax,
        Math.max(
          boylePhysicsConfig.volumeMin,
          volume,
        ),
      )

    setRuntime(
      (current) => ({
        ...current,
        volume: clamped,
      }),
    )
  }


  function setThermalCondition(
    thermalCondition:
      BoyleThermalCondition,
  ) {
    setRuntime(
      (current) => ({
        ...current,
        thermalCondition,
      }),
    )
  }


  const measurementLimitReached =
    measurements.length >=
    boylePhysicsConfig
      .targetMeasurementCount


  /*
   * Gate duy nhất để UI mở phase Kết luận.
   *
   * Đây là session/business state nên thuộc Controller.
   * Presentation state như toolbarExpanded vẫn ở PracticePage.
   */
  const canOpenConclusion =
    measurementLimitReached


  const hasDuplicateMeasurement =
    measurements.some(
      (measurement) =>
        Math.abs(
          measurement.volume -
            runtime.volume,
        ) <
        boylePhysicsConfig
          .duplicateVolumeTolerance,
    )


  const canRecordMeasurement =
    runtime.thermalCondition ===
      'equilibrium' &&
    !measurementLimitReached &&
    !hasDuplicateMeasurement


  function recordMeasurement():
    BoyleRecordMeasurementResult {
    if (
      runtime.thermalCondition !==
      'equilibrium'
    ) {
      return 'thermal-transient'
    }

    if (measurementLimitReached) {
      return 'limit-reached'
    }

    if (hasDuplicateMeasurement) {
      return 'duplicate-volume'
    }

    setMeasurements(
      (current) => [
        ...current,
        createBoyleMeasurement(
          runtime.volume,
          boylePhysicsConfig
            .boyleConstant,
        ),
      ],
    )

    return 'recorded'
  }


  function clearMeasurements() {
    setMeasurements([])
  }


  function applyFastCompression() {
    if (
      runtime.thermalCondition !==
      'equilibrium'
    ) {
      return false
    }

    setRuntime({
      volume:
        boylePhysicsConfig.volumeMin,
      thermalCondition:
        'transient',
    })

    return true
  }


  function setObservationResponse(
    id: BoyleObservationId,
    response: string,
  ) {
    setObservations(
      (current) => {
        const exists =
          current.some(
            (observation) =>
              observation.id === id,
          )

        if (!exists) {
          return [
            ...current,
            {
              id,
              response,
            },
          ]
        }

        return current.map(
          (observation) =>
            observation.id === id
              ? {
                  ...observation,
                  response,
                }
              : observation,
        )
      },
    )
  }


  const hasAllObservations =
    useMemo(
      () =>
        boyleObservationPrompts.every(
          (prompt) =>
            observations.some(
              (observation) =>
                observation.id ===
                  prompt.id &&
                observation.response.trim().length >
                  0,
            ),
        ),
      [observations],
    )


  function setAssessmentAnswer(
    questionId: BoyleQuestionId,
    answer: BoyleAnswerIndex,
  ) {
    setAssessment(
      (current) => {
        if (current.submitted) {
          return current
        }

        return {
          ...current,
          answers: {
            ...current.answers,
            [questionId]: answer,
          },
        }
      },
    )
  }


  const canSubmitAssessment =
    boyleAssessmentQuestions.every(
      (question) =>
        assessment.answers[
          question.id
        ] !== undefined,
    )


  function submitAssessment() {
    if (
      assessment.submitted ||
      !canSubmitAssessment
    ) {
      return false
    }

    setAssessment(
      (current) => ({
        ...current,
        submitted: true,
      }),
    )

    return true
  }


  const assessmentScore =
    useMemo(
      () =>
        boyleAssessmentQuestions.reduce(
          (
            score,
            question,
          ) =>
            assessment.answers[
              question.id
            ] ===
            question.correctOption
              ? score + 1
              : score,
          0,
        ),
      [assessment.answers],
    )


  function resetRuntime() {
    setRuntime(
      createInitialRuntime(),
    )
  }


  function resetSession() {
    setPreparation(
      createInitialPreparation(),
    )
    setRuntime(
      createInitialRuntime(),
    )
    setMeasurements([])
    setObservations([])
    setAssessment(
      createInitialAssessment(),
    )
  }


  return {
    preparation,
    isPreparationComplete,
    togglePreparationTool,

    runtime,
    setVolume,
    setThermalCondition,
    applyFastCompression,
    resetRuntime,

    measurements,
    measurementLimitReached,
    canOpenConclusion,
    hasDuplicateMeasurement,
    canRecordMeasurement,
    recordMeasurement,
    clearMeasurements,

    observations,
    hasAllObservations,
    setObservationResponse,

    assessment,
    canSubmitAssessment,
    assessmentScore,
    setAssessmentAnswer,
    submitAssessment,

    resetSession,
  }
}


export type BoyleController =
  ReturnType<
    typeof useBoyleController
  >
