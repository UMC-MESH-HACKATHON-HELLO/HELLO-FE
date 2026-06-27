import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
  path: '/11',
  code: 'MT103-B',
  title: '\uB300\uAE30 \uBCF5\uADC0',
  role: text.helper,
  topGap: 'h-[92px]',
  heading: '\uD1B5\uD654\uAC00 \uB05D\uB0AC\uC5B4\uC694',
  point: '+10P \uC801\uB9BD (2\uCC28)',
  segment: true,
  status: '다시 요청을 기다려요',
  buttons: [{ label: '홈으로', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]', onClick: () => { window.location.hash = '#/1' } }],
}

export function Page11HelperBackToWaiting() {
  return <ProductionPage page={page} />
}
