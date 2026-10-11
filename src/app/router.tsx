import {
  Navigate,
  createBrowserRouter,
} from 'react-router'

import experimentRoutes from '../experiments/routes'

import RootLayout from './RootLayout'

import PageLoading from '../components/ui/PageLoading'

const router =
  createBrowserRouter([
    // =====================================================
    // PORTAL
    // =====================================================

    {
      Component: RootLayout,
      HydrateFallback: PageLoading,

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


    // =====================================================
    // EXPERIMENT RUNTIME
    //
    // Không nằm trong RootLayout.
    // Vì vậy trang thí nghiệm sau này có shell/header riêng.
    // =====================================================

    ...experimentRoutes,
  ])


export default router