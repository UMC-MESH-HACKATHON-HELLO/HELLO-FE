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
  status: '\uB2E4\uC2DC \uC694\uCCAD\uC744 \uAE30\uB2E4\uB824\uC694',
}

export function Page11HelperBackToWaiting() {
  return <ProductionPage page={page} />
}
