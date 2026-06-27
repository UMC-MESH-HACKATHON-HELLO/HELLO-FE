import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
  path: '/2',
  code: 'HE102',
  title: '\uB9C8\uC774\uD06C \uC900\uBE44',
  role: text.elder,
  topGap: 'h-[47px]',
  illustration: 'permission',
  heading: '\uB9C8\uC774\uD06C \uAD8C\uD55C\uC744 \uCF1C\uC8FC\uC138\uC694',
  subheading: '\uC7A0\uC2DC \uD6C4 \uD31D\uC5C5\uC774 \uB728\uBA74 \u201C\uD5C8\uC6A9\u201D\uC744 \uB20C\uB7EC\uC8FC\uC138\uC694',
  subheadingTone: 'green',
  buttons: [{ label: '\uD5C8\uC6A9', tone: 'primary', width: 'w-[326px]', height: 'h-[152px]' }],
  footnote: '\uD55C \uBC88\uB9CC \uCF1C\uB450\uBA74 \uD1B5\uD654\uAC00 \uD3B8\uD574\uC694',
}

export function Page2MicReady() {
  return <ProductionPage page={page} />
}
