import WSTransport, { WSTransportEvents } from '../utils/WSTransport'

import ChatController from './ChatController'
import store from '../utils/Store'

export interface Message {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}
// случайно смержил правки
class MessagesController {
  // передает id sockets & заничение транспорта
  private sockets: Map<number, WSTransport> = new Map()

  async connect(id: number, token: string) {
    if (!id) return
    if (this.sockets.get(id)) {
      return
    }

    const { user } = store.getState()
    if (!id || !user?.data?.id) return
    const transport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${user?.data?.id}/${id}/${token}`,
    )
    await transport.connect()

    this.sockets.set(id, transport)
    this.fetchOldMessages(id)
    this.subscribe(transport, id)
  }

  async sendMessage(id: number, message: string, type: string = 'message') {
    const transport = await this.getSocket(id)
    transport!.send({ type, content: message })
  }

  async fetchOldMessages(id: number, page: number = 0) {
    const transport = await this.getSocket(id)

    if (!transport) {
      throw new Error(`Chat ${id} is not connected`)
    }

    await transport.send({ type: 'get old', content: page.toString() })
  }

  async getSocket(id: number) {
    const transport = this.sockets.get(id)
    if (!transport) {
      await this.connect(id, await ChatController.getToken(id))
      return this.sockets.get(id)!
    }
    return transport
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close())
  }

  private onMessage(id: number, messages: Message | Message[]) {
    if (!Array.isArray(messages) && messages.type !== 'message') {
      return
    }

    const storeKey = `messages.${id}`

    if (Array.isArray(messages)) {
      // если массив значит старые сообщения
      store.set(`messages.${id}`, messages)
    } else {
      // иначе сарые сообщения добаляем в стор
      // @ts-ignore
      const oldMessage = store.getState().messages[id]
      if (!oldMessage) {
        store.set(storeKey, [messages])
        return
      }
      // к сарым сообщениям добаляем новое в стор
      store.set(storeKey, [...oldMessage, messages])
    }
  }

  private onClose(id: number) {
    this.sockets.delete(id)
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (messages) =>
      this.onMessage(id, messages),
    )
    transport.on(WSTransportEvents.Close, () => this.onClose(id))
  }
}

export default new MessagesController()
