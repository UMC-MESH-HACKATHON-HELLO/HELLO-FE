import type { ComponentType } from 'react'

export type ButtonTone = 'primary' | 'helper' | 'secondary' | 'danger'
export type IllustrationType = 'permission' | 'loader' | 'empty' | 'avatar'

export type ActionButton = {
  label: string
  tone?: ButtonTone
  width?: string
  height?: string
  onClick?: () => void
}

export type ToggleConfig = {
  onLabel: string
  offLabel: string
  offNavigateTo?: string
}

export type PageConfig = {
  path: string
  code: string
  title: string
  role?: string
  topGap: string
  illustration?: IllustrationType
  avatarLabel?: string
  avatarImage?: boolean
  emptyImage?: boolean
  heading?: string
  headingLines?: string[]
  subheading?: string
  subheadingTone?: 'default' | 'green'
  timer?: string
  runningTimer?: boolean
  status?: string
  statusBlink?: boolean
  point?: string
  segment?: boolean
  toggle?: ToggleConfig
  buttons?: ActionButton[]
  footnote?: string
  footnoteBlink?: boolean
}

export type PageRoute = {
  path: string
  Component: ComponentType
}

export const text = {
  appName: '\uC5EC\uBCF4\uC138\uC694',
  elder: '\uC775\uBA85 \uC5B4\uB974\uC2E0',
  helper: '\uC775\uBA85 \uB3C4\uC6B0\uBBF8',
  waiting: '\uB300\uAE30 \uC911',
  stopped: '\uC911\uC9C0',
}
