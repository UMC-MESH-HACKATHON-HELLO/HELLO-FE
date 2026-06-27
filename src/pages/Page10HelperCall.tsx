import { useEffect } from 'react'
import { useCall } from '../api/useCall'
import { onSignal } from '../api/socket'
import type { SignalMessage } from '../api/socket'
import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

export function Page10HelperCall() {
  const { callState, remoteAudioRef, startCall, hangUp } = useCall()

  // 진입 시 LiveKit 연결
  useEffect(() => {
    const token = sessionStorage.getItem('lk_token')
    const roomId = sessionStorage.getItem('lk_roomId')
    if (token && roomId) {
      startCall(token, roomId)
      sessionStorage.removeItem('lk_token')
      sessionStorage.removeItem('lk_roomId')
    }
  }, [startCall])

  // 상대방 종료 감지
  useEffect(() => {
    return onSignal((msg: SignalMessage) => {
      if (msg.type === 'PARTNER_DISCONNECTED' || msg.type === 'ENDED') {
        window.location.hash = '#/11'
      }
    })
  }, [])

  // LiveKit 연결 끊김 감지
  useEffect(() => {
    if (callState === 'ended') {
      window.location.hash = '#/11'
    }
  }, [callState])

  const handleEndCall = () => {
    hangUp()
    window.location.hash = '#/11'
  }

  const page: PageConfig = {
    path: '/10',
    code: 'S4',
    title: '도우미 통화',
    role: text.helper,
    topGap: 'h-[77px]',
    illustration: 'avatar',
    avatarLabel: text.elder,
    avatarImage: true,
    heading: text.elder,
    runningTimer: callState === 'connected',
    status: callState === 'connected' ? '마이크 켜짐' : '연결 중...',
    buttons: [{ label: '통화 종료', tone: 'danger', width: 'w-[248px]', height: 'h-[140px]', onClick: handleEndCall }],
  }

  return (
    <div className="relative">
      <ProductionPage page={page} />
      <audio ref={remoteAudioRef} autoPlay className="hidden">
        <track kind="captions" />
      </audio>
    </div>
  )
}
