import { useCallback, useEffect, useRef, useState } from 'react'
import { startCall, waitForCall, endCall, notifyCallEnded, onRemoteStream, onCallEnded } from './webrtc'

export type CallState = 'idle' | 'connecting' | 'connected' | 'ended'

export function useCall() {
  const [callState, setCallState] = useState<CallState>('idle')
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    onRemoteStream((stream) => {
      setCallState('connected')
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = stream
        remoteAudioRef.current.play().catch(() => {})
      }
    })

    onCallEnded(() => {
      setCallState('ended')
    })

    return () => {
      endCall()
    }
  }, [])

  // 어르신 측: 통화 시작
  const initiateCall = useCallback(async () => {
    setCallState('connecting')
    await startCall()
  }, [])

  // 도우미 측: 수신 대기
  const listenForCall = useCallback(() => {
    setCallState('connecting')
    waitForCall()
  }, [])

  // 통화 종료
  const hangUp = useCallback(() => {
    notifyCallEnded()
    setCallState('ended')
  }, [])

  return {
    callState,
    remoteAudioRef,
    initiateCall,
    listenForCall,
    hangUp,
  }
}
