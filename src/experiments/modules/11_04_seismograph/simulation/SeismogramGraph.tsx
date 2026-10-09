
import { useId, useMemo } from 'react'

import {
  MAX_GRAPH_POINTS,
  PAPER_LIMIT,
} from '../model/types'


interface SeismogramGraphProps {
  data: readonly number[]
  color: string
  label?: string
}


const WIDTH = 1000
const HEIGHT = 300


export default function SeismogramGraph({
  data,
  color,
  label = 'Đồ thị tín hiệu địa chấn',
}: SeismogramGraphProps) {
  const id = useId().replaceAll(':', '-')

  const points = useMemo(
    () =>
      data
        .slice(-MAX_GRAPH_POINTS)
        .map((sample, index) => {
          const x =
            (index / (MAX_GRAPH_POINTS - 1)) *
            WIDTH

          const y =
            HEIGHT / 2 -
            Math.max(
              -PAPER_LIMIT,
              Math.min(PAPER_LIMIT, sample),
            ) *
              50

          return `${x.toFixed(2)},${y.toFixed(2)}`
        })
        .join(' '),
    [data],
  )

  return (
    <svg
      className="seismo-graph"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <defs>
        <pattern
          id={`seismo-small-${id}`}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        </pattern>

        <pattern
          id={`seismo-major-${id}`}
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="50"
            height="50"
            fill={`url(#seismo-small-${id})`}
          />

          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>

      <rect
        width={WIDTH}
        height={HEIGHT}
        fill="#ffffff"
      />

      <rect
        width={WIDTH}
        height={HEIGHT}
        fill={`url(#seismo-major-${id})`}
      />

      <line
        x1="0"
        y1={HEIGHT / 2}
        x2={WIDTH}
        y2={HEIGHT / 2}
        stroke="#10b981"
        strokeWidth="2.5"
      />

      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
