import { useState } from 'react'
import logoImage from '../assets/여보세요_로고.png'
import peopleImage from '../assets/people.png'
import { text } from './pageTypes'

const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || '')

function validate(nickname: string, username: string, password: string, passwordConfirm: string) {
  return {
    nickname: !nickname ? '입력해주세요' : nickname.length < 2 || nickname.length > 10 ? '2~10자로 입력해주세요' : '',
    username: !username ? '입력해주세요' : username.length < 4 || username.length > 20 ? '4~20자로 입력해주세요' : '',
    password: !password ? '입력해주세요' : password.length < 8 ? '8자 이상이어야 해요' : '',
    passwordConfirm: !passwordConfirm ? '입력해주세요' : password !== passwordConfirm ? '비밀번호가 일치하지 않아요' : '',
  }
}

export function Page14HelperSignup() {
  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errors, setErrors] = useState({ nickname: '', username: '', password: '', passwordConfirm: '' })
  const [serverError, setServerError] = useState('')

  async function handleSignup() {
    const errs = validate(nickname, username, password, passwordConfirm)
    setErrors(errs)
    if (Object.values(errs).some((e) => e)) return

    setServerError('')
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, nickname }),
      })
      const data = await res.json()
      if (res.ok) {
        window.location.hash = '#/13'
      } else {
        setServerError(data.message || '회원가입에 실패했어요')
      }
    } catch {
      setServerError('서버에 연결할 수 없어요')
    }
  }

  return (
    <section
      aria-label="HE401 도우미 회원가입"
      className="h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      <header className="flex h-[34px] w-[342px] items-center justify-between text-2xl font-bold leading-[1.2] text-[#10251b]">
        <img src={logoImage} alt={text.appName} className="h-[44px] w-auto" />
        <span>회원가입</span>
      </header>

      <div className="h-[24px]" />

      <div className="mx-auto h-[100px] w-[100px] overflow-hidden rounded-full bg-[#e1f4e7]">
        <img src={peopleImage} alt="도우미" className="h-full w-full object-cover" />
      </div>

      <div className="h-[16px]" />

      <h1 className="text-[30px] font-bold leading-[1.28] text-[#071b11]">도우미 회원가입</h1>
      <p className="mt-2 text-[16px] font-medium leading-[1.5] text-[#10251a]">
        간단한 정보 입력 후<br />도우미 활동을 시작할 수 있어요
      </p>

      <div className="h-[24px]" />

      <div className="mx-auto flex w-[312px] flex-col gap-1">
        <InputField icon="👤" placeholder="이름" type="text" value={nickname} onChange={setNickname} error={errors.nickname} />
        <InputField icon="👤" placeholder="아이디" type="text" value={username} onChange={setUsername} error={errors.username} />
        <InputField icon="🔒" placeholder="비밀번호" type="password" value={password} onChange={setPassword} error={errors.password} />
        <InputField icon="🔒" placeholder="비밀번호 확인" type="password" value={passwordConfirm} onChange={setPasswordConfirm} error={errors.passwordConfirm} />
      </div>

      {serverError && <p className="mt-3 text-[14px] font-bold text-[#d94838]">{serverError}</p>}

      <div className="h-[20px]" />

      <button
        type="button"
        onClick={handleSignup}
        className="mx-auto flex h-[56px] w-[312px] items-center justify-center rounded-[16px] border-2 border-[#087349] bg-[#ddf7e8] text-[20px] font-bold text-[#075d3c] transition-transform hover:-translate-y-0.5"
      >
        회원가입 완료
      </button>

      <div className="h-[16px]" />

      <p className="text-[14px] font-medium text-[#10251a]">
        이미 계정이 있나요?{' '}
        <button type="button" onClick={() => { window.location.hash = '#/13' }} className="font-bold text-[#087349] underline underline-offset-2">
          로그인
        </button>
      </p>
    </section>
  )
}

function InputField({ icon, placeholder, type, value, onChange, error }: {
  icon: string
  placeholder: string
  type: string
  value: string
  onChange: (v: string) => void
  error: string
}) {
  return (
    <div>
      <div className={`flex h-[56px] w-full items-center rounded-[16px] border-[1.4px] px-4 ${error ? 'border-[#d94838] bg-[#fff8f7]' : 'border-[#cadfca] bg-[#f4fbf6]'}`}>
        <span className="mr-3 text-[18px] text-[#087349]">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          aria-label={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full flex-1 bg-transparent text-[16px] font-medium text-[#10251a] placeholder-[#87a98e] outline-none"
        />
      </div>
      {error && <p className="mt-1 pl-2 text-left text-[13px] font-medium text-[#d94838]">{error}</p>}
    </div>
  )
}
