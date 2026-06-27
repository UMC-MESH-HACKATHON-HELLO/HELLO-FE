import { useEffect, useRef } from 'react'
import { createSession, connect, disconnect, onSignal, sendHelpRequest, subscribeRoom } from '../api/socket'
import type { SignalMessage } from '../api/socket'
import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

export function Page4Matching() {
  const connectedRef = useRef(false)

  // 세션 발급 + STOMP 연결 + 도움 요청
  useEffect(() => {
    if (connectedRef.current) return
    connectedRef.current = true

    createSession('HELPEE')
      .then(() => connect())
      .then(() => sendHelpRequest())
      .catch((err) => {
        console.error('[Page4] 연결 실패:', err)
        connectedRef.current = false
      })

    return () => {
      disconnect()
      connectedRef.current = false
    }
  }, [])

  // 시그널 수신
  useEffect(() => {
    return onSignal((msg: SignalMessage) => {
      if (msg.type === 'MATCHED' && msg.roomId && msg.token) {
        sessionStorage.setItem('lk_token', msg.token)
        sessionStorage.setItem('lk_roomId', msg.roomId)
        subscribeRoom(msg.roomId)
        window.location.hash = '#/6'
      }
      if (msg.type === 'NO_HELPER') {
        window.location.hash = '#/5'
      }
    })
  }, [])

  const page: PageConfig = {
    path: '/4',
    code: 'MT101',
    title: '매칭 중',
    role: text.elder,
    topGap: 'h-[92px]',
    illustration: 'loader',
    heading: '도우미를 찾고 있어요…',
    subheading: '잠시만 기다려 주세요',
    runningTimer: true,
    buttons: [{ label: '취소', tone: 'secondary', width: 'w-[184px]', height: 'h-[116px]', onClick: () => { disconnect(); window.location.hash = '#/3' } }],
  }

  return <ProductionPage page={page} />
}
