import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
  path: '/1',
  code: 'S0',
  title: '\uC5ED\uD560 \uC120\uD0DD',
  topGap: 'h-[84px]',
  heading: text.appName,
  subheading: '\uC5B4\uB5A4 \uBD84\uC774\uC2E0\uAC00\uC694?',
  buttons: [
    { label: '\uB3C4\uC6C0\uC774 \uD544\uC694\uD574\uC694', tone: 'primary', width: 'w-[326px]', height: 'h-[152px]' },
    { label: '\uB3C4\uC640\uC904\uAC8C\uC694', tone: 'helper', width: 'w-[326px]', height: 'h-[152px]' },
  ],
}

export function Page1RoleSelect() {
  return <ProductionPage page={page} />
}
