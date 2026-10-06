import {
  createBrowserRouter,
} from 'react-router'

import RootLayout from './RootLayout'

import LandingPage from '../pages/LandingPage'
import ExperimentsPage from '../pages/ExperimentsPage'
import GradePage from '../pages/GradePage'
import ChapterPage from '../pages/ChapterPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'

import ExperimentPlaceholder from '../experiments/ExperimentPlaceholder'

const router = createBrowserRouter([
  {
    Component: RootLayout,

    children: [
      {
        index: true,
        Component: LandingPage,
      },

      {
        path: 'experiments',
        Component: ExperimentsPage,
      },

      {
        path: 'experiments/:grade',
        Component: GradePage,
      },

      {
        path: 'experiments/:grade/:chapterSlug',
        Component: ChapterPage,
      },

      {
        path: 'experiments/:grade/:chapterSlug/:experimentSlug',
        Component: ExperimentPlaceholder,
      },

      {
        path: 'login',
        Component: LoginPage,
      },

      {
        path: 'register',
        Component: RegisterPage,
      },

      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])

export default router