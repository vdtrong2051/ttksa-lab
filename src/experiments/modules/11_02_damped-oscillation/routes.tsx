
import { createModuleRoutes } from '../../core/createModuleRoutes'
import { dampedOscillationMeta } from './model/data'

const dampedOscillationRoutes = createModuleRoutes({
  slug: dampedOscillationMeta.slug,

  sessionLayout: async () =>
    (await import('./SessionLayout')).default,

  pages: {
    intro: async () =>
      (await import('./view/IntroPage')).default,

    preparation: async () =>
      (await import('./view/PreparationPage')).default,

    practice: async () =>
      (await import('./view/PracticePage')).default,

    conclusion: async () =>
      (await import('./view/ConclusionPage')).default,

    quiz: async () =>
      (await import('./view/QuizPage')).default,

    report: async () =>
      (await import('./view/ReportPage')).default,
  },
})

export default dampedOscillationRoutes
