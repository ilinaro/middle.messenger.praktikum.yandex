import '../src/layouts'
import '../src/common'
import './ui'
import './assets/styles/global.scss'

import AuthController from './controllers/AuthController';
import { EditPasswordPage } from './pages/EditPassword'
import { EditProfilePage } from './pages/EditProfile'
import { ErrorServerPage } from './pages/ErrorServer'
import { LoginPage } from './pages/Login'
import { MessagePage } from './pages/Message'
import { NotFoundPage } from './pages/NotFound'
import { ProfilePage } from './pages/Profile'
import { RegistrationPage } from './pages/Registration'
import Router from './utils/Router'

enum Routes {
  Index = '/',
  Register = '/sign-up',
  Profile = '/profile',
  Messenger = '/messenger',
  NotFound = '/404',
  ErrorServer = '/500',
  EditProfile = '/settings/edit-profile',
  EditPassword = '/settings/edit-password',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, MessagePage)
    .use(Routes.NotFound, NotFoundPage)
    .use(Routes.ErrorServer, ErrorServerPage)
    .use(Routes.EditProfile, EditProfilePage)
    .use(Routes.EditPassword, EditPasswordPage)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false
      break
  }

  try {
    await AuthController.getUser()

    Router.start()

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})