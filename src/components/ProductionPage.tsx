import { useEffect, useState } from 'react'
import microphoneIcon from '../assets/free-icon-microphone-black-shape-25682.png'
import peopleImage from '../assets/people.png'
import xImage from '../assets/X.png'
import type { ActionButton as ActionButtonConfig, ButtonTone, IllustrationType, PageConfig, ToggleConfig } from '../pages/pageTypes'
import { text } from '../pages/pageTypes'

export function ProductionPage({ page }: { page: PageConfig }) {
  const elapsedTime = useElapsedTimer(page.runningTimer)

  return (
    <section
      aria-label={`${page.code} ${page.title}`}
      className="h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      <TopBar role={page.role} />
      <div className={page.topGap} />
      {page.illustration && (
        <Illustration
          type={page.illustration}
          label={page.avatarLabel}
          usePeopleImage={page.avatarImage}
          useEmptyImage={page.emptyImage}
        />
      )}
      {page.illustration && <div className="h-[22px]" />}
      <Heading page={page} />
      {page.subheading && (
        <p
          className={`mx-auto mt-3 w-[342px] text-[21.6px] font-bold leading-[1.28] ${
            page.subheadingTone === 'green' ? 'text-[#075d3c]' : 'text-[#10251a]'
          }`}
        >
          {page.subheading}
        </p>
      )}
      {page.point && <p className="mt-3 text-2xl font-bold leading-[1.28] text-[#10251a]">{page.point}</p>}
      {page.segment && <SegmentedControl />}
      {page.toggle && <ToggleSwitch config={page.toggle} />}
      {(page.timer || page.runningTimer) && (
        <p className="mt-1 text-[62.4px] font-bold leading-[1.28] text-[#071b11]">
          {page.runningTimer ? elapsedTime : page.timer}
        </p>
      )}
      {page.status && (
        <p className="mx-auto mt-3 w-[342px] text-[21.6px] font-bold leading-[1.28] text-[#075d3c]">
          {page.status}
        </p>
      )}
      {page.buttons && (
        <div className="mt-7 flex flex-col items-center gap-[11px]">
          {page.buttons.map((button) => (
            <ActionButton key={button.label} button={button} />
          ))}
        </div>
      )}
      {page.footnote && (
        <p className="mx-auto mt-8 w-[342px] text-[21.6px] font-bold leading-[1.28] text-[#10251a]">
          {page.footnote}
        </p>
      )}
    </section>
  )
}

function useElapsedTimer(isRunning = false) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    setElapsedSeconds(0)
    const startedAt = Date.now()
    const intervalId = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function TopBar({ role }: { role?: string }) {
  return (
    <header className="flex h-[34px] w-[342px] items-center justify-between text-2xl font-bold leading-[1.2] text-[#10251b]">
      <span>{text.appName}</span>
      <span>{role ?? ''}</span>
    </header>
  )
}

function Heading({ page }: { page: PageConfig }) {
  if (page.headingLines) {
    return (
      <h1 className="mx-auto w-[342px] text-[38.4px] font-bold leading-[1.28] text-[#071b11]">
        {page.headingLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
    )
  }

  return <h1 className="mx-auto w-[342px] text-[38.4px] font-bold leading-[1.28] text-[#071b11]">{page.heading}</h1>
}

function ActionButton({ button }: { button: ActionButtonConfig }) {
  const toneClass: Record<ButtonTone, string> = {
    primary: 'border-[#087349] bg-[#ddf7e8] text-[#075d3c]',
    helper: 'border-[#6dbf35] bg-[#e8fad8] text-[#2f751c]',
    secondary: 'border-[#cadfca] bg-white text-[#10251a]',
    danger: 'border-[#d94838] bg-[#d94838] text-white',
  }

  return (
    <button
      type="button"
      onClick={button.onClick}
      className={`${button.width ?? 'w-[248px]'} ${button.height ?? 'h-[140px]'} rounded-[32px] border-2 px-6 text-[29.6px] font-bold leading-[1.18] shadow-[0_12px_12px_rgba(10,31,18,0.16)] transition-transform hover:-translate-y-0.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#087349] ${toneClass[button.tone ?? 'primary']}`}
    >
      {button.label}
    </button>
  )
}

function ToggleSwitch({ config }: { config: ToggleConfig }) {
  const [isOn, setIsOn] = useState(true)

  return (
    <div className="mx-auto mt-5 flex items-center justify-center gap-4">
      <span className={`text-[21.6px] font-bold leading-[1.28] ${isOn ? 'text-[#075d3c]' : 'text-[#10251a]/40'}`}>
        {config.onLabel}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={isOn ? config.onLabel : config.offLabel}
        onClick={() => setIsOn(!isOn)}
        className={`relative h-[36px] w-[64px] rounded-full border-2 transition-colors duration-200 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#087349] ${
          isOn ? 'border-[#087349] bg-[#087349]' : 'border-[#cadfca] bg-[#cadfca]'
        }`}
      >
        <span
          className={`absolute top-[3px] h-[26px] w-[26px] rounded-full bg-white shadow-md transition-transform duration-200 ${
            isOn ? 'left-[34px]' : 'left-[3px]'
          }`}
        />
      </button>
      <span className={`text-[21.6px] font-bold leading-[1.28] ${!isOn ? 'text-[#d94838]' : 'text-[#10251a]/40'}`}>
        {config.offLabel}
      </span>
    </div>
  )
}

function SegmentedControl() {
  return (
    <div className="mx-auto mt-3 flex h-11 w-60 items-center rounded-3xl border-[1.3px] border-[#cadfca] bg-white shadow-[0_6px_7px_rgba(10,31,18,0.08)]">
      <div className="flex h-[42px] w-[120px] items-center justify-center rounded-[22px] bg-[#ddf7e8] text-[21.6px] font-bold leading-[1.28] text-[#075d3c]">
        {text.waiting}
      </div>
      <div className="flex h-[42px] w-[120px] items-center justify-center rounded-[22px] bg-white text-[21.6px] font-bold leading-[1.28] text-[#10251a]">
        {text.stopped}
      </div>
    </div>
  )
}

function Illustration({
  type,
  label,
  usePeopleImage = false,
  useEmptyImage = false,
}: {
  type: IllustrationType
  label?: string
  usePeopleImage?: boolean
  useEmptyImage?: boolean
}) {
  if (type === 'permission') {
    return (
      <div className="mx-auto flex h-[108px] w-[260px] items-center justify-center">
        <div
          aria-label="\uB9C8\uC774\uD06C"
          className="h-[86px] w-[86px] bg-[#075d3c]"
          style={{
            WebkitMask: `url(${microphoneIcon}) center / contain no-repeat`,
            mask: `url(${microphoneIcon}) center / contain no-repeat`,
          }}
        />
      </div>
    )
  }

  if (type === 'loader') {
    return (
      <div className="mx-auto h-[72px] w-[72px] animate-spin rounded-full border-[3px] border-[#2b9b68] border-t-transparent" />
    )
  }

  if (type === 'empty') {
    return (
      <div className="mx-auto h-[86px] w-[86px] overflow-hidden rounded-full bg-[#fff3f0]">
        {useEmptyImage && <img src={xImage} alt="" className="h-full w-full object-cover" />}
      </div>
    )
  }

  return (
    <div aria-label={label} className="mx-auto h-[108px] w-[108px] overflow-hidden rounded-full bg-[#e1f4e7]">
      {usePeopleImage && <img src={peopleImage} alt="" className="h-full w-full object-cover" />}
    </div>
  )
}
