import { useEffect, useState } from 'react'
import logoImage from '../assets/여보세요_로고.png'
import { text } from './pageTypes'

export function Page3ElderHome() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (!showWarning) return
    const timer = setTimeout(() => {
      setShowWarning(false)
      window.location.hash = '#/4'
    }, 3000)
    return () => clearTimeout(timer)
  }, [showWarning])

  return (
    <section
      aria-label="HE101 도움 요청"
      className="relative h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      {/* Top Bar */}
      <header className="flex h-[34px] w-[342px] items-center justify-between text-2xl font-bold leading-[1.2] text-[#10251b]">
        <img src={logoImage} alt={text.appName} className="h-[44px] w-auto" />
        <span>{text.elder}</span>
      </header>

      <div className="h-[92px]" />

      {/* Heading */}
      <h1 className="mx-auto w-[342px] text-[38.4px] font-bold leading-[1.28] text-[#071b11]">
        도움이 필요하신가요?
      </h1>

      <p className="mx-auto mt-3 w-[342px] text-[21.6px] font-bold leading-[1.28] text-[#075d3c]">
        버튼을 누르면 대기 중인 도우미와 연결돼요
      </p>

      {/* Button */}
      <div className="mt-7 flex flex-col items-center gap-[11px]">
        <button
          type="button"
          onClick={() => setShowWarning(true)}
          className="w-[292px] h-[156px] rounded-[32px] border-2 border-[#087349] bg-[#ddf7e8] px-6 text-[29.6px] font-bold leading-[1.18] text-[#075d3c] shadow-[0_12px_12px_rgba(10,31,18,0.16)] transition-transform hover:-translate-y-0.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#087349]"
        >
          도움 요청
        </button>
      </div>

      {/* Footnote */}
      <p className="mx-auto mt-8 w-[342px] text-[21.6px] font-bold leading-[1.28] text-[#10251a]">
        응급 상황은 119에 먼저 연락하세요
      </p>

      {/* Warning Modal */}
      {showWarning && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[38px] bg-black/40">
          <div className="mx-6 w-[320px] rounded-[24px] border-[1.4px] border-[#cadfca] bg-white px-6 py-8 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]">
            {/* Warning Icon */}
            <div className="mx-auto mb-4 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#fff8e1]">
              <span className="text-[28px]">⚠️</span>
            </div>

            <h2 className="text-[26px] font-bold leading-[1.3] text-[#071b11]">
              안내사항
            </h2>

            <p className="mt-4 text-[20px] font-medium leading-[1.6] text-[#10251a]">
              안전한 도움을 위해 통화가 녹음될 수 있습니다.
              <br /><br />
              서로 편안하게 대화할 수 있도록 존중하는 말로 이야기해 주세요.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
