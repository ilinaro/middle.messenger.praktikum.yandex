import API, { ChatAPI } from '../api/ChatAPI'

import MessagesController from './MessagesController'
import store from '../utils/Store'

export interface IResult {
  status: string
  msg: string
}

export class ChatController {
  private readonly api: ChatAPI
  constructor() {
    this.api = API
  }

  async getChats() {
    try {
      store.set('chats.isLoading', true)
      const chats = await this.api.getChats()

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id)
        console.log(token)
        await MessagesController.connect(chat.id, token)
      })
      store.set('chats.data', chats)
      store.set('chats.isLoading', false)
    } catch (e) {
      store.set('chats.error', e)
    }
  }

  async createChat(title: string) {
    try {
      return await this.api.createChat({ title })
    } catch (e) {
      store.set('chats.error', e)
    }
  }

  async getToken(id: number) {
    return this.api.getToken(id)
  }

  async addUser(login: string, userId: number) {
    try {
      const chatId = await this.createChat(login)
      if (chatId) {
        await this.api.addUser(userId, chatId.id)
        this.getChats()
      }
    } catch (e) {
      store.set('chats.error', e)
    }
  }

  async deleteChat(chatId: number) {
    try {
      await this.api.deleteChat(chatId)
      this.getChats()
    } catch (e) {
      store.set('chats.error', e)
    }
  }
  async deleteUserFromChat(userId: number, chatId: number) {
    try {
      await this.api.deleteUserFromChat(userId, chatId)
    } catch (e) {
      store.set('chats.error', e)
    }
  }
}

export default new ChatController()
