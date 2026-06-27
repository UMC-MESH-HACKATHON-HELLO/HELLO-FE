import { useEffect } from 'react'
import { AudioPlayback, useAudioRecorder } from '../components/AudioRecorder'
import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

export function Page10HelperCall() {
  const { state, audioUrl, startRecording, stopRecording } = useAudioRecorder()

  useEffect(() => {
    startRecording()
  }, [])

  const handleEndCall = () => {
    stopRecording()
    // 녹음 테스트: 페이지 이동 막고 결과 확인용
  }

  const page: PageConfig = {
    path: '/10',
    code: 'S4',
    title: '\uB3C4\uC6B0\uBBF8 \uD1B5\uD654',
    role: text.helper,
    topGap: 'h-[77px]',
    illustration: 'avatar',
    avatarLabel: text.elder,
    avatarImage: true,
    heading: text.elder,
    runningTimer: true,
    status: '\uB9C8\uC774\uD06C \uCF1C\uC9D0',
    buttons: [{ label: '\uD1B5\uD654 \uC885\uB8CC', tone: 'danger', width: 'w-[248px]', height: 'h-[140px]', onClick: handleEndCall }],
    footnote: state === 'recording' ? '\u25CF \uB179\uC74C \uC911\uC785\uB2C8\uB2E4' : undefined,
    footnoteBlink: state === 'recording',
  }

  return (
    <div className="relative">
      <ProductionPage page={page} />
      {state !== 'recording' && state !== 'idle' && audioUrl && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <AudioPlayback audioUrl={audioUrl} />
        </div>
      )}
    </div>
  )
}
