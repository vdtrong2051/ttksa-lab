import { useState } from 'react'

import { InlineMath } from 'react-katex'

import AppIcon from '../../../../components/ui/AppIcon'

import HarmonicMotionRuntime from '../simulation/HarmonicMotionRuntime'

import type {
  HarmonicMotionController,
} from '../controller/useHarmonicMotionController'


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
// PRACTICE WORKSPACE
// CHỈ ĐỔI UI, KHÔNG ĐỔI LÕI THÍ NGHIỆM
// ==========================================

export default function Experiment({
  onNext,
  onPrev,
  controller,
}: {
  onNext:
    () => void

  onPrev:
    () => void

  controller:
    HarmonicMotionController
}) {
  const {
    isPlaying,
    speed,
    amplitude,
    showRays,
    setSpeed,
    setAmplitude,
  } = controller


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
    controller.togglePlaying()
  }


  function handleToggleRays() {
    playClick()
    controller.toggleRays()
  }


  return (
    <section className="relative h-full w-full overflow-hidden bg-[#020617] text-slate-100">

      {/* =================================================
          CANVAS — GIỮ NGUYÊN LÕI THÍ NGHIỆM
          ================================================= */}

      <HarmonicMotionRuntime controller={controller} />


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