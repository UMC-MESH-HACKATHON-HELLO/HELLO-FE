import { getToken } from './session'

const BASE_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_BASE_URL as string)

function authHeaders(): Record<string, string> {
  const token = getToken()
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { ...authHeaders() },
  })
  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    throw new Error(`POST ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function apiUpload<T>(path: string, blob: Blob, filename: string): Promise<T> {
  const formData = new FormData()
  formData.append('file', blob, filename)

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: formData,
  })
  if (!res.ok) {
    throw new Error(`UPLOAD ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}
