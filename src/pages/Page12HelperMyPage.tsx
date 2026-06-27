import { useEffect, useState } from 'react'
import logoImage from '../assets/여보세요_로고.png'
import peopleImage from '../assets/people.png'
import { text } from './pageTypes'

export function Page12HelperMyPage() {
  const [nickname, setNickname] = useState('')
  const [points, setPoints] = useState(0)

  useEffect(() => {
    fetch('/helper/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        setNickname(data.result?.nickname ?? '')
        setPoints(data.result?.points ?? 0)
      })
      .catch(() => {})
  }, [])
  return (
    <section
      aria-label="HE201 마이페이지"
      className="h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      {/* Top Bar */}
      <header className="flex h-[50px] w-[342px] items-center justify-start text-2xl font-bold leading-[1.2] text-[#10251b]">
        <img src={logoImage} alt={text.appName} className="-ml-2 h-[88px] w-auto" />
      </header>

      <div className="h-[32px]" />

      {/* Profile Avatar */}
      <div className="mx-auto h-[108px] w-[108px] overflow-hidden rounded-full bg-[#e1f4e7]">
        <img src={peopleImage} alt="프로필" className="h-full w-full object-cover" />
      </div>

      {/* Name & Message */}
      <h1 className="mt-4 text-[32px] font-bold leading-[1.28] text-[#071b11]">
        {nickname} 도우미
      </h1>
      <p className="mt-1 text-[18px] font-medium leading-[1.4] text-[#075d3c]">
        오늘도 따뜻한 도움을 전하고 있어요
      </p>

      <div className="h-[24px]" />

      {/* Stats Cards */}
      <div className="mx-auto flex w-[312px] gap-3">
        {/* 보유 포인트 */}
        <div className="flex h-[120px] flex-1 flex-col items-center justify-center rounded-[20px] border-[1.4px] border-[#cadfca] bg-[#f4fbf6]">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#ddf7e8]">
            <span className="text-[16px] font-bold text-[#087349]">P</span>
          </div>
          <span className="mt-1 text-[14px] font-medium text-[#10251a]">보유 포인트</span>
          <span className="mt-1 text-[28px] font-bold leading-[1.2] text-[#071b11]">{points.toLocaleString()}P</span>
        </div>

        {/* 도움 온도 */}
        <div className="flex h-[120px] flex-1 flex-col items-center justify-center rounded-[20px] border-[1.4px] border-[#cadfca] bg-[#f4fbf6]">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#ddf7e8]">
            <span className="text-[16px] font-bold text-[#087349]">🌡</span>
          </div>
          <span className="mt-1 text-[14px] font-medium text-[#10251a]">도움 지수</span>
          <span className="mt-1 text-[28px] font-bold leading-[1.2] text-[#071b11]">38.5°</span>
        </div>
      </div>

      <div className="h-[28px]" />

      {/* Menu Items */}
      <div className="mx-auto flex w-[312px] flex-col gap-3">
        <MenuItem icon="📋" label="포인트 내역" />
        <MenuItem icon="🕐" label="나의 도움 기록" />
        <MenuItem icon="⚙️" label="계정 설정" />
      </div>

      <div className="h-[28px]" />

      {/* Logout Button */}
      <button
        type="button"
        onClick={async () => {
          try { await fetch('/logout', { method: 'POST', credentials: 'include' }) } catch {}
          window.location.hash = '#/1'
        }}
        className="mx-auto flex h-[52px] w-[280px] items-center justify-center rounded-[26px] border-2 border-[#087349] bg-white text-[18px] font-bold text-[#087349] transition-transform hover:-translate-y-0.5"
      >
        <span className="mr-2">↪</span>
        로그아웃
      </button>

      <div className="h-[12px]" />

      <button
        type="button"
        onClick={() => { window.location.hash = '#/8' }}
        className="mx-auto flex h-[44px] w-[184px] items-center justify-center rounded-[16px] border-2 border-[#cadfca] bg-white text-[18px] font-bold text-[#10251a] transition-transform hover:-translate-y-0.5"
      >
        이전으로
      </button>
    </section>
  )
}

function MenuItem({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      type="button"
      className="flex h-[60px] w-full items-center rounded-[16px] border-[1.4px] border-[#cadfca] bg-white px-5 text-left transition-colors hover:bg-[#f4fbf6]"
    >
      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#e1f4e7]">
        <span className="text-[16px]">{icon}</span>
      </div>
      <span className="ml-4 flex-1 text-[18px] font-bold text-[#10251a]">{label}</span>
      <span className="text-[18px] text-[#087349]">›</span>
    </button>
  )
}
