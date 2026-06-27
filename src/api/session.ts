const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export type UserRole = 'elder' | 'helper'

export type User = {
  id: string
  name: string
  role: UserRole
}

// 토큰 관리
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

// 유저 정보 관리
export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function removeUser(): void {
  localStorage.removeItem(USER_KEY)
}

// 세션 전체 초기화 (로그아웃)
export function clearSession(): void {
  removeToken()
  removeUser()
}

// 로그인 여부 확인
export function isLoggedIn(): boolean {
  return getToken() !== null
}
