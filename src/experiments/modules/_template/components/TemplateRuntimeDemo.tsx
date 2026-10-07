import {
  useState,
} from 'react'


export default function TemplateRuntimeDemo() {
  const [
    runtimeValue,
    setRuntimeValue,
  ] =
    useState(
      0,
    )


  return (
    <div className="template-runtime-demo">
      <div className="template-runtime-demo__grid" />

      <div className="template-runtime-demo__object">
        <span>
          Persistent Runtime
        </span>

        <strong>
          {runtimeValue}
        </strong>

        <p>
          Tăng giá trị này, chuyển sang
          Kết luận rồi quay lại Thực hành.
          Nếu giá trị còn nguyên thì runtime
          chưa bị unmount.
        </p>

        <button
          type="button"
          className="experiment-lab-button experiment-lab-button--primary"
          onClick={() =>
            setRuntimeValue(
              (current) =>
                current + 1,
            )
          }
        >
          Tăng Runtime +1
        </button>
      </div>
    </div>
  )
}