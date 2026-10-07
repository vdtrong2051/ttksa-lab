import {
  Component,
  Fragment,
} from 'react'

import type {
  ErrorInfo,
  ReactNode,
} from 'react'


interface SimulationErrorBoundaryProps {
  children:
    ReactNode

  onError?: (
    error:
      Error,

    info:
      ErrorInfo,
  ) => void
}


interface SimulationErrorBoundaryState {
  hasError:
    boolean

  retryKey:
    number
}


export default class SimulationErrorBoundary extends Component<
  SimulationErrorBoundaryProps,
  SimulationErrorBoundaryState
> {
  state:
    SimulationErrorBoundaryState =
    {
      hasError:
        false,

      retryKey:
        0,
    }


  static getDerivedStateFromError() {
    return {
      hasError:
        true,
    }
  }


  componentDidCatch(
    error:
      Error,

    info:
      ErrorInfo,
  ) {
    console.error(
      'Simulation rendering failed.',
      error,
      info,
    )

    this.props.onError?.(
      error,
      info,
    )
  }


  handleRetry =
    () => {
      this.setState(
        (state) => ({
          hasError:
            false,

          retryKey:
            state.retryKey +
            1,
        }),
      )
    }


  render() {
    if (
      this.state.hasError
    ) {
      return (
        <div
          className="simulation-error"
          role="alert"
          aria-live="assertive"
        >
          <div className="simulation-error__content">
            <strong className="simulation-error__title">
              Không thể tải mô phỏng
            </strong>

            <p className="simulation-error__message">
              Đã xảy ra lỗi trong vùng mô phỏng.
              Bạn có thể thử khởi tạo lại runtime.
            </p>

            <button
              type="button"
              className="experiment-lab-button experiment-lab-button--primary"
              onClick={
                this.handleRetry
              }
            >
              Thử lại
            </button>
          </div>
        </div>
      )
    }


    return (
      <Fragment
        key={
          this.state.retryKey
        }
      >
        {
          this.props.children
        }
      </Fragment>
    )
  }
}