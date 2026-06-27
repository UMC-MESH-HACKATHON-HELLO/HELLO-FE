const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    body: formData,
  })
  if (!res.ok) {
    throw new Error(`UPLOAD ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}
