import {
  createContext,
  useContext,
} from 'react'

import type {
  Context,
} from 'react'


export function createExperimentSessionContext<
  TSession,
>() {
  return createContext<
    TSession | null
  >(null)
}


export function useExperimentSession<
  TSession,
>(
  context:
    Context<TSession | null>,

  experimentName:
    string,
): TSession {
  const session =
    useContext(
      context,
    )

  if (!session) {
    throw new Error(
      `${experimentName} session must be used inside its SessionLayout.`,
    )
  }

  return session
}