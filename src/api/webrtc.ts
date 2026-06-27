import { on, off, send } from './socket'

let peerConnection: RTCPeerConnection | null = null
let localStream: MediaStream | null = null
let remoteStream: MediaStream | null = null
let onRemoteStreamCallback: ((stream: MediaStream) => void) | null = null
let onCallEndedCallback: (() => void) | null = null

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
]

// 시그널링 메시지 수신 핸들러
function handleSignalingMessage(data: unknown) {
  const msg = data as { type: string; sdp?: string; candidate?: RTCIceCandidateInit }

  if (msg.type === 'offer') {
    handleOffer(msg.sdp!)
  } else if (msg.type === 'answer') {
    handleAnswer(msg.sdp!)
  } else if (msg.type === 'ice-candidate' && msg.candidate) {
    handleIceCandidate(msg.candidate)
  } else if (msg.type === 'call-ended') {
    endCall()
    if (onCallEndedCallback) onCallEndedCallback()
  }
}

function createPeerConnection(): RTCPeerConnection {
  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS })

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      send('signaling', { type: 'ice-candidate', candidate: event.candidate.toJSON() })
    }
  }

  pc.ontrack = (event) => {
    remoteStream = event.streams[0]
    if (onRemoteStreamCallback && remoteStream) {
      onRemoteStreamCallback(remoteStream)
    }
  }

  pc.onconnectionstatechange = () => {
    if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
      endCall()
      if (onCallEndedCallback) onCallEndedCallback()
    }
  }

  return pc
}

// 마이크 접근 및 스트림 설정
async function getLocalStream(): Promise<MediaStream> {
  if (localStream) return localStream
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  return localStream
}

// 통화 시작 (발신 측 - 어르신)
export async function startCall(): Promise<void> {
  on('signaling', handleSignalingMessage)

  const stream = await getLocalStream()
  peerConnection = createPeerConnection()

  stream.getTracks().forEach((track) => {
    peerConnection!.addTrack(track, stream)
  })

  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)

  send('signaling', { type: 'offer', sdp: offer.sdp })
}

// Offer 수신 처리 (수신 측 - 도우미)
async function handleOffer(sdp: string): Promise<void> {
  const stream = await getLocalStream()
  peerConnection = createPeerConnection()

  stream.getTracks().forEach((track) => {
    peerConnection!.addTrack(track, stream)
  })

  await peerConnection.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp }))

  const answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answer)

  send('signaling', { type: 'answer', sdp: answer.sdp })
}

// Answer 수신 처리 (발신 측)
async function handleAnswer(sdp: string): Promise<void> {
  if (!peerConnection) return
  await peerConnection.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp }))
}

// ICE candidate 수신 처리
async function handleIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
  if (!peerConnection) return
  await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
}

// 통화 수신 대기 (도우미 측)
export function waitForCall(): void {
  on('signaling', handleSignalingMessage)
}

// 통화 종료
export function endCall(): void {
  if (peerConnection) {
    peerConnection.close()
    peerConnection = null
  }

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop())
    localStream = null
  }

  remoteStream = null
  off('signaling', handleSignalingMessage)
}

// 상대방에게 통화 종료 알림
export function notifyCallEnded(): void {
  send('signaling', { type: 'call-ended' })
  endCall()
}

// 콜백 등록
export function onRemoteStream(callback: (stream: MediaStream) => void): void {
  onRemoteStreamCallback = callback
}

export function onCallEnded(callback: () => void): void {
  onCallEndedCallback = callback
}

// 현재 로컬 스트림 반환 (녹음용)
export function getCurrentLocalStream(): MediaStream | null {
  return localStream
}

export function getRemoteStream(): MediaStream | null {
  return remoteStream
}
