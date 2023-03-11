import './layouts'
import './components'
import './components/svg'

import contacts from './mock/contacts.json'
import editPassword from './pages/edit-password.hbs'
import editProfile from './pages/edit-profile.hbs'
//pages
import error404 from './pages/404.hbs'
import error500 from './pages/500.hbs'
import home from './pages/home.hbs'
import login from './pages/login.hbs'
import modals from './pages/modals.hbs'
import profile from './pages/profile.hbs'
import registration from './pages/registration.hbs'
//style
import styles from './assets/styles/global.scss'
import user from './mock/user.json'

function render(html) {
  const app = document.querySelector('#app')
  app.innerHTML = html
}

const ROUTES = {
  'login': login,
  'registration': registration,
  'home': home,
  'profile': profile,
  'edit-password': editPassword,
  'edit-profile': editProfile,
  '500': error500,
  '404': error404,
  'modals': modals,
}

window.goToPage = function (name) {
  const page = ROUTES[name]
  render(page({user, contacts}))
}

window.addEventListener('DOMContentLoaded', () => {
  const context = { styles, user }
  render(ROUTES.login(context))
})
