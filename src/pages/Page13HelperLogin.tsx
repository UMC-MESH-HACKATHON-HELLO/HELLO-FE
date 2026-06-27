import { useState } from 'react'
import logoImage from '../assets/여보세요_로고.png'
import peopleImage from '../assets/people.png'
import { text } from './pageTypes'

const API_BASE = ''

export function Page13HelperLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요')
      return
    }
    setError('')
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (res.ok) {
        window.location.hash = '#/8'
      } else {
        setError(data.message || '로그인에 실패했어요')
      }
    } catch {
      setError('서버에 연결할 수 없어요')
    }
  }

  return (
    <section
      aria-label="HE301 도우미 로그인"
      className="h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      <header className="flex h-[34px] w-[342px] items-center justify-between text-2xl font-bold leading-[1.2] text-[#10251b]">
        <img src={logoImage} alt={text.appName} className="h-[44px] w-auto" />
        <span>도우미 로그인</span>
      </header>

      <div className="h-[28px]" />

      <div className="mx-auto h-[100px] w-[100px] overflow-hidden rounded-full bg-[#e1f4e7]">
        <img src={peopleImage} alt="도우미" className="h-full w-full object-cover" />
      </div>

      <div className="h-[24px]" />

      <h1 className="text-[32px] font-bold leading-[1.28] text-[#071b11]">도우미로 시작할까요?</h1>
      <p className="mt-2 text-[18px] font-medium leading-[1.5] text-[#10251a]">
        아이디와 비밀번호를 입력하고<br />도움 활동을 시작해요
      </p>

      <div className="h-[28px]" />

      <div className="mx-auto flex w-[312px] flex-col gap-3">
        <input
          type="text"
          placeholder="아이디"
          aria-label="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-[56px] w-full rounded-[16px] border-[1.4px] border-[#cadfca] bg-white px-5 text-[18px] font-medium text-[#10251a] placeholder-[#87a98e] outline-none focus:border-[#087349]"
        />
        <input
          type="password"
          placeholder="비밀번호"
          aria-label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[56px] w-full rounded-[16px] border-[1.4px] border-[#cadfca] bg-white px-5 text-[18px] font-medium text-[#10251a] placeholder-[#87a98e] outline-none focus:border-[#087349]"
        />
      </div>

      {error && <p className="mt-3 text-[14px] font-bold text-[#d94838]">{error}</p>}

      <div className="h-[20px]" />

      <div className="mx-auto flex w-[312px] flex-col gap-3">
        <button
          type="button"
          onClick={handleLogin}
          className="h-[56px] w-full rounded-[16px] border-2 border-[#087349] bg-[#ddf7e8] text-[20px] font-bold text-[#075d3c] transition-transform hover:-translate-y-0.5"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => { window.location.hash = '#/14' }}
          className="h-[56px] w-full rounded-[16px] border-2 border-[#cadfca] bg-white text-[20px] font-bold text-[#087349] transition-transform hover:-translate-y-0.5"
        >
          회원가입
        </button>
      </div>

      <div className="h-[16px]" />

      <p className="text-[14px] font-medium leading-[1.5] text-[#10251a]">
        처음이신가요?<br />회원가입 후 바로 도우미로 활동할 수 있어요
      </p>

      <div className="h-[16px]" />

      <button
        type="button"
        onClick={() => { window.location.hash = '#/1' }}
        className="mx-auto flex h-[44px] w-[184px] items-center justify-center rounded-[16px] border-2 border-[#cadfca] bg-white text-[18px] font-bold text-[#10251a] transition-transform hover:-translate-y-0.5"
      >
        홈으로
      </button>
    </section>
  )
}
