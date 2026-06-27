import { useEffect, useRef, useState } from 'react'
import { apiUpload } from '../api/client'

export type RecordingState = 'idle' | 'recording' | 'stopped' | 'uploading' | 'uploaded' | 'error'

export function useAudioRecorder() {
  const [state, setState] = useState<RecordingState>('idle')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        setState('stopped')
        stream.getTracks().forEach((track) => track.stop())

        // TODO: 백엔드 연동 시 업로드 활성화
        // const filename = `recording-${Date.now()}.webm`
        // apiUpload('/api/recordings', blob, filename)
      }

      mediaRecorder.start()
      setState('recording')
    } catch (err) {
      console.error('마이크 접근 실패:', err)
      setState('error')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setState('stopped')
    }
  }

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  return { state, audioUrl, startRecording, stopRecording }
}

export function AudioPlayback({ audioUrl }: { audioUrl: string }) {
  return (
    <div className="mx-auto mt-4 flex flex-col items-center gap-3">
      <audio controls src={audioUrl} className="w-[280px]">
        <track kind="captions" />
      </audio>
      <a
        href={audioUrl}
        download={`recording-${Date.now()}.webm`}
        className="rounded-[12px] border-2 border-[#087349] bg-[#ddf7e8] px-4 py-2 text-[18px] font-bold text-[#075d3c] shadow-[0_4px_6px_rgba(10,31,18,0.1)] transition-transform hover:-translate-y-0.5"
      >
        녹음 파일 저장
      </a>
    </div>
  )
}
