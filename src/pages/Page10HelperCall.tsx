import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
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
}

export function Page10HelperCall() {
  return <ProductionPage page={page} />
}
