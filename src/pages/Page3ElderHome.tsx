import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
  path: '/3',
  code: 'HE101',
  title: '\uB3C4\uC6C0 \uC694\uCCAD',
  role: text.elder,
  topGap: 'h-[92px]',
  heading: '\uB3C4\uC6C0\uC774 \uD544\uC694\uD558\uC2E0\uAC00\uC694?',
  subheading: '\uBC84\uD2BC\uC744 \uB204\uB974\uBA74 \uB300\uAE30 \uC911\uC778 \uB3C4\uC6B0\uBBF8\uC640 \uC5F0\uACB0\uB3FC\uC694',
  subheadingTone: 'green',
  buttons: [
    { label: '도움 요청', tone: 'primary', width: 'w-[292px]', height: 'h-[156px]', onClick: () => { window.location.hash = '#/4' } },
    { label: '홈으로', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]', onClick: () => { window.location.hash = '#/1' } },
  ],
  footnote: '\uC751\uAE09 \uC0C1\uD669\uC740 119\uC5D0 \uBA3C\uC800 \uC5F0\uB77D\uD558\uC138\uC694',
}

export function Page3ElderHome() {
  return <ProductionPage page={page} />
}
