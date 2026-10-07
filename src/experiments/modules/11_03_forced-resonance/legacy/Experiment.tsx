import {
  useEffect,
  useRef,
  useState,
} from 'react'

import type {
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from 'react'

import * as THREE from 'three'

import {
  Canvas,
  useFrame,
} from '@react-three/fiber'

import {
  ContactShadows,
  Environment,
  Grid,
  OrbitControls,
  Text,
  Trail,
} from '@react-three/drei'

import AppIcon from '../../../../components/ui/AppIcon'


interface AudioWindow extends Window {
  playAudio?:
    (
      name:
        string,
    ) => void
}


interface PendulumState {
  length:
    number

  posX:
    number
}


type PracticePanel =
  | 'controls'
  | 'observation'
  | null


// ==========================================
// COMPONENT CON LẮC
//
// Giữ nguyên lõi vật lý của pack nguồn:
// - omegaD = sqrt(g / driverLength)
// - omega0 = sqrt(g / length)
// - beta = 0.15
// - F0 = 0.8
// - transient = 1 - exp(-beta*t)
// ==========================================

function Pendulum({
  length,
  driverLength,
  timeRef,
  color,
  label,
  isDriver =
    false,
}: {
  length:
    number

  driverLength:
    number

  timeRef:
    MutableRefObject<number>

  color:
    string

  label:
    string

  isDriver?:
    boolean
}) {
  const groupRef =
    useRef<
      THREE.Group
    >(
      null,
    )

  const textRef =
    useRef<
      THREE.Group
    >(
      null,
    )


  useFrame(() => {
    if (
      !groupRef.current
    ) {
      return
    }


    const t =
      timeRef.current

    const g =
      9.8

    const beta =
      0.15

    const omegaD =
      Math.sqrt(
        g /
        driverLength,
      )

    const omega0 =
      Math.sqrt(
        g /
        length,
      )


    let currentAngle =
      0


    if (
      isDriver
    ) {
      currentAngle =
        0.6 *
        Math.cos(
          omegaD *
          t,
        )
    } else {
      const F0 =
        0.8

      const deltaOmegaSq =
        omega0 *
        omega0 -
        omegaD *
        omegaD

      const amplitude =
        F0 /
        Math.sqrt(
          deltaOmegaSq *
            deltaOmegaSq +
          4 *
            beta *
            beta *
            omegaD *
            omegaD,
        )

      const phase =
        Math.atan2(
          2 *
            beta *
            omegaD,
          deltaOmegaSq,
        )

      const transient =
        1 -
        Math.exp(
          -beta *
          t,
        )


      currentAngle =
        amplitude *
        transient *
        Math.cos(
          omegaD *
            t -
          phase,
        )
    }


    groupRef.current
      .rotation
      .z =
        currentAngle


    // Giữ nhãn luôn thẳng đứng như pack nguồn.
    if (
      textRef.current
    ) {
      textRef.current
        .rotation
        .z =
          -currentAngle
    }
  })


  return (
    <group
      ref={
        groupRef
      }
    >
      <mesh
        rotation={[
          Math.PI /
            2,
          0,
          0,
        ]}
        castShadow
      >
        <torusGeometry
          args={[
            0.16,
            0.015,
            16,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#64748b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>


      <mesh
        position={[
          0,
          -length /
            2,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.008,
            0.008,
            length,
          ]}
        />

        <meshStandardMaterial
          color="#1e293b"
          roughness={0.9}
        />
      </mesh>


      <group
        position={[
          0,
          -length,
          0,
        ]}
      >
        <Trail
          width={
            isDriver
              ? 0.2
              : 0.1
          }
          color={
            color
          }
          length={1.5}
          decay={1}
          attenuation={
            (
              value,
            ) =>
              value *
              value
          }
        >
          <mesh
            castShadow
          >
            <sphereGeometry
              args={[
                isDriver
                  ? 0.35
                  : 0.28,
                64,
                64,
              ]}
            />

            {/*
             * Pack nguồn đặt clearcoat lên meshStandardMaterial.
             * Dùng meshPhysicalMaterial để giữ đúng các thông số
             * visual đó nhưng tương thích type Three/R3F hiện tại.
             */}
            <meshPhysicalMaterial
              color={
                color
              }
              roughness={0.15}
              metalness={0.3}
              clearcoat={0.5}
              clearcoatRoughness={0.2}
            />
          </mesh>
        </Trail>


        <group
          ref={
            textRef
          }
          position={[
            0,
            -0.65,
            0,
          ]}
        >
          <Text
            fontSize={0.25}
            color="#0f172a"
            outlineWidth={0.03}
            outlineColor="#ffffff"
            fontWeight="bold"
          >
            {
              label
            }
          </Text>
        </group>
      </group>
    </group>
  )
}


// ==========================================
// SCENE 3D
// Giữ mô hình, vật liệu, camera interaction
// và công thức chuyển động của pack nguồn.
// ==========================================

function SimulationScene({
  isPlaying,
  resetKey,
  driver,
  p1,
  p2,
  p3,
}: {
  isPlaying:
    boolean

  resetKey:
    number

  driver:
    PendulumState

  p1:
    PendulumState

  p2:
    PendulumState

  p3:
    PendulumState
}) {
  const timeRef =
    useRef(
      0,
    )


  useFrame(
    (
      _,
      delta,
    ) => {
      if (
        isPlaying
      ) {
        timeRef.current +=
          delta
      }
    },
  )


  useEffect(
    () => {
      timeRef.current =
        0
    },
    [
      resetKey,
    ],
  )


  return (
    <group
      position={[
        0,
        4,
        0,
      ]}
    >
      <directionalLight
        position={[
          15,
          20,
          15,
        ]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[
          4096,
          4096,
        ]}
        shadow-bias={
          -0.0001
        }
      />

      <directionalLight
        position={[
          -10,
          10,
          -10,
        ]}
        intensity={0.5}
      />

      <ambientLight
        intensity={0.6}
      />

      <Environment
        preset="city"
      />


      <mesh
        position={[
          -7.5,
          -4,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.15,
            0.15,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh
        position={[
          -7.5,
          -8,
          0,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            3,
            0.2,
            3,
          ]}
        />

        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
        />
      </mesh>


      <mesh
        position={[
          7.5,
          -4,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.15,
            0.15,
            8,
          ]}
        />

        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh
        position={[
          7.5,
          -8,
          0,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[
            3,
            0.2,
            3,
          ]}
        />

        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
        />
      </mesh>


      <mesh
        position={[
          0,
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
            0.15,
            0.15,
            15,
          ]}
        />

        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>


      <group
        position={[
          driver.posX,
          0,
          0,
        ]}
      >
        <Pendulum
          length={
            driver.length
          }
          driverLength={
            driver.length
          }
          timeRef={
            timeRef
          }
          color="#ef4444"
          label={
            `Con lắc Đ (${driver.length.toFixed(1)}m)`
          }
          isDriver
        />
      </group>


      <group
        position={[
          p1.posX,
          0,
          0,
        ]}
      >
        <Pendulum
          length={
            p1.length
          }
          driverLength={
            driver.length
          }
          timeRef={
            timeRef
          }
          color="#3b82f6"
          label={
            `L1 (${p1.length.toFixed(1)}m)`
          }
        />
      </group>


      <group
        position={[
          p2.posX,
          0,
          0,
        ]}
      >
        <Pendulum
          length={
            p2.length
          }
          driverLength={
            driver.length
          }
          timeRef={
            timeRef
          }
          color="#10b981"
          label={
            `L2 (${p2.length.toFixed(1)}m)`
          }
        />
      </group>


      <group
        position={[
          p3.posX,
          0,
          0,
        ]}
      >
        <Pendulum
          length={
            p3.length
          }
          driverLength={
            driver.length
          }
          timeRef={
            timeRef
          }
          color="#8b5cf6"
          label={
            `L3 (${p3.length.toFixed(1)}m)`
          }
        />
      </group>


      <mesh
        position={[
          0,
          -8.1,
          0,
        ]}
        rotation={[
          -Math.PI /
            2,
          0,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[
            50,
            30,
          ]}
        />

        <meshStandardMaterial
          color="#f8fafc"
          roughness={1}
        />
      </mesh>


      <Grid
        position={[
          0,
          -8.09,
          0,
        ]}
        args={[
          50,
          30,
        ]}
        cellSize={1}
        cellThickness={1.5}
        cellColor="#e2e8f0"
        sectionSize={5}
        sectionColor="#cbd5e1"
        fadeDistance={30}
      />


      <ContactShadows
        position={[
          0,
          -8.08,
          0,
        ]}
        opacity={0.4}
        scale={40}
        blur={2}
        far={10}
        color="#0f172a"
      />
    </group>
  )
}


// ==========================================
// PRACTICE WORKSPACE
// Chỉ thay UI bố trí; core mô phỏng phía trên giữ nguyên.
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
    resetKey,
    setResetKey,
  ] =
    useState(
      0,
    )

  const [
    isCameraLocked,
    setIsCameraLocked,
  ] =
    useState(
      false,
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

  const [
    driver,
    setDriver,
  ] =
    useState<
      PendulumState
    >({
      length:
        5,

      posX:
        -3,
    })

  const [
    p1,
    setP1,
  ] =
    useState<
      PendulumState
    >({
      length:
        3,

      posX:
        0,
    })

  const [
    p2,
    setP2,
  ] =
    useState<
      PendulumState
    >({
      length:
        5,

      posX:
        3,
    })

  const [
    p3,
    setP3,
  ] =
    useState<
      PendulumState
    >({
      length:
        7,

      posX:
        6,
    })


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


  function handlePlayPause() {
    // Giữ đúng hành vi source:
    // khi đang chạy mà bấm lại -> dừng + reset thời gian.
    playClick()

    if (
      isPlaying
    ) {
      setIsPlaying(
        false,
      )

      setResetKey(
        (
          current,
        ) =>
          current +
          1,
      )

      return
    }

    setIsPlaying(
      true,
    )
  }


  const resonanceLabels:
    string[] = []

  if (
    driver.length ===
    p1.length
  ) {
    resonanceLabels.push(
      'L1',
    )
  }

  if (
    driver.length ===
    p2.length
  ) {
    resonanceLabels.push(
      'L2',
    )
  }

  if (
    driver.length ===
    p3.length
  ) {
    resonanceLabels.push(
      'L3',
    )
  }


  const isResonance =
    resonanceLabels.length >
    0

  const resonanceLabel =
    resonanceLabels.join(
      ', ',
    )


  return (
    <section className="relative h-full w-full overflow-hidden bg-[#f8fafc] text-slate-100">
      {/* ================================================
          FULL CANVAS
          ================================================ */}

      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{
            position: [
              1.5,
              3,
              26,
            ],

            fov:
              40,
          }}
          gl={{
            antialias:
              true,

            toneMapping:
              THREE
                .ACESFilmicToneMapping,
          }}
          dpr={[
            1,
            2,
          ]}
        >
          <color
            attach="background"
            args={[
              '#f8fafc',
            ]}
          />

          <fog
            attach="fog"
            args={[
              '#f8fafc',
              20,
              60,
            ]}
          />

          <SimulationScene
            isPlaying={
              isPlaying
            }
            resetKey={
              resetKey
            }
            driver={
              driver
            }
            p1={
              p1
            }
            p2={
              p2
            }
            p3={
              p3
            }
          />

          <OrbitControls
            makeDefault
            maxPolarAngle={
              Math.PI /
                2 -
              0.05
            }
            target={[
              0,
              0,
              0,
            ]}
            enableRotate={
              !isCameraLocked
            }
            enableZoom={
              !isCameraLocked
            }
            enablePan={
              !isCameraLocked
            }
          />
        </Canvas>
      </div>


      {/* ================================================
          TOP STATUS / RESONANCE
          ================================================ */}

      {isPlaying &&
      isResonance && (
        <div className="pointer-events-none absolute left-1/2 top-3 z-30 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-2xl border border-amber-400/35 bg-slate-950/88 px-4 py-2.5 shadow-2xl backdrop-blur-xl">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
              <AppIcon
                name="waves"
                size={17}
                strokeWidth={1.9}
              />
            </span>

            <div>
              <span className="block text-[8px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
                Hiện tượng cộng hưởng
              </span>

              <strong className="mt-0.5 block whitespace-nowrap text-[11px] text-slate-100">
                {
                  `Con lắc ${resonanceLabel} có cùng chiều dài với con lắc Đ`
                }
              </strong>
            </div>
          </div>
        </div>
      )}


      {/* ================================================
          CONTROL PANEL
          ================================================ */}

      {activePanel ===
        'controls' && (
        <aside className="absolute right-[76px] top-4 z-30 w-[360px] max-w-[calc(100%_-_100px)] max-h-[calc(100%_-_88px)] overflow-y-auto overflow-x-hidden rounded-[18px] border border-slate-700/50 bg-slate-950/92 p-4 shadow-2xl backdrop-blur-xl max-md:left-3 max-md:right-[62px] max-md:w-auto max-md:max-w-none">
          <header className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
                Điều khiển
              </span>

              <h3 className="mt-1 text-sm font-bold text-slate-100">
                Hệ con lắc cưỡng bức
              </h3>
            </div>

            <button
              type="button"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-700/60 bg-slate-900/80 text-slate-400 transition hover:bg-slate-800 hover:text-white"
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


          <button
            type="button"
            className={[
              'mt-4 flex min-h-11 w-full items-center justify-center rounded-xl border px-4 text-[11px] font-extrabold uppercase tracking-[0.08em] transition',

              isPlaying
                ? 'border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/15'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15',
            ].join(
              ' ',
            )}
            onClick={
              handlePlayPause
            }
          >
            {
              isPlaying
                ? 'Dừng & reset'
                : 'Thả con lắc Đ'
            }
          </button>


          {isPlaying && (
            <p className="mt-2 rounded-lg border border-rose-500/15 bg-rose-500/[0.06] px-3 py-2 text-[9px] leading-4 text-rose-300">
              Dừng thí nghiệm trước khi thay đổi chiều dài hoặc vị trí các con lắc.
            </p>
          )}


          <div className="mt-4 grid gap-3 border-t border-slate-800 pt-4">
            <PendulumControl
              title="Con lắc Đ"
              dotClass="bg-rose-500"
              state={
                driver
              }
              setState={
                setDriver
              }
              disabled={
                isPlaying
              }
              accentClass="accent-rose-500"
            />

            <PendulumControl
              title="L1"
              dotClass="bg-blue-500"
              state={
                p1
              }
              setState={
                setP1
              }
              disabled={
                isPlaying
              }
              accentClass="accent-blue-500"
            />

            <PendulumControl
              title="L2"
              dotClass="bg-emerald-500"
              state={
                p2
              }
              setState={
                setP2
              }
              disabled={
                isPlaying
              }
              accentClass="accent-emerald-500"
            />

            <PendulumControl
              title="L3"
              dotClass="bg-violet-500"
              state={
                p3
              }
              setState={
                setP3
              }
              disabled={
                isPlaying
              }
              accentClass="accent-violet-500"
            />
          </div>
        </aside>
      )}


      {/* ================================================
          OBSERVATION PANEL
          ================================================ */}

      {activePanel ===
        'observation' && (
        <aside className="absolute right-[76px] top-4 z-30 w-[320px] max-w-[calc(100%_-_100px)] max-h-[calc(100%_-_88px)] overflow-y-auto overflow-x-hidden rounded-[18px] border border-slate-700/50 bg-slate-950/92 p-4 shadow-2xl backdrop-blur-xl max-md:left-3 max-md:right-[62px] max-md:w-auto max-md:max-w-none">
          <header className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-amber-400">
                Quan sát
              </span>

              <h3 className="mt-1 text-sm font-bold text-slate-100">
                Điều kiện cộng hưởng
              </h3>
            </div>

            <button
              type="button"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-700/60 bg-slate-900/80 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Đóng bảng quan sát"
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


          <div className="mt-4 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] p-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-amber-300">
              Dấu hiệu
            </span>

            <p className="mt-2 text-[11px] leading-5 text-slate-300">
              Các con lắc thử đều bị cưỡng bức dao động.
              Con lắc có chiều dài bằng con lắc Đ sẽ có tần số riêng trùng với tần số ngoại lực và dao động mạnh nhất.
            </p>
          </div>


          <div className="mt-3 grid gap-2">
            <ObservationItem
              label="Chiều dài nguồn Đ"
              value={
                `${driver.length.toFixed(1)} m`
              }
            />

            <ObservationItem
              label="Con lắc trùng chiều dài"
              value={
                isResonance
                  ? resonanceLabel
                  : 'Không có'
              }
              emphasis={
                isResonance
              }
            />

            <ObservationItem
              label="Điều kiện"
              value="f = f₀"
              emphasis={
                isResonance
              }
            />
          </div>


          <p className="mt-4 text-[10px] leading-5 text-slate-500">
            Có thể dừng và thay đổi chiều dài từng con lắc để kiểm tra lại điều kiện cộng hưởng.
          </p>
        </aside>
      )}


      {/* ================================================
          RIGHT TOOLBAR
          ================================================ */}

      <aside className="absolute right-4 top-4 z-40 flex w-[48px] flex-col gap-1 rounded-2xl border border-slate-700/50 bg-slate-950/90 p-1.5 shadow-2xl backdrop-blur-xl max-md:right-2 max-md:top-2">
        <ToolbarButton
          label="Điều khiển"
          icon="gauge"
          active={
            activePanel ===
            'controls'
          }
          onClick={() =>
            setActivePanel(
              (
                current,
              ) =>
                current ===
                'controls'
                  ? null
                  : 'controls',
            )
          }
        />

        <ToolbarButton
          label="Quan sát"
          icon="book-open"
          active={
            activePanel ===
            'observation'
          }
          onClick={() =>
            setActivePanel(
              (
                current,
              ) =>
                current ===
                'observation'
                  ? null
                  : 'observation',
            )
          }
        />

        <div className="my-1 h-px bg-slate-800" />

        <ToolbarButton
          label={
            isCameraLocked
              ? 'Mở khóa góc nhìn'
              : 'Khóa góc nhìn'
          }
          icon="orbit"
          active={
            isCameraLocked
          }
          onClick={() =>
            setIsCameraLocked(
              (
                current,
              ) =>
                !current,
            )
          }
        />
      </aside>


      {/* ================================================
          UNIFIED BOTTOM DOCK
          ================================================ */}

      <div className="absolute bottom-3 left-1/2 z-30 flex max-w-[calc(100%_-_96px)] -translate-x-1/2 items-stretch overflow-hidden rounded-[15px] border border-slate-700/50 bg-slate-950/90 shadow-2xl backdrop-blur-xl max-md:left-2 max-md:right-[62px] max-md:max-w-none max-md:translate-x-0 max-md:overflow-x-auto">
        <button
          type="button"
          className="flex min-w-[92px] items-center justify-center border-r border-slate-800 px-4 py-2 text-[10px] font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
          onClick={
            onPrev
          }
        >
          Quay lại
        </button>


        <StatusItem
          label="Trạng thái"
          value={
            isPlaying
              ? 'Đang chạy'
              : 'Sẵn sàng'
          }
          emphasis={
            isPlaying
              ? 'success'
              : 'normal'
          }
        />

        <StatusItem
          label="Con lắc Đ"
          value={
            `${driver.length.toFixed(1)} m`
          }
        />

        <StatusItem
          label="Cộng hưởng"
          value={
            isResonance
              ? resonanceLabel
              : 'Không'
          }
          emphasis={
            isResonance
              ? 'warning'
              : 'normal'
          }
        />

        <StatusItem
          label="Camera"
          value={
            isCameraLocked
              ? 'Đã khóa'
              : 'Tự do'
          }
        />


        <button
          type="button"
          className="flex min-w-[112px] items-center justify-center gap-2 border-l border-amber-400/20 bg-amber-400/10 px-4 py-2 text-[10px] font-extrabold text-amber-300 transition hover:bg-amber-400 hover:text-slate-950"
          onClick={
            onNext
          }
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


function PendulumControl({
  title,
  dotClass,
  state,
  setState,
  disabled,
  accentClass,
}: {
  title:
    string

  dotClass:
    string

  state:
    PendulumState

  setState:
    Dispatch<
      SetStateAction<
        PendulumState
      >
    >

  disabled:
    boolean

  accentClass:
    string
}) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/55 p-3">
      <div className="flex items-center gap-2">
        <span
          className={[
            'h-2.5 w-2.5 rounded-full',
            dotClass,
          ].join(
            ' ',
          )}
        />

        <strong className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-200">
          {
            title
          }
        </strong>
      </div>


      <div className="mt-3 grid gap-3">
        <label>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.06em] text-slate-500">
              Chiều dài
            </span>

            <strong className="font-mono text-[10px] text-slate-300">
              {
                state.length.toFixed(
                  1,
                )
              }
              {' m'}
            </strong>
          </div>

          <input
            type="range"
            min="2"
            max="8"
            step="0.5"
            value={
              state.length
            }
            disabled={
              disabled
            }
            onChange={
              (
                event,
              ) =>
                setState(
                  (
                    current,
                  ) => ({
                    ...current,

                    length:
                      Number(
                        event
                          .target
                          .value,
                      ),
                  }),
                )
            }
            className={[
              'mt-2 h-1.5 w-full appearance-none rounded-full bg-slate-700',

              disabled
                ? 'cursor-not-allowed accent-slate-500 opacity-55'
                : `cursor-pointer ${accentClass}`,
            ].join(
              ' ',
            )}
          />
        </label>


        <label>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.06em] text-slate-500">
              Vị trí
            </span>

            <strong className="font-mono text-[10px] text-slate-300">
              {
                state.posX.toFixed(
                  1,
                )
              }
              {' m'}
            </strong>
          </div>

          <input
            type="range"
            min="-6.5"
            max="6.5"
            step="0.5"
            value={
              state.posX
            }
            disabled={
              disabled
            }
            onChange={
              (
                event,
              ) =>
                setState(
                  (
                    current,
                  ) => ({
                    ...current,

                    posX:
                      Number(
                        event
                          .target
                          .value,
                      ),
                  }),
                )
            }
            className={[
              'mt-2 h-1.5 w-full appearance-none rounded-full bg-slate-700',

              disabled
                ? 'cursor-not-allowed accent-slate-500 opacity-55'
                : `cursor-pointer ${accentClass}`,
            ].join(
              ' ',
            )}
          />
        </label>
      </div>
    </section>
  )
}


function ObservationItem({
  label,
  value,
  emphasis =
    false,
}: {
  label:
    string

  value:
    string

  emphasis?:
    boolean
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/55 p-3">
      <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-500">
        {
          label
        }
      </span>

      <strong
        className={[
          'mt-1 block text-sm',

          emphasis
            ? 'text-amber-300'
            : 'text-slate-100',
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
    'orbit'

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
        'grid h-9 w-9 place-items-center rounded-xl border transition',

        active
          ? 'border-amber-400/25 bg-amber-400/10 text-amber-300'
          : 'border-transparent text-slate-500 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-200',
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
    'success' |
    'warning'
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
            : emphasis ===
                'warning'
              ? 'text-amber-300'
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
