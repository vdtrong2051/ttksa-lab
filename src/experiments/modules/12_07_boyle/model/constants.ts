export const boylePhysicsConfig = {
  volumeMin: 1.5,
  volumeMax: 3.0,
  boyleConstant: 3.0,
  duplicateVolumeTolerance: 0.1,
  targetMeasurementCount: 5,
  ambientTemperatureC: 27,
} as const


export const boyleUnits = {
  volume: 'cm³',
  pressure: '10⁵ Pa',
  pressureVolume: '10⁵ Pa·cm³',
  inverseVolume: 'cm⁻³',
  temperature: '°C',
} as const
