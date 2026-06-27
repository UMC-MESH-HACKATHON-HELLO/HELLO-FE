import { useEffect } from 'react'
import { connect, disconnect, on, off, send } from './socket'

/**
 * 소켓 연결을 관리하는 훅.
 * 컴포넌트 마운트 시 연결, 언마운트 시 해제.
 */
export function useSocketConnect() {
  useEffect(() => {
    connect()
    return () => disconnect()
  }, [])
}

/**
 * 특정 소켓 이벤트를 구독하는 훅.
 * @param event - 이벤트 이름 (예: 'match:request')
 * @param handler - 이벤트 핸들러
 */
export function useSocketEvent(event: string, handler: (data: unknown) => void) {
  useEffect(() => {
    on(event, handler)
    return () => off(event, handler)
  }, [event, handler])
}

export { send }
