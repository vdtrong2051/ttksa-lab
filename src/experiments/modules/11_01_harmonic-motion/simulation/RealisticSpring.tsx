import { useRef } from 'react'

import type { MutableRefObject } from 'react'

import * as THREE from 'three'

import { useFrame } from '@react-three/fiber'


// ==========================================
// THUẬT TOÁN TẠO LÒ XO 3D
// GIỮ NGUYÊN LÕI CỦA PACK CŨ
// ==========================================

export default function RealisticSpring({
  yBob,
  amplitude: _amplitude,
}: {
  yBob:
    MutableRefObject<number>

  amplitude:
    number
}) {
  const COIL_COUNT =
    25

  const CEILING_Y =
    4

  const meshRef =
    useRef<
      THREE.InstancedMesh
    >(
      null,
    )

  /*
   * Object3D phải mutable trong useFrame.
   * Dùng ref để không vi phạm React Compiler.
   * Thuật toán lò xo không thay đổi.
   */
  const dummyRef =
    useRef<
      THREE.Object3D |
      null
    >(
      null,
    )


  useFrame(() => {
    if (
      !meshRef.current
    ) {
      return
    }


    if (
      !dummyRef.current
    ) {
      dummyRef.current =
        new THREE.Object3D()
    }


    const dummy =
      dummyRef.current

    const currentY =
      yBob.current

    const length =
      CEILING_Y -
      currentY


    for (
      let i = 0;
      i < COIL_COUNT;
      i += 1
    ) {
      const t =
        i /
        (
          COIL_COUNT -
          1
        )


      // Rải đều các vòng lò xo
      // từ trần xuống quả nặng

      dummy.position.set(
        0,

        CEILING_Y -
          t *
            length,

        0,
      )


      dummy.rotation.x =
        Math.PI /
        2


      // Độ nghiêng nhẹ tạo cảm giác
      // đường xoắn của lò xo

      dummy.rotation.y =
        Math.sin(
          t *
            Math.PI,
        ) *
        0.3 *
        (
          length /
          4
        )


      dummy.updateMatrix()


      meshRef.current.setMatrixAt(
        i,
        dummy.matrix,
      )
    }


    meshRef.current
      .instanceMatrix
      .needsUpdate =
        true
  })


  return (
    <instancedMesh
      ref={
        meshRef
      }
      args={[
        undefined,
        undefined,
        COIL_COUNT,
      ]}
      castShadow
    >
      <torusGeometry
        args={[
          0.25,
          0.03,
          16,
          32,
        ]}
      />

      <meshStandardMaterial
        color="#94a3b8"
        metalness={0.9}
        roughness={0.2}
      />
    </instancedMesh>
  )
}
