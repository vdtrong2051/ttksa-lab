export type ExperimentToastTone =
  | 'success'
  | 'error'
  | 'info'


interface ExperimentToastProps {
  tone:
    ExperimentToastTone

  message:
    string

  className?:
    string
}


export default function ExperimentToast({
  tone,
  message,
  className =
    '',
}: ExperimentToastProps) {
  const isError =
    tone ===
    'error'


  return (
    <div
      className={[
        'experiment-toast',

        `experiment-toast--${tone}`,

        className,
      ]
        .filter(
          Boolean,
        )
        .join(
          ' ',
        )}
      role={
        isError
          ? 'alert'
          : 'status'
      }
      aria-live={
        isError
          ? 'assertive'
          : 'polite'
      }
    >
      {message}
    </div>
  )
}