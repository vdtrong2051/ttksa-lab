// ==========================================
// ĐỒ THỊ 2D — GIỮ NGUYÊN MÔ HÌNH TOÁN CŨ
// ==========================================

export default function DampedMathGraph({
  damping,
}: {
  damping:
    number
}) {
  const width =
    500

  const height =
    180

  const padding =
    20

  const A0 =
    3

  const omega =
    5

  const maxTime =
    12

  const points:
    string[] = []

  const envelopeTop:
    string[] = []

  const envelopeBottom:
    string[] = []

  const steps =
    300

  for (
    let i = 0;
    i <= steps;
    i += 1
  ) {
    const t =
      (
        i /
        steps
      ) *
      maxTime

    const x =
      A0 *
      Math.exp(
        -damping *
        t,
      ) *
      Math.cos(
        omega *
        t,
      )

    const env =
      A0 *
      Math.exp(
        -damping *
        t,
      )

    const svgX =
      padding +
      (
        t /
        maxTime
      ) *
      (
        width -
        2 *
        padding
      )

    const mapY =
      (
        value:
          number,
      ) =>
        height /
          2 -
        (
          value /
          A0
        ) *
        (
          (
            height -
            2 *
            padding
          ) /
          2
        )

    points.push(
      `${svgX},${mapY(x)}`,
    )

    envelopeTop.push(
      `${svgX},${mapY(env)}`,
    )

    envelopeBottom.push(
      `${svgX},${mapY(-env)}`,
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-inner">
      <div className="absolute left-3 top-2 z-10 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
        Đồ thị 2D trục chuẩn
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        aria-label="Đồ thị dao động tắt dần"
      >
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={
            height -
            padding
          }
          stroke="#f1f5f9"
          strokeWidth="2"
        />

        <line
          x1={padding}
          y1={
            height /
            2
          }
          x2={
            width -
            padding
          }
          y2={
            height /
            2
          }
          stroke="#cbd5e1"
          strokeWidth="2"
        />

        <polyline
          points={
            envelopeTop.join(
              ' ',
            )
          }
          fill="none"
          stroke="#f43f5e"
          strokeDasharray="4 4"
          strokeWidth="1.5"
          opacity="0.6"
        />

        <polyline
          points={
            envelopeBottom.join(
              ' ',
            )
          }
          fill="none"
          stroke="#f43f5e"
          strokeDasharray="4 4"
          strokeWidth="1.5"
          opacity="0.6"
        />

        <polyline
          points={
            points.join(
              ' ',
            )
          }
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

