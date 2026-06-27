import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
  path: '/7',
  code: 'MT103',
  title: '\uC885\uB8CC',
  role: text.elder,
  topGap: 'h-[80px]',
  illustration: 'avatar',
  avatarImage: true,
  heading: '\uD1B5\uD654\uAC00 \uB05D\uB0AC\uC5B4\uC694',
  subheading: '\uB3C4\uC6C0\uC774 \uB418\uC5C8\uAE38 \uBC14\uB77C\uC694',
  buttons: [{ label: '홈으로', tone: 'primary', width: 'w-[208px]', height: 'h-[132px]', onClick: () => { window.location.hash = '#/1' } }],
}

export function Page7ElderEnd() {
  return <ProductionPage page={page} />
}
