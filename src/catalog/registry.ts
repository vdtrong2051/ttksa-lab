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
        icon: 'activity',
        theme: 'amber',

        experiments: [
          {
            slug: 'harmonic-motion',
            title:
              'Dao động điều hòa & chuyển động tròn đều',
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
  // Nội dung đồng bộ từ LAB_TOPICS của lab-old.
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
        title: 'Nhiệt Học',
        icon: 'thermometer',
        theme: 'rose',

        experiments: [
          {
            slug: 'brownian',
            title:
              'Chuyển động Brown',
            icon: 'microscope',
            tag: 'Quan sát Vi mô',
            description:
              'Quan sát sự chuyển động hỗn loạn của hạt phấn hoa trong môi trường nước bằng kính hiển vi.',
            status: 'ready',
          },

          {
            slug: 'internal-energy',
            title:
              'Sự biến đổi Nội năng',
            icon: 'flame',
            tag: 'Mô phỏng Trực quan',
            description:
              'Thực hành đun nóng ống nghiệm kín để quan sát sự chuyển hóa từ Nhiệt năng thành Động năng phân tử.',
            status: 'ready',
          },

          {
            slug: 'joule',
            title:
              'Thí nghiệm Joule',
            icon: 'cog',
            tag: 'Tính toán Năng lượng',
            description:
              'Mô phỏng quả nặng rơi làm quay cánh khuấy chứng minh sự chuyển hóa từ Cơ năng thành Nhiệt năng.',
            status: 'ready',
          },

          {
            slug: 'specific-heat',
            title:
              'Nhiệt Dung Riêng',
            icon: 'thermometer',
            tag: 'Đo lường Nhiệt lượng',
            description:
              'Xác định chiều truyền năng lượng nhiệt giữa cốc nước nóng và cốc nước lạnh tiếp xúc nhau.',
            status: 'ready',
          },

          {
            slug: 'latent-heat',
            title:
              'Nhiệt Nóng Chảy Riêng',
            icon: 'snowflake',
            tag: 'Phân tích Đồ thị T(t)',
            description:
              'Sử dụng nhiệt lượng kế hiện đại để xác định chính xác nhiệt nóng chảy riêng của nước đá ở 0°C.',
            status: 'ready',
          },

          {
            slug: 'vaporization',
            title:
              'Nhiệt Hóa Hơi Riêng',
            icon: 'cloud',
            tag: 'Phân tích Đồ thị M(t)',
            description:
              'Khảo sát quá trình đun sôi, hiện tượng hóa hơi và tính toán nhiệt lượng cần thiết để chuyển pha.',
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
        title: 'Khí Lí Tưởng',
        icon: 'gauge',
        theme: 'sky',

        experiments: [
          {
            slug: 'boyle',
            title:
              'Định luật Boyle-Mariotte',
            icon: 'gauge',
            tag: 'Khảo sát P-V',
            description:
              'Nén khí đẳng nhiệt: Quan sát mối liên hệ tỉ lệ nghịch giữa Áp suất và Thể tích của lượng khí xác định.',
            status: 'ready',
          },

          {
            slug: 'charles',
            title:
              'Định luật Charles',
            icon: 'thermometer',
            tag: 'Khảo sát V-T',
            description:
              'Giãn nở đẳng áp: Đun nóng chất khí và quan sát sự tăng lên của Thể tích tỉ lệ thuận với Nhiệt độ tuyệt đối.',
            status: 'ready',
          },

          {
            slug: 'ideal-gas-law',
            title:
              'Phương trình Trạng thái',
            icon: 'flask',
            tag: 'Mô phỏng Động học',
            description:
              'Mô phỏng buồng chứa khí 3D: Tự do điều chỉnh Nhiệt độ, Áp suất, Thể tích và Số mol khí.',
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
        title: 'Từ Trường',
        icon: 'magnet',
        theme: 'violet',

        experiments: [
          {
            slug: 'magnetic-field',
            title:
              'Từ phổ & Từ trường',
            icon: 'magnet',
            tag: 'Quan sát Từ phổ',
            description:
              'Rắc mạt sắt xung quanh nam châm chữ U và nam châm thẳng để vẽ lại đường sức từ trong không gian 3D.',
            status: 'planned',
          },

          {
            slug: 'lorentz-force',
            title:
              'Lực Lorentz',
            icon: 'orbit',
            tag: 'Phân tích Lực',
            description:
              'Bắn hạt điện tích bay vào vùng từ trường đều và phân tích quỹ đạo cong của hạt dưới tác dụng của lực Lorentz.',
            status: 'planned',
          },

          {
            slug: 'faraday',
            title:
              'Cảm ứng Điện từ',
            icon: 'zap',
            tag: 'Đo lường Dòng điện',
            description:
              'Thí nghiệm Faraday: Đẩy nam châm xuyên qua cuộn dây dẫn kín để tạo ra dòng điện cảm ứng xoay chiều.',
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
        title: 'Vật lý Hạt Nhân',
        icon: 'atom',
        theme: 'teal',

        experiments: [
          {
            slug: 'nucleus-structure',
            title:
              'Cấu tạo Hạt nhân',
            icon: 'atom',
            tag: 'Khám phá Vi mô',
            description:
              'Khám phá cấu trúc siêu vi mô của nguyên tử: Hạt nhân (Proton, Neutron) và lớp vỏ Electron.',
            status: 'planned',
          },

          {
            slug: 'radioactivity',
            title:
              'Hiện tượng Phóng xạ',
            icon: 'radio',
            tag: 'Mô phỏng Phân rã',
            description:
              'Khảo sát chu kỳ bán rã và khả năng đâm xuyên của các tia phóng xạ Alpha (α), Beta (β), Gamma (γ).',
            status: 'planned',
          },

          {
            slug: 'fission',
            title:
              'Phản ứng Phân hạch',
            icon: 'atom',
            tag: 'Quan sát Năng lượng',
            description:
              'Mô phỏng phản ứng dây chuyền: Bắn nơtron chậm vào hạt nhân Uranium-235 để giải phóng năng lượng.',
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