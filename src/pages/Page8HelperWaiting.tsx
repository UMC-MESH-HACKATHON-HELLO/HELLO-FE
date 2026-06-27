import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import logoImage from '../assets/여보세요_로고.png'
import { connect, disconnect, onSignal, sendHelperRegister, subscribeRoom } from '../api/socket'
import type { SignalMessage } from '../api/socket'
import { text } from './pageTypes'

export function Page8HelperWaiting() {
  const [isOn, setIsOn] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const connectedRef = useRef(false)

  // STOMP 연결 + 대기 등록 (로그인 세션 쿠키로 인증)
  useEffect(() => {
    if (!isOn || connectedRef.current) return
    connectedRef.current = true

    // 도우미는 이미 로그인 세션이 있으므로 createSession 불필요
    // JSESSIONID 쿠키가 SockJS 핸드셰이크에 자동 전달됨
    connect()
      .then(() => sendHelperRegister())
      .catch((err) => {
        console.error('[Page8] 연결 실패:', err)
        connectedRef.current = false
      })

    return () => {
      disconnect()
      connectedRef.current = false
    }
  }, [isOn])

  // 타이머
  useEffect(() => {
    if (!isOn) return
    const id = window.setInterval(() => setElapsedSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [isOn])

  // MATCHED 수신
  useEffect(() => {
    return onSignal((msg: SignalMessage) => {
      if (msg.type === 'MATCHED' && msg.roomId && msg.token) {
        // token/roomId를 sessionStorage에 저장 후 통화 페이지로 이동
        sessionStorage.setItem('lk_token', msg.token)
        sessionStorage.setItem('lk_roomId', msg.roomId)
        subscribeRoom(msg.roomId)
        window.location.hash = '#/10'
      }
    })
  }, [])

  const handleToggle = () => {
    if (isOn) {
      setShowModal(true)
    } else {
      setIsOn(true)
    }
  }

  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60
  const timerDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <section
      aria-label="HP101 대기"
      className="h-[844px] w-[390px] overflow-hidden rounded-[38px] border-[1.4px] border-[#cadfca] bg-[#fffffc] px-6 py-6 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]"
    >
      <header className="flex h-[34px] w-[342px] items-center justify-between text-2xl font-bold leading-[1.2] text-[#10251b]">
        <img src={logoImage} alt={text.appName} className="h-[44px] w-auto" />
        <span>{text.helper}</span>
      </header>

      <div className="h-[92px]" />

      <h1 className="mx-auto w-[342px] text-[38.4px] font-bold leading-[1.28] text-[#071b11]">도움 요청 대기 중</h1>

      {/* 토글 */}
      <div className="mx-auto mt-5 flex items-center justify-center gap-4">
        <span className={`text-[21.6px] font-bold leading-[1.28] ${isOn ? 'text-[#075d3c]' : 'text-[#10251a]/40'}`}>{text.waiting}</span>
        <button
          type="button"
          role="switch"
          aria-checked={isOn}
          onClick={handleToggle}
          className={`relative h-[36px] w-[64px] rounded-full border-2 transition-colors duration-200 ${isOn ? 'border-[#087349] bg-[#087349]' : 'border-[#cadfca] bg-[#cadfca]'}`}
        >
          <span className={`absolute top-[3px] h-[26px] w-[26px] rounded-full bg-white shadow-md transition-transform duration-200 ${isOn ? 'left-[34px]' : 'left-[3px]'}`} />
        </button>
        <span className={`text-[21.6px] font-bold leading-[1.28] ${!isOn ? 'text-[#d94838]' : 'text-[#10251a]/40'}`}>{text.stopped}</span>
      </div>

      {/* 타이머 */}
      <p className="mt-4 text-[62.4px] font-bold leading-[1.28] text-[#071b11]">{timerDisplay}</p>

      {/* 상태 */}
      <p className="mx-auto mt-3 w-[342px] text-[21.6px] font-bold leading-[1.28] text-[#075d3c]">
        {isOn ? '● 요청을 기다리고 있어요' : '대기 중지됨'}
      </p>

      {/* 버튼 */}
      <div className="mt-7 flex flex-col items-center gap-[11px]">
        <button type="button" onClick={() => { window.location.hash = '#/12' }} className="w-[248px] h-[116px] rounded-[32px] border-2 border-[#087349] bg-[#ddf7e8] px-6 text-[29.6px] font-bold leading-[1.18] text-[#075d3c] shadow-[0_12px_12px_rgba(10,31,18,0.16)] transition-transform hover:-translate-y-0.5">마이페이지</button>
        <button type="button" onClick={() => { window.location.hash = '#/1' }} className="w-[184px] h-[116px] rounded-[32px] border-2 border-[#cadfca] bg-white px-6 text-[29.6px] font-bold leading-[1.18] text-[#10251a] shadow-[0_12px_12px_rgba(10,31,18,0.16)] transition-transform hover:-translate-y-0.5">홈으로</button>
      </div>

      <p className="mx-auto mt-8 w-[342px] text-[21.6px] font-bold leading-[1.28] text-[#10251a]">대기 중일 때만 요청을 받아요</p>

      {/* 중지 확인 모달 */}
      {showModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div role="alertdialog" className="w-[320px] rounded-[24px] border-[1.4px] border-[#cadfca] bg-white px-6 py-8 text-center shadow-[0_20px_38px_-8px_rgba(10,31,18,0.18)]">
            <p className="text-[24px] font-bold leading-[1.4] text-[#10251a]">정말 중지하시겠습니까?</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button type="button" onClick={() => { setShowModal(false); setIsOn(false); disconnect() }} className="h-[48px] w-[120px] rounded-[16px] border-2 border-[#d94838] bg-[#d94838] text-[20px] font-bold text-white transition-transform hover:-translate-y-0.5">예</button>
              <button type="button" onClick={() => setShowModal(false)} className="h-[48px] w-[120px] rounded-[16px] border-2 border-[#cadfca] bg-white text-[20px] font-bold text-[#10251a] transition-transform hover:-translate-y-0.5">아니오</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  )
}
