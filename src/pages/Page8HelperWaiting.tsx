import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
  path: '/8',
  code: 'HP101',
  title: '\uB300\uAE30',
  role: text.helper,
  topGap: 'h-[92px]',
  heading: '\uB3C4\uC6C0 \uC694\uCCAD \uB300\uAE30 \uC911',
  segment: true,
  status: '\u25CF \uC694\uCCAD\uC744 \uAE30\uB2E4\uB9AC\uACE0 \uC788\uC5B4\uC694',
  footnote: '\uB300\uAE30 \uC911\uC77C \uB54C\uB9CC \uC694\uCCAD\uC744 \uBC1B\uC544\uC694',
}

export function Page8HelperWaiting() {
  return <ProductionPage page={page} />
}
