import {
  useMemo,
  useState,
} from 'react'

import {
  templateObservationPrompts,
  templatePreparationTools,
  templateQuestions,
} from '../model/data'

import type {
  ExperimentAnswerIndex,
} from '../../../core/assessment'

import type {
  TemplateAssessmentState,
  TemplateObservation,
  TemplateObservationId,
  TemplatePreparationToolId,
  TemplateQuestionId,
} from '../model/types'


function createInitialAssessment():
  TemplateAssessmentState {
  return {
    answers: {},
    submitted:
      false,
  }
}


function createInitialObservations():
  TemplateObservation[] {
  return templateObservationPrompts.map(
    (observation) => ({
      id:
        observation.id,

      response:
        '',
    }),
  )
}


export function useTemplateController() {
  /* =======================================================
     PREPARATION
     ======================================================= */

  const [
    selectedPreparationToolIds,
    setSelectedPreparationToolIds,
  ] =
    useState<
      TemplatePreparationToolId[]
    >(
      [],
    )


  const [
    preparationVerified,
    setPreparationVerified,
  ] =
    useState(
      false,
    )


  const requiredPreparationToolIds =
    useMemo(
      () =>
        templatePreparationTools
          .filter(
            (tool) =>
              tool.correct,
          )
          .map(
            (tool) =>
              tool.id,
          ),

      [],
    )


  const isPreparationSelectionCorrect =
    useMemo(
      () => {
        if (
          selectedPreparationToolIds.length !==
          requiredPreparationToolIds.length
        ) {
          return false
        }


        return requiredPreparationToolIds.every(
          (toolId) =>
            selectedPreparationToolIds.includes(
              toolId,
            ),
        )
      },

      [
        requiredPreparationToolIds,
        selectedPreparationToolIds,
      ],
    )


  const preparationReady =
    preparationVerified &&
    isPreparationSelectionCorrect


  function togglePreparationTool(
    toolId:
      TemplatePreparationToolId,
  ) {
    setPreparationVerified(
      false,
    )


    setSelectedPreparationToolIds(
      (current) =>
        current.includes(
          toolId,
        )
          ? current.filter(
              (id) =>
                id !== toolId,
            )
          : [
              ...current,
              toolId,
            ],
    )
  }


  function verifyPreparation() {
    const isCorrect =
      isPreparationSelectionCorrect


    setPreparationVerified(
      isCorrect,
    )


    return isCorrect
  }


  /* =======================================================
     PRACTICE
     ======================================================= */

  const [
    measurementCount,
    setMeasurementCount,
  ] =
    useState(
      0,
    )


  function recordMeasurement() {
    setMeasurementCount(
      (current) =>
        current + 1,
    )
  }


  function clearMeasurements() {
    setMeasurementCount(
      0,
    )
  }


  /* =======================================================
     CONCLUSION / OBSERVATIONS
     ======================================================= */

  const [
    observations,
    setObservations,
  ] =
    useState<
      TemplateObservation[]
    >(
      createInitialObservations,
    )


  function setObservationResponse(
    id:
      TemplateObservationId,

    response:
      string,
  ) {
    setObservations(
      (current) =>
        current.map(
          (observation) =>
            observation.id ===
            id
              ? {
                  ...observation,

                  response,
                }
              : observation,
        ),
    )
  }


  const hasAllObservations =
    observations.every(
      (observation) =>
        observation.response
          .trim()
          .length >
        0,
    )


  /* =======================================================
     ASSESSMENT
     ======================================================= */

  const [
    assessment,
    setAssessment,
  ] =
    useState<
      TemplateAssessmentState
    >(
      createInitialAssessment,
    )


  function setAssessmentAnswer(
    questionId:
      TemplateQuestionId,

    answer:
      ExperimentAnswerIndex,
  ) {
    setAssessment(
      (current) => {
        if (
          current.submitted
        ) {
          return current
        }


        return {
          ...current,

          answers: {
            ...current.answers,

            [questionId]:
              answer,
          },
        }
      },
    )
  }


  const canSubmitAssessment =
    templateQuestions.every(
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

        submitted:
          true,
      }),
    )


    return true
  }


  const assessmentScore =
    useMemo(
      () =>
        templateQuestions.reduce(
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

      [
        assessment.answers,
      ],
    )


  /* =======================================================
     RESET SESSION
     ======================================================= */

  function resetSession() {
    setSelectedPreparationToolIds(
      [],
    )

    setPreparationVerified(
      false,
    )

    setMeasurementCount(
      0,
    )

    setObservations(
      createInitialObservations(),
    )

    setAssessment(
      createInitialAssessment(),
    )
  }


  return {
    /* Preparation */
    selectedPreparationToolIds,

    requiredPreparationToolCount:
      requiredPreparationToolIds.length,

    preparationReady,

    togglePreparationTool,

    verifyPreparation,


    /* Practice */
    measurementCount,

    recordMeasurement,

    clearMeasurements,


    /* Conclusion */
    observations,

    hasAllObservations,

    setObservationResponse,


    /* Quiz */
    assessment,

    canSubmitAssessment,

    assessmentScore,

    setAssessmentAnswer,

    submitAssessment,


    /* Session */
    resetSession,
  }
}


export type TemplateController =
  ReturnType<
    typeof useTemplateController
  >