import { useEffect, useRef, useState } from 'react'
import { useCall } from '../api/useCall'
import { onSignal } from '../api/socket'
import type { SignalMessage } from '../api/socket'
import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

export function Page6ElderCall() {
  const { callState, remoteAudioRef, startCall, hangUp } = useCall()
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)

  // 진입 시 LiveKit 연결 + 녹음 시작
  useEffect(() => {
    const token = sessionStorage.getItem('lk_token')
    const roomId = sessionStorage.getItem('lk_roomId')
    if (token && roomId) {
      startCall(token, roomId)
      sessionStorage.removeItem('lk_token')
      sessionStorage.removeItem('lk_roomId')
    }

    // 마이크 녹음 시작
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream)
      recorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setRecordingUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((t) => t.stop())
      }
      recorder.start()
    }).catch(() => {})
  }, [startCall])

  // 상대방 연결 끊김/종료 감지
  useEffect(() => {
    return onSignal((msg: SignalMessage) => {
      if (msg.type === 'PARTNER_DISCONNECTED' || msg.type === 'ENDED') {
        recorderRef.current?.stop()
        window.location.hash = '#/15'
      }
    })
  }, [])

  // callState ended 감지
  useEffect(() => {
    if (callState === 'ended' && recorderRef.current?.state === 'recording') {
      recorderRef.current.stop()
    }
  }, [callState])

  const handleEndCall = () => {
    recorderRef.current?.stop()
    hangUp()
    // 녹음 URL을 sessionStorage에 저장하여 리뷰 페이지에서 접근
    setTimeout(() => {
      if (recordingUrl) sessionStorage.setItem('recording_url', recordingUrl)
      window.location.hash = '#/15'
    }, 300)
  }

  const page: PageConfig = {
    path: '/6',
    code: 'MT102',
    title: '통화 중',
    role: text.elder,
    topGap: 'h-[71px]',
    illustration: 'avatar',
    avatarLabel: text.helper,
    avatarImage: true,
    heading: text.helper,
    subheading: callState === 'connected' ? '연결됐어요 · 말씀하세요' : '연결 중입니다...',
    subheadingTone: 'green',
    runningTimer: callState === 'connected',
    status: callState === 'connected' ? '● 녹음 중' : '연결 중...',
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
