import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
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
}

export function Page6ElderCall() {
  return <ProductionPage page={page} />
}
