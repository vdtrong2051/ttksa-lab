
import {
  Suspense,
} from 'react'

import * as THREE from 'three'

import {
  Canvas,
} from '@react-three/fiber'

import {
  OrbitControls,
} from '@react-three/drei'

import ForcedResonanceScene from './ForcedResonanceScene'

import type {
  ResonanceController,
} from './types'


interface ForcedResonanceRuntimeProps {
  controller: ResonanceController
}


export default function ForcedResonanceRuntime({
  controller,
}: ForcedResonanceRuntimeProps) {
  /*
   * Thiết bị cảm ứng chính, ví dụ iPad:
   * giới hạn DPR để giảm chi phí dựng hình.
   *
   * Đây là điều chỉnh hiệu năng,
   * không thay đổi mô hình vật lý.
   */
  const isCoarsePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

  /*
   * Khi thực hành và đang Play:
   *   render liên tục.
   *
   * Khi Practice nhưng đang Pause:
   *   render theo yêu cầu, ví dụ xoay camera.
   *
   * Khi ở phase khác:
   *   ngừng vòng dựng khung hình.
   *
   * Canvas vẫn tồn tại sau lần mount đầu.
   */
  const frameLoop:
    'always' | 'demand' | 'never' =
    controller.isRunning
      ? 'always'
      : controller.isPracticeActive
        ? 'demand'
        : 'never'

  return (
    <div className="h-full w-full overflow-hidden bg-[#f8fafc]">
      <Canvas
        shadows
        dpr={
          isCoarsePointer
            ? 1
            : [1, 2]
        }
        frameloop={frameLoop}
        camera={{
          position: [20, 5, 25],
          fov: 45,
        }}
        gl={{
          antialias: true,
          toneMapping:
            THREE.ACESFilmicToneMapping,
        }}
      >
        <color
          attach="background"
          args={['#f8fafc']}
        />

        <fog
          attach="fog"
          args={['#f8fafc', 25, 75]}
        />

        <Suspense fallback={null}>
          <ForcedResonanceScene
            controller={controller}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          target={[0, -2, 0]}
          maxPolarAngle={
            Math.PI / 2 - 0.05
          }
          enableRotate={
            !controller.isCameraLocked
          }
          enableZoom={
            !controller.isCameraLocked
          }
          enablePan={
            !controller.isCameraLocked
          }
        />
      </Canvas>
    </div>
  )
}
