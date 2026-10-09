
export interface ForcedResonanceQuestion {
  prompt: string
  options: readonly string[]
  answer: number
  explanation: string
}

export const forcedResonanceQuestions:
  readonly ForcedResonanceQuestion[] = [
    {
      prompt:
        'Hiện tượng cộng hưởng cơ xảy ra khi nào?',

      options: [
        'A. Lực cản của môi trường rất nhỏ.',
        'B. Tần số của ngoại lực cưỡng bức bằng tần số riêng của hệ.',
        'C. Biên độ của ngoại lực cưỡng bức đạt giá trị cực đại.',
        'D. Hệ dao động không chịu tác dụng của lực ma sát.',
      ],

      answer: 1,

      explanation:
        'Điều kiện tiên quyết để xảy ra hiện tượng cộng hưởng (biên độ tăng vọt lên cực đại) là f = f0.',
    },

    {
      prompt:
        'Biết công thức tính tần số riêng của con lắc đơn là f0 = (1/2π) × √(g/l). Để một con lắc đơn dài 1 m bị cộng hưởng, ngoại lực cưỡng bức phải có chu kì T xấp xỉ bằng bao nhiêu? (Lấy g = π²)',

      options: [
        'A. 1 giây',
        'B. 2 giây',
        'C. 3.14 giây',
        'D. 0.5 giây',
      ],

      answer: 1,

      explanation:
        'Để cộng hưởng thì T_ngoại = T_riêng = 2π√(l/g). Với g = π² và l = 1 m, ta có T = 2 giây.',
    },
  ]
