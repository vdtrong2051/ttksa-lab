import type {
  BoyleMeasurement,
} from './types'


export function calculatePressure(
  volume: number,
  boyleConstant: number,
) {
  if (volume <= 0) {
    throw new RangeError(
      'Volume must be greater than zero.',
    )
  }

  return boyleConstant / volume
}


export function calculatePressureVolume(
  pressure: number,
  volume: number,
) {
  return pressure * volume
}


export function calculateInverseVolume(
  volume: number,
) {
  if (volume <= 0) {
    throw new RangeError(
      'Volume must be greater than zero.',
    )
  }

  return 1 / volume
}


export function createBoyleMeasurement(
  volume: number,
  boyleConstant: number,
): BoyleMeasurement {
  const pressure =
    calculatePressure(
      volume,
      boyleConstant,
    )

  return {
    volume,
    pressure,
    pressureVolume:
      calculatePressureVolume(
        pressure,
        volume,
      ),
  }
}


export function calculateMeanPressureVolume(
  measurements:
    readonly BoyleMeasurement[],
) {
  if (measurements.length === 0) {
    return null
  }

  return measurements.reduce(
    (
      total,
      measurement,
    ) =>
      total +
      measurement.pressureVolume,
    0,
  ) / measurements.length
}


export function calculateMaxPressureVolumeDeviationPercent(
  measurements:
    readonly BoyleMeasurement[],
  referenceConstant: number,
) {
  if (
    measurements.length === 0 ||
    referenceConstant === 0
  ) {
    return null
  }

  return Math.max(
    ...measurements.map(
      (measurement) =>
        Math.abs(
          measurement.pressureVolume -
            referenceConstant,
        ) /
        Math.abs(referenceConstant) *
        100,
    ),
  )
}
