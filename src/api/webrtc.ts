import { Room, RoomEvent, Track, RemoteTrackPublication, RemoteParticipant } from 'livekit-client'

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL as string || 'wss://hello-f3stxgas.livekit.cloud'

let room: Room | null = null

export type CallStatus = 'idle' | 'connecting' | 'connected' | 'ended'
type StatusHandler = (status: CallStatus) => void

const statusHandlers = new Set<StatusHandler>()

function notifyStatus(status: CallStatus) {
  statusHandlers.forEach((h) => h(status))
}

/**
 * LiveKit Room에 연결하고 마이크 오디오를 publish한다.
 * @param token 서버에서 받은 LiveKit JWT 토큰
 * @param audioElement 상대방 오디오를 재생할 HTMLAudioElement
 */
export async function connectToRoom(token: string, audioElement?: HTMLAudioElement | null): Promise<void> {
  if (room) {
    await room.disconnect()
  }

  room = new Room()
  notifyStatus('connecting')

  // 상대방 트랙 구독 시 오디오 재생
  room.on(RoomEvent.TrackSubscribed, (track, _pub: RemoteTrackPublication, _participant: RemoteParticipant) => {
    if (track.kind === Track.Kind.Audio && audioElement) {
      track.attach(audioElement)
    }
  })

  room.on(RoomEvent.Connected, () => {
    notifyStatus('connected')
  })

  room.on(RoomEvent.Disconnected, () => {
    notifyStatus('ended')
  })

  room.on(RoomEvent.ParticipantDisconnected, () => {
    notifyStatus('ended')
  })

  await room.connect(LIVEKIT_URL, token)

  // 마이크 publish
  await room.localParticipant.setMicrophoneEnabled(true)
}

/** 통화 종료 (Room disconnect) */
export async function disconnectRoom(): Promise<void> {
  if (room && room.state !== 'disconnected') {
    await room.disconnect()
  }
  room = null
  notifyStatus('ended')
}

/** 상태 변경 구독 */
export function onCallStatus(handler: StatusHandler): () => void {
  statusHandlers.add(handler)
  return () => { statusHandlers.delete(handler) }
}

export function getRoom(): Room | null {
  return room
}
