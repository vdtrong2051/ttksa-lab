import {
  useMemo,
} from 'react'

import {
  boylePhysicsConfig,
  boyleUnits,
} from '../model/constants'

import {
  calculateInverseVolume,
  calculateMaxPressureVolumeDeviationPercent,
  calculateMeanPressureVolume,
} from '../model/physics'

import type {
  BoyleMeasurement,
} from '../model/types'


interface BoyleGraphProps {
  measurements:
    readonly BoyleMeasurement[]
}


const WIDTH = 360
const HEIGHT = 220
const PAD = {
  left: 44,
  right: 18,
  top: 18,
  bottom: 38,
}

const X_MAX = 0.8
const Y_MAX = 2.5


function mapX(
  value: number,
) {
  const usable =
    WIDTH -
    PAD.left -
    PAD.right

  return PAD.left +
    value / X_MAX *
      usable
}


function mapY(
  value: number,
) {
  const usable =
    HEIGHT -
    PAD.top -
    PAD.bottom

  return HEIGHT -
    PAD.bottom -
    value / Y_MAX *
      usable
}


export default function BoyleGraph({
  measurements,
}: BoyleGraphProps) {
  const points =
    useMemo(
      () =>
        measurements
          .map(
            (measurement) => ({
              x:
                calculateInverseVolume(
                  measurement.volume,
                ),
              y:
                measurement.pressure,
            }),
          )
          .sort(
            (a, b) =>
              a.x - b.x,
          ),
      [measurements],
    )

  const linePoints =
    points
      .map(
        (point) =>
          `${mapX(point.x)},${mapY(point.y)}`,
      )
      .join(' ')

  const idealStartX =
    calculateInverseVolume(
      boylePhysicsConfig.volumeMax,
    )

  const idealEndX =
    calculateInverseVolume(
      boylePhysicsConfig.volumeMin,
    )

  const idealStartY =
    boylePhysicsConfig.boyleConstant *
    idealStartX

  const idealEndY =
    boylePhysicsConfig.boyleConstant *
    idealEndX

  const meanPV =
    calculateMeanPressureVolume(
      measurements,
    )

  const maxDeviation =
    calculateMaxPressureVolumeDeviationPercent(
      measurements,
      boylePhysicsConfig.boyleConstant,
    )


  return (
    <section className="boyle-graph">
      <div className="boyle-graph__header">
        <div>
          <span className="boyle-eyebrow">
            Phân tích dữ liệu
          </span>
          <h3>Đồ thị p theo 1/V</h3>
        </div>

        <span className="boyle-graph__count">
          {measurements.length} điểm
        </span>
      </div>

      {measurements.length === 0 ? (
        <div className="boyle-graph__empty">
          Ghi ít nhất một lần đo để bắt đầu dựng đồ thị.
        </div>
      ) : (
        <div className="boyle-graph__chart">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label="Đồ thị áp suất p theo nghịch đảo thể tích 1 trên V"
          >
            {[0.25, 0.5, 0.75].map(
              (tick) => (
                <g key={`x-${tick}`}>
                  <line
                    x1={mapX(tick)}
                    x2={mapX(tick)}
                    y1={PAD.top}
                    y2={HEIGHT - PAD.bottom}
                    className="boyle-graph__grid"
                  />
                  <text
                    x={mapX(tick)}
                    y={HEIGHT - 14}
                    textAnchor="middle"
                    className="boyle-graph__label"
                  >
                    {tick}
                  </text>
                </g>
              ),
            )}

            {[0.5, 1, 1.5, 2].map(
              (tick) => (
                <g key={`y-${tick}`}>
                  <line
                    x1={PAD.left}
                    x2={WIDTH - PAD.right}
                    y1={mapY(tick)}
                    y2={mapY(tick)}
                    className="boyle-graph__grid"
                  />
                  <text
                    x={PAD.left - 8}
                    y={mapY(tick) + 4}
                    textAnchor="end"
                    className="boyle-graph__label"
                  >
                    {tick}
                  </text>
                </g>
              ),
            )}

            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={HEIGHT - PAD.bottom}
              y2={HEIGHT - PAD.bottom}
              className="boyle-graph__axis"
            />

            <line
              x1={PAD.left}
              x2={PAD.left}
              y1={PAD.top}
              y2={HEIGHT - PAD.bottom}
              className="boyle-graph__axis"
            />

            <line
              x1={mapX(idealStartX)}
              y1={mapY(idealStartY)}
              x2={mapX(idealEndX)}
              y2={mapY(idealEndY)}
              className="boyle-graph__ideal"
            />

            {points.length > 1 && (
              <polyline
                points={linePoints}
                className="boyle-graph__line"
              />
            )}

            {points.map(
              (point, index) => (
                <circle
                  key={`${point.x}-${index}`}
                  cx={mapX(point.x)}
                  cy={mapY(point.y)}
                  r="4"
                  className="boyle-graph__point"
                />
              ),
            )}

            <text
              x={WIDTH / 2}
              y={HEIGHT - 1}
              textAnchor="middle"
              className="boyle-graph__axis-title"
            >
              1/V ({boyleUnits.inverseVolume})
            </text>

            <text
              x="12"
              y={HEIGHT / 2}
              textAnchor="middle"
              transform={`rotate(-90 12 ${HEIGHT / 2})`}
              className="boyle-graph__axis-title"
            >
              p ({boyleUnits.pressure})
            </text>
          </svg>
        </div>
      )}

      <div className="boyle-result-grid">
        <div className="boyle-result-card">
          <span>pV trung bình</span>
          <strong>
            {meanPV === null
              ? 'Chưa có số liệu'
              : `${meanPV.toFixed(3)} ${boyleUnits.pressureVolume}`}
          </strong>
        </div>

        <div className="boyle-result-card">
          <span>Độ lệch lớn nhất</span>
          <strong>
            {maxDeviation === null
              ? 'Chưa có số liệu'
              : `${maxDeviation.toFixed(2)}%`}
          </strong>
        </div>

        <div className="boyle-result-card">
          <span>Số điểm đo</span>
          <strong>
            {measurements.length}
            {' / '}
            {boylePhysicsConfig.targetMeasurementCount}
          </strong>
        </div>
      </div>
    </section>
  )
}
