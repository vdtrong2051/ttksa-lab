import {
  Navigate,
} from 'react-router'

import type {
  RouteObject,
} from 'react-router'

import {
  getExperimentEntryPath,
} from '../../core/routing'


const dampedOscillationRoutes:
  RouteObject[] = [
    {
      path:
        'damped-oscillation',

      lazy: {
        Component:
          async () =>
            (
              await import(
                './SessionLayout'
              )
            ).default,
      },

      children: [
        {
          index:
            true,

          element: (
            <Navigate
              to={
                getExperimentEntryPath(
                  'damped-oscillation',
                )
              }
              replace
            />
          ),
        },

        {
          path:
            'intro',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    './view/IntroPage'
                  )
                ).default,
          },
        },

        {
          path:
            'preparation',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    './view/PreparationPage'
                  )
                ).default,
          },
        },

        {
          path:
            'practice',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    './view/PracticePage'
                  )
                ).default,
          },
        },

        {
          path:
            'conclusion',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    './view/ConclusionPage'
                  )
                ).default,
          },
        },

        {
          path:
            'quiz',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    './view/QuizPage'
                  )
                ).default,
          },
        },

        {
          path:
            'report',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    './view/ReportPage'
                  )
                ).default,
          },
        },

        {
          path:
            '*',

          element: (
            <Navigate
              to={
                getExperimentEntryPath(
                  'damped-oscillation',
                )
              }
              replace
            />
          ),
        },
      ],
    },
  ]


export default dampedOscillationRoutes
