import { Client } from '@stomp/stompjs'
import type { IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL || '')

export type SignalType = 'WAITING' | 'NO_HELPER' | 'MATCHED' | 'PARTNER_DISCONNECTED' | 'ENDED'

export interface SignalMessage {
  type: SignalType
  roomId?: string
  token?: string
}

type SignalHandler = (msg: SignalMessage) => void
type RoomHandler = (msg: SignalMessage) => void

let client: Client | null = null
let sessionId: string | null = null
const signalHandlers = new Set<SignalHandler>()
const roomHandlers = new Map<string, Set<RoomHandler>>()

/** POST /api/session으로 익명 세션 발급 */
export async function createSession(role: 'HELPEE' | 'HELPER'): Promise<string> {
  const res = await fetch(`${API_BASE}/api/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ role }),
  })
  const data = await res.json()
  sessionId = data.sessionId
  return sessionId!
}

/** STOMP over SockJS 연결 */
export function connect(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (client?.connected) {
      resolve()
      return
    }

    const url = sessionId ? `${API_BASE}/ws?sessionId=${sessionId}` : `${API_BASE}/ws`

    client = new Client({
      webSocketFactory: () => new SockJS(url),
      reconnectDelay: 3000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        // 개인 메시지 구독
        client!.subscribe('/user/queue/signal', (message: IMessage) => {
          const body = JSON.parse(message.body)
          const signal: SignalMessage = body.result ?? body
          signalHandlers.forEach((h) => h(signal))
        })
        resolve()
      },
      onStompError: (frame) => {
        console.error('[STOMP] 에러:', frame.headers.message)
        reject(new Error(frame.headers.message))
      },
      onDisconnect: () => {
        console.log('[STOMP] 연결 해제')
      },
    })

    client.activate()
  })
}

/** 연결 해제 */
export function disconnect(): void {
  if (client?.active) {
    client.deactivate()
  }
  client = null
  sessionId = null
  signalHandlers.clear()
  roomHandlers.clear()
}

/** 방 토픽 구독 (MATCHED 후 호출) */
export function subscribeRoom(roomId: string): void {
  if (!client?.connected) return
  client.subscribe(`/topic/room/${roomId}`, (message: IMessage) => {
    const body = JSON.parse(message.body)
    const signal: SignalMessage = body.result ?? body
    const handlers = roomHandlers.get(roomId)
    if (handlers) handlers.forEach((h) => h(signal))
  })
}

/** 도우미 대기 등록 */
export function sendHelperRegister(): void {
  if (!client?.connected) return
  client.publish({ destination: '/app/help/register', body: '{}' })
}

/** 어르신 도움 요청 */
export function sendHelpRequest(): void {
  if (!client?.connected) return
  client.publish({ destination: '/app/help/request', body: '{}' })
}

/** 통화 종료 */
export function sendCallEnd(roomId: string): void {
  if (!client?.connected) return
  client.publish({ destination: '/app/call/end', body: JSON.stringify({ roomId }) })
}

/** 개인 시그널 이벤트 구독 */
export function onSignal(handler: SignalHandler): () => void {
  signalHandlers.add(handler)
  return () => { signalHandlers.delete(handler) }
}

/** 방 이벤트 구독 */
export function onRoom(roomId: string, handler: RoomHandler): () => void {
  if (!roomHandlers.has(roomId)) roomHandlers.set(roomId, new Set())
  roomHandlers.get(roomId)!.add(handler)
  return () => { roomHandlers.get(roomId)?.delete(handler) }
}

export function isConnected(): boolean {
  return client?.connected ?? false
}

export function getSessionId(): string | null {
  return sessionId
}
