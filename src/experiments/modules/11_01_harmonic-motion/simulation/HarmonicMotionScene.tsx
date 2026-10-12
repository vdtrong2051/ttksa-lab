import { useMemo, useRef } from 'react'

import * as THREE from 'three'

import { useFrame } from '@react-three/fiber'

import { Environment, Text, Trail } from '@react-three/drei'

import RealisticSpring from './RealisticSpring'


// ==========================================
// SCENE 3D
// GIỮ NGUYÊN MÔ HÌNH / PHYSICS / ANIMATION
// ==========================================

export default function SimulationScene({
  isPlaying,
  speed,
  amplitude,
  showRays,
}: {
  isPlaying:
    boolean

  speed:
    number

  amplitude:
    number

  showRays:
    boolean
}) {
  const timeRef =
    useRef(
      0,
    )

  const pegRef =
    useRef<
      THREE.Group
    >(
      null,
    )

  const bobRef =
    useRef<
      THREE.Group
    >(
      null,
    )

  const bobYRef =
    useRef<number>(
      4 -
        amplitude,
    )


  // Đích ngắm ánh sáng song song.
  // Giữ nguyên cơ chế bóng đổ của pack cũ.

  const lightTarget =
    useMemo(
      () => {
        const object =
          new THREE.Object3D()

        object.position.set(
          10,
          0,
          0,
        )

        return object
      },
      [],
    )


  const materials =
    useMemo(
      () => ({
        metal:
          new THREE.MeshStandardMaterial({
            color:
              '#334155',

            roughness:
              0.2,

            metalness:
              0.8,
          }),

        rod:
          new THREE.MeshStandardMaterial({
            color:
              '#cbd5e1',

            roughness:
              0.3,

            metalness:
              0.9,
          }),

        redGlowing:
          new THREE.MeshStandardMaterial({
            color:
              '#ef4444',

            emissive:
              '#ef4444',

            emissiveIntensity:
              0.4,
          }),

        blueGlowing:
          new THREE.MeshStandardMaterial({
            color:
              '#3b82f6',

            emissive:
              '#3b82f6',

            emissiveIntensity:
              0.4,
          }),

        orangeScreen:
          new THREE.MeshStandardMaterial({
            color:
              '#fdba74',

            roughness:
              0.9,

            metalness:
              0.1,
          }),
      }),
      [],
    )


  useFrame(
    (
      _state,
      delta,
    ) => {
      if (
        isPlaying
      ) {
        timeRef.current +=
          delta *
          speed
      }


      const t =
        timeRef.current


      // PHƯƠNG TRÌNH DAO ĐỘNG:
      // y = A cos(wt)

      const yPos =
        amplitude *
        Math.cos(
          t,
        )

      const zPos =
        amplitude *
        Math.sin(
          t,
        )


      bobYRef.current =
        yPos


      // Mô-tơ:
      // chuyển động tròn trong mặt phẳng YZ

      if (
        pegRef.current
      ) {
        pegRef.current
          .position
          .set(
            0,
            yPos,
            zPos,
          )
      }


      // Quả nặng:
      // dao động thẳng theo Y

      if (
        bobRef.current
      ) {
        bobRef.current
          .position
          .set(
            0,
            yPos,
            0,
          )
      }
    },
  )


  return (
    <group
      position={[
        0,
        -1,
        0,
      ]}
    >
      {/* ================================================
          HỆ THỐNG ÁNH SÁNG
          ================================================ */}

      <primitive
        object={
          lightTarget
        }
      />

      <directionalLight
        position={[
          -15,
          0,
          0,
        ]}
        target={
          lightTarget
        }
        intensity={2.5}
        castShadow
        shadow-mapSize={[
          4096,
          4096,
        ]}
        shadow-bias={
          -0.0005
        }
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[
            -8,
            8,
            8,
            -8,
            0.1,
            40,
          ]}
        />
      </directionalLight>

      <ambientLight
        intensity={0.6}
      />

      <Environment
        preset="apartment"
      />


      {/* ================================================
          CHÙM TIA SÁNG
          ================================================ */}

      {showRays && (
        <group
          position={[
            -9,
            0,
            0,
          ]}
        >
          {[
            -4,
            -2,
            0,
            2,
            4,
          ].map(
            (
              y,
              index,
            ) => (
              <mesh
                key={
                  index
                }
                position={[
                  0,
                  y,
                  0,
                ]}
                rotation={[
                  0,
                  0,
                  -Math.PI /
                    2,
                ]}
              >
                <cylinderGeometry
                  args={[
                    0.02,
                    0.02,
                    10,
                  ]}
                />

                <meshBasicMaterial
                  color="#ef4444"
                  transparent
                  opacity={
                    0.6
                  }
                />
              </mesh>
            ),
          )}
        </group>
      )}


      {/* ================================================
          MÀN CHẮN
          ================================================ */}

      <group
        position={[
          6,
          0,
          0,
        ]}
        rotation={[
          0,
          -Math.PI /
            2,
          0,
        ]}
      >
        <mesh
          receiveShadow
        >
          <planeGeometry
            args={[
              16,
              12,
            ]}
          />

          <primitive
            object={
              materials
                .orangeScreen
            }
            attach="material"
          />
        </mesh>


        {/* Trục ngang */}

        <mesh
          position={[
            0,
            0,
            0.01,
          ]}
        >
          <planeGeometry
            args={[
              16,
              0.03,
            ]}
          />

          <meshBasicMaterial
            color="#c2410c"
          />
        </mesh>


        {/* Trục dọc */}

        <mesh
          position={[
            0,
            0,
            0.01,
          ]}
        >
          <planeGeometry
            args={[
              0.03,
              12,
            ]}
          />

          <meshBasicMaterial
            color="#c2410c"
          />
        </mesh>


        <Text
          position={[
            0.5,
            amplitude +
              0.3,
            0.02,
          ]}
          fontSize={0.5}
          color="#9a3412"
          font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxM.woff"
        >
          +A
        </Text>

        <Text
          position={[
            0.5,
            -amplitude -
              0.3,
            0.02,
          ]}
          fontSize={0.5}
          color="#9a3412"
          font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxM.woff"
        >
          -A
        </Text>

        <Text
          position={[
            -0.5,
            0.4,
            0.02,
          ]}
          fontSize={0.5}
          color="#9a3412"
          font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxM.woff"
        >
          O
        </Text>

        <Text
          position={[
            7,
            0.5,
            0.02,
          ]}
          fontSize={0.4}
          color="#9a3412"
          font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxM.woff"
        >
          Trục x
        </Text>
      </group>


      {/* ================================================
          CỤM MÔ-TƠ
          ================================================ */}

      <group
        position={[
          -5,
          0,
          0,
        ]}
      >
        {/* Trụ đỡ */}

        <mesh
          position={[
            0,
            -2.5,
            0,
          ]}
          castShadow
        >
          <cylinderGeometry
            args={[
              0.2,
              0.3,
              5,
              32,
            ]}
          />

          <primitive
            object={
              materials
                .metal
            }
            attach="material"
          />
        </mesh>


        {/* Thân mô-tơ */}

        <mesh
          position={[
            0,
            0,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              1.5,
              1.2,
              1.2,
            ]}
          />

          <primitive
            object={
              materials
                .metal
            }
            attach="material"
          />
        </mesh>


        {/* Trục quay */}

        <mesh
          position={[
            1.5,
            0,
            0,
          ]}
          rotation={[
            0,
            0,
            Math.PI /
              2,
          ]}
          castShadow
        >
          <cylinderGeometry
            args={[
              0.08,
              0.08,
              2,
              16,
            ]}
          />

          <primitive
            object={
              materials
                .rod
            }
            attach="material"
          />
        </mesh>


        {/* Đĩa quay */}

        <mesh
          position={[
            2.5,
            0,
            0,
          ]}
          rotation={[
            0,
            0,
            Math.PI /
              2,
          ]}
        >
          <cylinderGeometry
            args={[
              amplitude,
              amplitude,
              0.05,
              64,
            ]}
          />

          <meshPhysicalMaterial
            color="#ffffff"
            transmission={1}
            opacity={0.2}
            transparent
            depthWrite={
              false
            }
          />
        </mesh>


        {/* Vật hình trụ đỏ */}

        <group
          position={[
            2.5,
            0,
            0,
          ]}
        >
          <group
            ref={
              pegRef
            }
          >
            <Trail
              width={0.15}
              color="#ef4444"
              length={40}
              decay={1}
              local={
                false
              }
            >
              <mesh
                rotation={[
                  0,
                  0,
                  Math.PI /
                    2,
                ]}
                castShadow
              >
                <cylinderGeometry
                  args={[
                    0.25,
                    0.25,
                    0.8,
                    32,
                  ]}
                />

                <primitive
                  object={
                    materials
                      .redGlowing
                  }
                  attach="material"
                />
              </mesh>
            </Trail>
          </group>
        </group>
      </group>


      {/* ================================================
          CON LẮC LÒ XO
          ================================================ */}

      <group
        position={[
          1,
          0,
          0,
        ]}
      >
        {/* Giá treo */}

        <mesh
          position={[
            0,
            4.1,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              2,
              0.2,
              2,
            ]}
          />

          <primitive
            object={
              materials
                .metal
            }
            attach="material"
          />
        </mesh>


        <RealisticSpring
          yBob={
            bobYRef
          }
          amplitude={
            amplitude
          }
        />


        <group
          ref={
            bobRef
          }
        >
          <Trail
            width={0.15}
            color="#3b82f6"
            length={20}
            decay={1}
            local={
              false
            }
          >
            <mesh
              castShadow
            >
              <sphereGeometry
                args={[
                  0.5,
                  64,
                  64,
                ]}
              />

              <primitive
                object={
                  materials
                    .blueGlowing
                }
                attach="material"
              />
            </mesh>
          </Trail>
        </group>
      </group>
    </group>
  )
}
