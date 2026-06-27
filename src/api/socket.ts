import { getToken } from './session'

type SocketEventHandler = (data: unknown) => void

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string
// http → ws, https → wss
const WS_URL = BASE_URL.replace(/^http/, 'ws')

let socket: WebSocket | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
const listeners = new Map<string, Set<SocketEventHandler>>()

export type SocketEvent =
  | 'match:request'      // 도우미에게 매칭 요청 도착
  | 'match:accepted'     // 어르신에게 매칭 수락 알림
  | 'match:cancelled'    // 매칭 취소
  | 'call:connected'     // 통화 연결됨
  | 'call:ended'         // 상대방이 통화 종료
  | 'helper:status'      // 도우미 상태 변경 확인
  | 'error'              // 에러

export function connect(): void {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return
  }

  const token = getToken()
  const url = token ? `${WS_URL}/ws?token=${encodeURIComponent(token)}` : `${WS_URL}/ws`

  socket = new WebSocket(url)

  socket.onopen = () => {
    console.log('[Socket] 연결됨')
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
  }

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data as string) as { type: string; data: unknown }
      const handlers = listeners.get(message.type)
      if (handlers) {
        handlers.forEach((handler) => handler(message.data))
      }
    } catch (err) {
      console.error('[Socket] 메시지 파싱 실패:', err)
    }
  }

  socket.onclose = (event) => {
    console.log('[Socket] 연결 끊김:', event.code, event.reason)
    socket = null
    // 비정상 종료 시 3초 후 재연결
    if (event.code !== 1000) {
      reconnectTimer = setTimeout(() => connect(), 3000)
    }
  }

  socket.onerror = (err) => {
    console.error('[Socket] 에러:', err)
  }
}

export function disconnect(): void {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
  if (socket) {
    socket.close(1000, '정상 종료')
    socket = null
  }
}

export function send(type: string, data?: unknown): void {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type, data }))
  } else {
    console.warn('[Socket] 연결되지 않은 상태에서 전송 시도:', type)
  }
}

export function on(event: string, handler: SocketEventHandler): void {
  if (!listeners.has(event)) {
    listeners.set(event, new Set())
  }
  listeners.get(event)!.add(handler)
}

export function off(event: string, handler: SocketEventHandler): void {
  const handlers = listeners.get(event)
  if (handlers) {
    handlers.delete(handler)
  }
}

export function isConnected(): boolean {
  return socket !== null && socket.readyState === WebSocket.OPEN
}
