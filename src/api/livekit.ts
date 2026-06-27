import { Room, RoomEvent, Track } from 'livekit-client'

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL as string

let room: Room | null = null

export type LiveKitCallbacks = {
  onConnected?: () => void
  onRemoteAudio?: (element: HTMLMediaElement) => void
  onParticipantDisconnected?: () => void
  onDisconnected?: () => void
}

/**
 * LiveKit 방에 입장합니다.
 * @param token - MATCHED 응답에서 받은 토큰
 * @param callbacks - 이벤트 콜백
 */
export async function joinRoom(token: string, callbacks: LiveKitCallbacks = {}): Promise<void> {
  room = new Room()

  room.on(RoomEvent.ParticipantConnected, () => {
    console.log('[LiveKit] 상대방 입장')
    if (callbacks.onConnected) callbacks.onConnected()
  })

  room.on(RoomEvent.TrackSubscribed, (track) => {
    if (track.kind === Track.Kind.Audio) {
      const audioEl = track.attach()
      console.log('[LiveKit] 상대방 오디오 수신')
      if (callbacks.onRemoteAudio) callbacks.onRemoteAudio(audioEl)
    }
  })

  room.on(RoomEvent.ParticipantDisconnected, () => {
    console.log('[LiveKit] 상대방 퇴장')
    if (callbacks.onParticipantDisconnected) callbacks.onParticipantDisconnected()
  })

  room.on(RoomEvent.Disconnected, () => {
    console.log('[LiveKit] 연결 해제')
    if (callbacks.onDisconnected) callbacks.onDisconnected()
  })

  await room.connect(LIVEKIT_URL, token)
  console.log('[LiveKit] 연결됨')

  // 마이크 활성화
  await room.localParticipant.setMicrophoneEnabled(true)
}

/**
 * LiveKit 방에서 나갑니다.
 */
export async function leaveRoom(): Promise<void> {
  if (room) {
    await room.disconnect()
    room = null
  }
}

export function isInRoom(): boolean {
  return room !== null && room.state === 'connected'
}
