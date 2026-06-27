import { Page10HelperCall } from './Page10HelperCall'
import { Page11HelperBackToWaiting } from './Page11HelperBackToWaiting'
import { Page12HelperMyPage } from './Page12HelperMyPage'
import { Page13HelperLogin } from './Page13HelperLogin'
import { Page14HelperSignup } from './Page14HelperSignup'
import { Page15ElderReview } from './Page15ElderReview'
import { Page1RoleSelect } from './Page1RoleSelect'
import { Page2HelperMicReady } from './Page2HelperMicReady'
import { Page2MicReady } from './Page2MicReady'
import { Page3ElderHome } from './Page3ElderHome'
import { Page4Matching } from './Page4Matching'
import { Page5NoHelper } from './Page5NoHelper'
import { Page6ElderCall } from './Page6ElderCall'
import { Page7ElderEnd } from './Page7ElderEnd'
import { Page8HelperWaiting } from './Page8HelperWaiting'
import { Page9HelperRequest } from './Page9HelperRequest'
import type { PageRoute } from './pageTypes'

export const pages: PageRoute[] = [
  { path: '/1', Component: Page1RoleSelect },
  { path: '/2', Component: Page2MicReady },
  { path: '/2-helper', Component: Page2HelperMicReady },
  { path: '/3', Component: Page3ElderHome },
  { path: '/4', Component: Page4Matching },
  { path: '/5', Component: Page5NoHelper },
  { path: '/6', Component: Page6ElderCall },
  { path: '/7', Component: Page7ElderEnd },
  { path: '/8', Component: Page8HelperWaiting },
  { path: '/9', Component: Page9HelperRequest },
  { path: '/10', Component: Page10HelperCall },
  { path: '/11', Component: Page11HelperBackToWaiting },
  { path: '/12', Component: Page12HelperMyPage },
  { path: '/13', Component: Page13HelperLogin },
  { path: '/14', Component: Page14HelperSignup },
  { path: '/15', Component: Page15ElderReview },
]
