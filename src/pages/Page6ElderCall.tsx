import { useEffect } from 'react'
import { AudioPlayback, useAudioRecorder } from '../components/AudioRecorder'
import { ProductionPage } from '../components/ProductionPage'
import type { PageConfig } from './pageTypes'
import { text } from './pageTypes'

export function Page6ElderCall() {
  const { state, audioUrl, startRecording, stopRecording } = useAudioRecorder()

  useEffect(() => {
    startRecording()
  }, [])

  const handleEndCall = () => {
    stopRecording()
    // 녹음 테스트: 페이지 이동 막고 결과 확인용
  }

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
    subheading: '\uC5F0\uACB0\uB410\uC5B4\uC694 \u00B7 \uB9D0\uC500\uD558\uC138\uC694',
    subheadingTone: 'green',
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
