import { useEffect } from 'react'
import { useCall } from '../api/useCall'
import { useSocketConnect } from '../api/useSocket'
import { useAudioRecorder } from '../components/AudioRecorder'
import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

export function Page6ElderCall() {
  useSocketConnect()

  const { callState, remoteAudioRef, initiateCall, hangUp } = useCall()
  const { state: recState, startRecording, stopRecording } = useAudioRecorder()

  // 페이지 진입 시 통화 시작 + 녹음 시작
  useEffect(() => {
    initiateCall()
    startRecording()
  }, [])

  // 통화 종료 시 처리
  useEffect(() => {
    if (callState === 'ended') {
      stopRecording()
      setTimeout(() => {
        window.location.hash = '#/7'
      }, 500)
    }
  }, [callState])

  const handleEndCall = () => {
    hangUp()
    stopRecording()
    setTimeout(() => {
      window.location.hash = '#/7'
    }, 500)
  }

  const statusText = callState === 'connecting'
    ? '\uC5F0\uACB0 \uC911...'
    : '\uB9C8\uC774\uD06C \uCF1C\uC9D0'

  const page: PageConfig = {
    path: '/6',
    code: 'MT102',
    title: '\uD1B5\uD654 \uC911',
    role: text.elder,
    topGap: 'h-[71px]',
    illustration: 'avatar',
    avatarLabel: text.helper,
    avatarImage: true,
    heading: text.helper,
    subheading: callState === 'connected'
      ? '\uC5F0\uACB0\uB410\uC5B4\uC694 \u00B7 \uB9D0\uC500\uD558\uC138\uC694'
      : '\uC5F0\uACB0 \uC911\uC785\uB2C8\uB2E4...',
    subheadingTone: 'green',
    runningTimer: callState === 'connected',
    status: statusText,
    buttons: [{ label: '\uD1B5\uD654 \uC885\uB8CC', tone: 'danger', width: 'w-[248px]', height: 'h-[140px]', onClick: handleEndCall }],
    footnote: recState === 'recording' ? '\u25CF \uB179\uC74C \uC911\uC785\uB2C8\uB2E4' : undefined,
    footnoteBlink: recState === 'recording',
  }

  return (
    <div className="relative">
      <ProductionPage page={page} />
      {/* 상대방 음성 재생을 위한 숨겨진 오디오 엘리먼트 */}
      <audio ref={remoteAudioRef} autoPlay className="hidden">
        <track kind="captions" />
      </audio>
    </div>
  )
}
