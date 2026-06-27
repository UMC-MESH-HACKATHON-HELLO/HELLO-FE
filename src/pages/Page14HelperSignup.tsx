import logoImage from '../assets/여보세요_로고.png'
import peopleImage from '../assets/people.png'
import { text } from './pageTypes'

export function Page14HelperSignup() {
  return (
    <section
      aria-label="HE401 도우미 회원가입"
      className="h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      {/* Top Bar */}
      <header className="flex h-[34px] w-[342px] items-center justify-between text-2xl font-bold leading-[1.2] text-[#10251b]">
        <img src={logoImage} alt={text.appName} className="h-[44px] w-auto" />
        <span>회원가입</span>
      </header>

      <div className="h-[24px]" />

      {/* Profile Avatar */}
      <div className="mx-auto h-[100px] w-[100px] overflow-hidden rounded-full bg-[#e1f4e7]">
        <img src={peopleImage} alt="도우미" className="h-full w-full object-cover" />
      </div>

      <div className="h-[16px]" />

      {/* Heading */}
      <h1 className="text-[30px] font-bold leading-[1.28] text-[#071b11]">
        도우미 회원가입
      </h1>
      <p className="mt-2 text-[16px] font-medium leading-[1.5] text-[#10251a]">
        간단한 정보 입력 후
        <br />
        도우미 활동을 시작할 수 있어요
      </p>

      <div className="h-[24px]" />

      {/* Input Fields */}
      <div className="mx-auto flex w-[312px] flex-col gap-3">
        <InputField icon="👤" placeholder="이름" type="text" />
        <InputField icon="👤" placeholder="아이디" type="text" />
        <InputField icon="🔒" placeholder="비밀번호" type="password" />
        <InputField icon="🔒" placeholder="비밀번호 확인" type="password" />
        <InputField icon="📞" placeholder="전화번호" type="tel" />
      </div>

      <div className="h-[24px]" />

      {/* 회원가입 완료 Button */}
      <button
        type="button"
        className="mx-auto flex h-[56px] w-[312px] items-center justify-center rounded-[16px] border-2 border-[#087349] bg-[#ddf7e8] text-[20px] font-bold text-[#075d3c] transition-transform hover:-translate-y-0.5"
      >
        회원가입 완료
      </button>

      <div className="h-[16px]" />

      {/* Footer */}
      <p className="text-[14px] font-medium text-[#10251a]">
        이미 계정이 있나요?{' '}
        <button type="button" onClick={() => { window.location.hash = '#/13' }} className="font-bold text-[#087349] underline underline-offset-2">
          로그인
        </button>
      </p>
    </section>
  )
}

function InputField({
  icon,
  placeholder,
  type,
}: {
  icon: string
  placeholder: string
  type: string
}) {
  return (
    <div className="flex h-[56px] w-full items-center rounded-[16px] border-[1.4px] border-[#cadfca] bg-[#f4fbf6] px-4">
      <span className="mr-3 text-[18px] text-[#087349]">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-full flex-1 bg-transparent text-[16px] font-medium text-[#10251a] placeholder-[#87a98e] outline-none"
      />
    </div>
  )
}
