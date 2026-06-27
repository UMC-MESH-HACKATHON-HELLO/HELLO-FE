import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
  path: '/4',
  code: 'MT101',
  title: '\uB9E4\uCE6D \uC911',
  role: text.elder,
  topGap: 'h-[92px]',
  illustration: 'loader',
  heading: '\uB3C4\uC6B0\uBBF8\uB97C \uCC3E\uACE0 \uC788\uC5B4\uC694\u2026',
  subheading: '\uC7A0\uC2DC\uB9CC \uAE30\uB2E4\uB824 \uC8FC\uC138\uC694',
  runningTimer: true,
  buttons: [{ label: '취소', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]', onClick: () => { window.location.hash = '#/3' } }],
}

export function Page4Matching() {
  return <ProductionPage page={page} />
}
