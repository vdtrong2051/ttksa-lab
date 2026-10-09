
import {
  useEffect,
  useMemo,
  useRef,
} from 'react'

import * as THREE from 'three'

import {
  useFrame,
  useThree,
} from '@react-three/fiber'

import {
  ContactShadows,
  Grid,
  Html,
} from '@react-three/drei'

import {
  DANGER_THRESHOLD,
  GRAPH_SAMPLE_RATE,
  MAX_GRAPH_POINTS,
  PAPER_LIMIT,
} from '../model/types'

import type {
  SeismographController,
} from '../model/types'


interface SeismographSceneProps {
  controller: SeismographController
}


// ======================================================
// PHYSICAL SIMULATION CONSTANTS
// ======================================================

// Tích phân vật lý ở 600 Hz.
// Không phụ thuộc trực tiếp vào FPS.
const STEP = 1 / 600

// Ghi dữ liệu đồ thị ở 100 Hz.
const SAMPLE_INTERVAL = 1 / GRAPH_SAMPLE_RATE

// Thời gian tăng dần kích thích nền.
const STARTUP_RAMP_SECONDS = 1

// Tốc độ dịch chuyển giấy.
const PAPER_SPEED = 4

// 280 điểm vừa trong bề rộng giấy 3D.
// Dữ liệu phân tích vẫn giữ tối đa 1000 điểm.
const VISIBLE_TRACE_POINTS = 280

const SAFE_COLOR =
  new THREE.Color('#2563eb')

const ALERT_COLOR =
  new THREE.Color('#dc2626')


// ======================================================
// GROUND MOTION
// ======================================================

/**
 * Chuyển động nền có biên độ kích thích tăng dần.
 *
 * Sử dụng cùng một biểu thức cho:
 * - Li độ nền (displacement)
 * - Gia tốc nền (acceleration)
 *
 * Trong giây đầu, biên độ kích thích tăng từ 0
 * tới giá trị cấu hình để hạn chế quá độ do
 * khởi động ngoại lực đột ngột.
 */
function getGroundMotion(
  time: number,
  eqFreq: number,
  eqAmp: number,
) {
  const omega =
    2 * Math.PI * eqFreq

  const secondOmega =
    2.3 * omega

  const u = Math.min(
    Math.max(
      time / STARTUP_RAMP_SECONDS,
      0,
    ),
    1,
  )

  // Smoothstep bậc ba.
  const envelope =
    u * u * (3 - 2 * u)

  // Đạo hàm bậc nhất của envelope.
  const envelopeVelocity =
    time < STARTUP_RAMP_SECONDS
      ? (
          6 * u * (1 - u)
        ) / STARTUP_RAMP_SECONDS
      : 0

  // Đạo hàm bậc hai của envelope.
  const envelopeAcceleration =
    time < STARTUP_RAMP_SECONDS
      ? (
          6 - 12 * u
        ) / (
          STARTUP_RAMP_SECONDS *
          STARTUP_RAMP_SECONDS
        )
      : 0

  // Tín hiệu chuyển động nền.
  const signal =
    Math.sin(omega * time) +
    0.2 *
      Math.sin(
        secondOmega * time,
      )

  // Đạo hàm bậc nhất.
  const signalVelocity =
    omega *
      Math.cos(omega * time) +
    0.2 *
      secondOmega *
      Math.cos(
        secondOmega * time,
      )

  // Đạo hàm bậc hai.
  const signalAcceleration =
    -omega *
      omega *
      Math.sin(omega * time) -
    0.2 *
      secondOmega *
      secondOmega *
      Math.sin(
        secondOmega * time,
      )

  // Li độ nền.
  const displacement =
    eqAmp *
    envelope *
    signal

  // Gia tốc từ đạo hàm bậc hai:
  // (envelope * signal)''
  const acceleration =
    eqAmp *
    (
      envelopeAcceleration * signal +
      2 *
        envelopeVelocity *
        signalVelocity +
      envelope *
        signalAcceleration
    )

  return {
    displacement,
    acceleration,
  }
}


// ======================================================
// SPRING GEOMETRY
// ======================================================

class HelixCurve
  extends THREE.Curve<THREE.Vector3> {
  // Constructor công khai:
  // tránh lỗi TS2674 của THREE.Curve.
  constructor() {
    super()
  }

  override getPoint(
    t: number,
    target = new THREE.Vector3(),
  ) {
    return target.set(
      0.3 *
        Math.cos(
          20 * Math.PI * t,
        ),
      -t,
      0.3 *
        Math.sin(
          20 * Math.PI * t,
        ),
    )
  }
}


// ======================================================
// MAIN SCENE
// ======================================================

export default function SeismographScene({
  controller,
}: SeismographSceneProps) {
  // ----------------------------------------------------
  // OBJECT REFS
  // ----------------------------------------------------

  const baseRef =
    useRef<THREE.Group>(null)

  const massRef =
    useRef<THREE.Group>(null)

  const springRef =
    useRef<THREE.Mesh>(null)

  const paperGridRef =
    useRef<THREE.Group>(null)

  // ----------------------------------------------------
  // INDICATOR REFS
  // ----------------------------------------------------

  const amplitudeTextRef =
    useRef<HTMLDivElement>(null)

  const amplitudeBadgeRef =
    useRef<HTMLDivElement>(null)

  // ----------------------------------------------------
  // PHYSICAL STATE
  // ----------------------------------------------------

  const relativeYRef =
    useRef(0)

  const relativeVelocityRef =
    useRef(0)

  const stepAccumulatorRef =
    useRef(0)

  const sampleAccumulatorRef =
    useRef(0)

  // R3F render invalidation.
  const invalidate =
    useThree(
      (state) => state.invalidate,
    )

  // ----------------------------------------------------
  // SPRING GEOMETRY
  // ----------------------------------------------------

  const springGeometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        new HelixCurve(),
        150,
        0.03,
        8,
        false,
      ),
    [],
  )

  // ----------------------------------------------------
  // TRACE GEOMETRY
  // ----------------------------------------------------

  const lineGeometry = useMemo(() => {
    const geometry =
      new THREE.BufferGeometry()

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        new Float32Array(
          VISIBLE_TRACE_POINTS * 3,
        ),
        3,
      ),
    )

    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(
        new Float32Array(
          VISIBLE_TRACE_POINTS * 3,
        ),
        3,
      ),
    )

    geometry.setDrawRange(0, 0)

    return geometry
  }, [])

  // Không dùng JSX <line> vì có thể
  // bị TypeScript hiểu là SVG element.
  const traceMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
      }),
    [],
  )

  const traceLine = useMemo(
    () =>
      new THREE.Line(
        lineGeometry,
        traceMaterial,
      ),
    [
      lineGeometry,
      traceMaterial,
    ],
  )

  // ----------------------------------------------------
  // RESOURCE CLEANUP
  // ----------------------------------------------------

  useEffect(
    () => () => {
      springGeometry.dispose()
      lineGeometry.dispose()
      traceMaterial.dispose()
    },
    [
      springGeometry,
      lineGeometry,
      traceMaterial,
    ],
  )

  // ====================================================
  // UPDATE 3D TRACE
  // ====================================================

  function renderTrace(
    data: readonly number[],
  ) {
    const samples =
      data.slice(
        -VISIBLE_TRACE_POINTS,
      )

    const positions =
      lineGeometry.getAttribute(
        'position',
      ) as THREE.BufferAttribute

    const colors =
      lineGeometry.getAttribute(
        'color',
      ) as THREE.BufferAttribute

    const color =
      new THREE.Color()

    for (
      let i = 0;
      i < samples.length;
      i++
    ) {
      const value =
        samples[i]

      // Mẫu mới nhất ở gần vị trí bút.
      // Các mẫu cũ hơn trải về phía trái.
      const x =
        -(
          samples.length - 1 - i
        ) *
        PAPER_SPEED /
        GRAPH_SAMPLE_RATE

      const y = Math.max(
        -PAPER_LIMIT,
        Math.min(
          PAPER_LIMIT,
          value,
        ),
      )

      positions.setXYZ(
        i,
        x,
        y,
        0,
      )

      const alertRatio =
        Math.min(
          Math.abs(value) /
            DANGER_THRESHOLD,
          1,
        )

      color
        .copy(SAFE_COLOR)
        .lerp(
          ALERT_COLOR,
          alertRatio,
        )

      colors.setXYZ(
        i,
        color.r,
        color.g,
        color.b,
      )
    }

    positions.needsUpdate = true
    colors.needsUpdate = true

    lineGeometry.setDrawRange(
      0,
      samples.length,
    )

    lineGeometry.computeBoundingSphere()
  }

  // ====================================================
  // UPDATE VISUAL OBJECTS
  // ====================================================

  function updateVisual() {
    const time =
      controller.elapsedTimeRef.current

    // Dùng cùng chuyển động nền
    // với vòng tích phân vật lý.
    const {
      displacement: yGround,
    } = getGroundMotion(
      time,
      controller.config.eqFreq,
      controller.config.eqAmp,
    )

    const yRelative =
      relativeYRef.current

    // Khung máy chuyển động theo nền.
    if (baseRef.current) {
      baseRef.current.position.y =
        yGround
    }

    // Quả nặng chuyển động tương đối
    // với khung máy.
    if (massRef.current) {
      massRef.current.position.y =
        yRelative
    }

    // Co giãn lò xo.
    if (springRef.current) {
      springRef.current.position.y =
        4.5

      springRef.current.scale.y =
        Math.max(
          0.1,
          4.5 - yRelative,
        )
    }

    // Dịch chuyển lưới giấy.
    if (paperGridRef.current) {
      paperGridRef.current.position.x =
        -(
          time * PAPER_SPEED
        ) % 1
    }

    // Biên độ hiển thị.
    const amplitude =
      Math.abs(yRelative)

    controller.amplitudeRef.current =
      amplitude

    if (amplitudeTextRef.current) {
      amplitudeTextRef.current.textContent =
        amplitude >= PAPER_LIMIT
          ? 'Vượt mép giấy!'
          : `Độ lệch: ${amplitude.toFixed(2)} m`
    }

    if (amplitudeBadgeRef.current) {
      amplitudeBadgeRef.current.dataset.level =
        amplitude >= PAPER_LIMIT
          ? 'overflow'
          : amplitude > DANGER_THRESHOLD
            ? 'danger'
            : 'safe'
    }
  }

  // ====================================================
  // RESET RUN
  // ====================================================

  useEffect(() => {
    relativeYRef.current = 0

    relativeVelocityRef.current = 0

    stepAccumulatorRef.current = 0

    sampleAccumulatorRef.current = 0

    controller.graphDataRef.current = []

    lineGeometry.setDrawRange(
      0,
      0,
    )

    updateVisual()

    invalidate()

    // Reset có chủ đích theo resetVersion.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    controller.resetVersion,
    lineGeometry,
    invalidate,
  ])

  // ====================================================
  // CLEAR TRACE AFTER CAPTURE
  // ====================================================

  useEffect(() => {
    controller.graphDataRef.current = []

    lineGeometry.setDrawRange(
      0,
      0,
    )

    // Chỉ xóa nét ghi.
    // Không reset chuyển động hoặc thời gian.
    invalidate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    controller.clearGraphVersion,
    lineGeometry,
    invalidate,
  ])

  // ====================================================
  // INVALIDATE ON ACTIVITY / CONFIG CHANGES
  // ====================================================

  useEffect(() => {
    if (
      controller.isPracticeActive
    ) {
      invalidate()
    }
  }, [
    controller.isPracticeActive,
    controller.isRunning,
    controller.config,
    invalidate,
  ])

  // ====================================================
  // FIXED-STEP PHYSICS LOOP
  // ====================================================

  useFrame((_, delta) => {
    if (!controller.isRunning) {
      return
    }

    // Chặn delta quá lớn khi trình duyệt lag.
    stepAccumulatorRef.current +=
      Math.min(
        delta,
        0.05,
      )

    const {
      naturalFreq,
      damping,
    } = controller.config

    const omega0 =
      2 *
      Math.PI *
      naturalFreq

    let samplesUpdated = false

    while (
      stepAccumulatorRef.current >=
      STEP
    ) {
      stepAccumulatorRef.current -=
        STEP

      const t =
        controller.elapsedTimeRef.current +
        STEP

      controller.elapsedTimeRef.current =
        t

      // Gia tốc nền có ramp khởi động.
      const {
        acceleration: aGround,
      } = getGroundMotion(
        t,
        controller.config.eqFreq,
        controller.config.eqAmp,
      )

      // Phương trình chuyển động tương đối
      // giữa quả nặng và khung máy:
      //
      // y'' + 2ζω0 y' + ω0² y = -aground

      const aRelative =
        -aGround -
        omega0 *
          omega0 *
          relativeYRef.current -
        2 *
          damping *
          omega0 *
          relativeVelocityRef.current

      // Tích phân Euler bán ẩn:
      // cập nhật vận tốc rồi tới vị trí.
      relativeVelocityRef.current +=
        aRelative *
        STEP

      relativeYRef.current +=
        relativeVelocityRef.current *
        STEP

      // ----------------------------------
      // SAMPLE GRAPH
      // ----------------------------------

      sampleAccumulatorRef.current +=
        STEP

      if (
        sampleAccumulatorRef.current +
          1e-9 >=
        SAMPLE_INTERVAL
      ) {
        sampleAccumulatorRef.current -=
          SAMPLE_INTERVAL

        const data =
          controller.graphDataRef.current

        // Giữ giá trị thật phục vụ phân tích.
        // Không cắt theo PAPER_LIMIT ở đây.
        data.push(
          relativeYRef.current,
        )

        if (
          data.length >
          MAX_GRAPH_POINTS
        ) {
          data.shift()
        }

        samplesUpdated = true
      }
    }

    // Cập nhật các bộ phận của máy.
    updateVisual()

    // Chỉ dựng lại nét ghi khi có mẫu mới.
    if (samplesUpdated) {
      renderTrace(
        controller.graphDataRef.current,
      )
    }
  })

  // ====================================================
  // SCENE GRAPH
  // ====================================================

  return (
    <group position={[0, -0.5, 0]}>
      {/* ================================================
          LIGHTING
          ================================================ */}

      <ambientLight
        intensity={0.7}
      />

      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[
          1024,
          1024,
        ]}
      />

      <directionalLight
        position={[-10, 5, -5]}
        intensity={0.4}
      />

      {/* ================================================
          FLOOR
          ================================================ */}

      <mesh
        position={[0, -4, 0]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
        receiveShadow
      >
        <planeGeometry
          args={[100, 100]}
        />

        <meshStandardMaterial
          color="#f1f5f9"
          roughness={1}
        />
      </mesh>

      <Grid
        position={[0, -3.99, 0]}
        args={[80, 60]}
        cellSize={1}
        cellColor="#cbd5e1"
        sectionSize={5}
        sectionColor="#94a3b8"
        fadeDistance={40}
      />

      {/* ================================================
          MOVING MACHINE FRAME
          ================================================ */}

      <group ref={baseRef}>
        {/* MACHINE BASE */}

        <mesh
          position={[0, -3.5, 0]}
          receiveShadow
          castShadow
        >
          <boxGeometry
            args={[16, 0.4, 4.5]}
          />

          <meshStandardMaterial
            color="#cbd5e1"
            roughness={0.8}
          />
        </mesh>

        {/* VERTICAL SUPPORT */}

        <mesh
          position={[5, 0.75, 0]}
          castShadow
        >
          <boxGeometry
            args={[0.8, 8.5, 0.8]}
          />

          <meshStandardMaterial
            color="#64748b"
          />
        </mesh>

        {/* HORIZONTAL SUPPORT */}

        <mesh
          position={[2, 4.5, 0]}
          castShadow
        >
          <boxGeometry
            args={[6, 0.4, 0.8]}
          />

          <meshStandardMaterial
            color="#64748b"
          />
        </mesh>

        {/* ==============================================
            HELICAL SPRING
            ============================================== */}

        <mesh
          ref={springRef}
          geometry={springGeometry}
          castShadow
        >
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>

        {/* ==============================================
            MASS AND RECORDING PEN
            ============================================== */}

        <group ref={massRef}>
          {/* MASS */}

          <mesh castShadow>
            <sphereGeometry
              args={[0.9, 32, 32]}
            />

            <meshStandardMaterial
              color="#ef4444"
              roughness={0.6}
            />
          </mesh>

          {/* PEN ARM */}

          <mesh
            position={[-1.3, 0, 0.8]}
            rotation={[
              0,
              0,
              Math.PI / 2,
            ]}
            castShadow
          >
            <cylinderGeometry
              args={[
                0.02,
                0.08,
                2.6,
              ]}
            />

            <meshStandardMaterial
              color="#1e293b"
            />
          </mesh>
        </group>

        {/* ==============================================
            PAPER RECORDING ASSEMBLY
            ============================================== */}

        <group
          position={[-5.4, 0, -0.6]}
        >
          {/* PAPER SUPPORT */}

          <mesh
            position={[0, 0, -0.1]}
            receiveShadow
          >
            <boxGeometry
              args={[
                12.4,
                6.4,
                0.1,
              ]}
            />

            <meshStandardMaterial
              color="#e2e8f0"
            />
          </mesh>

          {/* RIGHT ROLLER */}

          <mesh
            position={[6, 0, 0]}
            castShadow
          >
            <cylinderGeometry
              args={[
                0.4,
                0.4,
                6.6,
              ]}
            />

            <meshStandardMaterial
              color="#94a3b8"
            />
          </mesh>

          {/* LEFT ROLLER */}

          <mesh
            position={[-6, 0, 0]}
            castShadow
          >
            <cylinderGeometry
              args={[
                0.4,
                0.4,
                6.6,
              ]}
            />

            <meshStandardMaterial
              color="#94a3b8"
            />
          </mesh>

          {/* PAPER SHEET */}

          <mesh
            position={[
              0,
              0,
              -0.06,
            ]}
            receiveShadow
          >
            <boxGeometry
              args={[
                12,
                6,
                0.02,
              ]}
            />

            <meshStandardMaterial
              color="#ffffff"
            />
          </mesh>

          {/* MOVING PAPER GRID */}

          <group ref={paperGridRef}>
            <Grid
              position={[
                0,
                0,
                -0.04,
              ]}
              args={[12, 6]}
              cellSize={0.2}
              cellColor="#e2e8f0"
              sectionSize={1}
              sectionColor="#cbd5e1"
              fadeDistance={12}
              rotation={[
                Math.PI / 2,
                0,
                0,
              ]}
            />
          </group>

          {/* ============================================
              3D SEISMOGRAPH TRACE

              THREE.Line thay cho JSX <line>.

              Đường ghi chỉ có tối đa 280 điểm,
              bảo đảm bề rộng nằm trên tờ giấy.
              ============================================ */}

          <primitive
            object={traceLine}
            position={[
              5.3,
              0,
              0.05,
            ]}
          />
        </group>

        {/* ==============================================
            AMPLITUDE WARNING
            ============================================== */}

        <Html
          position={[-5, 5.5, 0]}
          center
          className="pointer-events-none"
        >
          <div
            className="seismo-scene-badge"
            ref={amplitudeBadgeRef}
            data-level="safe"
          >
            <small>
              Quả nặng
            </small>

            <strong ref={amplitudeTextRef}>
              Độ lệch: 0.00 m
            </strong>
          </div>
        </Html>
      </group>

      {/* ================================================
          CONTACT SHADOWS
          ================================================ */}

      <ContactShadows
        position={[0, -3.98, 0]}
        opacity={0.45}
        scale={40}
        blur={2}
        far={10}
        color="#64748b"
      />
    </group>
  )
}
