import { AttachMessage, HeadBar, ReadMessage } from '../../common'
import { EnterMessage, InputMessage } from '../../ui'

import Block from '../../utils/Block'
import { ChatsData } from '../../api/ChatAPI'
import { GuestData } from '../../api/ProfileAPI'
import MessagesController from '../../controllers/MessagesController'
import template from './chat.hbs'
import { withStore } from '../../utils/Store'

export type UserMessages = {
  chat_id?: number
  content?: string
  id?: number
  is_read?: boolean
  time?: Date
  type?: 'message'
  user_id?: number
}

interface CharProps {
  type?: string
  messages?: UserMessages[]
  selectUserId?: number
  chats?: ChatsData[]
  search?: GuestData[]
  selfUser?: boolean
  userId?: number
}

class Chat extends Block<CharProps> {
  constructor(props: CharProps) {
    super({ type: 'div', ...props })
  }

  init() {
    this.children.InputMessage = new InputMessage({
      id: 'message',
      events: {
        keyup: (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            this.onSubmit()
          }
        },
      },
    })
    this.children.AttachMessage = new AttachMessage({})
    this.children.EnterMessage = new EnterMessage({
      events: {
        click: () => {
          this.onSubmit()
        },
      },
    })
  }

  onSubmit() {
    const input = this.children.InputMessage as InputMessage
    const message = input.getValue()
    input.setValue('')

    if (this.props?.selectUserId) {
      MessagesController.sendMessage(this.props.selectUserId, message)
    }
  }

  componentDidUpdate(_oldProps: any, newProps: any): boolean {
    if (
      !!newProps?.selectUserId &&
      !!this.props?.userId
    ) {
      this.props?.selectUserId && this.onWiteList(newProps?.selectUserId)
      this.children.Messages = this.readMessage(newProps)
      return true
    }
    return false
  }

  readTime(time?: Date) {
    if (time) {
      const Time = new Date(time)
      return `${Time.getHours()}:${Time.getMinutes()}`
    }
  }

  readMessage(props: any) {
    return (
      !!props.messages.length &&
      props.messages.map((data: UserMessages) => {
        if (data?.content) {
          return new ReadMessage({
            ...data,
            time: this.readTime(data?.time),
            from: this.props?.userId === data?.user_id,
          })
        }
      })
    )
  }

  onWiteList(selectUserId?: number) {
    if (this.props?.search && selectUserId) {
      const noself = this.props.search.find((item) => item.id === selectUserId)
      return (this.children.HeadBar = new HeadBar({
        noself: true,
        self: false,
        stateOpen: false,
        avatar: noself?.avatar,
        display_name: noself?.display_name ?? noself?.first_name,
        selectUserId,
        login: noself?.login,
      }))
    }
    if (this.props?.chats && selectUserId) {
      const self = this.props.chats.find((item) => item?.id === selectUserId)
      return (this.children.HeadBar = new HeadBar({
        self: true,
        noself: false,
        stateOpen: false,
        avatar: self?.avatar,
        display_name: self?.title,
        userId: self?.id,
        selectUserId,
      }))
    }
  }
  render() {
    return this.compile(template, { ...this.props })
  }
}

const withChats = withStore((state) => {
  const userSelect = state.selectUser?.id
  if (!userSelect) return

  return {
    selectUserId: state.selectUser?.id,
    messages: (state.messages || {})[userSelect] || [],
    chats: state.chats?.data,
    search: state.search?.data,
    userId: state.user?.data?.id,
  }
})

export default withChats(Chat as typeof Block)
