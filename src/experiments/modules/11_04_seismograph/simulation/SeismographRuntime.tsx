
import { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'

import {
  OrbitControls,
} from '@react-three/drei'

import type {
  SeismographController,
} from '../model/types'

import SeismographScene from './SeismographScene'


interface SeismographRuntimeProps {
  controller: SeismographController
}


export default function SeismographRuntime({
  controller,
}: SeismographRuntimeProps) {
  const isCoarsePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

  const frameloop = controller.isRunning
    ? 'always'
    : controller.isPracticeActive
      ? 'demand'
      : 'never'

  return (
    <div className="seismo-runtime">
      <Canvas
        shadows
        dpr={isCoarsePointer ? 1 : [1, 2]}
        frameloop={frameloop}
        camera={{
          position: [2, 1, 16],
          fov: 42,
        }}
        gl={{
          antialias: true,
        }}
      >
        <color
          attach="background"
          args={['#e0f2fe']}
        />

        <Suspense fallback={null}>
          <SeismographScene
            controller={controller}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          target={[-3, -1, 0]}
          maxPolarAngle={Math.PI / 2 - 0.05}
          enableDamping
          dampingFactor={0.05}
          enableRotate={!controller.isCameraLocked}
          enableZoom={!controller.isCameraLocked}
          enablePan={!controller.isCameraLocked}
        />
      </Canvas>
    </div>
  )
}
