import { useEffect, useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import microphoneIcon from './assets/free-icon-microphone-black-shape-25682.png'
import peopleImage from './assets/people.png'

type ButtonTone = 'primary' | 'helper' | 'secondary' | 'danger'
type IllustrationType = 'permission' | 'loader' | 'empty' | 'avatar'

type ActionButton = {
  label: string
  tone?: ButtonTone
  width?: string
  height?: string
}

type PageConfig = {
  path: string
  code: string
  title: string
  role?: string
  topGap: string
  illustration?: IllustrationType
  avatarLabel?: string
  avatarImage?: boolean
  heading?: string
  headingLines?: string[]
  subheading?: string
  subheadingTone?: 'default' | 'green'
  timer?: string
  runningTimer?: boolean
  status?: string
  point?: string
  segment?: boolean
  buttons?: ActionButton[]
  footnote?: string
}

const text = {
  appName: '\uC5EC\uBCF4\uC138\uC694',
  elder: '\uC775\uBA85 \uC5B4\uB974\uC2E0',
  helper: '\uC775\uBA85 \uB3C4\uC6B0\uBBF8',
  waiting: '\uB300\uAE30 \uC911',
  stopped: '\uC911\uC9C0',
}

const pages: PageConfig[] = [
  {
    path: '/1',
    code: 'S0',
    title: '\uC5ED\uD560 \uC120\uD0DD',
    topGap: 'h-[84px]',
    heading: text.appName,
    subheading: '\uC5B4\uB5A4 \uBD84\uC774\uC2E0\uAC00\uC694?',
    buttons: [
      {
        label: '\uB3C4\uC6C0\uC774 \uD544\uC694\uD574\uC694',
        tone: 'primary',
        width: 'w-[326px]',
        height: 'h-[152px]',
      },
      { label: '\uB3C4\uC640\uC904\uAC8C\uC694', tone: 'helper', width: 'w-[326px]', height: 'h-[152px]' },
    ],
  },
  {
    path: '/2',
    code: 'HE102',
    title: '\uB9C8\uC774\uD06C \uC900\uBE44',
    role: text.elder,
    topGap: 'h-[47px]',
    illustration: 'permission',
    heading: '\uB9C8\uC774\uD06C \uAD8C\uD55C\uC744 \uCF1C\uC8FC\uC138\uC694',
    subheading:
      '\uC7A0\uC2DC \uD6C4 \uD31D\uC5C5\uC774 \uB728\uBA74 \u201C\uD5C8\uC6A9\u201D\uC744 \uB20C\uB7EC\uC8FC\uC138\uC694',
    subheadingTone: 'green',
    buttons: [{ label: '\uD5C8\uC6A9', tone: 'primary', width: 'w-[326px]', height: 'h-[152px]' }],
    footnote: '\uD55C \uBC88\uB9CC \uCF1C\uB450\uBA74 \uD1B5\uD654\uAC00 \uD3B8\uD574\uC694',
  },
  {
    path: '/3',
    code: 'HE101',
    title: '\uB3C4\uC6C0 \uC694\uCCAD',
    role: text.elder,
    topGap: 'h-[92px]',
    heading: '\uB3C4\uC6C0\uC774 \uD544\uC694\uD558\uC2E0\uAC00\uC694?',
    subheading:
      '\uBC84\uD2BC\uC744 \uB204\uB974\uBA74 \uB300\uAE30 \uC911\uC778 \uB3C4\uC6B0\uBBF8\uC640 \uC5F0\uACB0\uB3FC\uC694',
    subheadingTone: 'green',
    buttons: [{ label: '\uB3C4\uC6C0 \uC694\uCCAD', tone: 'primary', width: 'w-[292px]', height: 'h-[156px]' }],
    footnote: '\uC751\uAE09 \uC0C1\uD669\uC740 119\uC5D0 \uBA3C\uC800 \uC5F0\uB77D\uD558\uC138\uC694',
  },
  {
    path: '/4',
    code: 'MT101',
    title: '\uB9E4\uCE6D \uC911',
    role: text.elder,
    topGap: 'h-[92px]',
    illustration: 'loader',
    heading: '\uB3C4\uC6B0\uBBF8\uB97C \uCC3E\uACE0 \uC788\uC5B4\uC694\u2026',
    subheading: '\uC7A0\uC2DC\uB9CC \uAE30\uB2E4\uB824 \uC8FC\uC138\uC694',
    buttons: [{ label: '\uCDE8\uC18C', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]' }],
  },
  {
    path: '/5',
    code: 'MT104',
    title: '\uB3C4\uC6B0\uBBF8 \uC5C6\uC74C',
    role: text.elder,
    topGap: 'h-[81px]',
    illustration: 'empty',
    headingLines: [
      '\uC9C0\uAE08\uC740 \uB300\uAE30 \uC911\uC778',
      '\uB3C4\uC6B0\uBBF8\uAC00 \uC5C6\uC5B4\uC694',
    ],
    subheading: '\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694',
    buttons: [
      { label: '\uB2E4\uC2DC \uC694\uCCAD', tone: 'primary', width: 'w-[248px]', height: 'h-[140px]' },
      { label: '\uD648\uC73C\uB85C', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]' },
    ],
  },
  {
    path: '/6',
    code: 'MT102',
    title: '\uD1B5\uD654 \uC911',
    role: text.elder,
    topGap: 'h-[71px]',
    illustration: 'avatar',
    avatarLabel: text.helper,
    avatarImage: true,
    heading: text.helper,
    subheading: '\uC5F0\uACB0\uB410\uC5B4\uC694 \u00B7 \uB9D0\uC500\uD558\uC138\uC694',
    subheadingTone: 'green',
    runningTimer: true,
    status: '\uB9C8\uC774\uD06C \uCF1C\uC9D0',
    buttons: [{ label: '\uD1B5\uD654 \uC885\uB8CC', tone: 'danger', width: 'w-[248px]', height: 'h-[140px]' }],
  },
  {
    path: '/7',
    code: 'MT103',
    title: '\uC885\uB8CC',
    role: text.elder,
    topGap: 'h-[80px]',
    illustration: 'avatar',
    heading: '\uD1B5\uD654\uAC00 \uB05D\uB0AC\uC5B4\uC694',
    subheading: '\uB3C4\uC6C0\uC774 \uB418\uC5C8\uAE38 \uBC14\uB77C\uC694',
    buttons: [{ label: '\uD648\uC73C\uB85C', tone: 'primary', width: 'w-[208px]', height: 'h-[132px]' }],
  },
  {
    path: '/8',
    code: 'HP101',
    title: '\uB300\uAE30',
    role: text.helper,
    topGap: 'h-[92px]',
    heading: '\uB3C4\uC6C0 \uC694\uCCAD \uB300\uAE30 \uC911',
    segment: true,
    status: '\u25CF \uC694\uCCAD\uC744 \uAE30\uB2E4\uB9AC\uACE0 \uC788\uC5B4\uC694',
    footnote: '\uB300\uAE30 \uC911\uC77C \uB54C\uB9CC \uC694\uCCAD\uC744 \uBC1B\uC544\uC694',
  },
  {
    path: '/9',
    code: 'HP102',
    title: '\uC694\uCCAD \uC218\uC2E0',
    role: text.helper,
    topGap: 'h-[88px]',
    illustration: 'loader',
    heading: '\uB3C4\uC6C0 \uC694\uCCAD\uC774 \uC654\uC5B4\uC694',
    subheading: '\uC5B4\uB974\uC2E0\uC774 \uB3C4\uC6C0\uC744 \uAE30\uB2E4\uB824\uC694',
    buttons: [
      { label: '\uC218\uB77D\uD558\uACE0 \uD1B5\uD654', tone: 'helper', width: 'w-[292px]', height: 'h-[156px]' },
      { label: '\uAC70\uC808', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]' },
    ],
  },
  {
    path: '/10',
    code: 'S4',
    title: '\uB3C4\uC6B0\uBBF8 \uD1B5\uD654',
    role: text.helper,
    topGap: 'h-[77px]',
    illustration: 'avatar',
    avatarLabel: text.elder,
    avatarImage: true,
    heading: text.elder,
    runningTimer: true,
    status: '\uB9C8\uC774\uD06C \uCF1C\uC9D0',
    buttons: [{ label: '\uD1B5\uD654 \uC885\uB8CC', tone: 'danger', width: 'w-[248px]', height: 'h-[140px]' }],
  },
  {
    path: '/11',
    code: 'MT103-B',
    title: '\uB300\uAE30 \uBCF5\uADC0',
    role: text.helper,
    topGap: 'h-[92px]',
    heading: '\uD1B5\uD654\uAC00 \uB05D\uB0AC\uC5B4\uC694',
    point: '+10P \uC801\uB9BD (2\uCC28)',
    segment: true,
    status: '\uB2E4\uC2DC \uC694\uCCAD\uC744 \uAE30\uB2E4\uB824\uC694',
  },
]

const pageComponents = pages.reduce<Record<string, () => ReactElement>>((result, page) => {
  result[page.path] = () => <ProductionPage page={page} />
  return result
}, {})

function App() {
  const [path, setPath] = useState(getCurrentPath)
  const ActivePage = useMemo(() => pageComponents[path] ?? pageComponents[pages[0].path], [path])

  useEffect(() => {
    const handleHashChange = () => setPath(getCurrentPath())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <main className="grid min-h-svh place-items-center bg-[#f2f8ef] px-4 py-6 font-['Noto_Sans_KR',system-ui,sans-serif] text-[#10251a]">
      <ActivePage />
    </main>
  )
}

function getCurrentPath() {
  return window.location.hash.replace(/^#/, '') || pages[0].path
}

function ProductionPage({ page }: { page: PageConfig }) {
  const elapsedTime = useElapsedTimer(page.runningTimer)

  return (
    <section
      aria-label={`${page.code} ${page.title}`}
      className="h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      <TopBar role={page.role} />
      <div className={page.topGap} />
      {page.illustration && (
        <Illustration type={page.illustration} label={page.avatarLabel} usePeopleImage={page.avatarImage} />
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

function ActionButton({ button }: { button: ActionButton }) {
  const toneClass: Record<ButtonTone, string> = {
    primary: 'border-[#087349] bg-[#ddf7e8] text-[#075d3c]',
    helper: 'border-[#6dbf35] bg-[#e8fad8] text-[#2f751c]',
    secondary: 'border-[#cadfca] bg-white text-[#10251a]',
    danger: 'border-[#d94838] bg-[#d94838] text-white',
  }

  return (
    <button
      type="button"
      className={`${button.width ?? 'w-[248px]'} ${button.height ?? 'h-[140px]'} rounded-[32px] border-2 px-6 text-[29.6px] font-bold leading-[1.18] shadow-[0_12px_12px_rgba(10,31,18,0.16)] transition-transform hover:-translate-y-0.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#087349] ${toneClass[button.tone ?? 'primary']}`}
    >
      {button.label}
    </button>
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
}: {
  type: IllustrationType
  label?: string
  usePeopleImage?: boolean
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
    return <div className="mx-auto h-[86px] w-[86px] rounded-full border border-[#f05e58] bg-[#fff3f0]" />
  }

  return (
    <div aria-label={label} className="mx-auto h-[108px] w-[108px] overflow-hidden rounded-full bg-[#e1f4e7]">
      {usePeopleImage && <img src={peopleImage} alt="" className="h-full w-full object-cover" />}
    </div>
  )
}

export default App
