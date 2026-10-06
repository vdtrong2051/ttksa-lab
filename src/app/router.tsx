import {
  Navigate,
  createBrowserRouter,
} from 'react-router'

import RootLayout from './RootLayout'

const router =
  createBrowserRouter([
    {
      Component:
        RootLayout,

      children: [
        {
          index: true,

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    '../pages/LandingPage'
                  )
                ).default,
          },
        },

        {
          path:
            'experiments',

          element: (
            <Navigate
              to="/"
              replace
            />
          ),
        },

        {
          path:
            'experiments/:grade',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    '../pages/GradePage'
                  )
                ).default,
          },
        },

        {
          path:
            'experiments/:grade/:chapterSlug',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    '../pages/ChapterPage'
                  )
                ).default,
          },
        },

        {
          path:
            'experiments/:grade/:chapterSlug/:experimentSlug',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    '../experiments/ExperimentPlaceholder'
                  )
                ).default,
          },
        },

        {
          path:
            'login',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    '../pages/LoginPage'
                  )
                ).default,
          },
        },

        {
          path:
            'register',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    '../pages/RegisterPage'
                  )
                ).default,
          },
        },

        {
          path: '*',

          lazy: {
            Component:
              async () =>
                (
                  await import(
                    '../pages/NotFoundPage'
                  )
                ).default,
          },
        },
      ],
    },
  ])

export default router