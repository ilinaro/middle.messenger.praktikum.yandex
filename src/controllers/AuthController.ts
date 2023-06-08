import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'

import MessagesController from './MessagesController'
// import MessagesController from './MessagesController'
import Router from '../utils/Router'
import store from '../utils/Store'

class AuthController {
  private readonly api: AuthAPI
  constructor() {
    this.api = API
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data)
      await this.getUser()
      Router.go('/messenger')
    } catch (e) {
      store.set('user.error', (e as Error).message)
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data)
      await this.getUser()
      Router.go('/messenger')
    } catch (e) {
      console.error(e)
    }
  }

  async getUser() {
    store.set('user.isLoading', true)
    const user = await this.api.getUser()
    store.set('user.data', user)
    store.set('user.isLoading', false)
  }

  async logout() {
    try {
      MessagesController.closeAll()
      await this.api.logout()
      store.set('user', undefined)
      // MessagesController.closeAll()
      Router.go('/')
    } catch (e) {
      console.error(e)
    }
  }
}

export default new AuthController()
