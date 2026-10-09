import {
  useEffect,
  useMemo,
  useRef,
  useState,
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
} from '@react-three/drei'

import {
  InlineMath,
} from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'

interface Snapshot {
  url:
    string

  damping:
    number
}

type PracticePanel =
  | 'controls'
  | 'data'
  | 'observation'
  | null

// ==========================================
// ĐỒ THỊ 2D — GIỮ NGUYÊN MÔ HÌNH TOÁN CŨ
// ==========================================

function MathGraph({
  damping,
}: {
  damping:
    number
}) {
  const width =
    500

  const height =
    180

  const padding =
    20

  const A0 =
    3

  const omega =
    5

  const maxTime =
    12

  const points:
    string[] = []

  const envelopeTop:
    string[] = []

  const envelopeBottom:
    string[] = []

  const steps =
    300

  for (
    let i = 0;
    i <= steps;
    i += 1
  ) {
    const t =
      (
        i /
        steps
      ) *
      maxTime

    const x =
      A0 *
      Math.exp(
        -damping *
        t,
      ) *
      Math.cos(
        omega *
        t,
      )

    const env =
      A0 *
      Math.exp(
        -damping *
        t,
      )

    const svgX =
      padding +
      (
        t /
        maxTime
      ) *
      (
        width -
        2 *
        padding
      )

    const mapY =
      (
        value:
          number,
      ) =>
        height /
          2 -
        (
          value /
          A0
        ) *
        (
          (
            height -
            2 *
            padding
          ) /
          2
        )

    points.push(
      `${svgX},${mapY(x)}`,
    )

    envelopeTop.push(
      `${svgX},${mapY(env)}`,
    )

    envelopeBottom.push(
      `${svgX},${mapY(-env)}`,
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-inner">
      <div className="absolute left-3 top-2 z-10 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
        Đồ thị 2D trục chuẩn
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        aria-label="Đồ thị dao động tắt dần"
      >
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={
            height -
            padding
          }
          stroke="#f1f5f9"
          strokeWidth="2"
        />

        <line
          x1={padding}
          y1={
            height /
            2
          }
          x2={
            width -
            padding
          }
          y2={
            height /
            2
          }
          stroke="#cbd5e1"
          strokeWidth="2"
        />

        <polyline
          points={
            envelopeTop.join(
              ' ',
            )
          }
          fill="none"
          stroke="#f43f5e"
          strokeDasharray="4 4"
          strokeWidth="1.5"
          opacity="0.6"
        />

        <polyline
          points={
            envelopeBottom.join(
              ' ',
            )
          }
          fill="none"
          stroke="#f43f5e"
          strokeDasharray="4 4"
          strokeWidth="1.5"
          opacity="0.6"
        />

        <polyline
          points={
            points.join(
              ' ',
            )
          }
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ==========================================
// THUẬT TOÁN 3D — GIỮ NGUYÊN THÔNG SỐ CŨ
// ==========================================

const MAX_POINTS =
  10000

function SimulationScene({
  isPlaying,
  damping,
  paperSpeed,
}: {
  isPlaying:
    boolean

  damping:
    number

  paperSpeed:
    number
}) {
  const timeRef =
    useRef(
      0,
    )

  const paperZRef =
    useRef(
      0,
    )

  const pendulumRef =
    useRef<
      THREE.Group
    >(
      null,
    )

  const paperGroupRef =
    useRef<
      THREE.Group
    >(
      null,
    )

  const rollerRef =
    useRef<
      THREE.Mesh
    >(
      null,
    )

  const lineGeoRef =
    useRef<
      THREE.BufferGeometry
    >(
      null,
    )

  const drawCount =
    useRef(
      0,
    )

  // Dùng đối tượng Three.js thật thay cho thẻ SVG <line>.
  // Geometry và material con được R3F gắn vào Line này.
  const traceLine = useMemo(
    () => new THREE.Line(),
    [],
  )

  const materials =
    useMemo(
      () => ({
        metal:
          new THREE.MeshStandardMaterial({
            color:
              '#94a3b8',

            roughness:
              0.2,

            metalness:
              0.8,
          }),

        wood:
          new THREE.MeshStandardMaterial({
            color:
              '#fcd34d',

            roughness:
              0.8,
          }),

        bob:
          new THREE.MeshStandardMaterial({
            color:
              '#ef4444',

            roughness:
              0.3,

            metalness:
              0.3,
          }),

        paper:
          new THREE.MeshStandardMaterial({
            color:
              '#ffffff',

            roughness:
              1,
          }),

        pen:
          new THREE.MeshStandardMaterial({
            color:
              '#1d4ed8',
          }),
      }),
      [],
    )

  useEffect(
    () => {
      const geometry =
        lineGeoRef.current

      if (!geometry) {
        return
      }

      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array(
            MAX_POINTS *
            3,
          ),
          3,
        ),
      )

      geometry.setDrawRange(
        0,
        0,
      )
    },
    [],
  )

  useFrame(
    (
      _state,
      delta,
    ) => {
      if (!isPlaying) {
        return
      }

      timeRef.current +=
        delta

      const t =
        timeRef.current

      paperZRef.current +=
        delta *
        paperSpeed

      if (
        rollerRef.current
      ) {
        rollerRef.current
          .rotation.x -=
            (
              delta *
              paperSpeed
            ) /
            0.2
      }

      const omega =
        5

      const A0 =
        3

      const currentX =
        A0 *
        Math.exp(
          -damping *
          t,
        ) *
        Math.cos(
          omega *
          t,
        )

      const L =
        7.94

      const angle =
        Math.asin(
          currentX /
          L,
        )

      if (
        pendulumRef.current
      ) {
        pendulumRef.current
          .rotation.z =
            angle

        pendulumRef.current
          .scale.y =
            1 /
            Math.cos(
              angle,
            )
      }

      if (
        paperGroupRef.current
      ) {
        paperGroupRef.current
          .position.z =
            paperZRef.current
      }

      const geometry =
        lineGeoRef.current

      if (
        !geometry ||
        drawCount.current >=
          MAX_POINTS
      ) {
        return
      }

      const positionAttribute =
        geometry.getAttribute(
          'position',
        )

      if (
        !positionAttribute
      ) {
        return
      }

      const positions =
        positionAttribute.array as
          Float32Array

      const index =
        drawCount.current *
        3

      positions[
        index
      ] =
        currentX

      positions[
        index +
        1
      ] =
        0.06

      positions[
        index +
        2
      ] =
        -paperZRef.current

      drawCount.current +=
        1

      geometry.setDrawRange(
        0,
        drawCount.current,
      )

      positionAttribute.needsUpdate =
        true
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
      <directionalLight
        position={[
          10,
          15,
          10,
        ]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[
          2048,
          2048,
        ]}
        shadow-bias={
          -0.0001
        }
      />

      <ambientLight
        intensity={0.6}
      />

      <Environment
        preset="apartment"
      />

      <group
        position={[
          0,
          0,
          0,
        ]}
      >
        <mesh
          position={[
            -4.5,
            4,
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

          <primitive
            object={
              materials.metal
            }
            attach="material"
          />
        </mesh>

        <mesh
          position={[
            -4.5,
            0,
            0,
          ]}
          castShadow
        >
          <boxGeometry
            args={[
              1.5,
              0.2,
              1.5,
            ]}
          />

          <primitive
            object={
              materials.wood
            }
            attach="material"
          />
        </mesh>

        <mesh
          position={[
            0,
            8,
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
              0.1,
              0.1,
              9,
            ]}
          />

          <primitive
            object={
              materials.metal
            }
            attach="material"
          />
        </mesh>
      </group>

      <group
        position={[
          0,
          8,
          0,
        ]}
        ref={
          pendulumRef
        }
      >
        <mesh
          position={[
            0,
            -3.4,
            0,
          ]}
          castShadow
        >
          <cylinderGeometry
            args={[
              0.015,
              0.015,
              6.8,
            ]}
          />

          <meshStandardMaterial
            color="#64748b"
          />
        </mesh>

        <mesh
          position={[
            0,
            -6.8,
            0,
          ]}
          castShadow
        >
          <sphereGeometry
            args={[
              0.5,
              32,
              32,
            ]}
          />

          <primitive
            object={
              materials.bob
            }
            attach="material"
          />
        </mesh>

        <mesh
          position={[
            0,
            -7.37,
            0,
          ]}
          castShadow
        >
          <cylinderGeometry
            args={[
              0.04,
              0.02,
              1.14,
            ]}
          />

          <primitive
            object={
              materials.pen
            }
            attach="material"
          />
        </mesh>
      </group>

      <group>
        <mesh
          ref={
            rollerRef
          }
          position={[
            0,
            -0.1,
            0,
          ]}
          rotation={[
            0,
            0,
            Math.PI /
              2,
          ]}
          receiveShadow
          castShadow
        >
          <cylinderGeometry
            args={[
              0.2,
              0.2,
              8.2,
              32,
            ]}
          />

          <primitive
            object={
              materials.metal
            }
            attach="material"
          />
        </mesh>

        <group
          ref={
            paperGroupRef
          }
        >
          <mesh
            position={[
              0,
              0,
              -40,
            ]}
            receiveShadow
          >
            <boxGeometry
              args={[
                8,
                0.1,
                80,
              ]}
            />

            <primitive
              object={
                materials.paper
              }
              attach="material"
            />
          </mesh>

          <Grid
            position={[
              0,
              0.05,
              -40,
            ]}
            args={[
              8,
              80,
            ]}
            cellSize={0.5}
            cellThickness={1.5}
            cellColor="#e2e8f0"
            sectionSize={2}
            sectionColor="#cbd5e1"
            fadeDistance={40}
          />

          <primitive
            object={traceLine}
            frustumCulled={false}
          >
            <bufferGeometry ref={lineGeoRef} />

            <lineBasicMaterial
              color="#1d4ed8"
              linewidth={3}
            />
          </primitive>
        </group>
      </group>

      <ContactShadows
        position={[
          0,
          -0.21,
          0,
        ]}
        opacity={0.4}
        scale={30}
        blur={1.5}
        far={4}
      />
    </group>
  )
}

// ==========================================
// PRACTICE WORKSPACE
// CORE INTERACTION GIỮ NGUYÊN, UI CHUẨN HÓA
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
    damping,
    setDamping,
  ] =
    useState(
      0.12,
    )

  const [
    paperSpeed,
    setPaperSpeed,
  ] =
    useState(
      3.5,
    )

  const [
    hasStarted,
    setHasStarted,
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
    snapshots,
    setSnapshots,
  ] =
    useState<
      Snapshot[]
    >(
      [],
    )

  const [
    showComparison,
    setShowComparison,
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

  function handlePlayPause() {
    setIsPlaying(
      (
        current,
      ) =>
        !current,
    )

    if (!hasStarted) {
      setHasStarted(
        true,
      )
    }
  }

  function handleReset() {
    setIsPlaying(
      false,
    )

    setHasStarted(
      false,
    )

    setResetKey(
      (
        current,
      ) =>
        current +
        1,
    )
  }

  function captureSnapshot() {
    const canvas =
      document.querySelector(
        '.damped-oscillation-runtime canvas',
      )

    if (
      !(canvas instanceof HTMLCanvasElement)
    ) {
      return
    }

    const url =
      canvas.toDataURL(
        'image/png',
      )

    setSnapshots(
      (
        current,
      ) => {
        const next = [
          ...current,
          {
            url,
            damping,
          },
        ]

        return next.slice(
          -2,
        )
      },
    )
  }

  function clearSnapshots() {
    setSnapshots(
      [],
    )
  }

  function togglePanel(
    panel:
      Exclude<
        PracticePanel,
        null
      >,
  ) {
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

  return (
    <section className="relative h-full w-full overflow-hidden bg-slate-100 text-slate-100">
      {/* ===============================================
          CANVAS — GIỮ NGUYÊN MÔ HÌNH THÍ NGHIỆM
          =============================================== */}

      <div
        className={[
          'absolute inset-0',

          isCameraLocked
            ? 'cursor-default'
            : 'cursor-grab active:cursor-grabbing',
        ].join(
          ' ',
        )}
      >
        <Canvas
          gl={{
            preserveDrawingBuffer:
              true,
          }}
          shadows
          camera={{
            position: [
              9,
              6,
              9,
            ],

            fov:
              40,
          }}
          dpr={[
            1,
            2,
          ]}
        >
          <color
            attach="background"
            args={[
              '#f1f5f9',
            ]}
          />

          <fog
            attach="fog"
            args={[
              '#f1f5f9',
              15,
              45,
            ]}
          />

          <SimulationScene
            key={
              resetKey
            }
            isPlaying={
              isPlaying
            }
            damping={
              damping
            }
            paperSpeed={
              paperSpeed
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
              -2,
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

      {/* ===============================================
          TOP HINT
          =============================================== */}

      <div className="pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 text-[10px] font-semibold text-slate-600 shadow-lg backdrop-blur-xl">
          <span>
            {
              isCameraLocked
                ? 'Góc nhìn đang khóa'
                : 'Xoay góc nhìn để quan sát vệt mực trên giấy'
            }
          </span>
        </div>
      </div>

      {/* ===============================================
          CONTROL PANEL
          =============================================== */}

      {activePanel ===
        'controls' && (
        <aside className="absolute right-[76px] top-4 z-30 w-[310px] max-h-[calc(100%_-_92px)] overflow-y-auto overflow-x-hidden rounded-[18px] border border-slate-700/50 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl max-md:left-3 max-md:right-[62px] max-md:w-auto">
          <PanelHeader
            eyebrow="Điều khiển"
            title="Dao động tắt dần"
            onClose={() =>
              setActivePanel(
                null,
              )
            }
          />

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <button
              type="button"
              className={[
                'min-h-11 rounded-xl border px-4 text-[11px] font-extrabold uppercase tracking-[0.08em] transition',

                isPlaying
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/15'
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
                  ? 'Tạm dừng'
                  : hasStarted
                    ? 'Tiếp tục'
                    : 'Bắt đầu'
              }
            </button>

            <button
              type="button"
              className="min-h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-[10px] font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              onClick={
                handleReset
              }
            >
              Chạy lại
            </button>
          </div>

          <ControlSlider
            id="damped-beta"
            label="Hệ số lực cản"
            symbol="\beta"
            value={
              damping
            }
            valueLabel={
              damping.toFixed(
                2,
              )
            }
            min={0.05}
            max={0.4}
            step={0.01}
            minLabel="0.05"
            maxLabel="0.40"
            disabled={
              hasStarted
            }
            onChange={
              setDamping
            }
          />

          <ControlSlider
            id="damped-paper-speed"
            label="Tốc độ cuộn giấy"
            symbol="v"
            value={
              paperSpeed
            }
            valueLabel={`${paperSpeed.toFixed(1)} cm/s`}
            min={1}
            max={6}
            step={0.5}
            minLabel="1.0"
            maxLabel="6.0"
            disabled={
              hasStarted
            }
            onChange={
              setPaperSpeed
            }
          />

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-800 pt-4">
            <div className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
                Góc nhìn
              </span>

              <small className="mt-1 block text-[9px] leading-4 text-slate-600">
                Khóa sau khi chọn được góc quan sát phù hợp
              </small>
            </div>

            <button
              type="button"
              aria-pressed={
                isCameraLocked
              }
              className={[
                'shrink-0 rounded-lg border px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.06em] transition',

                isCameraLocked
                  ? 'border-rose-400/25 bg-rose-400/10 text-rose-300'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white',
              ].join(
                ' ',
              )}
              onClick={() =>
                setIsCameraLocked(
                  (
                    current,
                  ) =>
                    !current,
                )
              }
            >
              {
                isCameraLocked
                  ? 'Mở khóa'
                  : 'Khóa góc'
              }
            </button>
          </div>

          {hasStarted && (
            <p className="mt-4 rounded-xl border border-amber-400/15 bg-amber-400/[0.06] p-3 text-[9px] leading-5 text-amber-200/80">
              Hệ số lực cản và tốc độ cuộn giấy được khóa trong lúc chạy.
              Bấm Chạy lại để thiết lập một trường hợp mới.
            </p>
          )}
        </aside>
      )}

      {/* ===============================================
          DATA PANEL
          =============================================== */}

      {activePanel ===
        'data' && (
        <aside className="absolute right-[76px] top-4 z-30 w-[310px] max-h-[calc(100%_-_92px)] overflow-y-auto overflow-x-hidden rounded-[18px] border border-slate-700/50 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl max-md:left-3 max-md:right-[62px] max-md:w-auto">
          <PanelHeader
            eyebrow="Dữ liệu"
            title="Ảnh đối chiếu"
            onClose={() =>
              setActivePanel(
                null,
              )
            }
          />

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  Đã thu thập
                </span>

                <strong className="mt-1 block text-xl text-slate-100">
                  {
                    snapshots.length
                  }
                  {' / 2'}
                </strong>
              </div>

              {snapshots.length >
                0 && (
                <button
                  type="button"
                  className="rounded-lg border border-slate-700 px-3 py-2 text-[9px] font-bold text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  onClick={
                    clearSnapshots
                  }
                >
                  Xóa dữ liệu
                </button>
              )}
            </div>

            <p className="mt-3 text-[10px] leading-5 text-slate-500">
              Chụp tối đa hai trường hợp có hệ số lực cản khác nhau để so sánh
              ảnh 3D và đồ thị lý thuyết tương ứng.
            </p>
          </div>

          <button
            type="button"
            className="mt-3 min-h-10 w-full rounded-xl border border-rose-400/25 bg-rose-400/10 px-4 text-[10px] font-extrabold text-rose-300 transition hover:bg-rose-400/15"
            onClick={
              captureSnapshot
            }
          >
            Chụp đồ thị hiện tại
          </button>

          <button
            type="button"
            disabled={
              snapshots.length ===
              0
            }
            className="mt-2 min-h-10 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-[10px] font-bold text-slate-300 transition enabled:hover:bg-slate-800 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            onClick={() =>
              setShowComparison(
                true,
              )
            }
          >
            Mở bảng đối chiếu
          </button>

          {snapshots.length >
            0 && (
            <div className="mt-4 grid gap-2">
              {snapshots.map(
                (
                  snapshot,
                  index,
                ) => (
                  <div
                    key={`${snapshot.url.slice(0, 32)}-${index}`}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/55 px-3 py-2"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.06em] text-slate-500">
                      Trường hợp {
                        index +
                        1
                      }
                    </span>

                    <strong className="font-mono text-[10px] text-rose-300">
                      β = {
                        snapshot.damping.toFixed(
                          2,
                        )
                      }
                    </strong>
                  </div>
                ),
              )}
            </div>
          )}
        </aside>
      )}

      {/* ===============================================
          OBSERVATION PANEL
          =============================================== */}

      {activePanel ===
        'observation' && (
        <aside className="absolute right-[76px] top-4 z-30 w-[310px] max-h-[calc(100%_-_92px)] overflow-y-auto overflow-x-hidden rounded-[18px] border border-slate-700/50 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl max-md:left-3 max-md:right-[62px] max-md:w-auto">
          <PanelHeader
            eyebrow="Quan sát"
            title="Dấu hiệu tắt dần"
            onClose={() =>
              setActivePanel(
                null,
              )
            }
          />

          <div className="mt-4 rounded-xl border border-rose-400/15 bg-rose-400/[0.05] p-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-rose-300">
              Dấu hiệu chính
            </span>

            <p className="mt-2 text-[11px] leading-5 text-slate-300">
              Độ cao các đỉnh của vệt mực giảm dần theo thời gian,
              trong khi khoảng cách giữa các đỉnh liên tiếp gần như giữ nguyên
              khi lực cản nhỏ.
            </p>
          </div>

          <div className="mt-3 grid gap-2">
            <ObservationItem
              label="Phương trình"
              formula="x = A_0 e^{-\beta t}\cos(\omega t + \varphi)"
            />

            <ObservationItem
              label="Đường bao biên độ"
              formula="A(t) = A_0e^{-\beta t}"
            />

            <ObservationItem
              label="Hệ số lực cản"
              formula="\beta \uparrow \Rightarrow A(t) \downarrow \text{ nhanh hơn}"
            />
          </div>
        </aside>
      )}

      {/* ===============================================
          RIGHT TOOLBAR
          =============================================== */}

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
          label="Dữ liệu"
          icon="activity"
          active={
            activePanel ===
            'data'
          }
          onClick={() =>
            togglePanel(
              'data',
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
            togglePanel(
              'observation',
            )
          }
        />
      </aside>

      {/* ===============================================
          BOTTOM LAB DOCK
          =============================================== */}

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
              : hasStarted
                ? 'Tạm dừng'
                : 'Sẵn sàng'
          }
          emphasis={
            isPlaying
              ? 'success'
              : 'normal'
          }
        />

        <StatusItem
          label="Lực cản"
          value={`β = ${damping.toFixed(2)}`}
        />

        <StatusItem
          label="Cuộn giấy"
          value={`${paperSpeed.toFixed(1)} cm/s`}
        />

        <StatusItem
          label="Ảnh"
          value={`${snapshots.length} / 2`}
        />

        <button
          type="button"
          className="flex min-w-[112px] items-center justify-center gap-2 border-l border-rose-400/20 bg-rose-400/10 px-4 py-2 text-[10px] font-extrabold text-rose-300 transition hover:bg-rose-500 hover:text-white"
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

      {/* ===============================================
          COMPARISON MODAL
          =============================================== */}

      {showComparison &&
      snapshots.length >
        0 && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950/82 p-5 backdrop-blur-md">
          <section className="flex max-h-[92%] w-full max-w-6xl flex-col overflow-hidden rounded-[20px] border border-slate-700/60 bg-slate-950 shadow-2xl">
            <header className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-rose-300">
                  Đối chiếu dữ liệu
                </span>

                <h3 className="mt-1 text-base font-bold text-white">
                  Ảnh 3D và đường bao biên độ
                </h3>
              </div>

              <button
                type="button"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-700 bg-slate-900 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label="Đóng bảng đối chiếu"
                onClick={() =>
                  setShowComparison(
                    false,
                  )
                }
              >
                <AppIcon
                  name="close"
                  size={16}
                />
              </button>
            </header>

            <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-5 md:grid-cols-2">
              {snapshots.map(
                (
                  snapshot,
                  index,
                ) => (
                  <article
                    key={`${snapshot.url.slice(0, 32)}-${index}`}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-500">
                        Trường hợp {
                          index +
                          1
                        }
                      </span>

                      <strong className="rounded-md border border-rose-400/20 bg-rose-400/10 px-2 py-1 font-mono text-[10px] text-rose-300">
                        β = {
                          snapshot.damping.toFixed(
                            2,
                          )
                        }
                      </strong>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
                      <img
                        src={
                          snapshot.url
                        }
                        alt={`Ảnh chụp trường hợp ${index + 1}`}
                        className="aspect-video w-full object-cover"
                      />
                    </div>

                    <div className="mt-3">
                      <MathGraph
                        damping={
                          snapshot.damping
                        }
                      />
                    </div>
                  </article>
                ),
              )}

              {snapshots.length ===
                1 && (
                <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-6 text-center">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-slate-600">
                      Trường hợp 2
                    </span>

                    <p className="mx-auto mt-3 max-w-[260px] text-[11px] leading-5 text-slate-500">
                      Đóng bảng, chạy lại thí nghiệm với một hệ số lực cản khác
                      rồi chụp thêm một ảnh để đối chiếu.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

function PanelHeader({
  eyebrow,
  title,
  onClose,
}: {
  eyebrow:
    string

  title:
    string

  onClose:
    () => void
}) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-rose-300">
          {
            eyebrow
          }
        </span>

        <h3 className="mt-1 text-sm font-bold text-slate-100">
          {
            title
          }
        </h3>
      </div>

      <button
        type="button"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-700/60 bg-slate-900/80 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        aria-label={`Đóng ${title}`}
        onClick={
          onClose
        }
      >
        <AppIcon
          name="close"
          size={15}
        />
      </button>
    </header>
  )
}

function ControlSlider({
  id,
  label,
  symbol,
  value,
  valueLabel,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  disabled,
  onChange,
}: {
  id:
    string

  label:
    string

  symbol:
    string

  value:
    number

  valueLabel:
    string

  min:
    number

  max:
    number

  step:
    number

  minLabel:
    string

  maxLabel:
    string

  disabled:
    boolean

  onChange:
    (
      value:
        number,
    ) => void
}) {
  return (
    <div className="mt-5 border-t border-slate-800 pt-4">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={
            id
          }
          className="min-w-0 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400"
        >
          {
            label
          }

          {' '}

          <span className="normal-case">
            (
            <InlineMath
              math={
                symbol
              }
            />
            )
          </span>
        </label>

        <strong className="shrink-0 rounded-md border border-rose-400/20 bg-rose-400/10 px-2 py-1 font-mono text-[10px] text-rose-300">
          {
            valueLabel
          }
        </strong>
      </div>

      <input
        id={
          id
        }
        type="range"
        min={
          min
        }
        max={
          max
        }
        step={
          step
        }
        value={
          value
        }
        disabled={
          disabled
        }
        onChange={
          (
            event,
          ) =>
            onChange(
              Number(
                event.target.value,
              ),
            )
        }
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-rose-500 disabled:cursor-not-allowed disabled:opacity-45"
      />

      <div className="mt-1 flex justify-between font-mono text-[8px] text-slate-600">
        <span>
          {
            minLabel
          }
        </span>

        <span>
          {
            maxLabel
          }
        </span>
      </div>
    </div>
  )
}

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
    'activity' |
    'book-open'

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
          ? 'border-rose-400/25 bg-rose-400/10 text-rose-300'
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
