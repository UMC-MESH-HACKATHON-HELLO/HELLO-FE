import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

async function checkMicAndNavigate(granted: string, denied: string) {
  try {
    const status = await navigator.permissions.query({ name: 'microphone' as PermissionName })
    window.location.hash = status.state === 'granted' ? `#${granted}` : `#${denied}`
  } catch {
    window.location.hash = `#${denied}`
  }
}

const page: PageConfig = {
  path: '/1',
  code: 'S0',
  title: '역할 선택',
  hideTopBar: true,
  topGap: 'h-[84px]',
  heading: text.appName,
  headingImage: true,
  subheading: '어떤 분이신가요?',
  buttons: [
    { label: '도움이 필요해요', tone: 'primary', width: 'w-[326px]', height: 'h-[152px]', onClick: () => checkMicAndNavigate('/3', '/2') },
    { label: '도와줄게요', tone: 'helper', width: 'w-[326px]', height: 'h-[152px]', onClick: () => checkMicAndNavigate('/13', '/2-helper') },
  ],
}

export function Page1RoleSelect() {
  return <ProductionPage page={page} />
}
