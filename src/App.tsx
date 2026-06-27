import { useEffect, useMemo, useState } from 'react'
import { pages } from './pages'

const HELPER_PATHS = ['/8', '/12']

function App() {
  const [path, setPath] = useState(getCurrentPath)
  const ActivePage = useMemo(
    () => pages.find((page) => page.path === path)?.Component ?? pages[0].Component,
    [path],
  )

  useEffect(() => {
    const handleHashChange = () => {
      const next = getCurrentPath()
      if (HELPER_PATHS.includes(next)) {
        fetch('/helper/me', { credentials: 'include' }).then((res) => {
          if (!res.ok) {
            window.location.hash = '#/13'
          } else {
            setPath(next)
          }
        }).catch(() => { window.location.hash = '#/13' })
      } else {
        setPath(next)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // 초기 로드 시에도 체크
  useEffect(() => {
    if (HELPER_PATHS.includes(path)) {
      fetch('/helper/me', { credentials: 'include' }).then((res) => {
        if (!res.ok) window.location.hash = '#/13'
      }).catch(() => { window.location.hash = '#/13' })
    }
  }, [])

  return (
    <main className="grid min-h-svh place-items-center bg-[#f2f8ef] px-4 py-6 font-['Noto_Sans_KR',system-ui,sans-serif] text-[#10251a]">
      <ActivePage />
    </main>
  )
}

function getCurrentPath() {
  return window.location.hash.replace(/^#/, '') || pages[0].path
}

export default App
