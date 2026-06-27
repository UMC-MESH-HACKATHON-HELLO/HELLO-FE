import { useEffect } from 'react'
import { useCall } from '../api/useCall'
import { useSocketConnect } from '../api/useSocket'
import { AudioPlayback, useAudioRecorder } from '../components/AudioRecorder'
import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

export function Page10HelperCall() {
  useSocketConnect()

  const { callState, remoteAudioRef, listenForCall, hangUp } = useCall()
  const { state: recState, audioUrl, startRecording, stopRecording } = useAudioRecorder()

  // 페이지 진입 시 통화 수신 대기 + 녹음 시작
  useEffect(() => {
    listenForCall()
    startRecording()
  }, [])

  // 상대방이 끊으면
  useEffect(() => {
    if (callState === 'ended') {
      stopRecording()
      setTimeout(() => {
        window.location.hash = '#/11'
      }, 500)
    }
  }, [callState])

  const handleEndCall = () => {
    hangUp()
    stopRecording()
    setTimeout(() => {
      window.location.hash = '#/11'
    }, 500)
  }

  const statusText = callState === 'connecting'
    ? '연결 중...'
    : '마이크 켜짐'

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
    subheading: callState === 'connected'
      ? '연결됐어요 · 말씀하세요'
      : '연결 중입니다...',
    subheadingTone: 'green',
    runningTimer: callState === 'connected',
    status: statusText,
    buttons: [{ label: '통화 종료', tone: 'danger', width: 'w-[248px]', height: 'h-[140px]', onClick: handleEndCall }],
    footnote: recState === 'recording' ? '● 녹음 중입니다' : undefined,
    footnoteBlink: recState === 'recording',
  }

  return (
    <div className="relative">
      <ProductionPage page={page} />
      <audio ref={remoteAudioRef} autoPlay className="hidden">
        <track kind="captions" />
      </audio>
      {recState !== 'recording' && recState !== 'idle' && audioUrl && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <AudioPlayback audioUrl={audioUrl} />
        </div>
      )}
    </div>
  )
}
