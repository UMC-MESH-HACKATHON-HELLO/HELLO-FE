import { useEffect, useMemo, useState } from 'react'
import { pages } from './pages'

function App() {
  const [path, setPath] = useState(getCurrentPath)
  const ActivePage = useMemo(
    () => pages.find((page) => page.path === path)?.Component ?? pages[0].Component,
    [path],
  )

  useEffect(() => {
    const handleHashChange = () => setPath(getCurrentPath())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
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
