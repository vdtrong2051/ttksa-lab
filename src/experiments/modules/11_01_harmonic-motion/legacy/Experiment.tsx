import {
  useMemo,
  useRef,
  useState,
} from 'react'

import type {
  MutableRefObject,
} from 'react'

import * as THREE from 'three'

import {
  Canvas,
  useFrame,
} from '@react-three/fiber'

import {
  Environment,
  OrbitControls,
  Text,
  Trail,
} from '@react-three/drei'

import {
  InlineMath,
} from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'


type PracticePanel =
  | 'controls'
  | 'observation'
  | null


type AudioWindow =
  Window & {
    playAudio?: (
      name: string,
    ) => void
  }


// ==========================================
// THUẬT TOÁN TẠO LÒ XO 3D
// GIỮ NGUYÊN LÕI CỦA PACK CŨ
// ==========================================

function RealisticSpring({
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


// ==========================================
// SCENE 3D
// GIỮ NGUYÊN MÔ HÌNH / PHYSICS / ANIMATION
// ==========================================

function SimulationScene({
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


// ==========================================
// PRACTICE WORKSPACE
// CHỈ ĐỔI UI, KHÔNG ĐỔI LÕI THÍ NGHIỆM
// ==========================================

export default function Experiment({
  onNext,
  onPrev,
}: {
  onNext:
    () => void

  onPrev:
    () => void
}) {
  const [
    isPlaying,
    setIsPlaying,
  ] =
    useState(
      false,
    )

  const [
    speed,
    setSpeed,
  ] =
    useState(
      1.5,
    )

  const [
    amplitude,
    setAmplitude,
  ] =
    useState(
      2.5,
    )

  const [
    showRays,
    setShowRays,
  ] =
    useState(
      true,
    )

  const [
    activePanel,
    setActivePanel,
  ] =
    useState<
      PracticePanel
    >(
      'controls',
    )


  function playClick() {
    if (
      typeof window ===
      'undefined'
    ) {
      return
    }

    const audioWindow =
      window as
        AudioWindow

    audioWindow.playAudio?.(
      'click',
    )
  }


  function togglePanel(
    panel:
      Exclude<
        PracticePanel,
        null
      >,
  ) {
    playClick()

    setActivePanel(
      (
        current,
      ) =>
        current ===
        panel
          ? null
          : panel,
    )
  }


  function handleTogglePlaying() {
    playClick()

    setIsPlaying(
      (
        current,
      ) =>
        !current,
    )
  }


  function handleToggleRays() {
    playClick()

    setShowRays(
      (
        current,
      ) =>
        !current,
    )
  }


  return (
    <section className="relative h-full w-full overflow-hidden bg-[#020617] text-slate-100">

      {/* =================================================
          CANVAS — GIỮ NGUYÊN LÕI THÍ NGHIỆM
          ================================================= */}

      <div className="absolute inset-0">
        <Canvas
          shadows
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


      {/* =================================================
          TOP HINT
          ================================================= */}

      <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-700/50 bg-slate-950/78 px-4 py-2 text-[10px] font-semibold text-slate-400 shadow-xl backdrop-blur-xl">
          <span>
            Xoay góc nhìn để quan sát rõ
          </span>

          <strong className="text-amber-400">
            bóng đổ trên màn
          </strong>
        </div>
      </div>


      {/* =================================================
          CONTROL PANEL
          ================================================= */}

      {activePanel ===
        'controls' && (
        <aside
          className="
            absolute
            right-[76px]
            top-4
            z-30

            w-[310px]
            max-w-[calc(100%-100px)]
            max-h-[calc(100%-92px)]

            overflow-y-auto
            overflow-x-hidden

            rounded-[18px]
            border
            border-slate-700/50

            bg-slate-950/90
            p-4

            shadow-2xl
            backdrop-blur-xl

            max-md:left-3
            max-md:right-[62px]
            max-md:w-auto
            max-md:max-w-none
          "
        >
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
                Điều khiển
              </span>

              <h3 className="mt-1 text-sm font-bold text-slate-100">
                Dao động điều hòa
              </h3>
            </div>

            <button
              type="button"
              className="
                grid
                h-8
                w-8
                shrink-0
                place-items-center

                rounded-lg
                border
                border-slate-700/60

                bg-slate-900/80
                text-slate-400

                transition

                hover:bg-slate-800
                hover:text-white
              "
              aria-label="Đóng bảng điều khiển"
              onClick={() =>
                setActivePanel(
                  null,
                )
              }
            >
              <AppIcon
                name="close"
                size={15}
              />
            </button>
          </header>


          {/* RUN */}

          <button
            type="button"
            className={[
              `
                mt-4
                flex
                min-h-11
                w-full
                items-center
                justify-center

                rounded-xl
                border

                px-4

                text-[11px]
                font-extrabold
                uppercase
                tracking-[0.08em]

                transition
              `,

              isPlaying
                ? `
                    border-rose-500/30
                    bg-rose-500/10
                    text-rose-300
                    hover:bg-rose-500/15
                  `
                : `
                    border-emerald-500/30
                    bg-emerald-500/10
                    text-emerald-300
                    hover:bg-emerald-500/15
                  `,
            ].join(
              ' ',
            )}
            onClick={
              handleTogglePlaying
            }
          >
            {
              isPlaying
                ? 'Tạm dừng'
                : 'Chạy thí nghiệm'
            }
          </button>


          {/* RAYS */}

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-800 pt-4">
            <div className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                Chùm tia sáng
              </span>

              <small className="mt-1 block text-[9px] leading-4 text-slate-600">
                Hỗ trợ quan sát phương chiếu
              </small>
            </div>

            <button
              type="button"
              aria-label={
                showRays
                  ? 'Ẩn chùm tia sáng'
                  : 'Hiện chùm tia sáng'
              }
              aria-pressed={
                showRays
              }
              className={[
                `
                  relative
                  h-7
                  w-12
                  shrink-0
                  overflow-hidden

                  rounded-full
                  border

                  transition
                `,

                showRays
                  ? `
                      border-amber-400/40
                      bg-amber-500
                    `
                  : `
                      border-slate-600
                      bg-slate-800
                    `,
              ].join(
                ' ',
              )}
              onClick={
                handleToggleRays
              }
            >
              <span
                className={[
                  `
                    absolute
                    left-[3px]
                    top-[3px]

                    h-5
                    w-5

                    rounded-full
                    bg-white

                    shadow-sm

                    transition-transform
                    duration-150
                  `,

                  showRays
                    ? 'translate-x-5'
                    : 'translate-x-0',
                ].join(
                  ' ',
                )}
              />
            </button>
          </div>


          {/* SPEED */}

          <div className="mt-5 border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="harmonic-speed"
                className="min-w-0 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400"
              >
                Tốc độ góc

                {' '}

                <span className="normal-case">
                  (
                  <InlineMath math="\omega" />
                  )
                </span>
              </label>

              <strong className="shrink-0 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] text-emerald-300">
                {
                  speed.toFixed(
                    1,
                  )
                }
                {' rad/s'}
              </strong>
            </div>

            <input
              id="harmonic-speed"
              type="range"
              min="0.5"
              max="4"
              step="0.1"
              value={
                speed
              }
              onChange={
                (
                  event,
                ) =>
                  setSpeed(
                    Number(
                      event
                        .target
                        .value,
                    ),
                  )
              }
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-500"
            />

            <div className="mt-1 flex justify-between font-mono text-[8px] text-slate-600">
              <span>
                0.5
              </span>

              <span>
                4.0
              </span>
            </div>
          </div>


          {/* AMPLITUDE */}

          <div className="mt-5 border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="harmonic-amplitude"
                className="min-w-0 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400"
              >
                Biên độ

                {' '}

                <span className="normal-case">
                  (
                  <InlineMath math="A" />
                  )
                </span>
              </label>

              <strong className="shrink-0 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] text-emerald-300">
                {
                  amplitude.toFixed(
                    1,
                  )
                }
                {' m'}
              </strong>
            </div>

            <input
              id="harmonic-amplitude"
              type="range"
              min="1.5"
              max="3.5"
              step="0.5"
              value={
                amplitude
              }
              onChange={
                (
                  event,
                ) =>
                  setAmplitude(
                    Number(
                      event
                        .target
                        .value,
                    ),
                  )
              }
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-500"
            />

            <div className="mt-1 flex justify-between font-mono text-[8px] text-slate-600">
              <span>
                1.5
              </span>

              <span>
                3.5
              </span>
            </div>
          </div>
        </aside>
      )}


      {/* =================================================
          OBSERVATION PANEL
          ================================================= */}

      {activePanel ===
        'observation' && (
        <aside
          className="
            absolute
            right-[76px]
            top-4
            z-30

            w-[310px]
            max-w-[calc(100%-100px)]
            max-h-[calc(100%-92px)]

            overflow-y-auto
            overflow-x-hidden

            rounded-[18px]
            border
            border-slate-700/50

            bg-slate-950/90
            p-4

            shadow-2xl
            backdrop-blur-xl

            max-md:left-3
            max-md:right-[62px]
            max-md:w-auto
            max-md:max-w-none
          "
        >
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
                Quan sát
              </span>

              <h3 className="mt-1 text-sm font-bold text-slate-100">
                Hiện tượng cần chú ý
              </h3>
            </div>

            <button
              type="button"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-700/60 bg-slate-900/80 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Đóng bảng hiện tượng"
              onClick={() =>
                setActivePanel(
                  null,
                )
              }
            >
              <AppIcon
                name="close"
                size={15}
              />
            </button>
          </header>

          <div className="mt-4 rounded-xl border border-indigo-400/15 bg-indigo-400/[0.05] p-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-indigo-300">
              Dấu hiệu quan sát
            </span>

            <p className="mt-2 text-[11px] leading-5 text-slate-300">
              Bóng của vật hình trụ chuyển động tròn và bóng của quả nặng
              con lắc lò xo chuyển động đồng bộ trên cùng một trục.
            </p>
          </div>

          <div className="mt-3 grid gap-2">
            <ObservationItem
              label="Biên độ"
              formula="A = R"
            />

            <ObservationItem
              label="Tần số góc"
              formula="\omega_{\mathrm{tròn}} = \omega_{\mathrm{DĐĐH}}"
            />

            <ObservationItem
              label="Phương trình"
              formula="x = A\cos(\omega t + \varphi)"
            />
          </div>

          <p className="mt-4 text-[10px] leading-5 text-slate-500">
            Xoay góc nhìn để kiểm tra trực tiếp sự chồng khít
            của hai hình chiếu trên màn.
          </p>
        </aside>
      )}


      {/* =================================================
          RIGHT TOOLBAR
          ================================================= */}

      <aside className="absolute right-4 top-4 z-40 flex w-[48px] flex-col gap-1 rounded-2xl border border-slate-700/50 bg-slate-950/90 p-1.5 shadow-2xl backdrop-blur-xl max-md:right-2 max-md:top-2">
        <ToolbarButton
          label="Điều khiển"
          icon="gauge"
          active={
            activePanel ===
            'controls'
          }
          onClick={() =>
            togglePanel(
              'controls',
            )
          }
        />

        <ToolbarButton
          label="Hiện tượng"
          icon="book-open"
          active={
            activePanel ===
            'observation'
          }
          onClick={() =>
            togglePanel(
              'observation',
            )
          }
        />

        <div className="my-1 h-px bg-slate-800" />

        <ToolbarButton
          label={
            showRays
              ? 'Ẩn tia sáng'
              : 'Hiện tia sáng'
          }
          icon="activity"
          active={
            showRays
          }
          onClick={
            handleToggleRays
          }
        />
      </aside>


      {/* =================================================
          BOTTOM LAB DOCK
          Actions + telemetry cùng một hệ
          ================================================= */}

      <div
        className="
          absolute

          bottom-3
          left-1/2
          z-30

          flex
          max-w-[calc(100%-96px)]
          -translate-x-1/2

          items-stretch

          overflow-hidden

          rounded-[15px]
          border
          border-slate-700/50

          bg-slate-950/88

          shadow-2xl
          backdrop-blur-xl

          max-md:left-2
          max-md:right-[62px]
          max-md:max-w-none
          max-md:translate-x-0
          max-md:overflow-x-auto
        "
      >
        {/* BACK */}

        <button
          type="button"
          className="
            flex
            min-w-[92px]
            items-center
            justify-center

            border-r
            border-slate-800

            px-4
            py-2

            text-[10px]
            font-bold
            text-slate-400

            transition

            hover:bg-slate-900
            hover:text-white
          "
          onClick={() => {
            playClick()

            onPrev()
          }}
        >
          Quay lại
        </button>


        {/* TELEMETRY */}

        <StatusItem
          label="Trạng thái"
          value={
            isPlaying
              ? 'Đang chạy'
              : 'Tạm dừng'
          }
          emphasis={
            isPlaying
              ? 'success'
              : 'normal'
          }
        />

        <StatusItem
          label="Tốc độ góc"
          value={
            `${speed.toFixed(1)} rad/s`
          }
        />

        <StatusItem
          label="Biên độ"
          value={
            `${amplitude.toFixed(1)} m`
          }
        />

        <StatusItem
          label="Tia sáng"
          value={
            showRays
              ? 'Hiện'
              : 'Ẩn'
          }
        />


        {/* CONCLUSION */}

        <button
          type="button"
          className="
            flex
            min-w-[112px]
            items-center
            justify-center
            gap-2

            border-l
            border-amber-400/20

            bg-amber-400/10

            px-4
            py-2

            text-[10px]
            font-extrabold
            text-amber-300

            transition

            hover:bg-amber-400
            hover:text-slate-950
          "
          onClick={() => {
            playClick()

            onNext()
          }}
        >
          <span>
            Kết luận
          </span>

          <AppIcon
            name="chevron-right"
            size={15}
            strokeWidth={2.3}
          />
        </button>
      </div>
    </section>
  )
}


// ==========================================
// TOOLBAR BUTTON
// ==========================================

function ToolbarButton({
  label,
  icon,
  active,
  onClick,
}: {
  label:
    string

  icon:
    'gauge' |
    'book-open' |
    'activity'

  active:
    boolean

  onClick:
    () => void
}) {
  return (
    <button
      type="button"
      title={
        label
      }
      aria-label={
        label
      }
      aria-pressed={
        active
      }
      className={[
        `
          grid
          h-9
          w-9
          place-items-center

          rounded-xl
          border

          transition
        `,

        active
          ? `
              border-amber-400/25
              bg-amber-400/10
              text-amber-300
            `
          : `
              border-transparent
              text-slate-500

              hover:border-slate-700
              hover:bg-slate-900
              hover:text-slate-200
            `,
      ].join(
        ' ',
      )}
      onClick={
        onClick
      }
    >
      <AppIcon
        name={
          icon
        }
        size={17}
        strokeWidth={1.8}
      />
    </button>
  )
}


// ==========================================
// OBSERVATION ITEM
// ==========================================

function ObservationItem({
  label,
  formula,
}: {
  label:
    string

  formula:
    string
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/55 p-3">
      <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-500">
        {
          label
        }
      </span>

      <strong className="mt-1 block overflow-hidden text-sm text-slate-100">
        <InlineMath
          math={
            formula
          }
        />
      </strong>
    </div>
  )
}


// ==========================================
// STATUS ITEM
// ==========================================

function StatusItem({
  label,
  value,
  emphasis =
    'normal',
}: {
  label:
    string

  value:
    string

  emphasis?:
    'normal' |
    'success'
}) {
  return (
    <div className="flex min-w-[104px] flex-col justify-center gap-0.5 border-r border-slate-800 px-3 py-2">
      <span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.08em] text-slate-600">
        {
          label
        }
      </span>

      <strong
        className={[
          'whitespace-nowrap text-[10px] font-bold',

          emphasis ===
          'success'
            ? 'text-emerald-400'
            : 'text-slate-200',
        ].join(
          ' ',
        )}
      >
        {
          value
        }
      </strong>
    </div>
  )
}