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
  toggle: {
    onLabel: text.waiting,
    offLabel: text.stopped,
    offNavigateTo: '/1',
  },
  status: '● 요청을 기다리고 있어요',
  buttons: [
    { label: '마이페이지', tone: 'primary', width: 'w-[248px]', height: 'h-[116px]', onClick: () => { window.location.hash = '#/12' } },
    { label: '홈으로', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]', onClick: () => { window.location.hash = '#/1' } },
  ],
  footnote: '대기 중일 때만 요청을 받아요',
}

export function Page8HelperWaiting() {
  return <ProductionPage page={page} />
}
