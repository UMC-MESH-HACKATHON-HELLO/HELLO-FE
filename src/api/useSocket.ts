import { useEffect, useRef } from 'react'
import { createSession, connect, disconnect, onSignal, sendHelpRequest, sendHelperRegister, sendCallEnd, subscribeRoom, type SignalMessage } from './socket'

/**
 * STOMP 연결을 관리하는 훅.
 * 마운트 시 세션 발급 + 연결, 언마운트 시 해제.
 */
export function useSocketConnect(role: 'HELPEE' | 'HELPER') {
  const connectedRef = useRef(false)

  useEffect(() => {
    if (connectedRef.current) return
    connectedRef.current = true

    createSession(role).then(() => connect()).catch((err) => {
      console.error('[useSocketConnect] 연결 실패:', err)
      connectedRef.current = false
    })

    return () => {
      disconnect()
      connectedRef.current = false
    }
  }, [role])
}

/**
 * 개인 시그널 이벤트를 구독하는 훅.
 */
export function useSignal(handler: (msg: SignalMessage) => void) {
  useEffect(() => {
    return onSignal(handler)
  }, [handler])
}

export { sendHelpRequest, sendHelperRegister, sendCallEnd, subscribeRoom }
export type { SignalMessage }
