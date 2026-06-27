import { apiPost } from './client'
import { clearSession, setToken, setUser } from './session'
import type { User } from './session'

type LoginRequest = {
  email: string
  password: string
}

type SignupRequest = {
  email: string
  password: string
  name: string
  role: 'elder' | 'helper'
}

type AuthResponse = {
  token: string
  user: User
}

export async function login(data: LoginRequest): Promise<User> {
  const res = await apiPost<AuthResponse>('/api/auth/login', data)
  setToken(res.token)
  setUser(res.user)
  return res.user
}

export async function signup(data: SignupRequest): Promise<User> {
  const res = await apiPost<AuthResponse>('/api/auth/signup', data)
  setToken(res.token)
  setUser(res.user)
  return res.user
}

export function logout(): void {
  clearSession()
  window.location.hash = '/1'
}
