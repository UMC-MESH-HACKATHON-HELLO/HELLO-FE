import { useCallback, useEffect, useRef, useState } from 'react'
import { connectToRoom, disconnectRoom, onCallStatus, type CallStatus } from './webrtc'
import { sendCallEnd } from './socket'

export type CallState = CallStatus

export function useCall() {
  const [callState, setCallState] = useState<CallState>('idle')
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null)
  const roomIdRef = useRef<string | null>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    return onCallStatus((status) => {
      if (mountedRef.current) setCallState(status)
    })
  }, [])

  /** MATCHED 시그널을 받은 후 호출 — LiveKit 연결 시작 */
  const startCall = useCallback(async (token: string, roomId: string) => {
    roomIdRef.current = roomId
    await connectToRoom(token, remoteAudioRef.current)
  }, [])

  /** 통화 종료 */
  const hangUp = useCallback(async () => {
    if (roomIdRef.current) {
      sendCallEnd(roomIdRef.current)
    }
    await disconnectRoom()
  }, [])

  return {
    callState,
    remoteAudioRef,
    startCall,
    hangUp,
  }
}
