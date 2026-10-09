
import {
  useRef,
} from 'react'

import type {
  RefObject,
} from 'react'

import * as THREE from 'three'

import {
  useFrame,
} from '@react-three/fiber'

import {
  Text,
  Trail,
} from '@react-three/drei'


interface PendulumProps {
  length: number
  driverLength: number

  timeRef: RefObject<number>

  color: string
  label: string

  isDriver?: boolean
}


export default function Pendulum({
  length,
  driverLength,
  timeRef,
  color,
  label,
  isDriver = false,
}: PendulumProps) {
  const groupRef =
    useRef<THREE.Group>(null)

  const textRef =
    useRef<THREE.Group>(null)

  useFrame(() => {
    const group = groupRef.current

    if (!group) return

    const t = timeRef.current

    const g = 9.8
    const beta = 0.15

    const omegaD =
      Math.sqrt(g / driverLength)

    const omega0 =
      Math.sqrt(g / length)

    let currentAngle = 0

    if (isDriver) {
      currentAngle =
        0.6 * Math.cos(omegaD * t)
    } else {
      const F0 = 0.8

      const deltaOmegaSq =
        omega0 * omega0 -
        omegaD * omegaD

      const amplitude =
        F0 /
        Math.sqrt(
          deltaOmegaSq * deltaOmegaSq +
          4 * beta * beta *
            omegaD * omegaD,
        )

      const phase =
        Math.atan2(
          2 * beta * omegaD,
          deltaOmegaSq,
        )

      const transient =
        1 - Math.exp(-beta * t)

      currentAngle =
        amplitude *
        transient *
        Math.cos(
          omegaD * t - phase,
        )
    }

    group.rotation.x = currentAngle

    // Giữ nhãn thẳng đứng theo logic ZIP.
    if (textRef.current) {
      textRef.current.rotation.x =
        -currentAngle
    }
  })

  return (
    <group ref={groupRef}>
      {/* Vòng khuyên kim loại */}
      <mesh
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <torusGeometry
          args={[0.16, 0.015, 16, 32]}
        />

        <meshStandardMaterial
          color="#64748b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Dây treo */}
      <mesh
        position={[0, -length / 2, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[0.008, 0.008, length]}
        />

        <meshStandardMaterial
          color="#1e293b"
          roughness={0.9}
        />
      </mesh>

      {/* Quả nặng */}
      <group position={[0, -length, 0]}>
        <Trail
          width={isDriver ? 0.2 : 0.1}
          color={color}
          length={1.5}
          decay={1}
          attenuation={(t) => t * t}
        >
          <mesh castShadow>
            <sphereGeometry
              args={[
                isDriver ? 0.35 : 0.28,
                64,
                64,
              ]}
            />

            <meshPhysicalMaterial
              color={color}
              roughness={0.15}
              metalness={0.3}
              clearcoat={0.5}
              clearcoatRoughness={0.2}
            />
          </mesh>
        </Trail>

        {/* Nhãn con lắc */}
        <group
          ref={textRef}
          position={[0, -0.65, 0]}
        >
          <Text
            fontSize={0.25}
            color="#0f172a"
            outlineWidth={0.03}
            outlineColor="#ffffff"
            fontWeight="bold"
          >
            {label}
          </Text>
        </group>
      </group>
    </group>
  )
}
