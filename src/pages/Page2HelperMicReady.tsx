import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

async function handleAllow() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((t) => t.stop())
    window.location.hash = '#/13'
  } catch {
    // 권한 거부 시 현재 페이지 유지
  }
}

const page: PageConfig = {
  path: '/2-helper',
  code: 'HP100',
  title: '마이크 준비 (도우미)',
  role: text.helper,
  topGap: 'h-[47px]',
  illustration: 'permission',
  heading: '마이크 권한을 켜주세요',
  subheading: '잠시 후 팝업이 뜨면 "허용"을 눌러주세요',
  subheadingTone: 'green',
  buttons: [{ label: '허용', tone: 'helper', width: 'w-[326px]', height: 'h-[152px]', onClick: handleAllow }],
  footnote: '한 번만 켜두면 통화가 편해요',
}

export function Page2HelperMicReady() {
  return <ProductionPage page={page} />
}
