import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

const page: PageConfig = {
  path: '/5',
  code: 'MT104',
  title: '\uB3C4\uC6B0\uBBF8 \uC5C6\uC74C',
  role: text.elder,
  topGap: 'h-[81px]',
  illustration: 'empty',
  emptyImage: true,
  headingLines: ['\uC9C0\uAE08\uC740 \uB300\uAE30 \uC911\uC778', '\uB3C4\uC6B0\uBBF8\uAC00 \uC5C6\uC5B4\uC694'],
  subheading: '\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694',
  buttons: [
    { label: '\uB2E4\uC2DC \uC694\uCCAD', tone: 'primary', width: 'w-[248px]', height: 'h-[140px]' },
    { label: '\uD648\uC73C\uB85C', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]' },
  ],
}

export function Page5NoHelper() {
  return <ProductionPage page={page} />
}
