import type {
  GradeCurriculum,
  GradeLevel,
} from './types'

export const curriculum: GradeCurriculum[] = [
  // =========================================================
  // VẬT LÝ 10
  // =========================================================
  {
    grade: 10,
    title: 'Vật lý 10',
    description:
      'Chương trình thí nghiệm Vật lý lớp 10.',
    chapters: [],
  },

  // =========================================================
  // VẬT LÝ 11
  // =========================================================
  {
    grade: 11,
    title: 'Vật lý 11',
    description:
      'Chương trình thí nghiệm Vật lý lớp 11.',

    chapters: [
      {
        id: 'grade-11-mechanical-oscillation',
        slug: 'dao-dong-co',
        title: 'Dao động cơ',

        // Lucide: Activity
        icon: 'activity',

        theme: 'amber',

        experiments: [
          {
            slug: 'harmonic-motion',
            title:
              'Dao động điều hòa & chuyển động tròn đều',

            // Lucide: Orbit
            icon: 'orbit',

            tag: 'Quan sát hình chiếu',

            description:
              'Trực quan hóa mối liên hệ giữa dao động điều hòa của con lắc lò xo và hình chiếu của chuyển động tròn đều.',

            status: 'ready',
          },

          {
            slug: 'damped-oscillation',
            title:
              'Dao động tắt dần',

            // Lucide: Activity
            icon: 'activity',

            tag: 'Đồ thị động',

            description:
              'Khảo sát sự suy giảm biên độ của con lắc theo thời gian dưới tác dụng của lực cản môi trường.',

            status: 'ready',
          },

          {
            slug: 'forced-resonance',
            title:
              'Cộng hưởng cơ',

            // Lucide: Waves
            icon: 'waves',

            tag: 'Mô phỏng năng lượng',

            description:
              'Khảo sát dao động cưỡng bức của hệ nhiều con lắc và điều kiện xảy ra hiện tượng cộng hưởng.',

            status: 'ready',
          },
        ],
      },
    ],
  },

  // =========================================================
  // VẬT LÝ 12
  // =========================================================
  {
    grade: 12,
    title: 'Vật lý 12',
    description:
      'Chương trình thí nghiệm Vật lý lớp 12.',

    chapters: [
      // =====================================================
      // NHIỆT HỌC
      // =====================================================
      {
        id: 'grade-12-thermal',
        slug: 'nhiet-hoc',
        title: 'Nhiệt học',

        // Lucide: Thermometer
        icon: 'thermometer',

        theme: 'rose',

        experiments: [
          {
            slug: 'brownian',
            title:
              'Chuyển động Brown',

            // Lucide: Microscope
            icon: 'microscope',

            tag: 'Quan sát vi mô',

            description:
              'Quan sát sự chuyển động hỗn loạn của hạt phấn hoa trong môi trường nước bằng kính hiển vi.',

            status: 'ready',
          },

          {
            slug: 'internal-energy',
            title:
              'Sự biến đổi nội năng',

            // Lucide: Flame
            icon: 'flame',

            tag: 'Mô phỏng trực quan',

            description:
              'Thực hành đun nóng ống nghiệm kín để quan sát sự chuyển hóa từ nhiệt năng thành động năng phân tử.',

            status: 'ready',
          },

          {
            slug: 'joule',
            title:
              'Thí nghiệm Joule',

            // Lucide: Cog
            icon: 'cog',

            tag: 'Tính toán năng lượng',

            description:
              'Mô phỏng quả nặng rơi làm quay cánh khuấy, minh họa sự chuyển hóa từ cơ năng thành nhiệt năng.',

            status: 'ready',
          },

          {
            slug: 'specific-heat',
            title:
              'Nhiệt dung riêng',

            // Lucide: Thermometer
            icon: 'thermometer',

            tag: 'Đo lường nhiệt lượng',

            description:
              'Xác định chiều truyền năng lượng nhiệt giữa các vật có nhiệt độ khác nhau.',

            status: 'ready',
          },

          {
            slug: 'latent-heat',
            title:
              'Nhiệt nóng chảy riêng',

            // Lucide: Snowflake
            icon: 'snowflake',

            tag: 'Phân tích đồ thị',

            description:
              'Khảo sát quá trình nóng chảy và xác định nhiệt nóng chảy riêng.',

            status: 'ready',
          },

          {
            slug: 'vaporization',
            title:
              'Nhiệt hóa hơi riêng',

            // Lucide: Cloud
            icon: 'cloud',

            tag: 'Phân tích đồ thị',

            description:
              'Khảo sát quá trình đun sôi, hiện tượng hóa hơi và nhiệt lượng cần thiết cho quá trình chuyển pha.',

            status: 'ready',
          },
        ],
      },

      // =====================================================
      // KHÍ LÍ TƯỞNG
      // =====================================================
      {
        id: 'grade-12-ideal-gas',
        slug: 'khi-li-tuong',
        title: 'Khí lí tưởng',

        // Lucide: Gauge
        icon: 'gauge',

        theme: 'sky',

        experiments: [
          {
            slug: 'boyle',
            title:
              'Định luật Boyle–Mariotte',

            // Lucide: Gauge
            icon: 'gauge',

            tag: 'Khảo sát P–V',

            description:
              'Khảo sát mối liên hệ giữa áp suất và thể tích của một lượng khí xác định trong quá trình đẳng nhiệt.',

            status: 'ready',
          },

          {
            slug: 'charles',
            title:
              'Định luật Charles',

            // Lucide: Thermometer
            icon: 'thermometer',

            tag: 'Khảo sát V–T',

            description:
              'Khảo sát mối liên hệ giữa thể tích và nhiệt độ tuyệt đối trong quá trình đẳng áp.',

            status: 'ready',
          },

          {
            slug: 'ideal-gas-law',
            title:
              'Phương trình trạng thái khí lí tưởng',

            // Lucide: FlaskConical
            icon: 'flask',

            tag: 'Mô phỏng động học',

            description:
              'Khảo sát mối quan hệ giữa áp suất, thể tích và nhiệt độ của chất khí.',

            status: 'planned',
          },
        ],
      },

      // =====================================================
      // TỪ TRƯỜNG
      // =====================================================
      {
        id: 'grade-12-magnetic',
        slug: 'tu-truong',
        title: 'Từ trường',

        // Lucide: Magnet
        icon: 'magnet',

        theme: 'violet',

        experiments: [
          {
            slug: 'magnetic-field',
            title:
              'Từ phổ & từ trường',

            // Lucide: Magnet
            icon: 'magnet',

            tag: 'Quan sát từ phổ',

            description:
              'Quan sát từ phổ và hình dạng các đường sức từ trong không gian.',

            status: 'planned',
          },

          {
            slug: 'lorentz-force',
            title:
              'Lực Lorentz',

            // Lucide: Orbit
            icon: 'orbit',

            tag: 'Phân tích lực',

            description:
              'Khảo sát chuyển động của điện tích trong vùng từ trường dưới tác dụng của lực Lorentz.',

            status: 'planned',
          },

          {
            slug: 'faraday',
            title:
              'Cảm ứng điện từ',

            // Lucide: Zap
            icon: 'zap',

            tag: 'Đo lường dòng điện',

            description:
              'Khảo sát hiện tượng cảm ứng điện từ và sự xuất hiện của dòng điện cảm ứng.',

            status: 'planned',
          },
        ],
      },

      // =====================================================
      // VẬT LÝ HẠT NHÂN
      // =====================================================
      {
        id: 'grade-12-nuclear',
        slug: 'vat-ly-hat-nhan',
        title: 'Vật lý hạt nhân',

        // Lucide: Atom
        icon: 'atom',

        theme: 'teal',

        experiments: [
          {
            slug: 'nucleus-structure',
            title:
              'Cấu tạo hạt nhân',

            // Lucide: Atom
            icon: 'atom',

            tag: 'Khám phá vi mô',

            description:
              'Khám phá cấu trúc cơ bản của nguyên tử và hạt nhân.',

            status: 'planned',
          },

          {
            slug: 'radioactivity',
            title:
              'Hiện tượng phóng xạ',

            // Lucide: Radio
            icon: 'radio',

            tag: 'Mô phỏng phân rã',

            description:
              'Khảo sát quá trình phân rã, chu kỳ bán rã và các dạng phóng xạ.',

            status: 'planned',
          },

          {
            slug: 'fission',
            title:
              'Phản ứng phân hạch',

            // Lucide: Atom
            icon: 'atom',

            tag: 'Quan sát năng lượng',

            description:
              'Mô phỏng phản ứng phân hạch và quá trình giải phóng năng lượng.',

            status: 'planned',
          },
        ],
      },
    ],
  },
]

// =========================================================
// QUERY HELPERS
// =========================================================

export function getGradeCurriculum(
  grade: GradeLevel,
) {
  return curriculum.find(
    (item) =>
      item.grade === grade,
  )
}

export function getChapter(
  grade: GradeLevel,
  chapterSlug: string,
) {
  return getGradeCurriculum(
    grade,
  )?.chapters.find(
    (chapter) =>
      chapter.slug ===
      chapterSlug,
  )
}

export function getExperiment(
  grade: GradeLevel,
  chapterSlug: string,
  experimentSlug: string,
) {
  return getChapter(
    grade,
    chapterSlug,
  )?.experiments.find(
    (experiment) =>
      experiment.slug ===
      experimentSlug,
  )
}

export function getExperimentCount(
  grade: GradeLevel,
) {
  const gradeCurriculum =
    getGradeCurriculum(
      grade,
    )

  if (!gradeCurriculum) {
    return 0
  }

  return gradeCurriculum.chapters.reduce(
    (total, chapter) =>
      total +
      chapter.experiments.length,
    0,
  )
}

export function getTotalExperimentCount() {
  return curriculum.reduce(
    (total, grade) =>
      total +
      grade.chapters.reduce(
        (
          gradeTotal,
          chapter,
        ) =>
          gradeTotal +
          chapter.experiments
            .length,
        0,
      ),
    0,
  )
}

export function getReadyExperimentCount() {
  return curriculum.reduce(
    (total, grade) =>
      total +
      grade.chapters.reduce(
        (
          gradeTotal,
          chapter,
        ) =>
          gradeTotal +
          chapter.experiments.filter(
            (experiment) =>
              experiment.status ===
              'ready',
          ).length,
        0,
      ),
    0,
  )
}