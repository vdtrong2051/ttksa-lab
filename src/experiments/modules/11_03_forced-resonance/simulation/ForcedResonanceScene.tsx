
import {
  useEffect,
} from 'react'

import {
  useFrame,
  useThree,
} from '@react-three/fiber'

import {
  ContactShadows,
  Environment,
  Grid,
} from '@react-three/drei'

import Pendulum from './Pendulum'

import {
  PENDULUM_COLORS,
} from './types'

import type {
  ResonanceController,
} from './types'


interface ForcedResonanceSceneProps {
  controller: ResonanceController
}


export default function ForcedResonanceScene({
  controller,
}: ForcedResonanceSceneProps) {
  const {
    pendulums,
    timeRef,
    isRunning,
    resetVersion,
  } = controller

  const invalidate =
    useThree((state) => state.invalidate)

  /*
   * Đồng hồ mô phỏng chạy trước
   * các callback useFrame của Pendulum.
   *
   * Priority âm không chiếm quyền
   * render mặc định của React Three Fiber.
   */
  useFrame((_, delta) => {
    if (!isRunning) return

    timeRef.current +=
      Math.min(delta, 0.1)
  }, -1)

  /*
   * Khi Reset hoặc sửa cấu hình trong chế độ
   * Pause, yêu cầu vẽ lại một khung hình.
   */
  useEffect(() => {
    if (controller.isPracticeActive) {
      invalidate()
    }
  }, [
    invalidate,
    controller.isPracticeActive,
    controller.resetVersion,
    controller.pendulums,
  ])

  const {
    driver,
    l1,
    l2,
    l3,
  } = pendulums

  return (
    <group position={[0, 4, 0]}>
      {/* Ánh sáng */}
      <directionalLight
        position={[15, 20, 15]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      <directionalLight
        position={[-10, 10, -10]}
        intensity={0.5}
      />

      <ambientLight intensity={0.6} />

      <Environment preset="city" />

      {/* Trụ trái */}
      <mesh
        position={[-7.5, -4, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[0.15, 0.15, 8]}
        />

        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh
        position={[-7.5, -8, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, 0.2, 4]} />

        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
        />
      </mesh>

      {/* Trụ phải */}
      <mesh
        position={[7.5, -4, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[0.15, 0.15, 8]}
        />

        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh
        position={[7.5, -8, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, 0.2, 4]} />

        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
        />
      </mesh>

      {/* Thanh ngang */}
      <mesh
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry
          args={[0.15, 0.15, 15]}
        />

        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Con lắc phát động Đ */}
      <group position={[driver.posX, 0, 0]}>
        <Pendulum
          key={`driver-${resetVersion}`}
          length={driver.length}
          driverLength={driver.length}
          timeRef={timeRef}
          color={PENDULUM_COLORS.driver}
          label={`Đ (${driver.length.toFixed(1)}m)`}
          isDriver
        />
      </group>

      {/* Con lắc L1 */}
      <group position={[l1.posX, 0, 0]}>
        <Pendulum
          key={`l1-${resetVersion}`}
          length={l1.length}
          driverLength={driver.length}
          timeRef={timeRef}
          color={PENDULUM_COLORS.l1}
          label={`L1 (${l1.length.toFixed(1)}m)`}
        />
      </group>

      {/* Con lắc L2 */}
      <group position={[l2.posX, 0, 0]}>
        <Pendulum
          key={`l2-${resetVersion}`}
          length={l2.length}
          driverLength={driver.length}
          timeRef={timeRef}
          color={PENDULUM_COLORS.l2}
          label={`L2 (${l2.length.toFixed(1)}m)`}
        />
      </group>

      {/* Con lắc L3 */}
      <group position={[l3.posX, 0, 0]}>
        <Pendulum
          key={`l3-${resetVersion}`}
          length={l3.length}
          driverLength={driver.length}
          timeRef={timeRef}
          color={PENDULUM_COLORS.l3}
          label={`L3 (${l3.length.toFixed(1)}m)`}
        />
      </group>

      {/* Mặt sàn */}
      <mesh
        position={[0, -8.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 40]} />

        <meshStandardMaterial
          color="#f8fafc"
          roughness={1}
        />
      </mesh>

      {/* Lưới */}
      <Grid
        position={[0, -8.09, 0]}
        args={[50, 40]}
        cellSize={1}
        cellThickness={1.5}
        cellColor="#e2e8f0"
        sectionSize={5}
        sectionColor="#cbd5e1"
        fadeDistance={35}
      />

      {/* Bóng đổ */}
      <ContactShadows
        position={[0, -8.08, 0]}
        opacity={0.4}
        scale={40}
        blur={2}
        far={10}
        color="#0f172a"
      />
    </group>
  )
}
