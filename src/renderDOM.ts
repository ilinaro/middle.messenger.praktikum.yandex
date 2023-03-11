import '../src/layouts'
import '../src/common'
import './ui'
import './assets/styles/global.scss'

import { EditPasswordPage } from './pages/EditPassword'
import { EditProfilePage } from './pages/EditProfile'
import { ErrorServerPage } from './pages/ErrorServer'
import { LoginPage } from './pages/Login'
import { MessagePage } from './pages/Message'
import { NotFoundPage } from './pages/NotFound'
import { ProfilePage } from './pages/Profile'
import { RegistrationPage } from './pages/Registration'

interface PagesI {
  login: typeof LoginPage
  registration: typeof RegistrationPage
  editPassword: typeof EditPasswordPage
  editProfile: typeof EditProfilePage
  errorServer: typeof ErrorServerPage
  notFound: typeof NotFoundPage
  profile: typeof ProfilePage
  message: typeof MessagePage
}

const ROUTES: PagesI = {
  login: LoginPage,
  registration: RegistrationPage,
  editPassword: EditPasswordPage,
  editProfile: EditProfilePage,
  errorServer: ErrorServerPage,
  notFound: NotFoundPage,
  profile: ProfilePage,
  message: MessagePage,
}

export function renderDOM(route: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!
  root.innerHTML = ''
  const PageComponent = ROUTES[route]
  const page = new PageComponent()

  if (page.element) {
    root.appendChild(page.element)
    page.dispatchComponentDidMount()
  }
}
