import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
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
}

export function Page9HelperRequest() {
  return <ProductionPage page={page} />
}
