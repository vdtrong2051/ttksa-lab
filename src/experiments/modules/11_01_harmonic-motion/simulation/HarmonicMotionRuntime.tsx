import * as THREE from 'three'

import { Canvas } from '@react-three/fiber'

import { OrbitControls } from '@react-three/drei'

import type {
  HarmonicMotionController,
} from '../controller/useHarmonicMotionController'

import SimulationScene from './HarmonicMotionScene'


interface HarmonicMotionRuntimeProps {
  controller: HarmonicMotionController
}


export default function HarmonicMotionRuntime({
  controller,
}: HarmonicMotionRuntimeProps) {
  const {
    isPlaying,
    speed,
    amplitude,
    showRays,
  } = controller

  return (
      <div className="absolute inset-0">
        <Canvas
          shadows="percentage"
          camera={{
            position: [
              -6,
              3,
              14,
            ],

            fov:
              45,
          }}
          gl={{
            antialias:
              true,

            toneMapping:
              THREE
                .ACESFilmicToneMapping,

            toneMappingExposure:
              1.1,
          }}
          dpr={[
            1,
            2,
          ]}
        >
          <color
            attach="background"
            args={[
              '#020617',
            ]}
          />

          <fog
            attach="fog"
            args={[
              '#020617',
              15,
              40,
            ]}
          />

          <SimulationScene
            isPlaying={
              isPlaying
            }
            speed={
              speed
            }
            amplitude={
              amplitude
            }
            showRays={
              showRays
            }
            timeRef={
              controller.timeRef
            }
          />

          <OrbitControls
            makeDefault
            enablePan={
              false
            }
            minDistance={5}
            maxDistance={25}
            maxPolarAngle={
              Math.PI /
                2 +
              0.1
            }
            target={[
              2,
              0,
              0,
            ]}
          />
        </Canvas>
      </div>
  )
}
