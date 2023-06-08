import { EventBus } from './EventBus'

export enum WSTransportEvents {
  // События WSTransport
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

// WSTransport наседуя EventBus становится шиной событий, чтобы ловить события в контроллере
export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null
  private pingInterval: NodeJS.Timer | number = 0

  constructor(private url: string) {
    super()
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected')
    }

    this.socket.send(JSON.stringify(data))
  }
  // Подключение соединение
  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url)

    this.subscribe(this.socket)

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        this.setupPing()
        resolve()
      })
    })
  }

  public close() {
    if (!this.socket) {
      throw new Error('Socket is not connected')
    }
    this.socket?.close()
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
     this.send({ type: 'ping' })
    }, 5000)

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval)

      this.pingInterval = 0
    })
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data)
        if (data.type && data.type === 'pong') {
          return
        }
      this.emit(WSTransportEvents.Message, data)
    })
    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close)
    })

    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected)
    })

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e)
    })
  }
}
